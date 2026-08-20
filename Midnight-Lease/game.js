/* =====================================================
 * 午夜租约 · Midnight Lease — game.js（上）
 * 地图布局 / 实体 / 玩家移动 / 碰撞
 * 画布 960 x 640
 * ===================================================== */

// ---------- 全局状态 ----------
const S = {
    started: false,
    over: false,
    timeMin: 0,               // 游戏内分钟：0 = 00:00，180 = 03:00
    px: 470, py: 380,         // 玩家坐标
    keys: {},
    inventory: [],            // 已有道具
    flags: {                  // 剧情旗标
        readRules: true,      // 开局已知守则（左侧常驻显示）
        readDiary: false,
        readManual: false,
        hasScissors: false,
        sealCut: false,
        hasOil: false,
        knowCode: false,
        hasRedCloth: false,
        clothHung: false,
        touchedClutter: false,
        glassDoorWideOpen: false,
        died: false
    },
    deskSitStart: null,       // 坐在书桌前的起始时间
    washerSpinUntil: -1,      // 洗衣机空转结束时间
    washerNextSpin: 40,       // 下一次可能空转
    rackMoved: false,
    rackX: 300,               // 晾衣架当前 X
    passwordInput: '',
    lives: 5,                 // 剩余命数
    lifeCooldownUntil: 0,     // 扣命冷却（防止连续惩罚）
    washerAlert: false,       // 洗衣机空转警报中
    washerAlertTimer: null    // 警报计时器
};

const PASSWORD = '7319';      // 晾衣架横梁上的密码
const SPEED = 3.2;
const PLAYER_SIZE = 26;
const W = 960, H = 640;
const GAME_MIN_PER_REAL_SEC = 1.2;   // 每现实秒推进的游戏分钟

// ---------- 地图元素定义 ----------
// 房间布局（参照平面图）：
// 上方为阳台（含晾衣架、洗衣机、杂物），下方为卧室
// 卧室：床(左下)、书桌(左上)、衣柜(右中)、矮柜(右下)、床头柜(床右下)、门(右下)
const ENTITIES = [
    // —— 外墙 ——
    { id: 'wall-top',    cls: 'wall', x: 0,   y: 0,   w: 960, h: 16,  solid: true },
    { id: 'wall-left',   cls: 'wall', x: 0,   y: 0,   w: 16,  h: 640, solid: true },
    { id: 'wall-right',  cls: 'wall', x: 944, y: 0,   w: 16,  h: 640, solid: true },
    { id: 'wall-bottom-l', cls: 'wall', x: 0, y: 624, w: 700, h: 16,  solid: true },
    { id: 'wall-bottom-r', cls: 'wall', x: 820, y: 624, w: 140, h: 16, solid: true },

    // —— 阳台与卧室的隔墙（含玻璃门开口 420~540）——
    { id: 'wall-mid-l',  cls: 'wall', x: 16,  y: 200, w: 404, h: 14,  solid: true },
    { id: 'wall-mid-r',  cls: 'wall', x: 540, y: 200, w: 404, h: 14,  solid: true },

    // —— 阳台家具 ——
    { id: 'washer',  cls: 'furniture f-washer', label: '洗衣机',
      x: 700, y: 40, w: 110, h: 100, solid: true, interact: 'washer' },
    { id: 'rack',    cls: 'furniture f-rack',   label: '',
      x: 300, y: 60, w: 260, h: 60,  solid: true, interact: 'rack', dynamic: true },
    { id: 'glassdoor', cls: 'furniture f-glassdoor', label: '移动玻璃门',
      x: 420, y: 196, w: 120, h: 22, solid: false, interact: 'glassdoor' },

    // —— 杂物堆（红标，禁止触碰）——
    { id: 'clutter1', cls: 'furniture f-clutter', label: '杂物',
      x: 40,  y: 40,  w: 70,  h: 100, solid: true, interact: 'clutter' },
    { id: 'clutter2', cls: 'furniture f-clutter', label: '杂物',
      x: 640, y: 150, w: 100, h: 44,  solid: true, interact: 'clutter' },

    // —— 卧室家具 ——
    { id: 'desk',      cls: 'furniture f-desk', label: '书桌',
      x: 60,  y: 230, w: 200, h: 110, solid: true, interact: 'desk' },
    { id: 'bed',       cls: 'furniture f-bed',  label: '床',
      x: 60,  y: 380, w: 240, h: 220, solid: true, interact: 'bed' },
    { id: 'nightstand', cls: 'furniture f-nightstand', label: '床头柜',
      x: 320, y: 520, w: 80,  h: 80,  solid: true, interact: 'nightstand' },
    { id: 'wardrobe',  cls: 'furniture f-wardrobe', label: '衣柜',
      x: 700, y: 240, w: 150, h: 200, solid: true, interact: 'wardrobe' },
    { id: 'cabinet',   cls: 'furniture f-cabinet', label: '矮柜',
      x: 720, y: 470, w: 110, h: 90,  solid: true, interact: 'cabinet' },
    { id: 'door',      cls: 'furniture f-door', label: '大门',
      x: 700, y: 624, w: 120, h: 16,  solid: false, interact: 'door' }
];

