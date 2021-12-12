$(document).ready(function() {

  getGroupName();  

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
