
// Link to Firebase
var trainSched = new Firebase("https://16trainsched.firebaseio.com/");

$("#addTrain").on("click", function(){

	// User input info
	var trainName = $("#trainNameInput").val().trim();
	var trainDest = $("#destinationInput").val().trim();
	var trainTime1 = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
	var trainFreq = $("#frequencyInput").val().trim();

	// Placeholder object for train data entry
	var newTrain = {
		name:  trainName,
		destination: trainDest,
		firstTrain: trainTime1,
		frequency: trainFreq
	}

	// Uploads employee data to the database
	trainSched.push(newTrain);

	// Console log new train object data
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency);

	alert("New Train added to the Schedule!");

	// Clear input text-boxes
	$("#employeeNameInput").val("");
	$("#roleInput").val("");
	$("#startInput").val("");
	$("#rateInput").val("");

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

	// Calculate next train arrival Time
	var nextArr = ;

	// Calculate how far away train is
	var minsAway = ;

	$("#scheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArr + "</td><td>" + minsAway + "</td></tr>")

});