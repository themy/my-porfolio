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
    // Isotope
    setTimeout(function() {
        $('.grid-frontend').isotope({
            itemSelector: '.grid-item',
            masonry: {
              columnWidth: '.grid-sizer'
            }
        });
    }, 500);

    setTimeout(function() {
        $('.grid-design').isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    }, 500);

    // Load element
    $(window).scroll(function(){
        $('.slideanimate').each(function(){
            if($(window).scrollTop() + 600 > $(this).offset().top) {
                console.log("bigger");
                $(this).addClass("slide");
            }
        });
    });

    // Scroll to TOP
    if($('#to-top').length){
        $('#to-top').on('click', function(e){
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

  // Google map

  // Navigation

    // Fixed menu on scrolling
    $(window).scroll(function() {
        var query = Modernizr.mq('(min-width: 768px)');
        if(query) {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 0) {
                $('#navigation').removeClass('static').addClass('fixed');
            }
            else {
                $('#navigation').removeClass('fixed').addClass('static');
            }
        }
    });

    var overlay = $('.overlay');
    $('.toggle').on('click', function(){
      overlay.fadeToggle("slow", "linear");

      $('.navigation').toggleClass("in");
      $(this).toggleClass("is-active");
    });

    $(document).on('touchstart', function(e) {
      var overlay = $('.overlay');
      if(overlay.length) {
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
        $('.toggle').trigger('click');
    });

    var navItem = $('.navbar-nav > li > a');
    $(navItem).on('click', function(e){
        e.preventDefault();
        var hash = this.hash;
        var query = Modernizr.mq('(min-width: 768px)');
        if(query){
            $('html, body').animate({
                scrollTop: $(hash).offset().top -120
            }, 500);
        }
        else {
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500);
        }
    });

    // Slick carousel
    $('#sliderimage').slick({
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

    setTimeout(function() {
        $('#sliderbanner').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            cssEase: 'linear',
            adaptiveHeight: true
        });
    }, 2000);


    var adjust_size = function() {
        var query = Modernizr.mq('(min-width: 768px)');
        if(query) {
            var slickslide = $('#sliderimage .slick-slide');
            slickslide.eq(3).addClass('hidden-slide');
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

            $('#sliderimage').off('afterChange').on('afterChange', function(event, slick, currentSlide){
                slickslide.eq(currentSlide - 1).addClass('hidden-slide');
                slickslide.eq(currentSlide + 3).addClass('hidden-slide');
            });
        }
        else {
            $('#sliderimage').off('touchstart.res').off('touchmove.res').off('touchend.res')
                .off('mousedown.res').off('mousemove.res').off('mouseup.res').off('afterChange');
            slickslide.hasClass('hidden-slide').removeClass('hidden-slide');
        }
    }
    adjust_size();
    $(window).resize(adjust_size);

    var contactForm = $('[name="contact-form"]');
    if(contactForm.length){
        contactForm.find('.close').on('click', function (e) {
            e.preventDefault();
            $(this).parent().addClass('hidden');
        });

        contactForm.on('submit', function(){
            $.ajax({
                url: contactForm.attr('action'),
                type: 'POST',
                data: contactForm.serialize(),
                success: function(data) {
                    if(data.error){
                        $('.alert.alert-success').addClass('hidden');
                        $('.alert.alert-danger').removeClass('hidden');

                    }
                    else{
                        $('.alert.alert-success').removeClass('hidden');
                        $('.alert.alert-danger').addClass('hidden');
                        contactForm[0].reset();
                    }

                },
                error: function() {
                    $('.alert.alert-success').addClass('hidden');
                    $('.alert.alert-danger').removeClass('hidden');
                }
            });

            return false;
        });
    }

    function initialize(){
      var mapProp = {
        center: new google.maps.LatLng(51.508742,-0.120850),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map= new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
});

