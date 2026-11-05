// 页面加载后触发卡片入场动画
window.addEventListener('DOMContentLoaded', function () {
    var card = document.querySelector('.card');
    // 延迟一点点再显示，动画更自然
    setTimeout(function () {
        card.classList.add('visible');
    }, 100);
});
