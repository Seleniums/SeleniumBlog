$(document).ready(function () {
    $('.form-info').submit(function () {
        $.ajax({
            type: 'POST',
            url: '/',
            data: {
                'username': $('#username').val(),
                'password': $('#password').val(),
            },
            success: function (data, textStatus) {
                if (data['success']) {
                    location.href = '/chat.html'
                }
                else {
                    alert("用户名或密码错误！")
                }
            }
        });
        return false;
    });

    $('#reset').click(function () {
        $('#username').val("")
        $('#password').val("")
    })
});

