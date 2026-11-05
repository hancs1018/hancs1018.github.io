/* ===== 外研版三年级上册 单词数据 ===== */
const UNITS = [
    {
        id: 'welcome',
        name: 'Welcome to school',
        words: [
            { en: 'welcome', ph: '/ˈwelkəm/', cn: '欢迎' },
            { en: 'hello', ph: '/həˈləʊ/', cn: '你好' },
            { en: 'hi', ph: '/haɪ/', cn: '嘿，你好' },
            { en: 'goodbye', ph: '/ˌɡʊdˈbaɪ/', cn: '再见' },
            { en: 'bye', ph: '/baɪ/', cn: '再见' },
            { en: 'I', ph: '/aɪ/', cn: '我' },
            { en: 'am', ph: '/æm/', cn: '是' },
            { en: 'you', ph: '/juː/', cn: '你；你们' },
            { en: 'my', ph: '/maɪ/', cn: '我的' },
            { en: 'your', ph: '/jɔː(r)/', cn: '你的；你们的' },
            { en: 'name', ph: '/neɪm/', cn: '名字' },
            { en: 'good', ph: '/ɡʊd/', cn: '好的' },
            { en: 'morning', ph: '/ˈmɔːnɪŋ/', cn: '早晨，上午' },
            { en: 'open', ph: '/ˈəʊpən/', cn: '打开' },
            { en: 'close', ph: '/kləʊz/', cn: '关上' },
            { en: 'listen', ph: '/ˈlɪsn/', cn: '听' },
            { en: 'say', ph: '/seɪ/', cn: '说' },
            { en: 'stand', ph: '/stænd/', cn: '站' },
            { en: 'up', ph: '/ʌp/', cn: '向上' },
            { en: 'sit', ph: '/sɪt/', cn: '坐' },
            { en: 'down', ph: '/daʊn/', cn: '向下' },
            { en: 'book', ph: '/bʊk/', cn: '书' },
            { en: 'day', ph: '/deɪ/', cn: '一天' },
            { en: 'nice', ph: '/naɪs/', cn: '令人愉快的' },
            { en: 'thank', ph: '/θæŋk/', cn: '谢谢' }
        ]
    },
    {
        id: 'unit1',
        name: 'Unit 1 · Let\'s be friends!',
        words: [
            { en: 'friend', ph: '/frend/', cn: '朋友' },
            { en: 'meet', ph: '/miːt/', cn: '遇见；认识' },
            { en: 'new', ph: '/njuː/', cn: '新的' },
            { en: 'she', ph: '/ʃiː/', cn: '她' },
            { en: 'he', ph: '/hiː/', cn: '他' },
            { en: 'we', ph: '/wiː/', cn: '我们' },
            { en: 'from', ph: '/frɒm/', cn: '来自' },
            { en: 'great', ph: '/ɡreɪt/', cn: '太好了；极好的' },
            { en: 'together', ph: '/təˈɡeðə(r)/', cn: '一起' },
            { en: 'play', ph: '/pleɪ/', cn: '玩' },
            { en: 'nine', ph: '/naɪn/', cn: '九' },
            { en: 'everyone', ph: '/ˈevriwʌn/', cn: '每个人' },
            { en: 'happy', ph: '/ˈhæpi/', cn: '开心的' },
            { en: 'help', ph: '/help/', cn: '帮助' },
            { en: 'here', ph: '/hɪə(r)/', cn: '这里' },
            { en: 'too', ph: '/tuː/', cn: '也' },
            { en: 'song', ph: '/sɒŋ/', cn: '歌曲' }
        ]
    },
    {
        id: 'unit2',
        name: 'Unit 2 · My school things',
        words: [
            { en: 'school', ph: '/skuːl/', cn: '学校' },
            { en: 'classroom', ph: '/ˈklɑːsruːm/', cn: '教室' },
            { en: 'teacher', ph: '/ˈtiːtʃə(r)/', cn: '老师' },
            { en: 'pupil', ph: '/ˈpjuːpl/', cn: '小学生' },
            { en: 'pen', ph: '/pen/', cn: '钢笔' },
            { en: 'pencil', ph: '/ˈpensl/', cn: '铅笔' },
            { en: 'bag', ph: '/bæɡ/', cn: '包' },
            { en: 'schoolbag', ph: '/ˈskuːlbæɡ/', cn: '书包' },
            { en: 'desk', ph: '/desk/', cn: '书桌' },
            { en: 'chair', ph: '/tʃeə(r)/', cn: '椅子' },
            { en: 'ruler', ph: '/ˈruːlə(r)/', cn: '尺子' },
            { en: 'eraser', ph: '/ɪˈreɪzə(r)/', cn: '橡皮' },
            { en: 'crayon', ph: '/ˈkreɪɒn/', cn: '蜡笔' },
            { en: 'this', ph: '/ðɪs/', cn: '这，这个' },
            { en: 'that', ph: '/ðæt/', cn: '那，那个' },
            { en: 'what', ph: '/wɒt/', cn: '什么' },
            { en: 'have', ph: '/hæv/', cn: '有' }
        ]
    },
    {
        id: 'unit3',
        name: 'Unit 3 · It\'s a colourful world!',
        words: [
            { en: 'colour', ph: '/ˈkʌlə(r)/', cn: '颜色' },
            { en: 'red', ph: '/red/', cn: '红色；红色的' },
            { en: 'blue', ph: '/bluː/', cn: '蓝色；蓝色的' },
            { en: 'yellow', ph: '/ˈjeləʊ/', cn: '黄色；黄色的' },
            { en: 'green', ph: '/ɡriːn/', cn: '绿色；绿色的' },
            { en: 'black', ph: '/blæk/', cn: '黑色；黑色的' },
            { en: 'white', ph: '/waɪt/', cn: '白色；白色的' },
            { en: 'orange', ph: '/ˈɒrɪndʒ/', cn: '橙色；橙色的' },
            { en: 'it', ph: '/ɪt/', cn: '它' },
            { en: 'bird', ph: '/bɜːd/', cn: '鸟' },
            { en: 'cat', ph: '/kæt/', cn: '猫' },
            { en: 'dog', ph: '/dɒɡ/', cn: '狗' },
            { en: 'panda', ph: '/ˈpændə/', cn: '熊猫' },
            { en: 'cap', ph: '/kæp/', cn: '帽子' },
            { en: 'look', ph: '/lʊk/', cn: '看' },
            { en: 'point', ph: '/pɔɪnt/', cn: '指' },
            { en: 'to', ph: '/tuː/', cn: '向' }
        ]
    },
    {
        id: 'unit4',
        name: 'Unit 4 · Fun with numbers',
        words: [
            { en: 'one', ph: '/wʌn/', cn: '一' },
            { en: 'two', ph: '/tuː/', cn: '二' },
            { en: 'three', ph: '/θriː/', cn: '三' },
            { en: 'four', ph: '/fɔː(r)/', cn: '四' },
            { en: 'five', ph: '/faɪv/', cn: '五' },
            { en: 'six', ph: '/sɪks/', cn: '六' },
            { en: 'seven', ph: '/ˈsevən/', cn: '七' },
            { en: 'eight', ph: '/eɪt/', cn: '八' },
            { en: 'ten', ph: '/ten/', cn: '十' },
            { en: 'eleven', ph: '/ɪˈlevn/', cn: '十一' },
            { en: 'twelve', ph: '/twelv/', cn: '十二' },
            { en: 'count', ph: '/kaʊnt/', cn: '数' },
            { en: 'age', ph: '/eɪdʒ/', cn: '年龄' },
            { en: 'old', ph: '/əʊld/', cn: '……岁的' },
            { en: 'birthday', ph: '/ˈbɜːθdeɪ/', cn: '生日' },
            { en: 'cake', ph: '/keɪk/', cn: '蛋糕' },
            { en: 'present', ph: '/ˈpreznt/', cn: '礼物' }
        ]
    },
    {
        id: 'unit5',
        name: 'Unit 5 · We\'re family',
        words: [
            { en: 'family', ph: '/ˈfæməli/', cn: '家庭；家人' },
            { en: 'mother', ph: '/ˈmʌðə(r)/', cn: '妈妈，母亲' },
            { en: 'father', ph: '/ˈfɑːðə(r)/', cn: '爸爸，父亲' },
            { en: 'sister', ph: '/ˈsɪstə(r)/', cn: '姐妹' },
            { en: 'brother', ph: '/ˈbrʌðə(r)/', cn: '兄弟' },
            { en: 'grandpa', ph: '/ˈɡrænpɑː/', cn: '爷爷；外公' },
            { en: 'grandma', ph: '/ˈɡrænmɑː/', cn: '奶奶；外婆' },
            { en: 'who', ph: '/huː/', cn: '谁' },
            { en: 'me', ph: '/miː/', cn: '我（宾格）' },
            { en: 'they', ph: '/ðeɪ/', cn: '他们；她们；它们' }
        ]
    },
    {
        id: 'unit6',
        name: 'Unit 6 · Home, sweet home',
        words: [
            { en: 'home', ph: '/həʊm/', cn: '家' },
            { en: 'room', ph: '/ruːm/', cn: '房间' },
            { en: 'head', ph: '/hed/', cn: '头' },
            { en: 'hand', ph: '/hænd/', cn: '手' },
            { en: 'arm', ph: '/ɑːm/', cn: '胳膊' },
            { en: 'leg', ph: '/leɡ/', cn: '腿' },
            { en: 'foot', ph: '/fʊt/', cn: '脚' },
            { en: 'body', ph: '/ˈbɒdi/', cn: '身体' },
            { en: 'on', ph: '/ɒn/', cn: '在……上面' },
            { en: 'in', ph: '/ɪn/', cn: '在……里面' },
            { en: 'under', ph: '/ˈʌndə(r)/', cn: '在……下面' },
            { en: 'where', ph: '/weə(r)/', cn: '在哪里' },
            { en: 'bed', ph: '/bed/', cn: '床' },
            { en: 'door', ph: '/dɔː(r)/', cn: '门' },
            { en: 'window', ph: '/ˈwɪndəʊ/', cn: '窗户' }
        ]
    }
];

