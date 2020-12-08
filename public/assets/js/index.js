// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function(data) {
    var burgersOrdered = $("#burgersOrdered");//was sleepyELem
    var burgersDevoured = $("#burgersDevoured");//was not sleepelemt

    var burgers = data.burgers;
    var len = burgers.length;

    for (var i = 0; i < len; i++) {
      var new_elem =
        "<li>" +
        burgers[i].id + 
        ". "+burgers[i].name +
        "<button class='change-eaten' data-id='" +
        burgers[i].id +
        "' data-newEaten='" +
        !burgers[i].sleepy +
        "'>";

      if (burgers[i].sleepy) {
        new_elem += "Make a New Burger!!";
      } else {
        new_elem += "HAS Been EATEN!!";
      }

      new_elem += "</button>";

      new_elem +=
        "<button class='delete-cat' data-id='" +
        burgers[i].id +
        "'>DELETE!</button></li>";

      if (burgers[i].eaten) {
        burgersOrdered.append(new_elem);
      } else {
        burgersEaten.append(new_elem);
      }
    }
  });

  $(document).on("click", ".change-eaten", function(event) {
    var id = $(this).data("id");
    var newEaten = $(this).data("newDevoured")===true;

    var newEatenState = {
      eaten: newDevoured
    };

    // Send the PUT request.
    $.ajax("/burgers/" + id, {
      type: "PUT",
      data: JSON.stringify(newEatenState),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      console.log("changed eaten to", newEaten);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#ca")
        .val()
        .trim(),
      sleepy: $("[name=eaten]:checked")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: JSON.stringify(newBurger),
      dataType:'json',
      contentType: 'application/json'
    }).then(function() {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(document).on("click", ".delete-burger", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
