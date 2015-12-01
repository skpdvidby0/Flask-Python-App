$(function() {
    $('#btnSignUp1').click(function() {
 
        $.ajax({
            url: '/dsignup',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});
