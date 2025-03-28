/**
 * Star Trails Animation
 * Creates a flowing star trails effect on a canvas element with responsive star density
 * @param {string} canvasId - The ID of the canvas element to use
 */
function createStarTrails(canvasId) {
    // 获取canvas元素
    const show = document.getElementById(canvasId);
    if (!show) {
        console.error(`Canvas element with id "${canvasId}" not found.`);
        return;
    }

    // 创建辅助canvas
    const help = document.createElement('canvas');

    // 声明变量
    let showWidth, showHeight, longSide;
    let drawTimes = 0;

    // 获取上下文
    const showContext = show.getContext('2d');
    const helpContext = help.getContext('2d');

    // 星星数组
    const stars = [];

    // 随机数生成
    function rand(Min, Max) {
        return Min + Math.round(Math.random() * (Max - Min));
    }

    // 随机颜色
    function randomColor() {
        const r = rand(120, 255);
        const g = rand(120, 255);
        const b = rand(120, 255);
        const a = rand(30, 100) / 100;
        return `rgba(${r},${g},${b},${a})`;
    }

    // 创建星星属性
    function createStar() {
        return {
            x: rand(-help.width, help.width),
            y: rand(-help.height, help.height),
            size: rand(8, 12) / 10, // 稍微调整星星大小范围
            color: randomColor(),
        };
    }

    // 根据屏幕宽度计算合适的星星数量
    function calculateStarCount() {
        // 基础数量
        const baseCount = 18000;

        // 根据屏幕宽度调整数量
        if (window.innerWidth <= 480) {
            // 手机屏幕 - 减少到基础的30%
            return Math.floor(baseCount * 0.3);
        } else if (window.innerWidth <= 768) {
            // 平板屏幕 - 减少到基础的50%
            return Math.floor(baseCount * 0.5);
        } else if (window.innerWidth <= 1024) {
            // 小型笔记本 - 减少到基础的70%
            return Math.floor(baseCount * 0.7);
        } else {
            // 大屏幕 - 使用完整数量
            return baseCount;
        }
    }

    // 创建星星
    function createStars() {
        // 清空当前星星
        stars.length = 0;

        // 计算合适的星星数量
        const count = calculateStarCount();
        console.log(`创建${count}颗星星`);

        // 创建星星
        for (let i = 0; i < count; i++) {
            stars.push(createStar());
        }
    }

    // 绘制星星
    function drawStar() {
        // 清空辅助画布
        helpContext.clearRect(0, 0, help.width, help.height);

        // 逐个绘制星星
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            helpContext.beginPath();
            helpContext.arc(star.x, star.y, star.size, 0, Math.PI * 2, true);
            helpContext.fillStyle = star.color;
            helpContext.closePath();
            helpContext.fill();
        }
    }

    // 循环动画
    function loop() {
        // 开始绘制
        showContext.drawImage(help, -help.width / 2, -help.height / 2);

        drawTimes++;

        // 移动端减少渐变效果的频率和强度，提高清晰度
        const fadeInterval = window.innerWidth <= 768 ? 12 : 8;
        const fadeOpacity = window.innerWidth <= 768 ? 0.06 : 0.04;

        if (drawTimes > 200 && drawTimes % fadeInterval === 0) {
            showContext.fillStyle = `rgba(0,0,0,${fadeOpacity})`;
            showContext.fillRect(-(longSide * 3), -(longSide * 3), longSide * 6, longSide * 6);
        }

        // 旋转 - 在移动端减慢旋转速度
        const rotationSpeed = window.innerWidth <= 768 ? 0.018 : 0.025;
        showContext.rotate((rotationSpeed * Math.PI) / 180);
    }

    // 动画函数
    function animate() {
        window.requestAnimationFrame(animate);
        loop();
    }

    // 完全重新初始化
    function reinitialize() {
        // 设置canvas尺寸
        showWidth = show.offsetWidth;
        showHeight = show.offsetHeight;

        show.width = showWidth;
        show.height = showHeight;

        longSide = Math.max(showWidth, showHeight);

        // 调整辅助canvas尺寸
        help.width = longSide * 2.6;
        help.height = longSide * 2.6;

        // 设置背景
        showContext.fillStyle = 'rgba(0,0,0,1)';
        showContext.fillRect(0, 0, showWidth, showHeight);

        // 重置变换
        showContext.setTransform(1, 0, 0, 1, 0, 0);

        // 调整圆心位置
        if (showWidth < showHeight) {
            showContext.translate(showWidth, showHeight);
        } else {
            showContext.translate(showWidth, 0);
        }

        // 重新生成和绘制星星
        createStars();
        drawStar();

        // 重置计数器
        drawTimes = 0;
    }

    // 初始化
    function init() {
        // 设置canvas尺寸
        showWidth = show.offsetWidth;
        showHeight = show.offsetHeight;

        show.width = showWidth;
        show.height = showHeight;

        longSide = Math.max(showWidth, showHeight);

        // 调整辅助canvas尺寸
        help.width = longSide * 2.6;
        help.height = longSide * 2.6;

        // 设置背景
        showContext.fillStyle = 'rgba(0,0,0,1)';
        showContext.fillRect(0, 0, showWidth, showHeight);

        // 重置变换
        showContext.setTransform(1, 0, 0, 1, 0, 0);

        // 调整圆心位置
        if (showWidth < showHeight) {
            showContext.translate(showWidth, showHeight);
        } else {
            showContext.translate(showWidth, 0);
        }
    }

    // 初始化
    init();

    // 创建星星
    createStars();

    // 绘制星星
    drawStar();

    // 启动动画
    animate();

    // 窗口大小变化处理 - 使用防抖动优化性能
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // 清除之前的定时器
        clearTimeout(resizeTimeout);

        // 设置新的定时器
        resizeTimeout = setTimeout(() => {
            // 完全重新初始化
            reinitialize();
        }, 250); // 250ms的防抖动延迟
    });
}