// ---------- 渲染 ----------
const gameEl = document.getElementById('game');
let playerEl = null;
let rackEl = null;

function renderMap() {
    ENTITIES.forEach(e => {
        const div = document.createElement('div');
        div.className = 'entity ' + e.cls;
        div.id = 'ent-' + e.id;
        div.style.left = e.x + 'px';
        div.style.top = e.y + 'px';
        div.style.width = e.w + 'px';
        div.style.height = e.h + 'px';
        div.textContent = e.label || '';
        gameEl.appendChild(div);
        if (e.id === 'rack') {
            rackEl = div;
            const bar = document.createElement('div');
            bar.className = 'bar';
            div.appendChild(bar);
        }
        e.el = div;
    });

    playerEl = document.createElement('div');
    playerEl.id = 'player';
    playerEl.className = 'entity';
    gameEl.appendChild(playerEl);
    syncPlayer();
}

function syncPlayer() {
    playerEl.style.left = S.px + 'px';
    playerEl.style.top = S.py + 'px';
}

function syncRack() {
    if (rackEl) rackEl.style.left = S.rackX + 'px';
    const r = ENTITIES.find(e => e.id === 'rack');
    r.x = S.rackX;
}

// ---------- 碰撞 ----------
function collides(nx, ny) {
    for (const e of ENTITIES) {
        if (!e.solid) continue;
        // 大门在输入密码正确后不再阻挡（通关检测单独做）
        if (nx < e.x + e.w && nx + PLAYER_SIZE > e.x &&
            ny < e.y + e.h && ny + PLAYER_SIZE > e.y) {
            return e;
        }
    }
    return null;
}

// ---------- 移动 ----------
function moveLoop() {
    if (!S.started || S.over) return;
    // 面板打开时禁止移动
    if (!document.getElementById('panel').classList.contains('hidden') ||
        !document.getElementById('keypad').classList.contains('hidden')) return;

    let dx = 0, dy = 0;
    if (S.keys['w'] || S.keys['arrowup']) dy -= SPEED;
    if (S.keys['s'] || S.keys['arrowdown']) dy += SPEED;
    if (S.keys['a'] || S.keys['arrowleft']) dx -= SPEED;
    if (S.keys['d'] || S.keys['arrowright']) dx += SPEED;

    if (dx !== 0) {
        const hit = collides(S.px + dx, S.py);
        if (!hit) S.px += dx;
    }
    if (dy !== 0) {
        const hit = collides(S.px, S.py + dy);
        if (!hit) S.py += dy;
    }

    S.px = Math.max(16, Math.min(W - 16 - PLAYER_SIZE, S.px));
    S.py = Math.max(16, Math.min(H - 16 - PLAYER_SIZE, S.py));

    if (dx || dy) syncPlayer();
    updateInteractTip();
}

