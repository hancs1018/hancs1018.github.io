const monsters = [
    { name: '史莱姆', hp: 45, atk: 6, reward: 12 },
    { name: '骷髅兵', hp: 65, atk: 9, reward: 18 },
    { name: '狼人', hp: 90, atk: 12, reward: 25 },
    { name: '熔岩巨兽', hp: 130, atk: 16, reward: 35 },
    { name: '暗影魔王', hp: 180, atk: 22, reward: 50 }
];

const state = {
    player: {
        maxHp: 100,
        hp: 100,
        atk: 12,
        gold: 0,
        potions: 3
    },
    monsterIndex: 0,
    monster: null,
    gameOver: false
};

const els = {
    playerHpBar: document.getElementById('player-hp-bar'),
    playerHpText: document.getElementById('player-hp-text'),
    playerAtk: document.getElementById('player-atk'),
    playerGold: document.getElementById('player-gold'),
    playerPotion: document.getElementById('player-potion'),
    monsterName: document.getElementById('monster-name'),
    monsterHpBar: document.getElementById('monster-hp-bar'),
    monsterHpText: document.getElementById('monster-hp-text'),
    monsterLevel: document.getElementById('monster-level'),
    monsterAtk: document.getElementById('monster-atk'),
    monsterReward: document.getElementById('monster-reward'),
    logList: document.getElementById('log-list'),
    attackBtn: document.getElementById('attack-btn'),
    healBtn: document.getElementById('heal-btn'),
    upgradeBtn: document.getElementById('upgrade-btn'),
    restartBtn: document.getElementById('restart-btn')
};

function cloneMonster(index) {
    const base = monsters[index];
    return { ...base, maxHp: base.hp, hp: base.hp };
}

function addLog(text, highlight = false) {
    const item = document.createElement('div');
    item.className = `log-item${highlight ? ' highlight' : ''}`;
    item.textContent = text;
    els.logList.prepend(item);
}

function updateBars() {
    const playerRate = Math.max(0, state.player.hp) / state.player.maxHp * 100;
    const monsterRate = Math.max(0, state.monster.hp) / state.monster.maxHp * 100;

    els.playerHpBar.style.width = `${playerRate}%`;
    els.monsterHpBar.style.width = `${monsterRate}%`;
}

function render() {
    els.playerHpText.textContent = `${Math.max(0, state.player.hp)} / ${state.player.maxHp}`;
    els.playerAtk.textContent = state.player.atk;
    els.playerGold.textContent = state.player.gold;
    els.playerPotion.textContent = state.player.potions;

    els.monsterName.textContent = state.monster.name;
    els.monsterHpText.textContent = `${Math.max(0, state.monster.hp)} / ${state.monster.maxHp}`;
    els.monsterLevel.textContent = state.monsterIndex + 1;
    els.monsterAtk.textContent = state.monster.atk;
    els.monsterReward.textContent = state.monster.reward;

    els.attackBtn.disabled = state.gameOver;
    els.healBtn.disabled = state.gameOver;
    els.upgradeBtn.disabled = state.gameOver;

    updateBars();
}

function nextMonster() {
    state.monsterIndex += 1;
    if (state.monsterIndex >= monsters.length) {
        state.gameOver = true;
        addLog('你击败了所有怪物，成功通关！', true);
        render();
        return;
    }

    state.monster = cloneMonster(state.monsterIndex);
    addLog(`新的敌人出现了：${state.monster.name}` , true);
    render();
}

function monsterAttack() {
    if (state.monster.hp <= 0 || state.gameOver) return;

    state.player.hp -= state.monster.atk;
    addLog(`${state.monster.name} 反击，造成 ${state.monster.atk} 点伤害。`);

    if (state.player.hp <= 0) {
        state.player.hp = 0;
        state.gameOver = true;
        addLog('你被怪物击败了，游戏结束。', true);
    }

    render();
}

function attack() {
    if (state.gameOver) return;

    const damage = state.player.atk + Math.floor(Math.random() * 6);
    state.monster.hp -= damage;
    addLog(`你攻击了 ${state.monster.name}，造成 ${damage} 点伤害。`);

    if (state.monster.hp <= 0) {
        state.monster.hp = 0;
        state.player.gold += state.monster.reward;
        addLog(`你击败了 ${state.monster.name}，获得 ${state.monster.reward} 金币！`, true);
        render();
        setTimeout(nextMonster, 500);
        return;
    }

    render();
    setTimeout(monsterAttack, 350);
}

function heal() {
    if (state.gameOver) return;
    if (state.player.potions <= 0) {
        addLog('你没有药水了。', true);
        return;
    }

    state.player.potions -= 1;
    const healed = 28;
    state.player.hp = Math.min(state.player.maxHp, state.player.hp + healed);
    addLog(`你喝下药水，恢复了 ${healed} 点生命。`, true);
    render();
    setTimeout(monsterAttack, 350);
}

function upgrade() {
    if (state.gameOver) return;
    const cost = 30;
    if (state.player.gold < cost) {
        addLog('金币不够，无法升级攻击。', true);
        return;
    }

    state.player.gold -= cost;
    state.player.atk += 5;
    addLog('你的攻击力提升了 5 点！', true);
    render();
}

function restart() {
    state.player.maxHp = 100;
    state.player.hp = 100;
    state.player.atk = 12;
    state.player.gold = 0;
    state.player.potions = 3;
    state.monsterIndex = 0;
    state.monster = cloneMonster(0);
    state.gameOver = false;
    els.logList.innerHTML = '';
    addLog('新的冒险开始了，第一只怪物出现！', true);
    render();
}

els.attackBtn.addEventListener('click', attack);
els.healBtn.addEventListener('click', heal);
els.upgradeBtn.addEventListener('click', upgrade);
els.restartBtn.addEventListener('click', restart);

restart();
