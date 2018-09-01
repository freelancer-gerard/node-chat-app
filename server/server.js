const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');


const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	
	console.log('New User Connected to Our App');
	
	socket.emit('newMessage',{
		
		from:'Server',
		text:'Hey Gerard',
		createdAt:1233412
		
		
	});	
	
	socket.on('createMessage',(message)=>{
		
			console.log("User: ",message.from);
			console.log("Message: ",message.text);		
		
	});
	
	
	
	socket.on('disconnect',()=>{
		console.log("User Disconnected from Server");
	
	})	
});



/* app.get('/',(req,res)=>{
	
	res.sendFile(publicPath + '/index.html');
	
	
}); */


server.listen(port,()=>{
	
	console.log(`Server is Up on Port ${port}`);
	
});