// ---------- 键盘 ----------
window.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    S.keys[k] = true;
    if (k === 'e') {
        // 面板打开时，E 键关闭面板
        if (!$('panel').classList.contains('hidden') || !$('keypad').classList.contains('hidden')) {
            closeAllPanels();
            return;
        }
        tryInteract();
    }
    if (k === 'escape') closeAllPanels();
});
window.addEventListener('keyup', e => {
    S.keys[e.key.toLowerCase()] = false;
});

// 持续移动
setInterval(moveLoop, 1000 / 60);

/* =====================================================
 * 午夜租约 — game.js（下）
 * 互动 / 文本内容 / 时间系统 / 随机事件 / 结局
 * ===================================================== */

// ---------- 文本内容 ----------
const TXT = {
    rules:
`卧室生存守则

1. 安全区域仅限床、书桌、床头柜、衣柜、矮柜。
2. 阳台不属于安全区，玻璃门仅可拉开窄缝，禁止全力推开。
3. 图中红色方块标记的杂物堆，禁止触碰、不要翻找，里面的东西不属于你。
4. 日记记载深夜洗衣机会自行运转。晾衣架虽然很轻，若你发现晾衣架莫名变换位置，或听见滚筒声响，立刻回书桌静坐，不要望向阳台，不要凑近玻璃门。
5. 洗衣机内可能会有红布，请把它晒到晾衣架上。
6. 不要暴力拉扯大门，门缝会透出异样红光。
7. 凌晨两点后不要久坐书桌，不超过 20 分钟（游戏时间）。
8. 玻璃门上的倒影不要对视，它会引诱你全力推开玻璃门踏入阳台。

—— 前租客留`,
    diary:
`租客日记

3月15日：
搬进这间小单间第三天，房东临走塞给我一张皱巴巴的纸，再三叮嘱这很重要。房东特意指了三块红标杂物堆，说绝对不能伸手碰。过道中间那堆杂物靠着书桌，感觉很奇怪，我尽量贴着床边绕着走。

3月16日：
阳台的晾衣架虽然很轻，但今天起床它好像换了位置，我明明一整天都没碰过它。它自己挪到玻璃门正中间，刚好挡住看阳台的视线……或者，是我不小心碰到它了吧。

3月17日：
洗衣机看着老旧，说明书好像在衣柜里。今天傍晚它空转了，里面没有任何衣物，滚筒自己咔咔响。我按守则躺进被窝捂住耳朵，等了几分钟声音才停。阳台晾的衣物很多，透过窗帘缝能看见布料垂下来，像是有人趴在那里往房间里看。

3月19日：
昨晚凌晨两点，我坐在书桌写笔记，笔尖突然不受控制，纸上凭空多出一行歪字：「别留在这里」。
我试着轻轻拉开阳台玻璃门一条窄缝——晾衣架横梁上刻着一串数字：7319。应该是前租客留下的记号。

3月20日：
入户大门锁芯很卡顿，输密码完全拧不动。床头柜里有一瓶润滑油，但柜子贴着封条，得先用剪刀剪开。剪刀……好像收在书桌抽屉里了。我试过一次拽门把手，耳边立刻传来衣物摩擦的沙沙声，吓得我再也不敢碰门。

3月21日：
我犯了大忌。昨天伸手碰了过道中间的红杂物，瞬间所有纸条字迹全部模糊，衣柜、书桌的线索都被碎布盖住，我清理了半个多小时才看清文字。凌晨两点坐在书桌超过两分钟，衣柜里的陌生衣服全部掉出来铺满地面，耳边全是女人的低语。洗衣机整夜空转，晾衣架整夜移位。

3月25日：
原来那张皱巴巴的纸是那么重要……这实在太恐怖了，竟然真的和纸上写的一样！！！

最后一行字迹潦草：
「9. 3:00（游戏时间）就到了，所以请在 3 点前逃离这里，否则……」`,
    manual:
`洗衣机使用说明

型号：老式单筒家用洗衣机

一、允许使用时段：仅白天
8:00—18:00 可放入衣物启动洗涤。18:00 后禁止操作电源开关，拔下插头静置。

二、异常运转处理办法
1. 若无人操作时滚筒自行空转、发出搅动声响，不要打开洗衣机门，更不要拉开阳台玻璃门靠近观察。
2. 空转持续时间通常为 1–5 分钟（游戏时间），声响结束前远离阳台区域即可。

三、故障警示
深夜洗衣机自行启动，代表房间内存在滞留之物。切勿好奇窥探，遵守卧室生存守则，方可平安等到天光。`
};

