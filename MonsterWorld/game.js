const stages = [
    {
        needKills: 4,
        monsterLevels: [2, 4, 6, 8, 10, 14, 18, 26],
        unbeatableMonsterLevels: [120, 180],
        weaponLevels: [3, 5, 7],
        layout: [
            ['P', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
            ['.', '#', '.', '#', '.', '#', '.', '#', '.', '.'],
            ['.', '#', '.', '.', '.', '#', '.', '.', '.', '.'],
            ['.', '#', '#', '#', '.', '#', '#', '#', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
            ['#', '.', '#', '.', '#', '#', '.', '#', '.', '.'],
            ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.'],
            ['.', '#', '#', '#', '.', '#', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '#', '.', '#', '.', '.'],
            ['.', '#', '.', '.', '.', '.', '.', '.', '.', 'E']
        ]
    },
    {
        needKills: 5,
        monsterLevels: [12, 16, 20, 24, 28, 34, 42, 56],
        unbeatableMonsterLevels: [260, 320],
        weaponLevels: [6, 8, 10],
        layout: [
            ['P', '.', '.', '.', '#', '.', '.', '#', '.', '.'],
            ['.', '#', '#', '.', '#', '.', '#', '#', '.', '.'],
            ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
            ['#', '#', '.', '#', '#', '#', '.', '#', '#', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '#', '.'],
            ['.', '#', '#', '#', '.', '#', '#', '.', '#', '.'],
            ['.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
            ['.', '#', '.', '#', '#', '#', '.', '#', '#', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '#', '#', '.', '#', '.', '#', '.', '.', 'E']
        ]
    },
    {
        needKills: 6,
        monsterLevels: [30, 36, 42, 48, 56, 64, 78, 96],
        unbeatableMonsterLevels: [420, 560],
        weaponLevels: [10, 12, 15],
        layout: [
            ['P', '.', '#', '.', '.', '.', '#', '.', '.', '.'],
            ['.', '.', '#', '.', '#', '.', '#', '.', '#', '.'],
            ['#', '.', '#', '.', '#', '.', '.', '.', '#', '.'],
            ['#', '.', '.', '.', '#', '#', '#', '.', '#', '.'],
            ['.', '.', '#', '.', '.', '.', '.', '.', '#', '.'],
            ['.', '#', '#', '#', '#', '.', '#', '.', '#', '.'],
            ['.', '.', '.', '.', '#', '.', '#', '.', '.', '.'],
            ['#', '#', '.', '#', '#', '.', '#', '#', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
            ['.', '#', '.', '#', '.', '#', '.', '.', '.', 'E']
        ]
    },
    {
        needKills: 7,
        monsterLevels: [70, 80, 92, 104, 118, 136, 160, 210],
        unbeatableMonsterLevels: [900, 1200, 1500],
        weaponLevels: [16, 20, 24],
        layout: [
            ['P', '.', '.', '#', '.', '.', '.', '.', '#', '.'],
            ['#', '#', '.', '#', '.', '#', '#', '.', '#', '.'],
            ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
            ['.', '#', '#', '#', '#', '.', '#', '#', '#', '.'],
            ['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '#', '#', '.', '#', '#', '#', '.', '#', '.'],
            ['.', '.', '.', '.', '#', '.', '.', '.', '#', '.'],
            ['#', '#', '.', '#', '#', '.', '#', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '#', '.', '#', '.'],
            ['.', '#', '#', '.', '#', '.', '.', '.', '.', 'E']
        ]
    },
    {
        needKills: 8,
        monsterLevels: [180, 210, 240, 280, 320, 380, 460, 600],
        unbeatableMonsterLevels: [2500, 3200, 4000],
        weaponLevels: [28, 34, 40],
        layout: [
            ['P', '.', '#', '.', '.', '#', '.', '.', '#', '.'],
            ['.', '.', '#', '.', '#', '#', '.', '#', '.', '.'],
            ['.', '#', '.', '.', '#', '.', '.', '#', '.', '.'],
            ['.', '#', '#', '.', '#', '.', '#', '#', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
            ['#', '.', '#', '#', '#', '.', '#', '.', '#', '.'],
            ['.', '.', '#', '.', '.', '.', '.', '.', '#', '.'],
            ['.', '#', '#', '.', '#', '#', '#', '.', '#', '.'],
            ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
            ['.', '#', '.', '.', '.', '.', '#', '.', '.', 'E']
        ]
    },
    {
        needKills: 8,
        monsterLevels: [360, 420, 500, 620, 760, 900, 1100, 1400],
        unbeatableMonsterLevels: [7000, 9000, 12000],
        weaponLevels: [45, 55, 70],
        layout: [
            ['P', '.', '.', '#', '.', '.', '#', '.', '.', '.'],
            ['.', '#', '.', '#', '.', '#', '.', '#', '#', '.'],
            ['.', '#', '.', '.', '.', '#', '.', '.', '.', '.'],
            ['.', '#', '#', '#', '.', '#', '#', '#', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
            ['#', '.', '#', '.', '#', '#', '.', '#', '.', '.'],
            ['.', '.', '#', '.', '.', '.', '.', '#', '.', '.'],
            ['.', '#', '#', '#', '.', '#', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '#', '.', '#', '.', '.'],
            ['.', '#', '.', '.', '.', '.', '.', '.', '.', 'E']
        ]
    },
    {
        needKills: 8,
        monsterLevels: [700, 820, 980, 1160, 1380, 1620, 1900, 2300],
        unbeatableMonsterLevels: [16000, 22000, 30000],
        weaponLevels: [80, 95, 110],
        layout: [
            ['P', '.', '#', '.', '.', '.', '#', '.', '.', '.'],
            ['.', '.', '#', '.', '#', '.', '#', '.', '#', '.'],
            ['#', '.', '#', '.', '#', '.', '.', '.', '#', '.'],
            ['#', '.', '.', '.', '#', '#', '#', '.', '#', '.'],
            ['.', '.', '#', '.', '.', '.', '.', '.', '#', '.'],
            ['.', '#', '#', '#', '#', '.', '#', '.', '#', '.'],
            ['.', '.', '.', '.', '#', '.', '#', '.', '.', '.'],
            ['#', '#', '.', '#', '#', '.', '#', '#', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
            ['.', '#', '.', '#', '.', '#', '.', '.', '.', 'E']
        ]
    },
    {
        needKills: 8,
        monsterLevels: [1300, 1500, 1750, 2050, 2380, 2750, 3200, 3800],
        unbeatableMonsterLevels: [40000, 52000, 68000],
        weaponLevels: [130, 150, 180],
        layout: [
            ['P', '.', '.', '#', '.', '.', '.', '.', '#', '.'],
            ['#', '#', '.', '#', '.', '#', '#', '.', '#', '.'],
            ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.'],
            ['.', '#', '#', '#', '#', '.', '#', '#', '#', '.'],
            ['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '#', '#', '.', '#', '#', '#', '.', '#', '.'],
            ['.', '.', '.', '.', '#', '.', '.', '.', '#', '.'],
            ['#', '#', '.', '#', '#', '.', '#', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '#', '.', '#', '.'],
            ['.', '#', '#', '.', '#', '.', '.', '.', '.', 'E']
        ]
    }
];

const state = {
    map: [],
    currentStage: 0,
    stageKills: 0,
    started: false,
    gameOver: false,
    player: { x: 0, y: 0, level: 3, kills: 0, weapons: 0 }
};

const levelEl = document.getElementById('level');
const stageEl = document.getElementById('stage');
const goalEl = document.getElementById('goal');
const killsEl = document.getElementById('kills');
const weaponsEl = document.getElementById('weapons');
const mapEl = document.getElementById('map');
const logList = document.getElementById('log-list');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');
const winRestartBtn = document.getElementById('win-restart-btn');
const loseRestartBtn = document.getElementById('lose-restart-btn');
const startScreen = document.getElementById('start-screen');
const winScreen = document.getElementById('win-screen');
const loseScreen = document.getElementById('lose-screen');
const winSummary = document.getElementById('win-summary');
const loseSummary = document.getElementById('lose-summary');

function getStageConfig() {
    return stages[state.currentStage];
}

function addLog(text) {
    const div = document.createElement('div');
    div.className = 'log-item';
    div.textContent = text;
    logList.prepend(div);
}

function deepCopyLayout(stageIndex) {
    return stages[stageIndex].layout.map(row => [...row]);
}

function collectEmptyTiles(map) {
    const positions = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === '.') {
                positions.push({ x, y });
            }
        }
    }
    return positions;
}

function findTile(map, target) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === target) {
                return { x, y };
            }
        }
    }
    return null;
}

function getNeighbors(x, y, map) {
    return [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 }
    ].filter(({ x: nx, y: ny }) => ny >= 0 && ny < map.length && nx >= 0 && nx < map[0].length);
}

function simulateStageClear(map, stageConfig, startLevel) {
    const simMap = map.map(row => [...row]);
    const playerPos = findTile(simMap, 'P');
    const exitPos = findTile(simMap, 'E');
    if (!playerPos || !exitPos) return false;

    let level = startLevel;
    let kills = 0;
    let changed = true;
    const visited = new Set();

    while (changed) {
        changed = false;
        const queue = [{ x: playerPos.x, y: playerPos.y }];
        const reachable = new Set([`${playerPos.x},${playerPos.y}`]);

        while (queue.length) {
            const current = queue.shift();
            for (const next of getNeighbors(current.x, current.y, simMap)) {
                const key = `${next.x},${next.y}`;
                if (reachable.has(key)) continue;
                const cell = simMap[next.y][next.x];
                if (cell === '#') continue;
                if (isUnbeatableMonster(cell)) continue;
                if (typeof cell === 'string' && cell.startsWith('M') && level <= getCellLevel(cell)) continue;
                reachable.add(key);
                queue.push(next);
            }
        }

        for (const key of reachable) {
            if (visited.has(key)) continue;
            visited.add(key);
            const [x, y] = key.split(',').map(Number);
            const cell = simMap[y][x];

            if (isWeapon(cell)) {
                level += getCellLevel(cell);
                simMap[y][x] = '.';
                changed = true;
            } else if (typeof cell === 'string' && cell.startsWith('M')) {
                level += getCellLevel(cell);
                kills += 1;
                simMap[y][x] = '.';
                changed = true;
            }
        }

        if (kills >= stageConfig.needKills && reachable.has(`${exitPos.x},${exitPos.y}`)) {
            return true;
        }
    }

    return false;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function placeEntitiesRandomly(map, monsterLevels, unbeatableMonsterLevels, weaponLevels) {
    const emptyTiles = shuffle(collectEmptyTiles(map));
    let index = 0;

    monsterLevels.forEach((level) => {
        const pos = emptyTiles[index++];
        map[pos.y][pos.x] = `M${level}`;
    });

    unbeatableMonsterLevels.forEach((level) => {
        const pos = emptyTiles[index++];
        map[pos.y][pos.x] = `X${level}`;
    });

    weaponLevels.forEach((level) => {
        const pos = emptyTiles[index++];
        map[pos.y][pos.x] = `W${level}`;
    });
}

function createStageMap(stageIndex) {
    const config = stages[stageIndex];

    for (let attempt = 0; attempt < 200; attempt++) {
        const map = deepCopyLayout(stageIndex);
        placeEntitiesRandomly(map, config.monsterLevels, config.unbeatableMonsterLevels, config.weaponLevels);
        if (simulateStageClear(map, config, state.player.level)) {
            return map;
        }
    }

    const fallbackMap = deepCopyLayout(stageIndex);
    const safeTiles = collectEmptyTiles(fallbackMap);
    const normalTiles = safeTiles.slice(0, config.monsterLevels.length + config.weaponLevels.length);
    const dangerTiles = safeTiles.slice(config.monsterLevels.length + config.weaponLevels.length);

    config.monsterLevels.forEach((level, index) => {
        const pos = normalTiles[index];
        fallbackMap[pos.y][pos.x] = `M${level}`;
    });

    config.weaponLevels.forEach((level, index) => {
        const pos = normalTiles[config.monsterLevels.length + index];
        fallbackMap[pos.y][pos.x] = `W${level}`;
    });

    config.unbeatableMonsterLevels.forEach((level, index) => {
        const pos = dangerTiles[index];
        if (pos) {
            fallbackMap[pos.y][pos.x] = `X${level}`;
        }
    });

    return fallbackMap;
}

function findPlayer() {
    for (let y = 0; y < state.map.length; y++) {
        for (let x = 0; x < state.map[y].length; x++) {
            if (state.map[y][x] === 'P') {
                state.player.x = x;
                state.player.y = y;
                return;
            }
        }
    }
}

function isMonster(cell) {
    return typeof cell === 'string' && (cell.startsWith('M') || cell.startsWith('X'));
}

function isWeapon(cell) {
    return typeof cell === 'string' && cell.startsWith('W');
}

function isUnbeatableMonster(cell) {
    return typeof cell === 'string' && cell.startsWith('X');
}

function getCellLevel(cell) {
    return Number(cell.slice(1));
}

function renderHud() {
    const stageConfig = getStageConfig();
    levelEl.textContent = state.player.level;
    stageEl.textContent = `${state.currentStage + 1} / ${stages.length}`;
    goalEl.textContent = `${state.stageKills} / ${stageConfig.needKills}`;
    killsEl.textContent = state.player.kills;
    weaponsEl.textContent = state.player.weapons;
}

function renderMap() {
    mapEl.innerHTML = '';

    state.map.forEach((row) => {
        row.forEach((cell) => {
            const tile = document.createElement('div');
            tile.className = 'tile';

            if (cell === '#') {
                tile.classList.add('wall');
                tile.textContent = '墙';
            } else if (cell === 'P') {
                tile.classList.add('player');
                tile.textContent = `勇${state.player.level}`;
                tile.title = `勇者 Lv.${state.player.level}`;
            } else if (isMonster(cell)) {
                const level = getCellLevel(cell);
                tile.classList.add('monster');
                if (isUnbeatableMonster(cell)) {
                    tile.classList.add('dead-monster');
                    tile.textContent = '死怪';
                    tile.title = '必死怪';
                } else {
                    tile.textContent = `怪${level}`;
                    tile.title = `怪物 Lv.${level}`;
                }
            } else if (isWeapon(cell)) {
                const level = getCellLevel(cell);
                tile.classList.add('weapon');
                tile.textContent = `武${level}`;
                tile.title = `武器 Lv.${level}`;
            } else if (cell === 'E') {
                tile.classList.add('exit');
                tile.textContent = '门';
                tile.title = '达标后可进入';
            } else {
                tile.classList.add('floor');
            }

            mapEl.appendChild(tile);
        });
    });
}

function render() {
    renderHud();
    renderMap();
}

function movePlayer(nx, ny) {
    state.map[state.player.y][state.player.x] = '.';
    state.player.x = nx;
    state.player.y = ny;
    state.map[ny][nx] = 'P';
}

function fightMonster(nx, ny) {
    const cell = state.map[ny][nx];
    const monsterLevel = getCellLevel(cell);

    if (isUnbeatableMonster(cell)) {
        state.gameOver = true;
        addLog(`你碰到了必死怪 ${monsterLevel} 级，无论如何都打不过。`);
        showLoseScreen(monsterLevel);
        return;
    }

    if (state.player.level > monsterLevel) {
        state.player.level += monsterLevel;
        state.player.kills += 1;
        state.stageKills += 1;
        addLog(`你击败了 ${monsterLevel} 级怪物，当前等级 ${state.player.level}。`);
        movePlayer(nx, ny);
        return;
    }

    state.gameOver = true;
    addLog(`你碰到了 ${monsterLevel} 级怪物，等级不够，直接死亡。`);
    showLoseScreen(monsterLevel);
}

function pickWeapon(nx, ny) {
    const weaponLevel = getCellLevel(state.map[ny][nx]);
    state.player.level += weaponLevel;
    state.player.weapons += 1;
    addLog(`你获得了 ${weaponLevel} 级武器，当前等级 ${state.player.level}。`);
    movePlayer(nx, ny);
}

function loadStage(stageIndex) {
    state.currentStage = stageIndex;
    state.stageKills = 0;
    state.map = createStageMap(stageIndex);
    state.gameOver = false;
    findPlayer();
    render();
}

function showWinScreen() {
    winSummary.textContent = `最终等级 ${state.player.level}，共击败 ${state.player.kills} 只怪物，拿到 ${state.player.weapons} 次武器。`;
    winScreen.classList.remove('hidden');
}

function showLoseScreen(monsterLevel) {
    loseSummary.textContent = `你当前等级 ${state.player.level}，碰到了 ${monsterLevel} 级怪物。`;
    document.body.classList.remove('danger');
    void document.body.offsetWidth;
    document.body.classList.add('danger');
    loseScreen.classList.remove('hidden');
}

function handleExit(nx, ny) {
    const stageConfig = getStageConfig();

    if (state.stageKills < stageConfig.needKills) {
        addLog(`本关还需击败 ${stageConfig.needKills - state.stageKills} 只怪物，不能进门。`);
        return;
    }

    movePlayer(nx, ny);

    if (state.currentStage === stages.length - 1) {
        state.gameOver = true;
        addLog('你通过了最后一关，获得胜利！');
        render();
        showWinScreen();
        return;
    }

    const nextStage = state.currentStage + 1;
    addLog(`通过第 ${state.currentStage + 1} 关，进入第 ${nextStage + 1} 关。`);
    loadStage(nextStage);
}

function tryMove(dx, dy) {
    if (!state.started || state.gameOver) return;

    const nx = state.player.x + dx;
    const ny = state.player.y + dy;

    if (ny < 0 || ny >= state.map.length || nx < 0 || nx >= state.map[0].length) return;

    const target = state.map[ny][nx];

    if (target === '#') {
        addLog('前面是墙，不能通过。');
        return;
    }

    if (isMonster(target)) {
        fightMonster(nx, ny);
        render();
        return;
    }

    if (isWeapon(target)) {
        pickWeapon(nx, ny);
        render();
        return;
    }

    if (target === 'E') {
        handleExit(nx, ny);
        return;
    }

    movePlayer(nx, ny);
    render();
}

function handleKeydown(event) {
    const keyMap = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0]
    };

    if (!keyMap[event.key]) return;
    event.preventDefault();
    const [dx, dy] = keyMap[event.key];
    tryMove(dx, dy);
}

function resetPlayer() {
    state.player.level = 3;
    state.player.kills = 0;
    state.player.weapons = 0;
}

function startGame() {
    state.started = true;
    state.gameOver = false;
    state.currentStage = 0;
    startScreen.classList.add('hidden');
    winScreen.classList.add('hidden');
    loseScreen.classList.add('hidden');
    logList.innerHTML = '';
    resetPlayer();
    addLog('冒险开始，你当前是 3 级，第 1 关开始。');
    loadStage(0);
}

function restart() {
    startGame();
}

document.addEventListener('keydown', handleKeydown);
restartBtn.addEventListener('click', restart);
startBtn.addEventListener('click', startGame);
winRestartBtn.addEventListener('click', startGame);
loseRestartBtn.addEventListener('click', startGame);

render();
