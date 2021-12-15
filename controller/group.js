let schedules;
let selectedId;
let selectedUser;

$(document).ready(function() {

  getGroupName();  
  renderCalender();

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

  $("#user-search-button").click(function(event) {
    const id = $("#user-invite-input").val();
    $.get("../model/searchUser.php", {id: id}, function(data) {
      const results = $("#user-search-result-table");
      results.empty();
      data = JSON.parse(data);
      data.forEach(function(value) {
        console.log(value);
        const li = $("<li></li>");
        const row = $(`<div>${value.id}</div>`).addClass("result-row");
        const button = $("<div>Invite</div>").addClass("invite-button");
        button.click(function(event) {
          let user = $(this).parent().text();
          user = user.substr(0, user.length-6);
          const group = sessionStorage.getItem("group")
          $.post("../model/inviteUser.php", {user: user, group: group}, 
          function(data) {
            if(data=="success") {
              renderCalender();
              alert("User has been invited to this group");
            }
            else {
              alert("User already belongs to this group");
            }
          });
        });
        results.append(li.append(row.append(button))); 
      });
    });
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

function renderCalender() {
  const group = sessionStorage.getItem("group");
  $("#group-name").text(group);
  $.get("../model/fetchGroupSchedule.php", { group: group}, function(data) {
    schedules = JSON.parse(data); 
    $("#group-calender td").each(function(index) {
      $(this).empty();
      const dateArea = $("<div></div>");
      const ul = $("<ul></ul>").addClass("group-schedule");
      schedules.forEach(function(value) {
        if(value.day==index+1) {
          const schedule = $(`<li>${value.title}</li>`);
          schedule.attr("id", value._id);
          schedule.click(function(event) {  
            const temp = $(this).attr("id");
            schedules.forEach(function(value) {
              if(value._id===temp) {
                $("#group-modify-title").val(value.title);
                $("#group-modify-memo").val(value.memo);
                $("#group-modify-day").val(value.day);
                $("#group-modify-from").val(value.from);
                $("#group-modify-to").val(value.to);
                selectedId = value._id;
              }
            });
          });
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