// ---------- 工具 ----------
const $ = id => document.getElementById(id);

function fmtTime(m) {
    const h = Math.floor(m / 60) % 24;
    const mm = Math.floor(m % 60);
    return String(h).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
}

let msgTimer = null;
function showMsg(text, whisper = false, dur = 3600) {
    const el = $('message');
    el.textContent = text;
    el.classList.remove('hidden');
    el.classList.toggle('whisper', whisper);
    clearTimeout(msgTimer);
    msgTimer = setTimeout(() => el.classList.add('hidden'), dur);
}

function addItem(name) {
    if (S.inventory.includes(name)) return;
    S.inventory.push(name);
    const div = document.createElement('div');
    div.className = 'inv-item';
    div.textContent = name;
    $('inventory').appendChild(div);
}

// ---------- 命数系统 ----------
function loseLife(reason) {
    if (S.over) return;
    // 同一游戏分钟内不重复扣命
    if (S.timeMin < S.lifeCooldownUntil) return;
    S.lifeCooldownUntil = S.timeMin + 2;

    S.lives--;
    updateLivesUI();
    shakeScreen();

    if (S.lives <= 0) {
        endGame(false, '滞留之物',
            reason + '\n\n你感到意识被一点点抽离。\n守则没能保护你——你成了这间屋子里新的「滞留之物」。');
    } else {
        showMsg(reason + '（剩余 ' + S.lives + ' 次机会）', true, 4200);
    }
}

function updateLivesUI() {
    const el = $('lives');
    if (!el) return;
    el.textContent = '❤'.repeat(S.lives) + '♡'.repeat(Math.max(0, 5 - S.lives));
}

function flashEntity(id) {
    const e = ENTITIES.find(x => x.id === id);
    if (!e || !e.el) return;
    e.el.classList.add('flash');
    setTimeout(() => e.el.classList.remove('flash'), 600);
}

function shakeScreen() {
    const wrap = $('game-wrap');
    wrap.classList.remove('screen-shake');
    void wrap.offsetWidth;
    wrap.classList.add('screen-shake');
}

function openPanel(title, bodyHtml) {
    $('panel-title').textContent = title;
    $('panel-body').innerHTML = bodyHtml;
    $('panel').classList.remove('hidden');
}
function closeAllPanels() {
    $('panel').classList.add('hidden');
    $('keypad').classList.add('hidden');
}
document.querySelectorAll('.btn-close').forEach(b =>
    b.addEventListener('click', () => $(b.dataset.close).classList.add('hidden')));

// ---------- 互动检测 ----------
function nearestInteractable() {
    const cx = S.px + PLAYER_SIZE / 2, cy = S.py + PLAYER_SIZE / 2;
    let best = null, bestD = 78;
    for (const e of ENTITIES) {
        if (!e.interact) continue;
        const ex = Math.max(e.x, Math.min(cx, e.x + e.w));
        const ey = Math.max(e.y, Math.min(cy, e.y + e.h));
        const d = Math.hypot(cx - ex, cy - ey);
        if (d < bestD) { bestD = d; best = e; }
    }
    return best;
}

function updateInteractTip() {
    const e = nearestInteractable();
    $('interact-tip').classList.toggle('hidden', !e);
}

function tryInteract() {
    if (!S.started || S.over) return;
    if (!$('panel').classList.contains('hidden') || !$('keypad').classList.contains('hidden')) return;
    const e = nearestInteractable();
    if (!e) return;
    flashEntity(e.id);
    INTERACTIONS[e.interact](e);
}

