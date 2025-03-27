/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

//弹窗样式
iziToast.settings({
    timeout: 10000,
    progressBar: false,
    close: false,
    closeOnEscape: true,
    position: 'topCenter',
    transitionIn: 'bounceInDown',
    transitionOut: 'flipOutX',
    displayMode: 'replace',
    layout: '1',
    backgroundColor: '#00000040',
    titleColor: '#efefef',
    messageColor: '#efefef',
    icon: 'Fontawesome',
    iconColor: '#efefef',
});

//加载完成后执行
window.addEventListener(
    'load',
    function () {
        //载入动画
        $('#loading-box').attr('class', 'loaded');
        $('#bg').css('cssText', 'transform: scale(1);filter: blur(0px);transition: ease 1.5s;');
        $('.cover').css('cssText', 'opacity: 1;transition: ease 1.5s;');
        $('#section').css('cssText', 'transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important');

        //用户欢迎
        setTimeout(function () {
            iziToast.show({
                timeout: 2500,
                icon: false,
                title: hello,
                message: '欢迎来到我的主页',
            });
        }, 800);
        createStarTrails('startrack');
    },
    false
);

setTimeout(function () {
    $('#loading-text').html('字体及文件加载可能需要一定时间');
}, 3000);

//获取一言
fetch('https://v1.hitokoto.cn?max_length=24')
    .then((response) => response.json())
    .then((data) => {
        $('#change1').html(data.hitokoto);
        $('#from').html(data.from);
    })
    .catch(console.error);

let times = 0;
$('#hitokoto').click(function () {
    if (times == 0) {
        times = 1;
        let index = setInterval(function () {
            times--;
            if (times == 0) {
                clearInterval(index);
            }
        }, 1000);
        fetch('https://v1.hitokoto.cn?max_length=24')
            .then((response) => response.json())
            .then((data) => {
                $('#change1').html(data.hitokoto);
                $('#from').html(data.from);
            })
            .catch(console.error);
    } else {
        iziToast.show({
            timeout: 1000,
            icon: 'fa-solid fa-circle-exclamation',
            message: '你点太快了吧',
        });
    }
});

//获取天气
//请前往 https://www.mxnzp.com/doc/list 申请 app_id 和 app_secret
//请前往 https://dev.qweather.com/ 申请 key
const add_id = 'vcpmlmqiqnjpxwq1'; // app_id
const app_secret = 'PeYnsesgkmK7qREhIFppIcsoN0ZShv3c'; // app_secret
const key = '691d007d585841c09e9b41e79853ecc2'; // key
function getWeather() {
    fetch('https://www.mxnzp.com/api/ip/self?app_id=' + add_id + '&app_secret=' + app_secret)
        .then((response) => response.json())
        .then((data) => {
            let str = data.data.city;
            let city = str.replace(/市/g, '');
            console.log(data, 'sssss');
            $('#city_text').html(city);
            fetch('https://geoapi.qweather.com/v2/city/lookup?location=' + city + '&number=1&key=' + key)
                .then((response) => response.json())
                .then((location) => {
                    let id = location.location[0].id;
                    fetch('https://devapi.qweather.com/v7/weather/now?location=' + id + '&key=' + key)
                        .then((response) => response.json())
                        .then((weather) => {
                            $('#wea_text').html(weather.now.text);
                            $('#tem_text').html(weather.now.temp + '°C&nbsp;');
                            $('#win_text').html(weather.now.windDir);
                            $('#win_speed').html(weather.now.windScale + '级');
                        });
                });
        })
        .catch(console.error);
}

getWeather();

let wea = 0;
$('#upWeather').click(function () {
    if (wea == 0) {
        wea = 1;
        let index = setInterval(function () {
            wea--;
            if (wea == 0) {
                clearInterval(index);
            }
        }, 60000);
        getWeather();
        iziToast.show({
            timeout: 2000,
            icon: 'fa-solid fa-cloud-sun',
            message: '实时天气已更新',
        });
    } else {
        iziToast.show({
            timeout: 1000,
            icon: 'fa-solid fa-circle-exclamation',
            message: '请稍后再更新哦',
        });
    }
});

//获取时间
let t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    let y = dt.getYear() + 1900;
    let mm = dt.getMonth() + 1;
    let d = dt.getDate();
    let weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let day = dt.getDay();
    let h = dt.getHours();
    let m = dt.getMinutes();
    let s = dt.getSeconds();
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    $('#time').html(
        y + '&nbsp;年&nbsp;' + mm + '&nbsp;月&nbsp;' + d + '&nbsp;日&nbsp;' + "<span class='weekday'>" + weekday[day] + '</span><br>' + "<span class='time-text'>" + h + ':' + m + ':' + s + '</span>'
    );
    t = setTimeout(time, 1000);
}

//自动变灰
let myDate = new Date();
let mon = myDate.getMonth() + 1;
let date = myDate.getDate();
let days = ['4.4', '5.12', '7.7', '9.9', '9.18', '12.13'];
for (let day of days) {
    let d = day.split('.');
    if (mon == d[0] && date == d[1]) {
        document.write(
            '<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>'
        );
        $('#change').html('Silence&nbsp;in&nbsp;silence');
        $('#change1').html('今天是中国国家纪念日，全站已切换为黑白模式');
        window.addEventListener(
            'load',
            function () {
                setTimeout(function () {
                    iziToast.show({
                        timeout: 14000,
                        icon: 'fa-solid fa-clock',
                        message: '今天是中国国家纪念日',
                    });
                }, 3800);
            },
            false
        );
    }
}

function openMore(content) {
    if (content) {
        $('#more .more-content').append(content);
    }
    $('#container').attr('class', 'container mores');
}

function closeMore() {
    $('#container').attr('class', 'container');
    $('#more .more-content').empty();
}

//更多页面切换

$('#switchmore').on('click', function () {
    openMore();
});

//更多页面关闭按钮
$('#close').on('click', function () {
    closeMore();
});

//监听网页宽度
window.addEventListener('load', function () {
    window.addEventListener('resize', function () {
        //关闭移动端样式
        if (window.innerWidth >= 600) {
            $('#row').attr('class', 'row');
            $('#menu').html("<i class='fa-solid fa-bars'></i>");
            //移除移动端切换功能区
            $('#rightone').attr('class', 'row rightone');
        }

        if (window.innerWidth <= 990) {
            //移动端隐藏更多页面
            $('#container').attr('class', 'container');

            //移动端隐藏弹窗页面
            $('#box').css('display', 'none');
            $('#row').css('display', 'flex');
            $('#more').css('display', 'flex');
        }
    });
});

//移动端切换功能区
let changemore = false;
$('#changemore').on('click', function () {
    changemore = !changemore;
    if (changemore) {
        $('#rightone').attr('class', 'row menus mobile');
    } else {
        $('#rightone').attr('class', 'row menus');
    }
});

//更多页面显示关闭按钮
$('#more').hover(
    function () {
        $('#close').css('display', 'block');
    },
    function () {
        $('#close').css('display', 'none');
    }
);