/* ===== 状态 ===== */
const state = {
    mode: 'en2cn',
    unitIndex: 0,
    questions: [],
    current: 0,
    correct: 0,
    wrong: 0,
    answered: false
};

/* ===== DOM ===== */
const startScreen = document.getElementById('start-screen');
const gameShell = document.getElementById('game-shell');
const resultScreen = document.getElementById('result-screen');

const unitListEl = document.getElementById('unit-list');
const modeBtns = document.querySelectorAll('.mode-btn');
const startBtn = document.getElementById('start-btn');
const gameTitle = document.getElementById('game-title');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const questionTypeLabel = document.getElementById('question-type-label');
const questionText = document.getElementById('question-text');
const questionPhonetic = document.getElementById('question-phonetic');
const questionMeaning = document.getElementById('question-meaning');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const quitBtn = document.getElementById('quit-btn');
const correctCountEl = document.getElementById('correct-count');
const wrongCountEl = document.getElementById('wrong-count');
const accuracyEl = document.getElementById('accuracy');
const currentUnitNameEl = document.getElementById('current-unit-name');

/* ===== 工具函数 ===== */
function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/* ===== 初始化单元列表 ===== */
function initUnitList() {
    UNITS.forEach((u, i) => {
        const btn = document.createElement('button');
        btn.textContent = u.name;
        if (i === 0) btn.classList.add('active');
        btn.onclick = () => {
            state.unitIndex = i;
            unitListEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
        unitListEl.appendChild(btn);
    });
}

modeBtns.forEach(btn => {
    btn.onclick = () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.mode = btn.dataset.mode;
    };
});