// ---------- 各物件互动 ----------
const INTERACTIONS = {
    bed() {
        if (S.washerAlert) {
            // 洗衣机空转警报中，上床避险
            S.washerAlert = false;
            clearTimeout(S.washerAlertTimer);
            $('red-pulse').classList.remove('alert');
            document.body.classList.remove('alert-mode');
            showMsg('你钻进被窝，紧紧捂住耳朵。滚筒声渐渐远去……');
            return;
        }
        showMsg('你躺到床上。被子里有淡淡的皂角味。');
    },
    desk() {
        if (!S.flags.hasScissors) {
            S.flags.hasScissors = true;
            addItem('剪刀');
            showMsg('你在书桌抽屉里找到了一把剪刀。');
        } else {
            S.deskSitStart = S.timeMin;
            showMsg('你在书桌前坐下。凌晨的寒意顺着椅背爬上来。');
        }
    },
    nightstand() {
        if (!S.flags.sealCut) {
            if (S.flags.hasScissors) {
                S.flags.sealCut = true;
                showMsg('你用剪刀剪开了床头柜的封条。封条背面似乎写着模糊的符咒。');
            } else {
                showMsg('床头柜上贴着一道封条，徒手撕不开。也许需要剪刀之类的工具。');
            }
        } else if (!S.flags.hasOil) {
            S.flags.hasOil = true;
            addItem('润滑油');
            showMsg('你拿到了一瓶润滑油。大门锁芯应该能用得上。');
        } else {
            showMsg('抽屉里空了，只剩一圈暗色的污渍。');
        }
    },
    wardrobe() {
        if (!S.flags.readManual) {
            S.flags.readManual = true;
            openPanel('洗衣机使用说明', esc(TXT.manual));
        } else if (S.timeMin >= 120 && !S.flags.wardrobeSpooked) {
            S.flags.wardrobeSpooked = true;
            shakeScreen();
            showMsg('柜门猛地震了一下，里面传来衣物摩擦的沙沙声。', true, 5000);
        } else {
            showMsg('衣柜里挂着几件陌生的旧衣服，你不想多看。');
        }
    },
    cabinet() {
        if (!S.flags.readDiary) {
            S.flags.readDiary = true;
            openPanel('租客日记', esc(TXT.diary));
            S.flags.knowCode = true;
            showMsg('日记里提到了晾衣架横梁上的数字……');
        } else {
            openPanel('租客日记', esc(TXT.diary));
        }
    },
    rack() {
        if (!inBalcony()) {
            showMsg('晾衣架在阳台那一侧，得凑近玻璃门才够得着。');
            return;
        }
        if (S.flags.hasRedCloth && !S.flags.clothHung) {
            S.flags.clothHung = true;
            showMsg('你把红布挂上了晾衣架。布料垂下来，轻轻晃着。');
            return;
        }
        if (!S.flags.knowCode) {
            S.flags.knowCode = true;
            showMsg('你凑近横梁，上面刻着四个数字：7 3 1 9。');
        } else {
            showMsg('横梁上的刻痕很浅：7 3 1 9。');
        }
    },
    washer() {
        if (S.timeMin < S.washerSpinUntil) {
            loseLife('滚筒正在疯狂搅动，你却打开了洗衣机门——一只湿冷的手擦过你的指尖！');
            return;
        }
        if (!S.flags.hasRedCloth && !S.flags.clothHung && S.timeMin >= 60) {
            S.flags.hasRedCloth = true;
            addItem('红布');
            showMsg('你打开洗衣机——里面没有水，只有一块湿冷的红布。');
        } else {
            showMsg('老旧的单筒洗衣机，插头虚挂着。你不想再碰它第二次。');
        }
    },
    glassdoor() {
        if (S.flags.glassDoorWideOpen) {
            showMsg('玻璃门大敞着。阳台上的风冷得不像这个季节。', true);
            return;
        }
        // 守则2/8：只能开窄缝。洗衣机运转时或晾衣架移位后，靠近会被引诱
        const tempted = S.timeMin < S.washerSpinUntil || (S.rackMoved && S.timeMin >= 120);
        if (tempted && Math.random() < 0.45) {
            S.flags.glassDoorWideOpen = true;
            loseLife('玻璃上的倒影对你笑了。你不由自主地全力推开了门——');
            setTimeout(() => { if (!S.over) showMsg('你猛地清醒过来，死死抵住玻璃门，浑身冷汗。', true, 4000); }, 2600);
            return;
        }
        showMsg('你只把玻璃门拉开一条窄缝。缝隙里渗进铁锈味的冷风。');
    },
    clutter() {
        if (!S.flags.touchedClutter) {
            S.flags.touchedClutter = true;
            shakeScreen();
            loseLife('你碰到了红标杂物堆——所有纸条字迹瞬间模糊！');
            S.flags.readRules = false;
            S.flags.readDiary = false;
            S.flags.readManual = false;
            setTimeout(() => { if (!S.over) showMsg('耳边响起女人的低语：「别碰……我的东西……」', true, 5000); }, 2500);
        } else {
            showMsg('碎布和旧物堆散发着潮气。你收回手，决定不再碰它。', true);
        }
    },
    door() {
        const t = S.timeMin;
        if (t >= 180) { endGame(false, '时限已至', '3:00 到了。门锁咔哒一声，从里面反锁了。你听见阳台传来晾衣架缓缓拖动的声音，越来越近……'); return; }
        // 守则6：不要暴力拉扯大门
        if (!S.flags.hasOil || !S.flags.knowCode) {
            $('red-pulse').classList.add('active');
            loseLife('门锁纹丝不动。门缝里透出一缕异样的红光……');
            setTimeout(() => $('red-pulse').classList.remove('active'), 4200);
            if (!S.flags.doorWarned) { S.flags.doorWarned = true; setTimeout(() => { if (!S.over) showMsg('沙沙……沙沙……衣物摩擦的声音贴着门板滑过。', true, 4000); }, 2600); }
            return;
        }
        // 有润滑油且知道密码，随时可以开门
        openKeypad();
    }
};

