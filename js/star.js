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

    // 声明显示区域的宽度和高度
    let showWidth, showHeight;

    // 存储动画状态变量
    let drawTimes = 0;
    let animationRunning = true;

    // 星星数组
    const stars = [];

    // 上下文引用
    let showContext;
    let helpContext;

    // 长边长度
    let longSide;

    // 初始化canvas尺寸和上下文
    function initCanvas() {
        // 保存之前的旋转角度
        let rotation = 0;
        if (showContext) {
            // 如果已经存在上下文，保存当前的变换状态
            const currentTransform = showContext.getTransform();
            // 提取旋转角度（简化版，实际角度可能需要从变换矩阵计算）
            rotation = (drawTimes * 0.025 * Math.PI) / 180;
        }

        // 设置canvas尺寸
        show.width = showWidth = show.offsetWidth;
        show.height = showHeight = show.offsetHeight;

        longSide = Math.max(showWidth, showHeight);
        // 使用长边构造成一个大点的正方形
        help.width = longSide * 2.6;
        help.height = longSide * 2.6;

        // 重新获取上下文
        showContext = show.getContext('2d');
        helpContext = help.getContext('2d');

        // 设置显示区域背景色
        showContext.fillStyle = 'rgba(0,0,0,1)';
        showContext.fillRect(0, 0, showWidth, showHeight);

        // 根据比例调整圆心
        if (showWidth < showHeight) {
            showContext.translate(showWidth, showHeight);
        } else {
            showContext.translate(showWidth, 0);
        }

        // 恢复之前的旋转状态
        if (rotation !== 0) {
            showContext.rotate(rotation);
        }

        // 如果stars为空，初始化星星
        if (stars.length === 0) {
            initStars();
            drawStar(); // 初始绘制星星到辅助canvas
        }
    }

    // 创建随机数
    function rand(Min, Max) {
        return Min + Math.round(Math.random() * (Max - Min));
    }

    // 随机颜色（指定范围）
    function randomColor() {
        const r = rand(120, 255);
        const g = rand(120, 255);
        const b = rand(120, 255);
        const a = rand(30, 100) / 100;
        return `rgba(${r},${g},${b},${a})`;
    }

    // 创建每个星星的属性
    function createStar() {
        return {
            x: rand(-help.width, help.width),
            y: rand(-help.height, help.height),
            size: 1.2,
            color: randomColor(),
        };
    }

    // 初始化星星
    function initStars() {
        stars.length = 0; // 清空数组
        let count = 18000;
        while (count--) {
            stars.push(createStar());
        }
    }

    // 绘制星星实例
    function drawStar() {
        helpContext.clearRect(0, 0, help.width, help.height);
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

    // 循环
    function loop() {
        if (!animationRunning) return;

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

    // 动画循环
    function animate() {
        if (!animationRunning) return;
        requestAnimationFrame(animate);
        loop();
    }

    // 启动动画
    function startAnimation() {
        if (animationRunning) return;
        animationRunning = true;
        animate();
    }

    // 停止动画
    function stopAnimation() {
        animationRunning = false;
    }

    // 重置动画
    function resetAnimation() {
        drawTimes = 0;
        initCanvas();
        if (!animationRunning) {
            startAnimation();
        }
    }

    // 处理窗口大小变化
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // 取消之前的延迟执行
        if (resizeTimeout) clearTimeout(resizeTimeout);

        // 延迟执行以避免频繁重置
        resizeTimeout = setTimeout(() => {
            resetAnimation();
        }, 200);
    });

    // 初始化并开始动画
    initCanvas();
    startAnimation();

    // 返回控制接口，以便外部可以控制动画
    return {
        start: startAnimation,
        stop: stopAnimation,
        reset: resetAnimation,
    };
}

// 如果在页面加载后自动初始化，可以取消下面的注释
/*
  document.addEventListener('DOMContentLoaded', function() {
    // 默认使用ID为'starTrails'的canvas
    const defaultCanvasId = 'starTrails';
    if (document.getElementById(defaultCanvasId)) {
      createStarTrails(defaultCanvasId);
    }
  });
  */
