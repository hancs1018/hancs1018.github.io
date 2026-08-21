// ==================== 骰子系统 ====================

const Dice = {
  // 掷出 1~6
  roll() {
    return Math.floor(Math.random() * 6) + 1;
  },

  // 播放骰子动画，最终定格在 result，返回 Promise
  animate(el, result) {
    return new Promise(resolve => {
      const faces = el.querySelectorAll('.dice-face');
      let frames = 0;
      const totalFrames = Math.floor(ANIM.diceRoll / ANIM.diceFrame);

      const timer = setInterval(() => {
        const tempValue = this.roll();
        this.renderFace(el, tempValue);
        el.classList.add('rolling');
        frames++;
        if (frames >= totalFrames) {
          clearInterval(timer);
          el.classList.remove('rolling');
          this.renderFace(el, result);
          resolve(result);
        }
      }, ANIM.diceFrame);
    });
  },

  // 渲染骰面点数
  renderFace(el, value) {
    el.innerHTML = '';
    el.dataset.value = value;
    // 六面骰点数布局（3x3 grid 中点的位置）
    const layouts = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };
    for (let i = 0; i < 9; i++) {
      const dot = document.createElement('div');
      dot.className = layouts[value].includes(i) ? 'dot on' : 'dot';
      el.appendChild(dot);
    }
  }
};
