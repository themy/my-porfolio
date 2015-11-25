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

