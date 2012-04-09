// helpers
// ===================

// | index
// | -----------------
// | - functions
// | -----------------
// | -- jsEnable()    | remove no-js class
// | -- log('msg')    | controlled by debug = true        | in app.js to log messages
// | -- doOnce        | $('#el').doOnce(function(){...})  | it won't trigger twice if no element found
// | -- get max size  | $('el').maxSize('width') / height | gets the max size or an array
// | -- smooth scroll | goToByScroll(id);
// | -- sample        | img <img src="http://sample" data-height="200" data-width="100" />

// | -----------------
// | - plugins
// | -----------------
// | -- lazyload  | $('img.lazy').lazyload({threshold: 30}); // the threashold is to tell the browser to load when it about 30px close to the content
// | -- devSizing | $('selector').devSizing({content:'img'}); // auto height if it longer than width, default selects the images within selector.

// Debug function
function log(v) {
    // check if $log is true
    if ( $log ) console.log(v);
}   

// js enabled class
jsEnable = (function(){
    $('html').removeClass('no-js');
})();

// Do once function similar to if $.length
// $('#el').doOnce(function(){ /* method */ })
jQuery.fn.doOnce = function(func) { 
    this.length && func.apply(this);
    return this;
}

// Get max height/width
// $('el').maxSize('width')
jQuery.maxSize = function(type){ 
    var max = 0;
    if ( type == 'width' ) {
        this.each(function(){ max = Math.max( max, $(this).width() ) });
    }
    else  {
        this.each(function(){ max = Math.max( max, $(this).height() ) });
    }
    return max;
}

// smooth scroll to id jquery plugin  $('#fsetbtn').removeAttr("href").click(function(){ goToByScroll('fireset'); });
function goToByScroll(id){
    $('html,body').animate({scrollTop: $("#"+id).offset().top}, 1000);
}

// sample image placeholder
var Sample = (function(){ 

    if ( $('img[src*="http://sample"]') ) {
        $('img[src*="http://sample"]').each(function(){
            var $h = $(this).data('height') ? $(this).data('height') : 'auto';
            var $w = $(this).data('width') ? $(this).data('width') : '100%';
            
            if ( $w < 200 ) {
                var $t = 'h5';
            } else if ( $w < 300 ) {
                var $t = 'h4';
            } else {
                var $t = 'h3';
            }
                
            $(this).css({height:$h,width:$w});

            $(this).wrap('<div class="sampleContainer"/>')
                   .parent().css({
                        color:'#ddd',
                        background:'#ccc',
                        height: $h,
                        width: $w,
                        position: 'relative',
                   })
                   .prepend( '<' + $t + ' style="position:absolute; top:50%; left:50%; width:160px; height:30px; margin: -15px -80px; text-align:center; color:#444; ">' + $(this).outerWidth() + ' x ' + $(this).height() + '</' + $t + '>' )
                   .end().hide()
        });
    }

    var destroy = function(){
        if ( $('img[src*="http://sample"]') ) {
                $(this).unwrap()
                       .show();
        }
    }
});

// -----------------
// plugins
// -----------------
// lazyload
(function($){
    $.fn.lazyload = function(options){
        var opts = $.extend($.fn.lazyload.defaults, options);
        var elements = this;
        $(window).bind('scroll', function(e){
            loadAboveTheFoldImages(elements, opts);
        });
        loadAboveTheFoldImages(elements, opts);
        return this;
    };
    
    $.fn.lazyload.defaults = {threshold: 0};

    function aboveTheFold(element, options){
        var fold = $(window).height() + $(window).scrollTop();
        return fold >= $(element).offset().top - (options['threshold']);
    };

    function loadOriginalImage(element){
        $(element).attr('src', $(element).attr('original-src')).removeAttr('original-src');
    };

    function loadAboveTheFoldImages(elements, options){
        elements.each(function(){
            if (aboveTheFold(this, options) && ($(this).attr('original-src'))){
                loadOriginalImage(this);
            }
        });
    };
})(jQuery);

// devSizing
(function($){ 
    $.fn.extend({
        devSizing: function(options){
            var defaults = {
                content : 'img'
            };
            var options = $.extend(defaults, options);
            return this.each(function(){
                var o = options;
                var obj = $(this);
                
                $(window).load(function(){ 
                    var w  = obj.outerWidth(),
                        h  = obj.height();

                    if(h > w){
                        obj.find(o.content).css({
                            'height': w,
                            'width' : 'auto'
                        });

                        // define new width and center the img
                        var newWidth = obj.find(o.content).outerWidth(),
                            center  = (w - newWidth)/2;

                        obj.find(o.content).css({
                            'margin-left': center
                        });
                    }
                }); //end window.load

            });
        }
    });
})(jQuery); //end devSizing

$(window).on('load resize', function(){
    Sample.destroy;
    Sample();
});
