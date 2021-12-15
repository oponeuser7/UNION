let schedules;
let selectedId;
const dayTable = {
  "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6
};

$(document).ready(function() {

  renderCalender();

  $("#append-schedule").click(function(event) {
    const user = sessionStorage.getItem("user");
    const title = $("#group-add-title").val();
    const memo = $("#group-add-memo").val();
    const day = $("#group-add-day").val();
    const from = $("#group-add-from").val();
    const to = $("#group-add-to").val();
    $.post("../model/addUserSchedule.php", 
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
    const user = sessionStorage.getItem("user");
    const title = $("#group-modify-title").val();
    const memo = $("#group-modify-memo").val();
    const day = $("#group-modify-day").val();
    const from = $("#group-modify-from").val();
    const to = $("#group-modify-to").val();
    $.post("../model/modifyUserSchedule.php", 
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
    $.post("../model/removeUserSchedule.php", {_id: _id}, function(data) {
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
    $("#user-calender td").each(function(index) {
      const cur = $(this);
      cur.empty();
      schedules.forEach(function(value) {
        if(dayTable[value.day]===index%7 && value.from==parseInt(index/7)) {
          const duration = parseInt(value.to)-parseInt(value.from);
          const schedule = $(`<div></div>`);
          const innerText = $(`<div>${value.title}</div>`);
          innerText.addClass("inner-text");
          schedule.append(innerText);
          schedule.attr("id", value._id);
          schedule.css("position", "absolute");
          schedule.css("left", (index%7)*138);
          schedule.css("top", parseInt(index/7)*73+53);
          schedule.css("width", 137);
          schedule.css("height", 72.5*duration);
          schedule.css("background-color", "#12858A");
          schedule.css("border", "1px solid black");
          schedule.css("cursor", "pointer");
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
          cur.append(schedule);
        }
      });
    });
  });
}
