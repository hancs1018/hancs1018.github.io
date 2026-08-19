// 封存纪年 · 文字解谜版
// 通过文字描述场景，玩家点击选项做选择、输入密码推进剧情。
var story = document.getElementById('story');
var locEl = document.getElementById('loc');
var hintInfo = document.getElementById('hintInfo');

var S = load() || {
  scene: 0, hints: 3, lampClicks: 0, ended: false,
  bag: [], clues: [],
  solved: { s1: false, s2: false, s3: false, s4: false }
};

function save(){ localStorage.setItem('fcjn_text_save', JSON.stringify(S)); }
function load(){ try{ return JSON.parse(localStorage.getItem('fcjn_text_save')); }catch(e){ return null; } }

function p(text, cls){
  var el = document.createElement('p');
  if(cls) el.className = cls;
  el.innerHTML = text;
  story.appendChild(el);
  window.scrollTo(0, document.body.scrollHeight);
}
function sys(text){ p(text, 'sys'); }
function get(text){ p(text, 'get'); }
function err(text){ p(text, 'err'); }

function addBag(name){
  if(S.bag.indexOf(name) < 0){ S.bag.push(name); get('【获得道具】' + name); renderSide(); save(); }
}
function addClue(name){
  if(S.clues.indexOf(name) < 0){ S.clues.push(name); get('【记录线索】' + name); renderSide(); save(); }
}
function renderSide(){
  var bag = document.getElementById('bag'), clues = document.getElementById('clues');
  bag.innerHTML = S.bag.length ? S.bag.map(function(x){return '<li>· '+x+'</li>';}).join('') : '<li class="empty">空空如也</li>';
  clues.innerHTML = S.clues.length ? S.clues.map(function(x){return '<li>· '+x+'</li>';}).join('') : '<li class="empty">暂无线索</li>';
  hintInfo.textContent = '提示次数：' + S.hints;
}

// 选项按钮组
function choices(list){
  var box = document.createElement('div');
  box.className = 'choices';
  list.forEach(function(c, i){
    var b = document.createElement('button');
    b.innerHTML = '<span class="num">' + (i+1) + '.</span>' + c.label;
    b.onclick = function(){ box.remove(); c.fn(); };
    box.appendChild(b);
  });
  story.appendChild(box);
  window.scrollTo(0, document.body.scrollHeight);
}

// 密码输入
function askPwd(question, len, isAlpha, onOk){
  p(question);
  var box = document.createElement('div');
  box.className = 'pwd';
  var input = document.createElement('input');
  input.maxLength = len;
  input.placeholder = isAlpha ? '输入'+len+'位字母' : '输入'+len+'位数字';
  var btn = document.createElement('button');
  btn.textContent = '确认';
  box.appendChild(input); box.appendChild(btn);
  story.appendChild(box);
  input.focus();
  function submit(){
    var v = input.value.trim().toUpperCase();
    box.remove();
    p('你输入了：' + (v || '（空）'), 'sys');
    onOk(v);
  }
  btn.onclick = submit;
  input.onkeydown = function(e){ if(e.key === 'Enter') submit(); };
}

// 场景导航
function nav(){
  var list = [];
  if(S.scene === 0 && S.solved.s1) list.push({label:'推开阅览区大门，走进档案阅览区', fn:function(){ gotoScene(1); }});
  if(S.scene === 1){
    list.push({label:'返回入口大厅', fn:function(){ gotoScene(0); }});
    if(S.solved.s2) list.push({label:'用字母密码打开办公室大门', fn:function(){ gotoScene(2); }});
  }
  if(S.scene === 2){
    list.push({label:'返回档案阅览区', fn:function(){ gotoScene(1); }});
    if(S.solved.s3) list.push({label:'带着密钥，回到入口大厅的终极出口', fn:function(){ gotoScene(3); }});
  }
  if(S.scene === 3 && !S.ended) list.push({label:'退回办公室再想想', fn:function(){ gotoScene(2); }});
  if(list.length) choices(list);
}

