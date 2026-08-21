// ==================== 棋盘数据与渲染 ====================

// 32 格环形棋盘：上 9 / 右 7 / 下 9 / 左 7（含四角）
// 索引从左上角「起点」开始顺时针递增
const BOARD_TILES = [
  // ---------- 上边（0~8，左→右） ----------
  { id: 0,  name: '起点',       type: TILE_TYPE.START },
  { id: 1,  name: '老街',       type: TILE_TYPE.PROPERTY, colorGroup: 'brown' },
  { id: 2,  name: '机会',       type: TILE_TYPE.CHANCE },
  { id: 3,  name: '巷尾',       type: TILE_TYPE.PROPERTY, colorGroup: 'brown' },
  { id: 4,  name: '所得税',     type: TILE_TYPE.TAX, amount: 1000 },
  { id: 5,  name: '河滨路',     type: TILE_TYPE.PROPERTY, colorGroup: 'brown' },
  { id: 6,  name: '道具店',     type: TILE_TYPE.SHOP },
  { id: 7,  name: '灯塔街',     type: TILE_TYPE.PROPERTY, colorGroup: 'brown' },
  { id: 8,  name: '监狱',       type: TILE_TYPE.JAIL },
  // ---------- 右边（9~15，上→下） ----------
  { id: 9,  name: '蓝湾道',     type: TILE_TYPE.PROPERTY, colorGroup: 'lightblue' },
  { id: 10, name: '机会',       type: TILE_TYPE.CHANCE },
  { id: 11, name: '海风街',     type: TILE_TYPE.PROPERTY, colorGroup: 'lightblue' },
  { id: 12, name: '免费停车',   type: TILE_TYPE.PARKING },
  { id: 13, name: '浪花巷',     type: TILE_TYPE.PROPERTY, colorGroup: 'lightblue' },
  { id: 14, name: '道具店',     type: TILE_TYPE.SHOP },
  { id: 15, name: '珊瑚路',     type: TILE_TYPE.PROPERTY, colorGroup: 'lightblue' },
  // ---------- 下边（16~24，右→左） ----------
  { id: 16, name: '樱花大道',   type: TILE_TYPE.PROPERTY, colorGroup: 'pink' },
  { id: 17, name: '机会',       type: TILE_TYPE.CHANCE },
  { id: 18, name: '桃源街',     type: TILE_TYPE.PROPERTY, colorGroup: 'pink' },
  { id: 19, name: '消费税',     type: TILE_TYPE.TAX, amount: 2000 },
  { id: 20, name: '蜜糖巷',     type: TILE_TYPE.PROPERTY, colorGroup: 'pink' },
  { id: 21, name: '入狱',       type: TILE_TYPE.JAIL },
  { id: 22, name: '日落大道',   type: TILE_TYPE.PROPERTY, colorGroup: 'orange' },
  { id: 23, name: '机会',       type: TILE_TYPE.CHANCE },
  { id: 24, name: '金沙街',     type: TILE_TYPE.PROPERTY, colorGroup: 'orange' },
  // ---------- 左边（25~31，下→上） ----------
  { id: 25, name: '橙堡路',     type: TILE_TYPE.PROPERTY, colorGroup: 'orange' },
  { id: 26, name: '命运',       type: TILE_TYPE.CHANCE },
  { id: 27, name: '枫叶巷',     type: TILE_TYPE.PROPERTY, colorGroup: 'orange' },
  { id: 28, name: '烈焰大道',   type: TILE_TYPE.PROPERTY, colorGroup: 'red' },
  { id: 29, name: '豪华税',     type: TILE_TYPE.TAX, amount: 2000 },
  { id: 30, name: '钻石街',     type: TILE_TYPE.PROPERTY, colorGroup: 'red' },
  { id: 31, name: '王者之路',   type: TILE_TYPE.PROPERTY, colorGroup: 'red' }
];

