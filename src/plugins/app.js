// Index
// ================
// - doc.ready
// - window.load
// - window.resize
// - window.scroll
// - doc.keydown
// - extra functions


// Debug mode
var $log = false // helper.js function; log('message');


/*  doc.ready
 * ==================== */
$(document).ready(function() {

    /* sample log if $log is true */
    log('init');
    
    /* sample tab */
    $('#sampleTab').devTab({nav:true});
    $('#sampleSlideTab').devTab({fx:'slideX', resize:true, menuBot: true});

    $('.popit').devPop({debug:true})
});

/*  window.load
 * ==================== */
$(window).load(function(){ 

});


/*  window.resize
 * ==================== */
$(window).resize(function() {
    
});

/*  window.scroll
 * ==================== */
$(window).scroll(function() {
    
});

/*  window.keydown
 * ==================== */
$(document).keydown(function(e) {
    
});


/*  reuseble functions
 * ==================== */

