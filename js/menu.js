(function () {
    // var divSwitch = document.querySelector(".menu_switch");
    // var ulNav = document.querySelector(".menu_nav");

    var divSwitch = $(".menu_switch");
    var ulNav = $(".menu_nav");


    //切换菜单的显示状态
    function toggleNav() {
        //divSwitch 有类样式 menu_switch--expand，则加上，没有则去掉
        // divSwitch.classList 类样式列表
        // H5 API classList.toggle(类名) 可以实现以上功能
        divSwitch.classList.toggle("menu_switch--expand");
        ulNav.classList.toggle("menu_nav--expand");
    }

    divSwitch.onclick = toggleNav;
    
    ulNav.addEventListener("click", function () {
        toggleNav();
      });
}())