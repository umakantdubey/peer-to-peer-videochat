const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const PORT=process.env.PORT||3000;
http.listen(PORT,()=>{
    console.log("listening on port no "+PORT);
})
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
io.on('connection',function(socket){
    console.log("client is connected "+socket.id);
    socket.on('usermessage',(data)=>{
        io.sockets.emit("usermessage",data)
    })
    socket.on('userTyping',(data)=>{

        socket.broadcast.emit('userTyping',data)
    })

})
