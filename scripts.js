$(document).ready(function(){
	var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

	$.each(usernames, function(){getdata(this,"all");});
	$("button").click(function()
			{
				console.log(this);
				$("button").removeClass("active");
				$(this).addClass("active");	
				var mode = this.id;
		
				$("#channel-list").html("");
				$.each(usernames, function(index, item){getdata(item,mode);});
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
				img = "<img src = \"images/unknown.png\">";
			}
			else
			{
				img = "<img src = \"" + res.stream.channel.logo + "\">";
			}
			var details = "<h2>" + res.stream.channel.display_name + "</h2>" + "<p>" + res.stream.game + ": " + res.stream.channel.status + "</p>";
			$("#channel-list").append("<div class = \"list-item\">" + img + details+"</div>");
		}
		if( (res.stream == null) && (x == "all" || x == "offline") )
		{
			$.ajax({
				url: "https:/wind-bow.glitch.me/twitch-api/users/"+username,
				method: "GET",
				dataType: "jsonp"
			})
			.done(function(userres){
				if(userres.status != 404)
				{
					var img;

				if(userres.logo == null)
					{
						img = "<img src = \"images/unknown.png\">";
					}
					else
					{
						img = "<img src = \"" + userres.logo + "\">";
					}
					
					var details = "<h2>" + userres.display_name + "</h2>" + "<p>Offline</p>";
					$("#channel-list").append("<div class = \"list-item\">" + img + details +"</div>");
				}
				else if(x == "all")
				{		
					$("#channel-list").append("<div class = \"list-item\">"+"<img src = \"images/unknown.png\">" + "<h2>" + username + "</h2>" + "<p>Account not found.</p>"+"</div>");
				}
			});

		}
	});

}