// ============ 场景一：入口大厅 ============
function scene0(){
  locEl.textContent = '入口大厅';
  sys('—— 场景一 · 入口大厅 ——');
  p('昏暗的走廊大厅，墙面斑驳，空气里浮着陈年纸张的霉味。老式储物柜靠墙而立，玄关台灯忽明忽暗，公告板上的字迹已经发黄。正前方，阅览区大门紧闭，门上挂着一把四位数字密码锁。');
  menu0();
}
function menu0(){
  choices([
    {label:'查看公告板', fn:function(){
      p('公告板上贴着一张泛黄的工作通知：<b>“档案室仅在每季首日开放归档。”</b>');
      addClue('通知：每季首日开放归档'); menu0();
    }},
    {label:'翻看老旧日历', fn:function(){
      p('日历上春夏秋冬各有一个特殊标记：春 <b>03</b>、夏 <b>06</b>、秋 <b>09</b>、冬 <b>12</b>。');
      addClue('日历：春03 夏06 秋09 冬12'); menu0();
    }},
    {label:'打开玄关台灯', fn:function(){
      p('台灯闪了两下，灯罩内壁刻着一行小字：“光会照亮被忽略的角落。”');
      menu0();
    }},
    {label:'检查储物柜', fn:function(){
      p('柜子里空空如也，只剩一角撕碎的便签，隐约写着“03…06…”。');
      menu0();
    }},
    {label:'尝试打开阅览区大门（四位数字密码）', fn:function(){
      if(S.solved.s1){ sys('门已经开了。'); nav(); return; }
      askPwd('密码锁上有四位转盘。你要输入什么？', 4, false, function(v){
        if(v === '0306'){
          S.solved.s1 = true; save();
          get('咔哒——密码锁弹开，大门缓缓开启。');
          addBag('破损的档案残页1');
          addClue('大厅密码：0306（四季首月）');
          nav();
        } else {
          err('密码锁纹丝不动，似乎不对。');
          menu0();
        }
      });
    }},
    {label:'离开这里（查看可去之处）', fn:function(){ nav(); }}
  ]);
}

// ============ 场景二：档案阅览区 ============
function scene1(){
  locEl.textContent = '档案阅览区';
  sys('—— 场景二 · 档案阅览区 ——');
  p('整齐的档案架一直排到天花板，阅览桌上摊着一本笔记，老式台灯立在桌角，墙上挂着一幅数字挂画。尽头是一扇字母密码门，通往管理员办公室。');
  menu1();
}
function menu1(){
  choices([
    {label:'阅读阅览桌上的笔记本', fn:function(){
      p('管理员的手写笔记字迹工整：<b>“春归序首，夏藏次中，秋落倒数，冬守终章。”</b>');
      addClue('笔记：春夏秋冬各有归处'); menu1();
    }},
    {label:'查看分类档案架', fn:function(){
      p('四组档案盒上标注着拼音首字母：春 <b>C</b>、夏 <b>X</b>、秋 <b>Q</b>、冬 <b>D</b>。');
      addClue('档案：春C 夏X 秋Q 冬D'); menu1();
    }},
    {label:'端详墙上的数字挂画', fn:function(){
      p('挂画上印着 C、X、Q、D 四个字母，角落写着一行小字：“顺序即答案。”');
      addClue('挂画：顺序即答案'); menu1();
    }},
    {label:'反复按台灯开关', fn:function(){
      S.lampClicks++;
      if(S.lampClicks >= 3){
        get('台灯突然亮起，灯影里浮出一行字：<b>“所有秘密，都藏在记录里。”</b>');
        addClue('彩蛋：秘密藏在记录里');
        S.lampClicks = -99; save();
      } else {
        p('台灯'+['闪了一下','又闪了一下','……'][Math.max(0,S.lampClicks-1)]+'，没什么反应。');
      }
      menu1();
    }},
    {label:'尝试打开办公室大门（四位字母密码）', fn:function(){
      if(S.solved.s2){ sys('门已经开了。'); nav(); return; }
      askPwd('字母密码锁等待输入。你想到了什么？', 4, true, function(v){
        if(v === 'CXQD'){
          S.solved.s2 = true; save();
          get('锁芯轻响，办公室的门开了。');
          addBag('铜制钥匙');
          addClue('阅览区密码：CXQD');
          nav();
        } else {
          err('字母顺序不对，锁没有反应。');
          menu1();
        }
      });
    }},
    {label:'离开这里（查看可去之处）', fn:function(){ nav(); }}
  ]);
}

