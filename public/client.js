const socket=io();
const handle=document.getElementById('handle');
const message=document.getElementById('message');
const output=document.getElementById('output');
const button=document.getElementById('button');
const typing=document.getElementById('typing');
message.addEventListener('keypress',()=>{
    socket.emit('userTyping',handle.value)
    
    })
button.addEventListener('click',()=>{
    socket.emit('usermessage',{
        handle:handle.value,
        message:message.value  
    })
    document.getElementById('message').value="";
})




socket.on("usermessage",(data)=>{

typing.innerHTML="";
    output.innerHTML+='<p> <strong>'+data.handle+':</strong>'
    +data.message +'</p>'
})
socket.on("userTyping",(data)=>{
    typing.innerHTML='<p><em>'+data+' is typing..</em></p>'

})