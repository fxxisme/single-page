/**
 * Star Trails Animation
 * Creates a flowing star trails effect on a canvas element
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
            size: 1.2,
            color: randomColor(),
        };
    }

    // 创建星星
    function createStars() {
        let count = 18000;
        while (count--) {
            stars.push(createStar());
        }
    }

    // 绘制星星
    function drawStar() {
        console.log('绘制星星');
        let count = stars.length;
        while (count--) {
            const star = stars[count];
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

        if (drawTimes > 200 && drawTimes % 8 === 0) {
            showContext.fillStyle = 'rgba(0,0,0,.04)';
            showContext.fillRect(-(longSide * 3), -(longSide * 3), longSide * 6, longSide * 6);
        }

        // 旋转
        showContext.rotate((0.025 * Math.PI) / 180);
    }

    // 动画函数
    function animate() {
        window.requestAnimationFrame(animate);
        loop();
    }

    // 初始化设置
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

    // 窗口大小变化处理
    window.addEventListener('resize', () => {
        // 更新canvas尺寸
        showWidth = show.offsetWidth;
        showHeight = show.offsetHeight;
        show.width = showWidth;
        show.height = showHeight;

        // 设置背景
        showContext.fillStyle = 'rgba(0,0,0,1)';
        showContext.fillRect(0, 0, showWidth, showHeight);

        // // 关键！重置变换矩阵并重新设置translate
        showContext.setTransform(1, 0, 0, 1, 0, 0);
        if (showWidth < showHeight) {
            showContext.translate(showWidth, showHeight);
        } else {
            showContext.translate(showWidth, 0);
        }
    });
}