function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/(禁止|不要|不属于你|全力推开|7319|3 点前|否则……)/g, '<span class="red">$1</span>')
            .replace(/\n/g, '<br>');
}

function inBalcony() {
    return (S.py + PLAYER_SIZE / 2) < 214;
}

// ---------- 密码锁 ----------
function openKeypad() {
    S.passwordInput = '';
    updateKeypad();
    $('keypad-hint').textContent = S.flags.hasOil ? '锁芯已润滑。四位数字密码' : '锁芯锈死了，完全拧不动——需要润滑油';
    $('keypad').classList.remove('hidden');
}
function updateKeypad() {
    const d = S.passwordInput.padEnd(4, '_').split('').join(' ');
    const disp = $('keypad-display');
    disp.textContent = d;
    disp.classList.remove('error');
}
document.querySelectorAll('.key').forEach(k => {
    k.addEventListener('click', () => {
        const v = k.dataset.key;
        if (v === 'clear') S.passwordInput = '';
        else if (v === 'back') S.passwordInput = S.passwordInput.slice(0, -1);
        else if (S.passwordInput.length < 4) {
            S.passwordInput += v;
            if (S.passwordInput.length === 4) setTimeout(checkPassword, 250);
        }
        updateKeypad();
    });
});
function checkPassword() {
    if (!S.flags.hasOil) {
        $('keypad-display').classList.add('error');
        showMsg('密码对了也没用——锁芯锈死，根本拧不动。');
        S.passwordInput = '';
        setTimeout(updateKeypad, 500);
        return;
    }
    if (S.passwordInput === PASSWORD) {
        closeAllPanels();
        endGame(true, '逃离', '锁芯顺滑地转动了。\n你推开门，凌晨三点的走廊空无一人，声控灯一盏一盏为你亮起。\n身后，晾衣架轻轻晃了一下，像是在道别。\n\n——你逃出来了。');
    } else {
        $('keypad-display').classList.add('error');
        shakeScreen();
        showMsg('密码错误。门锁深处传来一声轻笑。', true);
        S.passwordInput = '';
        setTimeout(updateKeypad, 600);
    }
}

