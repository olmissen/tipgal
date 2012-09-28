$(document).ready(function(){

function gal_img(image,thumb)
{
    this.image=image;
    this.thumb=thumb;
}

$.extend($.fn.disableTextSelect = function() {
    return this.each(function(){
        if($.browser.mozilla){//Firefox
            $(this).css('MozUserSelect','none');
        }else if($.browser.msie){//IE
            $(this).bind('selectstart',function(){return false;});
        }else{//Opera, etc.
            $(this).mousedown(function(){return false;});
        }
    });
});

imgs = $(".gallery-item a").map(function() {
  return $(this).attr("href");
});
img_thumbs = $("#main a img").map(function() {
  return $(this).attr("src");
});

gInit = false;
data = [];
for(var i=0;i<imgs.length;i++){
    data.push(new gal_img(imgs[i],img_thumbs[i]));
}
    //initialise galleria
    Galleria.loadTheme('/wp-content/plugins/tip-galleria/galleria/themes/classic/galleria.classic.js');
    Galleria.run('#galleria', {
        dataSource: data,
        preload: 2,
        transition: 'fade',
        transitionSpeed: 10,
        trueFullscreen: false,
        maxScaleRatio:1
        });

    //$('#galleria').disableTextSelect();//No text selection on elements with a class of 'noSelect'
    
    $(".gallery-item a").click(function(e){
        e.preventDefault();
        g = Galleria.get(0);
        //var msg = $(this).attr("href");
        if (!gInit){
            Galleria.configure({
            show: jQuery.inArray($(this).attr("href"), imgs)
            });
            gInit = true;
        }
        else{
            g.show(jQuery.inArray($(this).attr("href"), imgs));
        }

        $("html").css("overflow", "hidden");
        $('#galleria').fadeIn();
        $('#closeit').fadeTo(300, 0.90);
        var wWidth = $(window).width();
        var wHeight = $(window).height();
        var dHeight = $(document).height();
        var gWidth = $('#galleria').width();
        var gHeight = $('#galleria').height();

        $("#close-galleria").click(function(e){
            $('#closeit').fadeOut();
            $('#galleria').fadeOut();
            $("html").css("overflow", "auto");
        });
        
        Galleria.on('image', function(e) {
            $(e.imageTarget).click(function () {
                g.next();
            });
        });
        

        $("#closeit img").click(function(e){
            $('#closeit').fadeOut();
            $('#galleria').fadeOut();
            $("html").css("overflow", "auto");
        });

        $('#closeit').fadeTo('fast', 0.2);

        $("#closeit").hover(
            function() {
                $(this).stop().animate({ opacity: 0.9 }, 400);
            },
            function() {
                $(this).stop().animate({ opacity: 0.2 }, 800);
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