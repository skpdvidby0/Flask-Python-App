$(function() {
    $('#bt3').click(function() {
 
        $.ajax({
            url: '/bookdriver',
            
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});

