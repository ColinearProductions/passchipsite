$("#phone").intlTelInput({
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js"
});

$(".intl-tel-input").addClass("col-md-6 form-group g-mb-20");
$(".flag-container").addClass("g-pl-20");


$("#phone").closest("form").submit(function(e) {
    $("#phone").val( $("#phone").intlTelInput("getNumber"));

});