//全局通用的一些函数或者一开始要执行的全局代码

function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function width() {
    return document.documentElement.clientWidth;
}

function height() {
    return document.documentElement.clientHeight;
}

// 轮播图
// 创建一个轮播图区域
function createCarousel(carouselID, datas) {
    var curIndex = 0;//当前显示图片的索引

    // 获取所有dom元素
    var container = document.getElementById(carouselID);
    var carouselList = container.querySelector(".g_carousel-list");
    var carouselIndi = container.querySelector(".g_carousel-indicator");
    var prev = container.querySelector(".g_carousel-prev");
    var next = container.querySelector(".g_carousel-next");

    //创建轮播图中的元素
    function createCarouselElements() {
        var listHtml = "";
        var indiHtml = "";

        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            if (data.link) {
                listHtml += `<li>
                            <a href="${data.link}" target="_blank">
                                <img src="${data.image}">
                            </a>
                        </li>`
            } else {
                listHtml += `<li>
                            <img src="${data.image}">
                        </li>`
            }

            indiHtml += "<li></li>";
        }
        carouselList.style.width = `${datas.length}00%`;
        carouselList.innerHTML = listHtml;
        carouselIndi.innerHTML = indiHtml;
    }

    createCarouselElements();

    // 设置正确的状态
    function setStatus() {
        carouselList.style.marginLeft = -curIndex * width() + "px";

        // 设置指示器状态
        // 取消之前的指示器selected
        var beforeSelected = carouselIndi.querySelector(".selected");
        if (beforeSelected) {
            beforeSelected.classList.remove("selected");
        }

        carouselIndi.children[curIndex].classList.add("selected");

        // 处理前一张和后一张按钮
        if (prev) {
            if (curIndex === 0) {
                // 目前是第一张图
                prev.classList.add("disabled"); // 不可用样式
            } else {
                prev.classList.remove("disabled"); // 不可用样式
            }
        }

        if (next) {
            if (curIndex === datas.length - 1) {
                // 目前是最后一张图
                next.classList.add("disabled"); // 不可用样式
            } else {
                next.classList.remove("disabled"); // 不可用样式
            }
        }
    }

    setStatus();


    //上一张
    function toPrev() {
        if (curIndex === 0) {
            return;
        }
        curIndex--;
        setStatus();
    }

    //下一张
    function toNext() {
        if (curIndex === datas.length - 1) {
            return;
        }
        curIndex++;
        setStatus();
    }


    var timer = null; //自动切换的计时器

    // 开始自动切换
    function start() {
        if (timer) {
            return;
        }
        timer = setInterval(function () {
            curIndex++;
            if (curIndex === datas.length) {
                curIndex = 0;
            }
            setStatus();
        }, 2000);
    }

    //停止自动切换
    function stop() {
        clearInterval(timer);
        timer = null;
    }

    start();


    // 事件
    if (prev) {
        prev.onclick = toPrev;
    }
    if (next) {
        next.onclick = toNext;
    }


    //手指滑动
    container.ontouchstart = function (e) {
        e.stopPropagation();//阻止事件冒泡，防止在滑动图片的同时切换页面
        var x = e.touches[0].clientX;
        stop();//停止自动播放
        carouselList.style.transition = "none";//去掉过渡效果

        var pressTime = Date.now(); //手指按下的时间

        // 监听手指移动事件
        container.ontouchmove = function (e) {
            var dis = e.touches[0].clientX - x;
            carouselList.style.marginLeft = -curIndex * width() + dis + "px";

        };

        // 放手后
        container.ontouchend = function (e) {
            var dis = e.changedTouches[0].clientX - x;
            start();
            carouselList.style.transition = "";//加上过渡效果
            container.ontouchmove = null;

            // 计算滑动的时间
            var duration = Date.now() - pressTime;

            //300毫秒内算快速滑动
            if (duration < 300) {
                if (dis > 20 && curIndex > 0) {
                    toPrev();
                } else if (dis < -20 && curIndex < datas.length - 1) {
                    toNext();
                } else {
                    setStatus();
                }
            } else {
                if (dis < -width() / 2 && curIndex < datas.length - 1) {
                    toNext();
                } else if (dis > width() / 2 && curIndex > 0) {
                    toPrev();
                } else {
                    setStatus();
                }
            }

        };

    };
}



// ajax请求
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
      throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
      headers: {
        target,
      },
    }).then((r) => r.json());
  }