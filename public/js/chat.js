		var socket=io();
		
		
		function scrollToBottom(){
			
			var messages=$("#messages");
			var newMessage=messages.children().last();
			

			
			var clientHeight = messages.prop("clientHeight");
			var scrollTop = messages.prop("scrollTop");
			var scrollHeight = messages.prop("scrollHeight");
			var newMessageHeight = newMessage.innerHeight();			
			var lastMessageHeight = newMessage.prev().innerHeight();	

			
			if(clientHeight +scrollTop + newMessageHeight +lastMessageHeight >= scrollHeight)
			{
				messages.scrollTop(scrollHeight);
			}
			
			
			
			
		}
		
		
		
		
		
		
		
		
		
		
		socket.on('connect',function(){
			console.log('Connected to Server');		
		});
		
		socket.on('disconnect',function(){
			console.log("Disconnected from Server");
		
		})
		
		socket.on('newMessage',function(message){
			
			
			var template=$("#message-template").html();
			var formattedTime =moment(message.createdAt).format('h:mm a');
			var html=Mustache.render(template,{
				
				from:message.from,
				text:message.text,				
				formattedTime:formattedTime
				
				
			});
			
				
			$("#messages").append(html);
			scrollToBottom();
		
		});
		

		socket.on('newLocationMessage',function(message){
			var formattedTime =moment(message.createdAt).format('h:mm a');
			var template=$("#location-message-template").html();
			var html=Mustache.render(template,{
				
				from:message.from,
				url:message.url,				
				formattedTime:formattedTime				
				
			});
			
			
			$("#messages").append(html);
			scrollToBottom();

		});
		
		
		
		
		
		
		
		$("#message-form").on('submit',function(e){
			e.preventDefault();
			
			var messageTextbox=$("[name=message]");

			if(messageTextbox.val()!=''){
				
				socket.emit("createMessage",{
					
					from:'User',
					text:messageTextbox.val()
					
				},function(){
					
					messageTextbox.val('');
					
				});
				
			}

			
		});
		
		
		
		var locationButton=$('#send-location');
		
		locationButton.on('click',function(){
			
		
			
			
			if(!navigator.geolocation){
				
				return alert('No access to Geolocation');
			}
			
			locationButton.attr('disabled',true).text('Sending..');


			
			navigator.geolocation.getCurrentPosition(function(position){
				locationButton.attr('disabled',false).text('Send Location');
				console.log(position);
				
			socket.emit('createLocationMessage',{
				
				lat:position.coords.latitude,
				lon:position.coords.longitude
				
				
			});
				
				
			},function(){
				locationButton.attr('disabled',false).text('Send Location');
				alert('Unable to fetch Location');
				
				
			});
			
			
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
			