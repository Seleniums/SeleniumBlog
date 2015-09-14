/**
 * Created by wanlu on 2015/7/5.
 */
var ws = new WebSocket('ws://localhost:8888/websocket');

ws.onmessage = function (evt) {
    var JSONObject = JSON.parse(evt.data)
    var user = JSONObject.from;
    var sendto = JSONObject.to;
    var msg = JSONObject.msg;
    var date = JSONObject.date;
    $('#msg_box').prepend('<p><span style="color: #337ab7">' + user +
        '</span> 对 <span style="color: #337ab7">' + sendto +
        '</span> 说：' + msg +
        '<span style="color: #b5b5b5; font-size: 12px; position: absolute; right: 10px">' +
        date + '</span></p>');

};

$(document).ready(function () {
    $("#send").click(function () {
        //console.log('send')
        ws.send($("#msg").val())
        $("#msg").val('')
    })
})


