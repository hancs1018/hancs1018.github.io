// ==================== 游戏主流程 ====================

const Game = {
  players: [],
  currentIdx: 0,
  state: 'IDLE',      // IDLE / ROLLING / MOVING / LANDED / WAIT_ACTION / GAME_OVER
  pendingTile: null,  // 待处理的地皮（购买决策）

  // ---------- 初始化 ----------
  start(names) {
    BOARD.init();
    BOARD.render(UI.els.board);

    this.players = names.map((name, i) => createPlayer(i, name, PLAYER_COLORS[i]));
    this.currentIdx = 0;
    this.state = 'IDLE';
    this.pendingTile = null;

    // 创建棋子
    this.players.forEach(p => {
      const token = document.createElement('div');
      token.className = 'token';
      token.style.background = p.color;
      token.textContent = p.id + 1;
      UI.els.tokens.appendChild(token);
      p.tokenEl = token;
      this.placeToken(p, false);
    });

    UI.updatePlayersPanel();
    UI.log('🎮 游戏开始！欢迎来到像素大富翁！');
    UI.log(`💰 每位玩家初始资金 ¥${START_MONEY}`);
    this.beginTurn();
  },

  currentPlayer() {
    return this.players[this.currentIdx] || null;
  },

  // ---------- 棋子定位 ----------
  placeToken(player, animate = true) {
    const center = BOARD.getTileCenter(player.position);
    // 同一格多棋子错位排列
    const offset = player.id * 8 - 12;
    const x = center.x - 13 + offset;
    const y = center.y - 13 + (player.id % 2) * 14;
    if (!animate) player.tokenEl.style.transition = 'none';
    player.tokenEl.style.left = x + 'px';
    player.tokenEl.style.top = y + 'px';
    if (!animate) {
      requestAnimationFrame(() => { player.tokenEl.style.transition = ''; });
    }
  },

  // ---------- 回合流程 ----------
  beginTurn() {
    const player = this.currentPlayer();
    if (!player) return;

    // 胜利判定
    if (Players.alivePlayers(this.players).length <= 1) {
      return this.gameOver();
    }

    // 跳过破产玩家
    if (player.bankrupt) return this.nextTurn();

    UI.updatePlayersPanel();
    UI.log(`—— <b style="color:${player.color}">${player.name}</b> 的回合 ——`);

    // 监狱判定
    if (player.inJail > 0) {
      player.inJail--;
      UI.log(`🚔 ${player.name} 在监狱中（剩余 ${player.inJail} 回合），可选择支付 ¥${JAIL_FINE} 保释`);
      UI.updatePlayersPanel();
      if (player.money >= JAIL_FINE) {
        UI.setButtons({ bail: true, endTurn: true });
      } else {
        UI.setButtons({ endTurn: true });
      }
      if (player.inJail > 0 && player.money < JAIL_FINE) {
        UI.log(`🚔 ${player.name} 无法保释，本回合跳过`);
        UI.setButtons({ endTurn: true });
        return;
      }
      if (player.inJail > 0) {
        // 等玩家选择保释或直接结束回合
        UI.setButtons({ bail: player.money >= JAIL_FINE, endTurn: true });
        return;
      }
      // 刚好出狱，正常掷骰
    }

    this.state = 'IDLE';
    UI.setButtons({ roll: true });
  },

  // 保释
  bailOut() {
    const player = this.currentPlayer();
    Players.changeMoney(player, -JAIL_FINE);
    player.inJail = 0;
    UI.log(`🔓 ${player.name} 支付 ¥${JAIL_FINE} 保释出狱`);
    this.state = 'IDLE';
    UI.setButtons({ roll: true });
  },

  // 掷骰
  async rollDice() {
    if (this.state !== 'IDLE') return;
    this.state = 'ROLLING';
    UI.setButtons({});

    const player = this.currentPlayer();
    const d1 = Dice.roll();
    const d2 = Dice.roll();
    await Promise.all([
      Dice.animate(UI.els.dice1, d1),
      Dice.animate(UI.els.dice2, d2)
    ]);

    const total = d1 + d2;
    UI.log(`🎲 <b style="color:${player.color}">${player.name}</b> 掷出 ${d1} + ${d2} = <b>${total}</b> 点`);
    this.state = 'MOVING';
    await this.movePlayer(player, total);
    await this.handleLanding(player);
  },

  // 逐格移动动画（含经过起点奖励）
  async movePlayer(player, steps) {
    const total = BOARD.tiles.length;
    for (let i = 0; i < steps; i++) {
      player.position = (player.position + 1) % total;
      // 经过起点
      if (player.position === 0) {
        Players.changeMoney(player, PASS_START_BONUS);
        UI.log(`🏁 ${player.name} 经过起点，领取 ¥${PASS_START_BONUS}`);
      }
      this.placeToken(player);
      await new Promise(r => setTimeout(r, ANIM.moveStep));
      if (player.bankrupt) return; // 移动中破产则中断
    }
  },

  // 落点处理
  async handleLanding(player) {
    if (player.bankrupt) return this.nextTurn();
    this.state = 'LANDED';
    const tile = BOARD.tiles[player.position];
    UI.log(`📍 ${player.name} 到达【${tile.name}】`);

    let waitingDecision = false;
    switch (tile.type) {
      case TILE_TYPE.PROPERTY:
        waitingDecision = await this.handleProperty(player, tile);
        break;
      case TILE_TYPE.CHANCE:
        await Events.draw(player);
        break;
      case TILE_TYPE.TAX:
        UI.log(`💸 ${player.name} 缴纳税款 ¥${tile.amount}`);
        Players.pay(player, tile.amount);
        break;
      case TILE_TYPE.JAIL:
        await this.sendToJail(player);
        break;
      case TILE_TYPE.SHOP:
        await this.handleShop(player);
        break;
      case TILE_TYPE.START:
        UI.log(`🏁 ${player.name} 停在起点，额外领取 ¥${PASS_START_BONUS}`);
        Players.changeMoney(player, PASS_START_BONUS);
        break;
      case TILE_TYPE.PARKING:
        UI.log(`🅿️ ${player.name} 在免费停车场休息`);
        break;
    }

    if (player.bankrupt) return this.nextTurn();
    if (!waitingDecision) this.waitEndTurn();
  },

  // 地皮落点：无主→询问购买；自己的→可升级；他人的→付过路费
  // 返回 true 表示正在等待玩家决策（购买/升级），此时不调用 waitEndTurn
  async handleProperty(player, tile) {
    if (tile.owner === null) {
      this.pendingTile = tile;
      const canBuy = player.money >= tile.price;
      UI.log(`🏠 【${tile.name}】售价 ¥${tile.price}，${canBuy ? '是否购买？' : '资金不足，无法购买'}`);
      if (!canBuy) return false; // 买不起则直接进入结束回合
      UI.setButtons({ buy: true, skip: true });
      // 等待玩家点击 购买/放弃（回调里会调 waitEndTurn）
      return true;
    }
    if (tile.owner === player.id) {
      const canUpgrade = tile.level < 3 && player.money >= tile.upgradeCost;
      if (canUpgrade) {
        UI.log(`🔨 这是你的地皮【${tile.name}】（${tile.level}级），可花 ¥${tile.upgradeCost} 升级`);
        UI.setButtons({ upgrade: true, endTurn: true });
        return true;
      }
      UI.log(`🏠 这是你的地皮【${tile.name}】（${tile.level}级）`);
      return false;
    }
    // 他人地皮
    Property.payRent(player, tile);
    return false;
  },

  // 道具店
  async handleShop(player) {
    if (player.money >= 500) {
      player.items.push('rent_shield');
      Players.changeMoney(player, -500);
      UI.log(`🛒 ${player.name} 购买了免过路费卡（¥500）`);
      UI.updatePlayersPanel();
    } else {
      UI.log(`🛒 ${player.name} 资金不足，无法购买道具`);
    }
  },

  // 送入监狱
  async sendToJail(player) {
    const jailTile = BOARD.tiles.find(t => t.type === TILE_TYPE.JAIL);
    player.position = jailTile.id;
    player.inJail = JAIL_TURNS;
    this.placeToken(player);
    UI.log(`🚔 <b style="color:${player.color}">${player.name}</b> 被捕入狱，停留 ${JAIL_TURNS} 回合！`);
    UI.updatePlayersPanel();
  },

  // ---------- 玩家操作回调 ----------
  buyPendingTile() {
    const player = this.currentPlayer();
    if (this.pendingTile && Property.buy(player, this.pendingTile.id)) {
      this.pendingTile = null;
    }
    this.waitEndTurn();
  },

  skipPendingTile() {
    if (this.pendingTile) {
      UI.log(`🚫 ${this.currentPlayer().name} 放弃购买【${this.pendingTile.name}】`);
      this.pendingTile = null;
    }
    this.waitEndTurn();
  },

  upgradeCurrentTile() {
    const player = this.currentPlayer();
    const tile = BOARD.tiles[player.position];
    if (Property.upgrade(player, tile.id)) {
      this.waitEndTurn();
    }
  },

  // 行动结束，等待点击「结束回合」
  waitEndTurn() {
    this.state = 'WAIT_ACTION';
    // 检查是否还有可升级的地皮提示
    UI.setButtons({ endTurn: true });
    UI.updatePlayersPanel();
  },

  // 结束回合
  endTurn() {
    if (this.state !== 'WAIT_ACTION' && this.state !== 'IDLE') return;
    this.pendingTile = null;
    this.nextTurn();
  },

  nextTurn() {
    // 胜利判定
    if (Players.alivePlayers(this.players).length <= 1) {
      return this.gameOver();
    }
    let next = this.currentIdx;
    for (let i = 0; i < this.players.length; i++) {
      next = (next + 1) % this.players.length;
      if (!this.players[next].bankrupt) break;
    }
    this.currentIdx = next;
    this.state = 'IDLE';
    this.beginTurn();
  },

  gameOver() {
    this.state = 'GAME_OVER';
    const winner = Players.alivePlayers(this.players)[0];
    UI.setButtons({});
    UI.log(`🏆 游戏结束！<b style="color:${winner.color}">${winner.name}</b> 获胜！`);
    UI.showGameOver(winner);
  }
};

