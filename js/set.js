/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

/* 自定义配置 */
/* 尚未完善 */
$(function () {
    let url = '../setting.json';
    $.getJSON(url, function (data) {
        /* 页头数据 */
        $('title').text(data.title);
        $('#loading-title').html(data.title);
        $("meta[name='description']").attr('content', data.description);
        $("meta[name='keywords']").attr('content', data.keywords);
        $("meta[name='author']").attr('content', data.author);
        setCookies('bottom_info', data.bottom_info);
        if (data.bottom_info.length > 0) {
            handleSocialLinks(data.bottom_info);
        }
    });
});

// 处理社交链接
function handleSocialLinks(data) {
    const social = $('#social');
    social.empty(); // 清空现有内容

    // 遍历bottom_info数据
    data.forEach((item, index) => {
        let socialLink;

        if (item.img_url) {
            const img = new Image();
            img.src = item.img_url;
            // 有图片URL的情况，添加点击事件
            socialLink = $(`<a href="javascript:void(0)" class="link" id="${item.title}" style="${index === 0 ? 'margin-left: 4px' : ''}">
                <i class="${item.icon || 'fa-solid fa-link'}"></i>
            </a>`);

            // 添加点击事件，显示图片到more区域
            socialLink.on('click', function () {
                openMore(`<img src="${item.img_url}" alt="${item.title}" style="width: 20rem; height: 20rem" />`);
            });
        } else if (item.url) {
            // 有URL的情况，直接跳转链接
            socialLink = $(`<a href="${item.url}" class="link" id="${item.title}" target="_blank" style="${index === 0 ? 'margin-left: 4px' : ''}">
                <i class="${item.icon || 'fa-solid fa-link'}"></i>
            </a>`);
        }

        // 添加到social容器
        if (socialLink) {
            social.append(socialLink);
        }
    });
}

function setCookies(key, value) {
    if (!key) return;
    Cookies.set(key, value, {
        expires: 36500,
    });
}

function getCookies(key) {
    if (!key) return;
    const value = Cookies.get(key);
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

// 壁纸URL列表
const wallpapers = [
    'https://easy.fxx6.top/i/2024/06/11/s5hi3e.jpg',
    'https://easy.fxx6.top/i/2024/06/11/s5idcg.png',
    'https://easy.fxx6.top/i/2024/06/11/s5kwp7.jpg',
    'https://easy.fxx6.top/i/2024/06/11/s5n0wg.png',
];

// 获取随机壁纸URL的函数
function getRandomWallpaper() {
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[randomIndex];
}

$(document).ready(function () {
    // 壁纸数据加载
    $('#bg').attr('src', getRandomWallpaper());
});
