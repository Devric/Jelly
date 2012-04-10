// development helpers
// ===================
// | -- sample        | img <img src="http://sample" data-height="200" data-width="100" />


// initiators
// ===================
$(window).load(function(){
    Sample.create();
});
$(window).resize(function(){
    Sample.destroy();
    Sample.create();
});




// functions
// ===================

// sample image placeholder
var Sample = {
        create : function() {

            if ( $('img[src*="http://sample"]') ) {
                $('img[src*="http://sample"]').each(function(){
                    var $h = $(this).data('height') ? $(this).data('height') : 'auto';
                    var $w = $(this).data('width') ? $(this).data('width') : '100%';
                    
                    var $t = 'h5';
                        
                    $(this).css({height:$h,width:$w});

                    $(this).wrap('<div class="sampleContainer"/>')
                        .parent().css({
                                color:'#ddd',
                                background:'#c3c3c3',
                                height: $h,
                                width: $w,
                                position: 'relative',
                        })
                        .prepend( '<' + $t + ' style="position:absolute; top:50%; left:50%; width:80px; height:15px; margin: -7px -40px; text-align:center; color:#444; ">' + $(this).outerWidth() + ' x ' + $(this).height() + '</' + $t + '>' )
                        .end().hide()
                });
            }

        }
        ,
        destroy : function() {
            if ( $('img[src*="http://sample"]') ) {
                    $('img[src*="http://sample"]').parent()
                        .find('h2, h3, h4, h5')
                        .remove();
                    $('img[src*="http://sample"]').unwrap()
                        .show();
            }
        }
};