/* ===== 生成题目 ===== */
function buildQuestions() {
    const unit = UNITS[state.unitIndex];
    const words = shuffle(unit.words);

    if (state.mode === 'fillblank') {
        // 补字母模式：每个单词随机挖掉一个字母
        return words.map(word => {
            const letters = word.en.split('');
            // 找一个不是首尾、且不重复的字母位置
            let idx = 0;
            if (letters.length <= 2) {
                idx = Math.floor(Math.random() * letters.length);
            } else {
                const candidates = [];
                for (let i = 0; i < letters.length; i++) candidates.push(i);
                idx = candidates[Math.floor(Math.random() * candidates.length)];
            }
            const correctLetter = letters[idx];
            const maskedWord = letters.map((l, i) => i === idx ? '_' : l).join('');
            // 生成干扰项：用和正确答案同大小写风格的字母
            const alphabet = 'abcdefghijklmnopqrstuvwxyz';
            const styleAlphabet = correctLetter === correctLetter.toUpperCase()
                ? alphabet.toUpperCase()
                : alphabet;
            const wrongs = shuffle(styleAlphabet.split('').filter(l => l !== correctLetter)).slice(0, 3);
            const options = shuffle([correctLetter, ...wrongs]);
            return {
                word,
                masked: maskedWord,
                missingIndex: idx,
                options, // 字母数组
                answer: correctLetter
            };
        });
    }

    // 英译中 / 中译英
    return words.map(word => {
        const distractors = shuffle(unit.words.filter(w => w.en !== word.en)).slice(0, 3);
        const pool = [word, ...distractors];
        const options = shuffle(pool);
        return { word, options, answer: word };
    });
}

