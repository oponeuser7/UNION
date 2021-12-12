let schedules;

$(document).ready(function() {

  getGroupName();  
  initCalender();

  //dding some css to buttons
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

  $("#setting-button").click(function() {
    $("#setting-window").toggle();
  });
  
  $("#setting-exit-button").click(function() {
    $("#setting-window").hide();
  });

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
        }
        else {
          alert("somethin gone wrong");
        }
      }
    );
  });
});

function getGroupName() {
  //configure current group name
  if(!sessionStorage.getItem("group")) { 
    const name = localStorage.getItem("group");
    if(name) {
      sessionStorage.setItem("group", name);
    }
  }
}

function initCalender() {
  const group = sessionStorage.getItem("group");
  $.get("../model/fetchGroupSchedule.php", { group: group}, function(data) {
    schedules = JSON.parse(data); 
    $("#group-calender td").each(function(index) {
      const dateArea = $("<div></div>");
      const ul = $("<ul></ul>").addClass("group-schedule");
      schedules.forEach(function(value) {
        if(value.day==index+1) {
          const schedule = $(`<li>${value.title}</li>`);
          schedule.attr("id", value._id);
          ul.append(schedule);
        }
      });
      dateArea.css("position", "absolute");
      dateArea.css("left", (index%7)*137.7);
      dateArea.css("top", parseInt(index/7)*103+53);
      dateArea.css("width", 137.7);
      dateArea.css("height", 103);
      dateArea.append($("<div>"+(index+1)+"</div>").addClass("date"));
      dateArea.append(ul);
      $(this).append(dateArea);
      if(index===30) return false;
    });
  });
}
