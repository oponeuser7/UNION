$(document).ready(function() {
  //로그인 버튼을 생성
  $.get("../model/checkSession.php", {}, function(data) {
    if(data==="success") {
      verified();
    }
    else {
      const signIn = $("<div>Sign in</div>").attr("id", "sign-in"); 
      signIn.click(function(event) {
        $("#sign-in-window").toggle();
      });
      $("#home-buttons").append(signIn);
    }
  });

  $("#create-group").click(function(event) {
    $.get("../model/checkSession.php", {}, function(data) {
      if(data==="success") {
        $(event.target).hide();
        $("#create-group-input-row").show();
      }
    });
  }); 
  
  $("#create-group-input-button").click(function(event) {
    const name = $("#create-group-input").val();
    $("#create-group-input").val("");
    if(name) {
      $.post("../model/createGroup.php", {name:name}, function(data) {
        fetchGroups();
      });
    }
    $("#create-group-input-row").hide();
    $("#create-group").show();
  });

  $("#sign-in-button").click(function(event) {
    const id = $("#id-input").val();
    const pwd = $("#password-input").val();
    $.post("../model/signIn.php", {id:id, pwd:pwd}, function(data) {
      if(data==="success") {
        localStorage.setItem("user", id);
        verified();
      }
      else {
        alert("Sorry, wrong id or password");
      }
    });
  });
});

function verified() {
  $("#sign-in-window").hide();
  const signOut = $("<div>Sign out</div>").attr("id", "sign-out");
  const myPage = $("<div>My page</div>").attr("id", "my-page");
  signOut.click(function(event) {
    $("#home-buttons").empty();
    const signIn = $("<div>Sign in</div>").attr("id", "sign-in"); 
    signIn.click(function(event) {
      $("#sign-in-window").toggle();
    });
    $("#home-buttons").append(signIn);
    $.post("../model/signOut.php", {}, function(data) {
      fetchGroups();
      localStorage.removeItem("group");
      localStorage.removeItem("user");
      alert("Signed out successfully");
    });
  });
  myPage.click(function(event) {
    window.open("../view/user.html");
  });
  $("#home-buttons").empty().append(signOut, myPage);
  fetchGroups();
  }

function fetchGroups() {
  $("#group-list").empty();
  $.get("../model/getGroup.php", {}, function(data) {
    const groups = JSON.parse(data).group;
    for(const index in groups) {
      const row = $(`<li>${groups[index]}</li>`);
      row.click(function(event) {
        const name = $(this).text();
        localStorage.setItem("group", name);
        window.open("group.html");
      });
      $("#group-list").append(row);
    }
  });
}

