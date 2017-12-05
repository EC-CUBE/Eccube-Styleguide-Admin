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