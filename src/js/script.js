// $(document).ready(function(){
//     $('.header-burger, main-nav__list').toggleClass('active')
// })
$(document).ready(function() {
    $('.header-burger').click(function(event) {
        $('.header-burger, .main-nav__list').toggleClass('active');
    });
});