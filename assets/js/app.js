
// Link to Firebase
var trainSched = new Firebase("https://16trainsched.firebaseio.com/");

$("#addTrain").on("click", function(){

	// User input info
	var trainName = $("#trainNameInput").val().trim();
	var trainDest = $("#destinationInput").val().trim();
	var trainTime1 = moment($("#firstTrainInput").val().trim(), "HH:mm").format("");
	var trainFreq = $("#frequencyInput").val().trim();

	// Placeholder object for train data entry
	var newTrain = {
		name:  trainName,
		destination: trainDest,
		firstTrain: trainTime1,
		frequency: trainFreq
	}

	// Uploads User added train info to the database
	trainSched.push(newTrain);

	// Console log new train object data
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency);

	alert("New Train added to the Schedule!");

	// Clear input text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	// Prevents user moving to new page
	return false;
});

trainSched.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// New Train data to variables
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainTime1 = childSnapshot.val().firstTrain;
	var trainFreq = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(trainDest);
	console.log(trainTime1);
	console.log(trainFreq);

	// Convert First Train Time to make sure it comes before Current Time
	var trainTime1Converted = moment(trainTime1, "HH:mm").subtract("years", 1);
	console.log(trainTime1Converted);

	// Get Current time
	var currentTime = moment();
	console.log("Current Time: " + moment(currentTime).format("HH:mm"));

	// Get difference between current time and First Train time
	var diffTime = moment().diff(moment(trainTime1Converted), "minutes");
	console.log("Diff in Time: " + diffTime);

	// Calculate time apart remainder
	var tRemainder = diffTime % trainFreq;
	console.log(tRemainder);

	// Calculate how far away next train is
	var minsAway = trainFreq - tRemainder;
	console.log("Minutes til Train: " + minsAway);
	
	// Calculate next train arrival Time
	var nextArr = moment().add(minsAway, "minutes");
	var nextArrConverted = moment(nextArr).format("hh:mm a")
	console.log("Next Arrival: " + moment(nextArr).format("HH:mm"));

	

	$("#scheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrConverted + "</td><td>" + minsAway + "</td></tr>")

});