const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const {generateMessage,generateLocationMessage}=require('./utils/message');


const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	
	console.log('New User Connected to Our App');
	
		socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));
		
		
		socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));
	
	
	
	
	
	socket.on('createMessage',(message,callback)=>{

			 io.emit('newMessage',generateMessage(message.from,message.text)); 
			 
			 
			 
			 
			 callback('This is from the server');
			
		
	});
	
	
	socket.on('createLocationMessage',(coords)=>{
		
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.lat,coords.lon,)); 
		
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