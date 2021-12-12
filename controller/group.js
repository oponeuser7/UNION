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
  console.log(sessionStorage.getItem("group"));
}

function initCalender() {
  $("#group-calender td").each(function(index) {
    $(this).append($("<div>"+(index+1)+"</div>").addClass("date"));
    if(index===30) return false;
  });
}