// ==================== 启动与事件绑定 ====================

window.addEventListener('DOMContentLoaded', () => {
  UI.init();

  // 人数选择
  UI.els.playerCount.addEventListener('change', e => {
    UI.renderNameInputs(parseInt(e.target.value));
  });
  UI.renderNameInputs(2);

  // 开始游戏
  UI.els.btnStart.addEventListener('click', () => {
    const count = parseInt(UI.els.playerCount.value);
    const names = UI.getPlayerNames(count);
    UI.showGameScreen();
    Game.start(names);
  });

  // 操作按钮
  UI.els.btnRoll.addEventListener('click', () => Game.rollDice());
  UI.els.btnBuy.addEventListener('click', () => Game.buyPendingTile());
  UI.els.btnSkip.addEventListener('click', () => Game.skipPendingTile());
  UI.els.btnUpgrade.addEventListener('click', () => Game.upgradeCurrentTile());
  UI.els.btnBail.addEventListener('click', () => Game.bailOut());
  UI.els.btnEndTurn.addEventListener('click', () => Game.endTurn());
  UI.els.btnRestart.addEventListener('click', () => location.reload());

  // 初始化骰面
  Dice.renderFace(UI.els.dice1, 1);
  Dice.renderFace(UI.els.dice2, 1);
});
