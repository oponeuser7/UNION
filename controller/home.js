$(document).ready(function() {
  //로그인 버튼을 생성
  $("#home-buttons").append($("<div>Sign in</div>").attr("id", "sign-in"));

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

});
