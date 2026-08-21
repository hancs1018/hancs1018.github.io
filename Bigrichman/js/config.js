// ==================== 全局常量配置 ====================

// 经济参数
const START_MONEY = 15000;      // 初始资金
const PASS_START_BONUS = 2000;  // 经过/停留起点奖励
const JAIL_FINE = 500;          // 监狱保释金
const JAIL_TURNS = 1;           // 监禁回合数

// 色系定义：颜色 / 地价 / 基础过路费 / 每级升级费 / 每级过路费倍率
const COLOR_GROUPS = {
  brown:     { name: '棕色', color: '#8b5a2b', price: 600,  baseRent: 60,  upgradeCost: 500,  rentMultiplier: 2 },
  lightblue: { name: '浅蓝', color: '#4fc3f7', price: 1000, baseRent: 100, upgradeCost: 500,  rentMultiplier: 2 },
  pink:      { name: '粉色', color: '#ec407a', price: 1400, baseRent: 140, upgradeCost: 1000, rentMultiplier: 2 },
  orange:    { name: '橙色', color: '#ff9f1c', price: 1800, baseRent: 180, upgradeCost: 1000, rentMultiplier: 2 },
  red:       { name: '红色', color: '#e53935', price: 2200, baseRent: 220, upgradeCost: 1500, rentMultiplier: 2 }
};
const GROUP_RENT_BONUS = 1.5; // 集齐同色系全部地皮时过路费加成倍率

// 玩家配色
const PLAYER_COLORS = ['#ff0055', '#2979ff', '#00e676', '#ffd600'];
const PLAYER_NAMES_DEFAULT = ['玩家1', '玩家2', '玩家3', '玩家4'];

// 动画时长（毫秒）
const ANIM = {
  diceRoll: 900,     // 骰子滚动总时长
  diceFrame: 60,     // 骰子每帧间隔
  moveStep: 220,     // 棋子每格移动耗时
  popupDelay: 300    // 弹窗弹出前延迟
};

// 格子类型标识
const TILE_TYPE = {
  START: 'start',
  PROPERTY: 'property',
  CHANCE: 'chance',
  SHOP: 'shop',
  TAX: 'tax',
  JAIL: 'jail',
  PARKING: 'parking'
};