// ---------- 结局 ----------
function endGame(win, title, text) {
    if (S.over) return;
    S.over = true;
    $('ending-title').textContent = win ? '你逃出来了' : '滞留之物';
    $('ending-title').className = win ? 'win' : 'lose';
    $('ending-text').innerHTML = esc(text);
    $('ending').classList.remove('hidden');
}

// ---------- 时间系统 ----------
const clockEl = $('clock');
setInterval(() => {
    if (!S.started || S.over) return;
    S.timeMin += GAME_MIN_PER_REAL_SEC;
    clockEl.textContent = fmtTime(S.timeMin);
    clockEl.classList.toggle('danger', S.timeMin >= 150);

    // 03:00 未逃出
    if (S.timeMin >= 180) {
        endGame(false, '时限已至', '3:00 到了。可窗外依旧漆黑。\n门锁咔哒一声反锁。\n守则的最后一条，你终究还是没能遵守。');
        return;
    }

    randomEvents();
}, 1000);

// ---------- 随机事件 ----------
function randomEvents() {
    const t = S.timeMin;

    // 洗衣机深夜空转（1–5 分钟）+ 10 秒上床警报
    if (t >= S.washerNextSpin && t < 170 && t >= 30 && !S.washerAlert) {
        S.washerNextSpin = t + 45 + Math.random() * 60;
        S.washerSpinUntil = t + 1 + Math.random() * 4;
        S.washerAlert = true;
        $('red-pulse').classList.add('alert');
        document.body.classList.add('alert-mode');
        showMsg('洗衣机自己转起来了！立刻上床！', true, 3000);
        S.washerAlertTimer = setTimeout(() => {
            if (S.washerAlert && !S.over) {
                S.washerAlert = false;
                $('red-pulse').classList.remove('alert');
                document.body.classList.remove('alert-mode');
                loseLife('你没有及时上床——滚筒里伸出一只湿冷的手，抓住了你的脚踝！');
            }
        }, 10000);
        setTimeout(() => { if (!S.over && !S.washerAlert) showMsg('滚筒声停了。房间安静得可怕。'); },
            (S.washerSpinUntil - t) / GAME_MIN_PER_REAL_SEC * 1000 + 500);
    }

    // 晾衣架移位
    if (!S.rackMoved && t >= 100 && Math.random() < 0.006) {
        S.rackMoved = true;
        S.rackX = 420; // 挪到玻璃门正中间
        syncRack();
        showMsg('你瞥见阳台——晾衣架的位置，好像和刚才不一样了。', true, 4600);
    }

    // 守则7：两点后久坐书桌
    if (t >= 120 && t < 180) {
        if (S.deskSitStart !== null && t - S.deskSitStart >= 20) {
            S.deskSitStart = null;
            shakeScreen();
            loseLife('凌晨久坐书桌——衣柜里的陌生衣服全部掉了出来，耳边全是女人的低语！');
            S.rackMoved = true;
            S.rackX = 420;
            syncRack();
        }
        // 起身离开书桌则重置计时（粗略：玩家远离书桌即重置）
        const desk = ENTITIES.find(e => e.id === 'desk');
        const dx = S.px - (desk.x + desk.w / 2), dy = S.py - (desk.y + desk.h / 2);
        if (Math.hypot(dx, dy) > 160) S.deskSitStart = null;
    }
}

// ---------- 启动 ----------
renderMap();
$('btn-start').addEventListener('click', () => {
    $('intro').classList.add('hidden');
    S.started = true;
    clockEl.textContent = '00:00';
    showMsg('午夜 0 点。床上似乎压着一张皱巴巴的纸。');
});

// 画布自适应缩放
function fitScale() {
    const s = Math.min(window.innerWidth / W, window.innerHeight / H, 1.05);
    gameEl.style.transform = `scale(${s})`;
}
window.addEventListener('resize', fitScale);
fitScale();
