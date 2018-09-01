		var socket=io();
		socket.on('connect',function(){
			console.log('Connected to Server');		
		});
		
		socket.on('disconnect',function(){
			console.log("Disconnected from Server");
		
		})
		
		socket.on('newMessage',function(message){
			console.log("User: ",message.from);
			console.log("Message: ",message.text);
			console.log("Time: ",message.createdAt);
		});
		

		
		
		
			