/* ===== 渲染题目 ===== */
function renderQuestion() {
    const q = state.questions[state.current];
    const total = state.questions.length;

    // 进度
    progressFill.style.width = `${((state.current + 1) / total) * 100}%`;
    progressText.textContent = `${state.current + 1} / ${total}`;

    // 题目类型标签
    if (state.mode === 'fillblank') {
        questionTypeLabel.textContent = '补字母';
    } else {
        questionTypeLabel.textContent = state.mode === 'en2cn' ? '英译中' : '中译英';
    }

    // 题目文字
    if (state.mode === 'fillblank') {
        // 高亮下划线
        questionText.innerHTML = q.masked.replace(/_/, '<span class="blank">_</span>');
        questionPhonetic.hidden = true;
        questionMeaning.textContent = `中文：${q.word.cn}`;
        questionMeaning.hidden = false;
    } else if (state.mode === 'en2cn') {
        questionText.textContent = q.word.en;
        questionPhonetic.textContent = q.word.ph;
        questionPhonetic.hidden = false;
        questionMeaning.hidden = true;
    } else {
        questionText.textContent = q.word.cn;
        questionPhonetic.hidden = true;
        questionMeaning.hidden = true;
    }

    // 选项
    optionsEl.innerHTML = '';
    if (state.mode === 'fillblank') {
        // 补字母：4 个字母大按钮
        q.options.forEach(letter => {
            const btn = document.createElement('button');
            btn.className = 'option letter-option';
            btn.textContent = letter;
            btn.onclick = () => handleAnswer(letter, btn, q);
            optionsEl.appendChild(btn);
        });
    } else {
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option';
            btn.textContent = state.mode === 'en2cn' ? opt.cn : opt.en;
            btn.onclick = () => handleAnswer(opt, btn, q);
            optionsEl.appendChild(btn);
        });
    }

    // 隐藏反馈和下一题
    feedbackEl.hidden = true;
    feedbackEl.className = 'feedback';
    nextBtn.hidden = true;

    state.answered = false;
}

