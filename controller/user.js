let schedules;
let selectedId;
const dayTable = {
  "Sun": 0,
  "Mon": 1,
  "Tue": 2,
  "Wed": 3,
  "Thu": 4,
  "Fri": 5,
  "Sat": 6
}

$(document).ready(function() {

  renderCalender();

  //adding some css to buttons
  $("#members-header").css("color", "gray").css("cursor", "pointer");
  $("#add-schedule-header").css("cursor", "pointer");

  $("#members-header").click(function(){
    $("#add-schedule-header").css("color", "gray");
    $("#members-header").css("color", "black");
    $(".add-schedule-box").hide();
    $("#members-box").show();
  });
  
  $("#add-schedule-header").click(function() {
    $("#members-header").css("color", "gray");
    $("#add-schedule-header").css("color", "black");
    $("#members-box").hide();
    $(".add-schedule-box").show();
  })
  
  $("#append-schedule").click(function(event) {
    const group = sessionStorage.getItem("group");
    const title = $("#group-add-title").val();
    const memo = $("#group-add-memo").val();
    const day = $("#group-add-day").val();
    const from = $("#group-add-from").val();
    const to = $("#group-add-to").val();
    $.post("../model/addGroupSchedule.php", 
      {
        group: group,
        title: title,
        memo: memo,
        day: day,
        from: from,
        to: to
      },
      function(data) {
        if(data=="success") {
          alert("schedule is added");
          renderCalender();
        }
        else {
          alert("somethin gone wrong");
        }
      }
    );
  });

  $("#modify-schedule").click(function(event) {
    const _id = selectedId;
    const group = sessionStorage.getItem("group");
    const title = $("#group-modify-title").val();
    const memo = $("#group-modify-memo").val();
    const day = $("#group-modify-day").val();
    const from = $("#group-modify-from").val();
    const to = $("#group-modify-to").val();
    $.post("../model/modifyGroupSchedule.php", 
      {
        _id: _id,
        group: group,
        title: title,
        memo: memo,
        day: day,
        from: from,
        to: to
      },
      function(data) {
        if(data=="success") {
          alert("schedule is modified");
          renderCalender();
        }
        else {
          alert("somethin gone wrong");
        }
      }
    );
  });

  $("#remove-schedule").click(function(event) {
    const _id = selectedId;
    $.post("../model/removeGroupSchedule.php", {_id: _id}, function(data) {
        if(data=="success") {
          alert("schedule is removed");
          renderCalender();
        }
        else {
          alert("somethin gone wrong");
        }
      }
    );
  });

});

function renderCalender() {
  const user = localStorage.getItem("user");
  $("#user-name").text(user);
  $.get("../model/fetchUserSchedule.php", {user: user}, function(data) {
    schedules = JSON.parse(data); 
    $("#user-schedule td").each(function(index) {
      $(this).empty();
      schedules.forEach(function(value) {
        if(dayTable[value.day]===index%7&&value.from==parseInt(index/7)) {
          const duration = parseInt(value.to)-parseInt(value.from)
          const schedule = $(`<div>${value.title}</div>`);
          schedule.attr("id", value._id);
          shedule.css("position", "absolute");
          shedule.css("left", (index%7)*138);
          shedule.css("top", parseInt(index/7)*73+53);
          shedule.css("width", 138);
          shedule.css("height", 103*duration);
          schedule.css("background-color", "green");
          schedule.click(function(event) {  
            const temp = $(this).attr("id");
            schedules.forEach(function(value) {
              if(value._id===temp) {
                $("#user-modify-title").val(value.title);
                $("#user-modify-memo").val(value.memo);
                $("#user-modify-day").val(value.day);
                $("#user-modify-from").val(value.from);
                $("#user-modify-to").val(value.to);
                selectedId = value._id;
              }
            });
          });
          $(this).append(schedule);
        }
      });
    });
  });
}
