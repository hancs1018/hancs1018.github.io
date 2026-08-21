// ==================== 机会卡 / 命运卡事件池 ====================

// 每个事件：{ title, desc, apply(player) }，apply 可返回 Promise（需要移动动画时）
const CHANCE_EVENTS = [
  {
    title: '银行分红',
    desc: '你的投资获得了回报！',
    money: 1000,
    apply(player) { Players.changeMoney(player, this.money); }
  },
  {
    title: '税务稽查',
    desc: '补交税款 ¥800。',
    apply(player) { Players.pay(player, 800); }
  },
  {
    title: '天降横财',
    desc: '捡到钱包，获得 ¥2000！',
    apply(player) { Players.changeMoney(player, 2000); }
  },
  {
    title: '房屋维修',
    desc: '你的房产需要修缮，每级升级支付 ¥300。',
    apply(player) {
      const totalLevel = player.properties.reduce((s, id) => s + BOARD.tiles[id].level, 0);
      const cost = totalLevel * 300;
      if (cost > 0) {
        UI.log(`🔧 维修费：共 ${totalLevel} 级升级，需支付 ¥${cost}`);
        Players.pay(player, cost);
      } else {
        UI.log(`🔧 没有需要维修的房产，虚惊一场！`);
      }
    }
  },
  {
    title: '大步向前',
    desc: '前进 3 格。',
    async apply(player) {
      await Game.movePlayer(player, 3);
    }
  },
  {
    title: '衣锦还乡',
    desc: '回到起点，领取 ¥2000 奖励！',
    async apply(player) {
      const steps = (BOARD.tiles.length - player.position) % BOARD.tiles.length;
      await Game.movePlayer(player, steps === 0 ? BOARD.tiles.length : steps);
    }
  },
  {
    title: '免过路费卡',
    desc: '获得道具：下次免付过路费。',
    apply(player) {
      player.items.push('rent_shield');
      UI.updatePlayersPanel();
    }
  },
  {
    title: '全体收租',
    desc: '其他玩家各支付你 ¥500！',
    apply(player) {
      Game.players.forEach(p => {
        if (p.id !== player.id && !p.bankrupt) Players.pay(p, 500, player);
      });
    }
  },
  {
    title: '乐极生悲',
    desc: '乐极生悲！直接入狱。',
    async apply(player) {
      await Game.sendToJail(player);
    }
  },
  {
    title: '慈善晚宴',
    desc: '向每位玩家捐赠 ¥200。',
    apply(player) {
      Game.players.forEach(p => {
        if (p.id !== player.id && !p.bankrupt) Players.pay(player, 200, p);
      });
    }
  }
];

const Events = {
  // 随机抽取一张机会卡并执行
  async draw(player) {
    const event = CHANCE_EVENTS[Math.floor(Math.random() * CHANCE_EVENTS.length)];
    UI.log(`❓ <b style="color:${player.color}">${player.name}</b> 抽中机会卡【${event.title}】`);
    await UI.showPopupAsync(`❓ ${event.title}`, event.desc);
    await event.apply(player);
    UI.updatePlayersPanel();
  }
};
