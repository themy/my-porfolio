/**
 * @name My porfolio
 * @description Global variables and functions
 * @version 1.0
 */


var Site = (function($, window, undefined) {
    return {
        loadMore: loadMore
    }
});
jQuery(function() {
    // Scroll to TOP
    if($('#to-top').length){
        $('#to-top').on('click', function(e){
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    // Navigation
    $('.navbar-toggle').on('click', function(){
        $('#page').toggleClass("menu-open");
        $('html').toggleClass("menu-block");
        var overlay = $('.overlay');
        var query = Modernizr.mq('(max-width: 768px)');
        if(query && !overlay.length) {
            $('body').append('<div class="overlay in"></div>');
        }
        else {
            overlay.remove();
        }
    });

    var navbar = function(){
        var overlay = $('.overlay');
        var query = Modernizr.mq('(min-width: 768px)');
        if(query && overlay.length) {
            overlay.remove();
        }
    }
    $(window).resize(navbar);

    $(document).on('click', '.overlay', function(){
        $('.navbar-toggle').trigger('click');
    });

    var navItem = $('.navbar-nav > li > a');

    $(navItem).on('click', function(e){
        e.preventDefault();
        var navLink = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(navLink).offset().top
        }, 500);
    });

    // Isotope
    $('.grid-frontend').isotope({
        itemSelector: '.grid-item',
        masonry: {
            columnWidth: '.grid-sizer'
        }
    });

    $('.grid-design').isotope({
        itemSelector: '.grid-item',
        masonry: {
            columnWidth: '.grid-sizer'
        }
    });

    // Slick carousel
    $('.responsive').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    var adjust_size = function() {
        var query = Modernizr.mq('(min-width: 768px)');
        if(query) {
            $('.slick-slide').eq(3).addClass('hidden-slide');
            var isMoving = false;
            $('.responsive').off('touchstart.res').off('mousedown.res').on('touchstart.res mousedown.res', function(){
                isMoving = true;
            }).off('touchmove.res').off('mousemove.res').on('touchmove.res mousemove.res', function(){
                if(isMoving){
                    $('.slick-slide.hidden-slide').removeClass('hidden-slide');
                }
            }).off('touchend.res').off('mouseup.res').on('touchend.res mouseup.res', function(){
                isMoving = false;
            });

            $('.responsive').off('afterChange').on('afterChange', function(event, slick, currentSlide){
                $('.slick-slide').eq(currentSlide - 1).addClass('hidden-slide');
                $('.slick-slide').eq(currentSlide + 3).addClass('hidden-slide');
            });
        }
        else {
            $('.responsive').off('touchstart.res').off('touchmove.res').off('touchend.res')
                .off('mousedown.res').off('mousemove.res').off('mouseup.res').off('afterChange');
            $('.slick-slide.hidden-slide').removeClass('hidden-slide');
        }
    }
    adjust_size();
    $(window).resize(adjust_size);


});
