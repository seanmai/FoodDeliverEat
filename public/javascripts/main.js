// $("select")function(){
//     var $select = $(".qty");
//     for (i=1;i<=10;i++){
//         $select.append($('<option></option>').val(i).html(i))
//     }
// });​

// js for sticking category navbar
$(document).ready(function(){
    fixNav();
    setBindings();
});

function fixNav(){
    var navOffset = ($(".navbar-stick").offset().top)-($(".navbar-default").outerHeight());

    $(".navbar-stick").wrap('<div class="nav-placeholder"></div>');
    $(".nav-placeholder").height($(".navbar-stick").outerHeight());

    $(window).scroll(function(){
        var scrollPos = $(window).scrollTop();

         if(scrollPos >= navOffset){
             $(".navbar-stick").addClass("navbar-fixed-top navbar-fixed");
         } else {
             $(".navbar-stick").removeClass(" navbar-fixed-top navbar-fixed");
         }
    });
}

function setBindings(){
    $(".food-category").click(function(e){
        e.preventDefault();
        var sectionId = e.currentTarget.id + "Section";
        $("html, body").animate({
            scrollTop: ($("#" + sectionId).offset().top)-2*($(".navbar-default").outerHeight())
        }, 500);
    });
};
