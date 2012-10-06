$(document).ready(function(){
    console.log('tip.galleria.js START');
//image object see the galleria specs for more properties.
function gal_img(image,thumb)
{
    this.image=image;
    this.thumb=thumb;
}

//custom settings:
_IdleExitOnKeyboard = true;

//supposedly removes the ability to select text and img.
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

//variable false if gallery has not been initialized.
gInit = false;

//todo: This is maybe stupid - thumbs and img are paired without knowing wheather both exists and are actually related.
imgs = $(".gallery-item a").has('img').map(function() {
  return $(this).attr("href");
});

img_thumbs = $(".gallery-item a img").map(function() {
  return $(this).attr("src");
});
//data holds the image object array that is parsed to gallaria.
data = [];
for(var i=0;i<imgs.length;i++){
    //console.log('Image: ' + imgs[i] + ' paired with thumb: ' + img_thumbs[i] + '.');
    data.push(new gal_img(imgs[i],img_thumbs[i]));
}


    console.log('galleria.run');

    $('#galleria').disableTextSelect();//No text selection
    
    $(".gallery-item a").click(function(e){
        e.preventDefault();
        //console.log('Image clicked');
        //shows galleria and closeit button
        //todo: add closeit button to galleria dom.

        $("html").css("overflow", "hidden");
        $('#galleria').fadeIn();
        $('#wpadminbar').slideUp();
        $('#closeit').fadeIn();
        $('#closeit-img').fadeTo('fast', 0.2);
        $("#closeit-img").hover(
            function() {
                $("#closeit-img").stop().animate({ opacity: 0.9 }, 250);
            },
            function() {
                $("#closeit-img").stop().animate({ opacity: 0.2 }, 1000);
        });
        $("#closeit-img").click(function(e){
            $('#closeit').fadeOut();
            $('#galleria').fadeOut();
            $('#wpadminbar').slideDown();
            //makes scrollbar appear again if needed.
            $("html").css("overflow", "auto");
        });
        if (!gInit){
            //initialise galleria
            Galleria.loadTheme('/wp-content/plugins/tip-galleria/galleria/themes/classic/galleria.classic.js');
            //console.log('themeLoad');
            Galleria.run('#galleria', {
                dataSource: data,
                preload: 2,
                transition: 'fade',
                transitionSpeed: 10,
                trueFullscreen: false,
                maxScaleRatio:1,
                idleTime:5000,
                responsive: true,
                extend: function() {
                    //$("#closeit").appendTo("#galleria");
                    }
                });
            g = Galleria.get(0);
            Galleria.on('image', function(e) {
                    $(e.imageTarget).click(function () {
                        g.next();
                    });
                });
            //console.log('try to show: ' + jQuery.inArray($(this).attr("href"), imgs));
            Galleria.configure({
                show: jQuery.inArray($(this).attr("href"), imgs)
                });

            g.addIdleState('#closeit',{opacity:0});
            g.addIdleState(g.get('thumbnails-container'),{opacity:0});
            g.attachKeyboard({
                37: function() {
                    if (_IdleExitOnKeyboard){
                        g.$('image-nav-left').click();
                    }
                    else{
                        g.prev();
                    }            
                },
                39: function() {
                    if (_IdleExitOnKeyboard){
                        g.$('image-nav-right').click();
                    }
                    else{
                        g.next();
                    }
                },                
                escape: function() {
                  $('#closeit-img').click();
                },
                32: function() { //keycode 32 is spacebar. g.next doesnt trigger idleexit.
                    g.next();
                }
                });
                gInit = true;
        }
        else{
            g = Galleria.get(0);
            //console.log('try to show: ' + jQuery.inArray($(this).attr("href"), imgs));
            g.show(jQuery.inArray($(this).attr("href"), imgs));
        }





        $(window).resize(function() { // window resized
            //g.resize();
        });

    });

});