$(document).ready(function(){
    //initialise galleria
    Galleria.loadTheme('/wp-content/plugins/tip-galleria/galleria/themes/classic/galleria.classic.js');
    Galleria.run('#galleria', {
        dataSource: data,
        preload: 2,
        transition: 'fade',
        transitionSpeed: 25,
        trueFullscreen: false,
        maxScaleRatio:1
        });

    $(".gallery-item a").click(function(e){
        e.preventDefault();
        $("html").css("overflow", "hidden");
        var g = Galleria.get(0);
        g.resize();
        $('#galleria').fadeIn();
        $('#closeit').fadeTo(300, 0.90);
        var wWidth = $(window).width();
        var wHeight = $(window).height();
        var dHeight = $(document).height();
        var gWidth = $('#galleria').width();
        var gHeight = $('#galleria').height();
        //$('#overlay').width(gWidth);
        //$('#overlay').height(gHeight);
  /*    
        $('#galleria').css('top', ((wHeight)/2)-((gHeight)/2)+'px');
        $('#galleria').css('left', ((wWidth)/2)-((gWidth)/2)+'px');

        $('#closeit').css('left', ((gWidth/2)+10)+'px');
        $('#closeit').css('top', ((wHeight)/2)-((gHeight)/2)+'px');
        $('#closeit').css('position', 'relative');

        $('#galleria').fadeIn();
    */    

        $("#close-galleria").click(function(e){
            $('#closeit').fadeOut();
            $('#galleria').fadeOut();
            $("html").css("overflow", "auto");
        });

        $("#closeit img").click(function(e){
            $('#closeit').fadeOut();
            $('#galleria').fadeOut();
            $("html").css("overflow", "auto");
        });

        g.attachKeyboard({
          escape: function() {
            $('#closeit').fadeOut();
            $('#galleria').fadeOut();
            $("html").css("overflow", "auto");
          }
        });
        g.attachKeyboard({
          left: g.prev,
          right: g.next
        });
        $(window).resize(function() { // window resized
            g.resize();
        });

    });

});