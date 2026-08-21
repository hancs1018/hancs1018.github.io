// 页面加载后触发卡片入场动画
window.addEventListener('DOMContentLoaded', function () {
    var card = document.querySelector('.card');
    // 延迟一点点再显示，动画更自然
    setTimeout(function () {
        card.classList.add('visible');
    }, 100);
});

// 卡片跟随鼠标轻微倾斜（3D 视差效果）
document.addEventListener('mousemove', function (e) {
    var card = document.querySelector('.card');
    if (!card.classList.contains('visible')) return;

    var x = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 ~ 1
    var y = (e.clientY / window.innerHeight - 0.5) * 2;  // -1 ~ 1

    card.style.transform = 'perspective(900px) rotateY(' + x * 4 + 'deg) rotateX(' + (-y * 4) + 'deg)';
});

document.addEventListener('mouseleave', function () {
    var card = document.querySelector('.card');
    card.style.transform = '';
});
