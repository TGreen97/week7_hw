
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