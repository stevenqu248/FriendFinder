var friendList = require("../data/friends");

module.exports = function(application) 
{
// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
// ---------------------------------------------------------------------------

	application.get("/api/friends", function(request, response) 
	{
		response.json(friendList);
	});

// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate JavaScript array
// (ex. User fills out a reservation request... this data is then sent to the server...
// Then the server saves the data to the tableData array)
// ---------------------------------------------------------------------------

	application.post("/api/friends", function(request, response) 
	{
		var newUser = request.body;
		// console.log("Request:");
		// console.log(request.body);
		// console.log("Result:");
		// console.log(result);

		// console.log(friendList);
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
					console.log("Your math is wrong");
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

		console.log("Best Match");
		console.log(bestMatch)

		// add the new user to the friend list for others to find
		friendList.push(newUser);
		response.send(bestMatch);

		// if (tableData.length < 5) {
		//   tableData.push(request.body);
		//   res.json(true);
		// }
		// else {
		//   waitListData.push(req.body);
		//   res.json(false);
		// }
	});
};