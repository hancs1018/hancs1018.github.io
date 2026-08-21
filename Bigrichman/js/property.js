// ==================== 地产系统 ====================

const Property = {
  // 计算过路费：基础租金 × 倍率^等级 × （同色系加成）
  calcRent(tile) {
    if (tile.type !== TILE_TYPE.PROPERTY || tile.owner === null) return 0;
    const group = COLOR_GROUPS[tile.colorGroup];
    let rent = tile.baseRent * Math.pow(group.rentMultiplier, tile.level);
    if (this.ownsFullGroup(Game.players[tile.owner], tile.colorGroup)) {
      rent = Math.round(rent * GROUP_RENT_BONUS);
    }
    return rent;
  },

  // 是否集齐同色系全部地皮
  ownsFullGroup(player, colorGroup) {
    const groupTiles = BOARD.tiles.filter(t => t.colorGroup === colorGroup);
    return groupTiles.every(t => t.owner === player.id);
  },

  // 购买地皮
  buy(player, tileId) {
    const tile = BOARD.tiles[tileId];
    if (tile.owner !== null || player.money < tile.price) return false;

    Players.changeMoney(player, -tile.price);
    tile.owner = player.id;
    player.properties.push(tileId);
    BOARD.updateTile(tileId);
    UI.log(`🏠 <b style="color:${player.color}">${player.name}</b> 购买了 <b>${tile.name}</b>（¥${tile.price}）`);
    return true;
  },

  // 升级地皮（+1 级，最高 3 级）
  upgrade(player, tileId) {
    const tile = BOARD.tiles[tileId];
    if (tile.owner !== player.id || tile.level >= 3) return false;
    if (player.money < tile.upgradeCost) return false;

    Players.changeMoney(player, -tile.upgradeCost);
    tile.level++;
    BOARD.updateTile(tileId);
    UI.log(`🔨 <b style="color:${player.color}">${player.name}</b> 升级了 <b>${tile.name}</b> 至 ${tile.level} 级`);
    return true;
  },

  // 支付过路费（含免过路费道具判定）
  payRent(player, tile) {
    const owner = Game.players[tile.owner];
    // 免过路费卡判定
    const shieldIdx = player.items.indexOf('rent_shield');
    if (shieldIdx !== -1) {
      player.items.splice(shieldIdx, 1);
      UI.log(`🛡️ <b style="color:${player.color}">${player.name}</b> 使用了免过路费卡，跳过 ¥${this.calcRent(tile)} 过路费`);
      UI.updatePlayersPanel();
      return;
    }
    const rent = this.calcRent(tile);
    UI.log(`💰 <b style="color:${player.color}">${player.name}</b> 向 <b style="color:${owner.color}">${owner.name}</b> 支付过路费 ¥${rent}（${tile.name} ${tile.level}级）`);
    Players.pay(player, rent, owner);
  }
};
