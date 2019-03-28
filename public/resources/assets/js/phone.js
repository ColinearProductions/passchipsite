$("#phone").intlTelInput({
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js",
    initialCountry:'auto',
    geoIpLookup: function(callback) {
        $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            if(resp.statusText==="error")
                countryCode = "RO";
            callback(countryCode);
        });
    }
});

$(".intl-tel-input").addClass("col-md-6 form-group g-mb-20");
$(".flag-container").addClass("g-pl-20");


$("#phone").closest("form").submit(function(e) {
    $("#phone").val( $("#phone").intlTelInput("getNumber"));

});