$(document).ready(function() {
    $("#members-header").css("color", "gray");
    $("#members-header").css("cursor", "pointer");
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