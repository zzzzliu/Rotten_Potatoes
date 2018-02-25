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

$(document).ready(function () {
    $('.edit-about-button').click(function () {
        $(this).parent().next().toggle();
        $(this).parent().next().next().toggle();
    });
});

$( document ).ready(function() {
    var heights = $("#404-error-message").map(function() {
            return $(this).height();
        }).get(),

        maxHeight = Math.max.apply(null, heights);

    $("#quote").height(maxHeight);
});