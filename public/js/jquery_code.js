$(document).ready(function(){
    $("#send_btn").click(function(){        
        var nick = $("#nick").val();
        var message = $("#msg").val();
        
        if (nick == ""){
            alert("nickname cant be empty");
            return;
        }
        
        if (message == ""){
            alert("message cant be empty");
            return;
        }
        
        var data = {nickname:nick, data:message};
        console.log(data);
        socket.emit("new_message", data);
        $("#msg").val("");
    });
    
    $("#clearBtn").click(function(){
         $('#tab_body').html('');
    });
});