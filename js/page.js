var showPage = (function () {
    // 当前显示页面的索引
    var pageIndex = 0;
    //下一页面的索引
    var nextIndex = null;

    //获取所有页面元素
    var pages = $$(".page_container .page");

    // 设置静止状态下的各种样式
    function setStatic() {
        nextIndex = null;
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i]; // 一个页面一个页面的去设置
            if (i === pageIndex) {
                // 这个页面就是目前显示的页面
                page.style.zIndex = 1;
            } else {
                page.style.zIndex = 10;
            }

            // i   pageIndex    top
            // 0     1          -h
            // 1     1          0
            // 2     1          h
            // 0     2          -2h
            // 1     2          -h
            // 2     2          0
            // 规律 top = (i - pageIndex) * height

            page.style.top = (i - pageIndex) * height() + "px";
        }
    }

    setStatic();

    // dis为偏移量（相对正确的位置）
    function moving(dis) {
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i]; // 一个页面一个页面的去设置
            if (i !== pageIndex) {
                // 这个页面不是目前显示的页面，设置偏移量
                page.style.top = (i - pageIndex) * height() + dis + "px";
            }
        }

        if (dis > 0 && pageIndex > 0) { //下移，且当前页面不是第一页
            nextIndex = pageIndex - 1;
        } else if (dis < 0 && pageIndex < pages.length - 1) { //上移，且当前页面不是最后一页
            nextIndex = pageIndex + 1;
        } else {
            nextIndex = null;
        }
    }


    // 移动完成
    function finishMove() {
        if (nextIndex === null) {
            setStatic();
            return;
        }
        var nextPage = pages[nextIndex];
        nextPage.style.top = 0;
        nextPage.style.transition = ".5s";

        setTimeout(function () {
            // 改变当前页面
            pageIndex = nextIndex;

            //动画完成后将transition属性重置
            nextPage.style.transition = "";
            //设置当前页面，并重新计算位置
            setStatic();
        }, 500);
    }


    // 事件
    var pageContainer = $(".page_container");
    pageContainer.ontouchstart = function (e) {
        var y = e.touches[0].clientY;

        // 监听移动事件
        function handler(e) {
            var dis = e.touches[0].clientY - y;
            if (Math.abs(dis) < 20) {
                // 防止误触
                dis = 0; // 相当于手指没动
            }
            moving(dis);
            // 阻止事件的默认行为
            if (e.cancelable) {
                // 如果事件可以取消
                e.preventDefault(); // 取消事件 - 阻止默认行为
            }
        }
        // 手指按下，监听移动
        pageContainer.addEventListener("touchmove", handler, {
            passive: false,
        });
        // pageContainer.ontouchmove = function (e) {
        //     var dis = e.touches[0].clientY - y;
        //     if (Math.abs(dis) < 20) {//防止误触
        //         dis = 0;
        //     }
        //     moving(dis);
        // }

        // 手指松开,完成移动
        pageContainer.ontouchend = function () {
            finishMove();
            // 取消监听移动事件
            pageContainer.removeEventListener("touchmove", handler);
            // pageContainer.ontouchmove = null;
        }
    }



    // 自动切换到某个板块
    // index：页面索引
    function showPage(index) {
        var nextPage = pages[index]; //下一个页面元素
        if (index < pageIndex) {
            // 下一个页面在当前页面上面
            nextPage.style.top = -height() + "px";
        } else if (index > pageIndex) {
            // 下一个页面在当前页面下面
            nextPage.style.top = height() + "px";
        } else {
            // 下一个页面就是当前页面
            if (pageIndex === 0) {
                // 目前是第一个页面
                pageIndex++;
            } else {
                pageIndex--;
            }
            setStatic(); // 重新设置位置
        }
        // 强行让浏览器渲染
        nextPage.clientHeight; // 读取dom的尺寸和位置，会导致浏览器强行渲染
        nextIndex = index; // 设置下一个页面索引
        finishMove();
    }

    return showPage;
}())