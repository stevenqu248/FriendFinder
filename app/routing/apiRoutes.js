var friendList = require("../data/friends");

module.exports = function(application) 
{
	application.get("/api/friends", function(request, response) 
	{
		response.json(friendList);
	});

	application.post("/api/friends", function(request, response) 
	{
		var newUser = request.body;
		var bestMatch = "";
		// an arbitrary number that is too high for a legitimate difference to ever exceed
		var bestDifference = 1000;
		for(var friendListID = 0; friendListID < friendList.length; friendListID++)
		{
			var totalDifference = 0;
			var friend = friendList[friendListID];
			for(var scoreID = 0; scoreID < friend.scores.length; scoreID++)
			{
				var difference = Math.abs(newUser.scores[scoreID] - friend.scores[scoreID]);
				if(difference < 0)
					console.log("An error has occured with the matching process. The match given may not be the best match for you");
				else
					totalDifference += difference;
			}

			// if the current best is larger than the newly tested difference
			if(bestDifference > totalDifference)
			{
				// swap the data
				bestDifference = totalDifference;
				bestMatch = friend;
			}
		}

		// add the new user to the friend list for others to find
		friendList.push(newUser);
		response.send(bestMatch);
	});
};