/* ===== 处理选择 ===== */
function handleAnswer(chosen, btn, q) {
    if (state.answered) return;
    state.answered = true;

    let isCorrect;
    if (state.mode === 'fillblank') {
        isCorrect = chosen.toLowerCase() === q.answer.toLowerCase();
    } else {
        isCorrect = chosen.en === q.answer.en;
    }

    const allBtns = optionsEl.querySelectorAll('.option');
    allBtns.forEach(b => b.classList.add('disabled'));

    // 补字母：选完后把空填上（保留原大小写）
    if (state.mode === 'fillblank') {
        questionText.textContent = q.masked.replace(/_/, q.answer);
    }

    if (isCorrect) {
        state.correct++;
        btn.classList.add('correct');
        if (state.mode === 'fillblank') {
            feedbackEl.textContent = `✅ 答对了！${q.word.en} = ${q.word.cn}`;
        } else {
            feedbackEl.textContent = `✅ 答对了！${q.word.en} = ${q.word.cn}`;
        }
        feedbackEl.className = 'feedback correct';
    } else {
        state.wrong++;
        btn.classList.add('wrong');
        // 高亮正确答案
        allBtns.forEach(b => {
            let isRight = false;
            if (state.mode === 'fillblank') {
                isRight = b.textContent.toLowerCase() === q.answer.toLowerCase();
            } else {
                const text = b.textContent;
                const correctText = state.mode === 'en2cn' ? q.answer.cn : q.answer.en;
                isRight = text === correctText;
            }
            if (isRight) b.classList.add('correct');
        });
        if (state.mode === 'fillblank') {
            feedbackEl.textContent = `❌ 答错了，正确是 ${q.word.en}（补 ${q.answer.toUpperCase()}）= ${q.word.cn}`;
        } else {
            feedbackEl.textContent = `❌ 答错了，正确答案：${q.word.en} = ${q.word.cn}`;
        }
        feedbackEl.className = 'feedback wrong';
    }

    feedbackEl.hidden = false;
    nextBtn.hidden = false;
    updateStats();
}

/* ===== 更新侧栏统计 ===== */
function updateStats() {
    correctCountEl.textContent = state.correct;
    wrongCountEl.textContent = state.wrong;
    const total = state.correct + state.wrong;
    accuracyEl.textContent = total > 0 ? Math.round((state.correct / total) * 100) + '%' : '0%';
}

/* ===== 下一题 / 结算 ===== */
nextBtn.onclick = () => {
    state.current++;
    if (state.current < state.questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
};

/* ===== 开始游戏 ===== */
startBtn.onclick = () => {
    state.questions = buildQuestions();
    state.current = 0;
    state.correct = 0;
    state.wrong = 0;

    const unit = UNITS[state.unitIndex];
    currentUnitNameEl.textContent = unit.name;
    gameTitle.textContent = `${unit.name}`;

    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    gameShell.classList.remove('hidden');

    updateStats();
    renderQuestion();
};

/* ===== 退出 ===== */
quitBtn.onclick = () => {
    gameShell.classList.add('hidden');
    startScreen.classList.remove('hidden');
};

/* ===== 结算 ===== */
function showResult() {
    gameShell.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const total = state.questions.length;
    const rate = Math.round((state.correct / total) * 100);

    document.getElementById('result-correct').textContent = state.correct;
    document.getElementById('result-wrong').textContent = state.wrong;
    document.getElementById('result-accuracy').textContent = rate + '%';

    let emoji, title, tip;
    if (rate >= 90) {
        emoji = '🏆'; title = '太棒了！'; tip = '你真是单词小能手！';
    } else if (rate >= 70) {
        emoji = '🎉'; title = '做得不错！'; tip = '继续加油，下次更棒！';
    } else if (rate >= 50) {
        emoji = '💪'; title = '还可以！'; tip = '多练几遍就能记住啦。';
    } else {
        emoji = '📚'; title = '别灰心！'; tip = '再学一次就会了，加油！';
    }

    document.getElementById('result-emoji').textContent = emoji;
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-tip').textContent = tip;
}

document.getElementById('retry-btn').onclick = startBtn.onclick;
document.getElementById('back-btn').onclick = () => {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
};

/* ===== 启动 ===== */
initUnitList();
