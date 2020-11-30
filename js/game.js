(function () {
    var carouselData = [
        {
            image: "//game.gtimg.cn/images/lolm/m/f_1.jpg",
        },
        {
            image: "//game.gtimg.cn/images/lolm/m/f_2.jpg",
        },
        {
            image: "//game.gtimg.cn/images/lolm/m/f_3.jpg",
        },
    ];
    createCarousel("gameCarousel", carouselData);

    var container = $(".game_container");

    container.ontouchstart = function(e){
        if(container.scrollTop >= 10){
            e.stopPropagation();
        }
    };
}());