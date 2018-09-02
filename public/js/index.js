		var socket=io();
		socket.on('connect',function(){
			console.log('Connected to Server');		
		});
		
		socket.on('disconnect',function(){
			console.log("Disconnected from Server");
		
		})
		
		socket.on('newMessage',function(message){

			var li=$('<li></li>');
			li.text(`${message.from} : ${message.text}`);
			$("#messages").append(li);
		
		});
		

		socket.on('newLocationMessage',function(message){
			
			var li=$('<li></li>');
			var a=$('<a target="_blank">My Current Location</a>');
			
			li.text(`${message.from}`);
			a.attr('href',message.url);
			li.append(a);
			$("#messages").append(li);
		});
		
		
		
		
		
		
		
		$("#message-form").on('submit',function(e){
			e.preventDefault();
			socket.emit("createMessage",{
				
				from:'User',
				text:$("[name=message]").val(),
				createdAt:12112312
				
			},function(){
				
				
				
			})
			
			
		});
		
		
		
		var locationButton=$('#send-location');
		
		locationButton.on('click',function(){
			
			if(!navigator.geolocation){
				
				return alert('No access to Geolocation');
			}
			
			navigator.geolocation.getCurrentPosition(function(position){
				
				console.log(position);
				
			socket.emit('createLocationMessage',{
				
				lat:position.coords.latitude,
				lon:position.coords.longitude
				
				
			});
				
				
			},function(){
				
				alert('Unable to fetch Location');
				
				
			});
			
			
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
			