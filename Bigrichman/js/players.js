// ==================== 玩家系统 ====================

// 创建玩家对象
function createPlayer(id, name, color) {
  return {
    id,
    name: name || PLAYER_NAMES_DEFAULT[id],
    color,
    money: START_MONEY,
    position: 0,
    properties: [],   // 拥有的地皮 id
    items: [],        // 道具列表
    inJail: 0,        // 剩余监禁回合数
    bankrupt: false,
    tokenEl: null     // 棋子 DOM
  };
}

const Players = {
  // 资金变动（正数为获得，负数为支付），返回是否成功（资金不足返回 false）
  changeMoney(player, amount) {
    player.money += amount;
    UI.updatePlayersPanel();
    return player.money >= 0;
  },

  // 支付：资金不足时自动触发破产流程
  pay(payer, amount, receiver = null) {
    payer.money -= amount;
    if (receiver) receiver.money += amount;
    UI.updatePlayersPanel();

    if (payer.money < 0) {
      this.declareBankrupt(payer, receiver);
    }
  },

  // 宣布破产：地皮充公，棋子移除
  declareBankrupt(player, creditor = null) {
    player.bankrupt = true;
    player.money = 0;

    // 所有地皮回归无主
    player.properties.forEach(tileId => {
      const tile = BOARD.tiles[tileId];
      tile.owner = null;
      tile.level = 0;
      BOARD.updateTile(tileId);
    });
    player.properties = [];
    player.items = [];

    // 若因欠其他玩家钱破产，剩余资产转移（此处简化为地皮充公、现金已为 0）
    UI.log(`💀 <b style="color:${player.color}">${player.name}</b> 破产出局！`);
    UI.showPopup('破产通知', `<b style="color:${player.color}">${player.name}</b> 资金耗尽，破产出局！<br>其名下所有地皮回归无主。`);

    if (player.tokenEl) player.tokenEl.remove();
    UI.updatePlayersPanel();
  },

  // 当前存活玩家
  alivePlayers(players) {
    return players.filter(p => !p.bankrupt);
  }
};
