var showPop = (function () {

    function showPop(id) {
        var container = $("#" + id);
        container.style.display = "";
        if(id === "popVideo"){
            var video = container.querySelector("video");
            video.play();
        }
    }

    // 获取所有的关闭按钮
    var closebtns = $$(".pop_close");
    for (var i = 0; i < closebtns.length; i++) {
        closebtns[i].onclick = function () {
            var container = this.parentElement.parentElement;
            container.style.display = "none";
        }
    }

    // 处理一些特殊的东西
    var popWx = $(".pop_wx");
    var popQq = $(".pop_qq");
    popWx.onclick = function () {
        // classList.add 添加类样式
        popWx.classList.add("selected");
        popQq.classList.remove("selected");
    };

    popQq.onclick = function () {
        popWx.classList.remove("selected");
        popQq.classList.add("selected");
    };

    //处理关闭视频弹窗时，暂停视频
    var videoCloseBtn = $("#popVideo .pop_close");
    videoCloseBtn.addEventListener("click", function(){
        $("#popVideo video").pause();
    })

    return showPop;
}());