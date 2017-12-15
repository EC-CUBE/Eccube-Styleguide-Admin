//mainNavArea　toggle
var mainNavArea = function(){
    $(function () {
        $(".c-headerBar__toggleBtn").on('click',function () {
            $(".c-mainNavArea").toggleClass("is-active");
            $(".c-curtain").toggleClass("is-active");
        });

        $(".c-curtain").on('click',function () {
            $(".c-mainNavArea").toggleClass("is-active");
            $(".c-curtain").toggleClass("is-active");
        });
    })
};

mainNavArea();

//Bootstrap ツールチップ
var toolTip = function(){
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
};

toolTip();

//popover ポップオーバー
// header
var popoverHeader = function(){
    $(function () {
        $('.c-headerBar__userMenu').popover({
            container: 'body'
        })
    })
};
popoverHeader();
// all page
var popoverAll = function(){
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
};
popoverAll();