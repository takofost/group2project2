$("#add-student").on("click", function(event) {
  event.preventDefault();
  console.log("Testing in add button");
  addStudent();
  function addStudent() {
    // make a newAccount obj
    var newStudent = {
      first_name: $("#inputFirst")
        .val()
,
      last_name: $("#inputLast")
        .val()
,
      street: $("#inputStreet")
        .val()
,
      city: $("#inputCity")
        .val()
,
      state: $("#inputState")
        .val()
,
      zip: $("#inputZip")
        .val()
,
      rank: $("#inputRank")
        .val()
,
      email: $("#inputEmail")
        .val()
,
      phone: $("#inputPhone")
        .val()

    };

    // send an AJAX POST-request with jQuery
    $.post("/add-student/new", newStudent).then(function(data) {
      // log the data we found
      console.log(data);
      // tell the user we're adding a  with an alert window
      alert("Adding...");
    });

    // empty each input box by replacing the value with an empty string

    $("#inputFirst").val("");
    $("#inputLast").val("");
    $("#inputStreet").val("");
    $("inputCity").val("");
    $("#inputState").val("");
    $("#inputZip").val("");
    $("#inputRole").val();
    $("#inputEmail").val();
    $("#inputPhone").val();
  }
});
