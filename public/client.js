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




//get the local video and dispaly with permisson
function getLvideo(callbacks)
{

var constraints={
    audio:true,
    video:true
}
navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia;
navigator.getUserMedia(constraints,callbacks.success,callbacks.error)

}
function recStream(stream,elemid){
    var video=document.getElementById(elemid);
    video.srcObject=stream;
    window.peer_stream=stream;
}
getLvideo({
    success: function(stream){
        window.localstream=stream;
        recStream(stream,'lVideo')
    },
    error:function(err){
        alert("cannot access your camera")
        console.log(err);
    }

})
var conn;
var peer_id;
//create a peer connection with peer object
var peer = new Peer();

//display the peer id on dom
peer.on('open', function() {
   document.getElementById("displayId").innerHTML=peer.id;
  })
  peer.on('connection',function(connection){
      conn=connection;
      peer_id=connection.peer;
      document.getElementById('connId').value=peer_id;
  });
  peer.on('error',function(err){

    alert("an error has happenend"+err)
    console.log(err);
  });
  document.getElementById('conn_button').addEventListener('click',function(){
      peer_id=document.getElementById("connId").value;
      if(peer_id)
      {
          conn=peer.connect(peer_id);

      }
      else
      {
          alert("enter  an id")
          return false;
      }
  });
//onclick connection wiith but expose info
peer.on('call',function(call){
var acceptCall=confirm("Do you want to answer this call");
if(acceptCall)
{
    call.answer(window.localstream);
    call.on('stream',function(stream){
        window.peer_stream=stream;
        recStream(stream,'rVideo');
    })

    call.on('close',function(){
        alert("The call has behind");
    })
}
else{
    console.log("call denied")
}
});
//call on click
document.getElementById('call_button').addEventListener('click',function(){
    console.log("calling a peer"+peer_id);
  console.log(peer);
  var call=peer.call(peer_id,window.localstream);
  call.on('stream',function(){
      window.peer_stream=stream;
      recStream(stream,'rVideo');
  })  
})
//ask to call
//accept call
//dispaly remote and local video
