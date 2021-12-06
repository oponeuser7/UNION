$(document).ready(function() {
  //로그인 버튼을 생성
  $.get("../model/checkSession.php", {}, function(data) {
    if(data==="success") verified();
    else {
      const signIn = $("<div>Sign in</div>").attr("id", "sign-in"); 
      $("#home-buttons").append(signIn);
    }
  });
  
	$("#sign-in").click(function(event) {
    $("#sign-in-window").toggle();
  });

  $("#create-group").click(function(event) {
    $(event.target).hide();
    $("#create-group-input-row").show();
  }); 
  
  $("#create-group-input-button").click(function(event) {
    $("#create-group-input-row").hide();
    $("#create-group").show();
  });

  $("#sign-in-button").click(function(event) {
    const id = $("#id-input").val();
    const pwd = $("#password-input").val();
    $.post("../model/verify.php", {id:id, pwd:pwd}, function(data) {
      if(data==="success") verified();
      else if(data==="wrong") alert("Sorry, wrong id or password");
    });
  });
});

function verified() {
  $("#sign-in-window").hide();
  const signOut = $("<div>Sign out</div>").attr("id", "sign-out");
  const myPage = $("<div>My page</div>").attr("id", "my-page");
  signOut.click(function(event) {
    $.post("../model/signOut.php", {}, function(data) {
      alert("Signed out successfully");
    });
    $("#home-buttons").empty();
    const signIn = $("<div>Sign in</div>").attr("id", "sign-in"); 
    $("#home-buttons").append(signIn);
  });
  myPage.click(function(event) {
    window.open("../view/user.html");
  });
  $("#home-buttons").empty().append(signOut, myPage);
}
