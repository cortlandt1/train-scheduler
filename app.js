

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
    var firstTime = $('#firstTrain').val().trim();
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