const BOARD = {
  tiles: [],      // 运行时格子状态（含 owner/level）
  tileEls: [],    // 格子 DOM 元素

  // 初始化运行时状态
  init() {
    this.tiles = BOARD_TILES.map(t => ({
      ...t,
      owner: null,
      level: 0,
      // 地皮补充经济参数
      ...(t.type === TILE_TYPE.PROPERTY ? {
        price: COLOR_GROUPS[t.colorGroup].price,
        baseRent: COLOR_GROUPS[t.colorGroup].baseRent,
        upgradeCost: COLOR_GROUPS[t.colorGroup].upgradeCost
      } : {})
    }));
  },

  // 计算格子在棋盘网格中的位置（9x9 网格，四周放格子）
  // 返回 { row, col }（1-based）
  getGridPos(id) {
    if (id <= 8)  return { row: 1, col: id + 1 };          // 上边：0~8 → col 1~9（左→右）
    if (id <= 15) return { row: id - 7, col: 9 };          // 右边：9~15 → row 2~8（上→下）
    if (id <= 24) return { row: 9, col: 25 - id };         // 下边：16~24 → col 9~1（右→左）
    return { row: 33 - id, col: 1 };                       // 左边：25~31 → row 8~2（下→上）
  },

  // 获取格子的像素坐标（用于棋子定位），相对棋盘容器
  getTileCenter(id) {
    const el = this.tileEls[id];
    if (!el) return { x: 0, y: 0 };
    return {
      x: el.offsetLeft + el.offsetWidth / 2,
      y: el.offsetTop + el.offsetHeight / 2
    };
  },

  // 渲染棋盘到容器
  render(container) {
    container.innerHTML = '';
    this.tileEls = [];
    this.tiles.forEach(tile => {
      const el = document.createElement('div');
      el.className = `tile tile-${tile.type}`;
      el.dataset.id = tile.id;
      const pos = this.getGridPos(tile.id);
      el.style.gridRow = pos.row;
      el.style.gridColumn = pos.col;

      let inner = '';
      if (tile.type === TILE_TYPE.PROPERTY) {
        inner = `
          <div class="tile-color" style="background:${COLOR_GROUPS[tile.colorGroup].color}"></div>
          <div class="tile-name">${tile.name}</div>
          <div class="tile-price">¥${tile.price}</div>
          <div class="tile-level"></div>
          <div class="tile-owner"></div>`;
      } else {
        const icons = {
          start: '🏁', chance: '❓', shop: '🛒',
          tax: '💸', jail: '🚔', parking: '🅿️'
        };
        inner = `
          <div class="tile-icon">${icons[tile.type] || ''}</div>
          <div class="tile-name">${tile.name}</div>
          ${tile.type === TILE_TYPE.TAX ? `<div class="tile-price">-¥${tile.amount}</div>` : ''}`;
      }
      el.innerHTML = inner;
      el.addEventListener('click', () => UI.showTileInfo(tile.id));
      container.appendChild(el);
      this.tileEls[tile.id] = el;
    });
  },

  // 更新某个格子的视觉状态（归属、等级）
  updateTile(id) {
    const tile = this.tiles[id];
    const el = this.tileEls[id];
    if (!el || tile.type !== TILE_TYPE.PROPERTY) return;

    const ownerEl = el.querySelector('.tile-owner');
    const levelEl = el.querySelector('.tile-level');

    if (tile.owner !== null) {
      ownerEl.style.background = Game.players[tile.owner].color;
    } else {
      ownerEl.style.background = 'transparent';
    }
    // 用像素小方块表示等级：■ ■■ ■■■
    levelEl.textContent = tile.level > 0 ? '■'.repeat(tile.level) : '';
  },

  // 刷新所有地皮格子
  refreshAll() {
    this.tiles.forEach(t => { if (t.type === TILE_TYPE.PROPERTY) this.updateTile(t.id); });
  }
};
