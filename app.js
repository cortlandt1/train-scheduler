

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBMBk2DA7dF1KlGCDUu_bYr4BDfk0mSLVE",
    authDomain: "train-scheduler-ef249.firebaseapp.com",
    databaseURL: "https://train-scheduler-ef249.firebaseio.com",
    projectId: "train-scheduler-ef249",
    storageBucket: "train-scheduler-ef249.appspot.com",
    messagingSenderId: "377154641362"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $('#add-train').on('click', function (event) {
    event.preventDefault();

    var trainName = $('#trainName').val().trim();
    var trainDestination = $('#destination').val().trim();
    var firstTime = moment($('#firstTrain').val().trim(), "HH:mm").format('HH:mm');
    var trainFreq = $('#frequency').val().trim();

    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: firstTime,
      frequency: trainFreq
    };

    database.ref().push(newTrain);

    console.log(newTrain.name)
    console.log(newTrain.destination)
    console.log(newTrain.time)
    console.log(newTrain.frequency)
  })

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  //Current Time
  var currentTime = moment();
  console.log(currentTime)

  //Convert firstTime to 
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % trainFreq;
  console.log(tRemainder);

  var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
    $("<td>").text()
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

  })