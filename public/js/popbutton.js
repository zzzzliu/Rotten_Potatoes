$(document).ready(function() {
    $("#create-new-comment").click(function() {
        $(".new-comment").toggle('quick');
    });
});

$(document).ready(function () {
    $('.edit-comment-button').click(function () {
        $(this).parent().parent().toggle();
        $(this).parent().parent().next().toggle();
    });
});