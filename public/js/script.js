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
});

/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
/*;(function($, window, undefined) {
    'use strict';

    var pluginName = 'bannerCanvas';
    var privateVar = null;
    var privateMethod = function(el, options) {
        // to do
    };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var that = this;
            this.vars = {
                key: 'value'
            };
            // initialize
            // add events
        },
        publicMethod: function(params) {
            // to do
            $.isFunction(this.options.onCallback) && this.options.onCallback();
            this.element.trigger('customEvent');
        },
        destroy: function() {
            // remove events
            // deinitialize
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function(options, params) {
        return this.each(function() {
            var instance = $.data(this, pluginName);
            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            } else if (instance[options]) {
                instance[options](params);
            }
        });
    };

    $.fn[pluginName].defaults = {
        key: 'value',
        onCallback: null
    };

    $(function() {
        $('[data-' + pluginName + ']').on('customEvent', function(){
            // to do
        });
        $('[data-' + pluginName + ']')[pluginName]({
            key: 'custom'
        });
    });

}(jQuery, window));*/

/**
 *  @Loadmore plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    toggle
 *    destroy
 */
;(function($, window, undefined) {
    var pluginName = 'loadMore';
        win = $(window);

    function Loadmore(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this.init();
    }

    Loadmore.prototype = {
        init: function() {
            var that = this,
                array = [];
            that.vars = {
                gridItem: $(this.options.item, this.element).parent(),
                itemLen: $(this.options.item, this.element).length,
                btn: $(this.options.btn, this.element),
                step: null,
                firstItem: null
            };

            that.vars.step = that.vars.gridItem.data('number');
            that.vars.firstItem = that.vars.gridItem.children().not('.grid-sizer');

            that.vars.firstItem.slice(0, that.vars.step).show();

            $(that.vars.gridItem).isotope();


            that.element.on('click', function(){
                that.show();
            });
        },
        show: function() {
            var that = this;
            that.vars.step += that.vars.step;
            that.vars.firstItem.slice(0, that.vars.step).show();
            $(that.vars.gridItem).isotope();
            if (that.vars.step >= that.vars.itemLen) {
                that.vars.btn.remove();
            }
        },
        destroy: function() {
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function(options, params) {
        return this.each(function() {
            var instance = $.data(this, pluginName);
            if (!instance) {
                $.data(this, pluginName, new Loadmore(this, options));
            } else if (instance[options]) {
                instance[options](params);
            } else {
                window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
            }
        });
    };

    $.fn[pluginName].defaults = {
        item: '.grid-item',
        btn: '.btn-load-more'
    };

    $(function(){
        $('[data-loadmore]')[pluginName]();
        $('.btn-load-more').on('click', function(e){
            e.preventDefault();
            var target = $(this).attr('data-id');
            $(target)['loadMore']();
        });
    });



}(jQuery, window));

