$(document).ready(function(){
    var example = $('.example');
    var img1 = example.find('.img-1');
    var img2 = example.find('.img-2');
    example.hover(
        function(){ 
            img1.animate(
                    {height: '586px', width: '600px'},
                    'fast',
                    function(){
                        $(this).hide();
                        img2.show();
                    }
                );
        },
        function(){
            img2.hide();
            img1.css({height: '586px', width: '600px'}).show();
        }
    );
    
});