$(document).ready(function(){
	var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

	$.each(usernames, function(){getdata(this,"all");});
	$("button").click(function()
			{
				$("button").removeClass("active");
				$(this).addClass("active");	
				var mode = this.id;

				$("#channel-list").html("");
				$.each(usernames, function(index, item){getdata(item,mode);});
				if(this.id=="offline"){
					$("body").css({"background":"#20a4f3"});
				}
				else if(this.id=="online"){
					$("body").css({"background":"#ff3366"});
				}
				else if(this.id=="all"){
					$("body").css({"background":"#e7e247"});
				}
			});



});


function getdata(username, x)
{
	$.ajax({
		url: "https://wind-bow.gomix.me/twitch-api/streams/"+username,
		method: "GET",
		dataType: "jsonp"
	})
	.done(function(res) {
		if( (res.stream != null) && (x == "all" || x == "online") )

		{
			var img;
			if(res.stream.channel.logo == null)
			{
				img = "<img src = \"images/unknown.png\"> ";
			}
			else
			{
				img = "<img src = \"" + res.stream.channel.logo + "\"> ";

			}
			//console.log(res);
			var details = "<a href = \"" + res.stream.channel.url + "\" target = \"_blank\"> <h2>" + res.stream.channel.display_name + "</h2> </a>" + "<p>Online</p><hr>"+ "<em><p>" + res.stream.game + ": " + res.stream.channel.status + "</p></em>";
			$("#channel-list").append("<div class = \"list-item online\">" + img + details+"</div>");
		}
		if( (res.stream == null) && (x == "all" || x == "offline") )
		{
			$.ajax({
				url: "https:/wind-bow.glitch.me/twitch-api/channels/"+username,
				method: "GET",
				dataType: "jsonp"
			})
			.done(function(userres){
				if(userres.status != 404)
				{
					var img;

					if(userres.logo == null)
					{
						img = "<img src = \"images/unknown.png\"> ";
					}
					else
					{
						img = "<img src = \"" + userres.logo + "\"> ";
					}
					//		console.log(userres);
					var details = "<a href = \""+userres.url+"\" target = \"_blank\"> <h2>" + userres.display_name + "</h2></a>" + "<p>Offline</p>" + "<hr>";
					$("#channel-list").append("<div class = \"list-item offline\">" + img + details +"</div>");
				}
				else if(x == "all")
				{		
					$("#channel-list").append("<div class = \"list-item not-found\">"+"<img src = \"images/unknown.png\">" + "<h2>" + username + "</h2>"+ "<p>Account not found</p>"+"<hr>"+"</div>");
				}
			});

		}
	});

}



