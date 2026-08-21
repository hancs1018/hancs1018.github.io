// ==================== UI 系统 ====================

const UI = {
  els: {},  // DOM 引用缓存

  init() {
    this.els = {
      startScreen: document.getElementById('start-screen'),
      gameScreen: document.getElementById('game-screen'),
      playerCount: document.getElementById('player-count'),
      nameInputs: document.getElementById('name-inputs'),
      btnStart: document.getElementById('btn-start'),
      board: document.getElementById('board'),
      tokens: document.getElementById('tokens'),
      dice1: document.getElementById('dice1'),
      dice2: document.getElementById('dice2'),
      btnRoll: document.getElementById('btn-roll'),
      btnBuy: document.getElementById('btn-buy'),
      btnSkip: document.getElementById('btn-skip'),
      btnUpgrade: document.getElementById('btn-upgrade'),
      btnBail: document.getElementById('btn-bail'),
      btnEndTurn: document.getElementById('btn-end-turn'),
      currentPlayer: document.getElementById('current-player'),
      playersPanel: document.getElementById('players-panel'),
      logPanel: document.getElementById('log-panel'),
      popup: document.getElementById('popup'),
      popupTitle: document.getElementById('popup-title'),
      popupBody: document.getElementById('popup-body'),
      popupBtn: document.getElementById('popup-btn'),
      gameover: document.getElementById('gameover'),
      winnerText: document.getElementById('winner-text'),
      btnRestart: document.getElementById('btn-restart'),
      tileTip: document.getElementById('tile-tip')
    };
  },

  // ---------- 开始界面 ----------
  renderNameInputs(count) {
    this.els.nameInputs.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const row = document.createElement('div');
      row.className = 'name-row';
      row.innerHTML = `
        <span class="name-color" style="background:${PLAYER_COLORS[i]}"></span>
        <input type="text" maxlength="8" placeholder="${PLAYER_NAMES_DEFAULT[i]}" data-idx="${i}">`;
      this.els.nameInputs.appendChild(row);
    }
  },

  getPlayerNames(count) {
    const inputs = this.els.nameInputs.querySelectorAll('input');
    return Array.from(inputs).map((inp, i) => inp.value.trim() || PLAYER_NAMES_DEFAULT[i]);
  },

  showGameScreen() {
    this.els.startScreen.classList.add('hidden');
    this.els.gameScreen.classList.remove('hidden');
  },

  // ---------- 玩家面板 ----------
  updatePlayersPanel() {
    if (!Game.players.length) return;
    this.els.playersPanel.innerHTML = '';
    Game.players.forEach(p => {
      const isCurrent = Game.currentPlayer() === p;
      const card = document.createElement('div');
      card.className = 'player-card' +
        (isCurrent ? ' active' : '') +
        (p.bankrupt ? ' bankrupt' : '');
      const itemIcons = p.items.map(i => i === 'rent_shield' ? '🛡️' : '').join('');
      card.innerHTML = `
        <span class="pc-color" style="background:${p.color}"></span>
        <span class="pc-name">${p.name}</span>
        <span class="pc-money">¥${p.money}</span>
        <span class="pc-assets">🏠${p.properties.length} ${itemIcons}</span>
        ${p.inJail > 0 ? '<span class="pc-jail">🚔</span>' : ''}
        ${p.bankrupt ? '<span class="pc-dead">💀</span>' : ''}`;
      this.els.playersPanel.appendChild(card);
    });

    // 当前回合指示
    const cur = Game.currentPlayer();
    if (cur) {
      this.els.currentPlayer.innerHTML =
        `<span class="cp-dot" style="background:${cur.color}"></span> ${cur.name}`;
    }
  },

  // ---------- 按钮状态 ----------
  setButtons({ roll = false, buy = false, skip = false, upgrade = false, bail = false, endTurn = false }) {
    this.els.btnRoll.disabled = !roll;
    this.els.btnBuy.disabled = !buy;
    this.els.btnSkip.disabled = !skip;
    this.els.btnUpgrade.disabled = !upgrade;
    this.els.btnBail.disabled = !bail;
    this.els.btnEndTurn.disabled = !endTurn;
  },

  // ---------- 日志 ----------
  log(html) {
    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerHTML = html;
    this.els.logPanel.appendChild(line);
    this.els.logPanel.scrollTop = this.els.logPanel.scrollHeight;
  },

  // ---------- 弹窗 ----------
  showPopup(title, bodyHtml) {
    this.els.popupTitle.textContent = title;
    this.els.popupBody.innerHTML = bodyHtml;
    this.els.popup.classList.remove('hidden');
  },

  // 弹窗（Promise 版，点击确定后 resolve）
  showPopupAsync(title, bodyHtml) {
    return new Promise(resolve => {
      this.showPopup(title, bodyHtml);
      this.els.popupBtn.onclick = () => {
        this.els.popup.classList.add('hidden');
        resolve();
      };
    });
  },

  // ---------- 结束界面 ----------
  showGameOver(winner) {
    this.els.winnerText.innerHTML =
      `🏆 <b style="color:${winner.color}">${winner.name}</b> 获得最终胜利！<br>最终资产：¥${winner.money}`;
    this.els.gameover.classList.remove('hidden');
  },

  // ---------- 格子信息提示 ----------
  showTileInfo(tileId) {
    const tile = BOARD.tiles[tileId];
    const tip = this.els.tileTip;
    let html = `<b>${tile.name}</b><br>`;
    if (tile.type === TILE_TYPE.PROPERTY) {
      const g = COLOR_GROUPS[tile.colorGroup];
      const ownerText = tile.owner !== null
        ? `<span style="color:${Game.players[tile.owner].color}">${Game.players[tile.owner].name}</span> 所有`
        : '无主';
      html += `色系：${g.name}<br>地价：¥${tile.price}<br>等级：${tile.level}/3<br>`
            + `过路费：¥${Property.calcRent(tile)}<br>状态：${ownerText}`;
    } else {
      const descs = {
        start: `经过奖励 ¥${PASS_START_BONUS}`,
        chance: '随机抽取一张机会卡',
        shop: '可购买道具（免过路费卡 ¥500）',
        tax: `需缴纳税款 ¥${tile.amount}`,
        jail: `停留 ${JAIL_TURNS} 回合，或支付 ¥${JAIL_FINE} 保释`,
        parking: '安全休息，无事发生'
      };
      html += descs[tile.type] || '';
    }
    tip.innerHTML = html;
    tip.classList.remove('hidden');
    clearTimeout(this._tipTimer);
    this._tipTimer = setTimeout(() => tip.classList.add('hidden'), 3000);
  }
};