// ============ 场景三：管理员办公室 ============
function scene2(){
  locEl.textContent = '管理员办公室';
  sys('—— 场景三 · 管理员办公室 ——');
  p('狭小的办公室里，办公桌上散落着手写日志，墙上挂着停摆的钟表挂画，角落里一台老式座机电话蒙着灰，桌下有一个带密码锁的抽屉。');
  menu2();
}
function menu2(){
  choices([
    {label:'翻阅手写日志', fn:function(){
      p('日志上写着：<b>“我每日固定两点整理档案，五点核对记录，八点封存归档。”</b>');
      addClue('日志：两点、五点、八点'); menu2();
    }},
    {label:'观察钟表挂画', fn:function(){
      p('钟表的指针永远停在两点、五点、八点三个整点上，像是刻意为之。');
      addClue('钟表：停在 2 / 5 / 8 点'); menu2();
    }},
    {label:'查看座机电话', fn:function(){
      p('按键旁刻着小字：<b>“朝夕对应晨昏，朝为始，昏为终。”</b>似乎在铺垫着什么。');
      addClue('电话刻字：朝为始，昏为终'); menu2();
    }},
    {label:'打开密码抽屉（六位数字密码）', fn:function(){
      if(S.solved.s3){ sys('抽屉已经打开了。'); nav(); return; }
      askPwd('抽屉上有六位数字滚轮。你想到了哪三个时间？', 6, false, function(v){
        if(v === '020508'){
          S.solved.s3 = true; save();
          get('抽屉弹开，里面躺着一枚密钥碎片和一张纸条。');
          addBag('密钥碎片A');
          addClue('纸条：终门密码，藏在四季与朝夕之中');
          nav();
        } else {
          err('滚轮卡住了，数字不对。');
          menu2();
        }
      });
    }},
    {label:'离开这里（查看可去之处）', fn:function(){ nav(); }}
  ]);
}

// ============ 场景四：终极出口 ============
function scene3(){
  locEl.textContent = '终极出口';
  sys('—— 场景四 · 终极出口 ——');
  p('你回到入口大厅，大门的另一侧浮现出最后一道密码锁——六位混合密码。所有的线索在你脑中回响：四季首月 03、06、09、12；工作时间 02、05、08；以及那句“以朝夕为核，四季为辅”。');
  menu3();
}
function menu3(){
  choices([
    {label:'回顾所有线索', fn:function(){
      p('四季首月：<b>03、06、09、12</b>（取首尾两组）；工作时间：<b>02、05、08</b>（核心固定时间）。日志最终提示：<b>“以朝夕为核，四季为辅。”</b>');
      menu3();
    }},
    {label:'输入终极密码（六位数字）', fn:function(){
      if(S.ended){ sys('大门已经开启。'); return; }
      askPwd('最后六位密码，藏在你一路收集的所有记录里。', 6, false, function(v){
        if(v === '020812'){
          S.ended = true; S.solved.s4 = true; save();
          get('锁链层层脱落，大门缓缓开启——');
          p('<div class="ending">【完美通关】<br><br>你集齐所有线索，解开了档案室的封印。<br>管理员早已将空间留给有缘人，所有尘封的记录得以重见天日。<br>你成功逃离暮夜档案室。<br><br>—— 封存纪年 · 终 ——</div>');
          addBag('通关海报');
          addClue('彩蛋剧情：管理员在等待有缘人');
          sys('感谢游玩。点击“重新开始”可再次体验。');
        } else {
          err('密码锁发出低沉的嗡鸣，还差一点点。');
          menu3();
        }
      });
    }},
    {label:'离开这里（查看可去之处）', fn:function(){ nav(); }}
  ]);
}

var sceneFns = [scene0, scene1, scene2, scene3];
function gotoScene(i){
  S.scene = i; save();
  sceneFns[i]();
}

// ============ 提示 / 重置 ============
var hintTexts = [
  '大厅：公告板说“每季首日”，再看日历上四季的标记月份。',
  '阅览区：笔记给出顺序“春夏秋冬”，档案架给出对应首字母。',
  '办公室：日志里的三个整点时间，按顺序排列。',
  '出口：以工作时间（朝夕）为核心，四季首月首尾为辅。'
];
document.getElementById('btnHint').onclick = function(){
  if(S.hints <= 0){ sys('提示次数已用完。'); return; }
  S.hints--; save(); renderSide();
  sys('【提示】' + hintTexts[S.scene]);
};
document.getElementById('btnReset').onclick = function(){
  if(confirm('确定要清空存档，重新开始吗？')){
    localStorage.removeItem('fcjn_text_save');
    location.reload();
  }
};

// ============ 启动 ============
sys('城市老城区有一座尘封二十年的老旧档案室。多年前管理员无故离职，所有记录被封存，无人踏足。');
sys('你因偶然的系统漏洞，误入了档案室的线上虚拟存档空间。空间被程序锁定，只有破解管理员留下的层层谜题，集齐密钥，才能逃离。');
sys('随着解谜深入，你渐渐意识到：管理员并非无故消失，而是留下了所有线索，等待有人解开最后的秘密。');
p('');
renderSide();
if(S.ended){
  p('<div class="ending">你已完成通关。<br>点击“重新开始”可再次体验。</div>');
} else {
  sceneFns[S.scene]();
}

