/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

/* 自定义配置 */
/* 尚未完善 */
$(function () {
    let url = "../setting.json"
    $.getJSON(
        url,
        function (data) {
            /* 页头数据 */
            $('title').text(data.title);
            $('#loading-title').html(data.title);
            $("meta[name='description']").attr('content', data.description);
            $("meta[name='keywords']").attr('content', data.keywords);
            $("meta[name='author']").attr('content', data.author);
        }
    )
});

// 背景图片 Cookies 
function setBgImg(bg_img) {
    if (bg_img) {
        Cookies.set('bg_img', bg_img, {
            expires: 36500
        });
        return true;
    }
    return false;
};

// 获取背景图片 Cookies
function getBgImg() {
    let bg_img_local = Cookies.get('bg_img');
    if (bg_img_local && bg_img_local !== "{}") {
        return JSON.parse(bg_img_local);
    } else {
        setBgImg(bg_img_preinstall);
        return bg_img_preinstall;
    }
}

let bg_img_preinstall = {
    "type": "1", // 1:默认背景 2:每日一图 3:随机风景 4:随机动漫
    "2": "https://api.dujin.org/bing/1920.php", // 每日一图
    "3": "https://api.ixiaowai.cn/gqapi/gqapi.php", // 随机风景
    "4": "https://api.ixiaowai.cn/api/api.php" // 随机动漫
};

// 壁纸URL列表
const wallpapers = [
    "https://easy.fxx6.top/i/2024/06/11/s5gcsm.png",
    "https://easy.fxx6.top/i/2024/06/11/s5h5z9.png",
    "https://easy.fxx6.top/i/2024/06/11/s5hjnu.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5hi3e.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5idcg.png",
    "https://easy.fxx6.top/i/2024/06/11/s5ifox.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5iryb.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5j73b.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5jmv5.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5jrb7.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5k0qb.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5ke1u.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5ko1f.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5kwp7.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5l4os.png",
    "https://easy.fxx6.top/i/2024/06/11/s5lddt.png",
    "https://easy.fxx6.top/i/2024/06/11/s5lfnb.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5mcmt.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5n0wg.png",
    "https://easy.fxx6.top/i/2024/06/11/s5n9ex.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5ndpm.jpg",
    "https://easy.fxx6.top/i/2024/06/11/s5y56v.jpg",
    "./img/background1.webp",
    "./img/background2.webp",
    "./img/background3.webp",
    "./img/background4.webp",
    "./img/background5.webp",
    "./img/background6.webp",
    "./img/background7.webp",
    "./img/background8.webp",
    "./img/background9.webp",
    "./img/background10.webp",
  ];
  
  // 获取随机壁纸URL的函数
  function getRandomWallpaper() {
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[randomIndex];
  }


$(document).ready(function () {
    // 壁纸数据加载
    // setBgImgInit();
    $('#bg').attr('src', getRandomWallpaper());

});