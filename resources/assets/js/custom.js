// The function actually applying the offset

function offsetAnchor() {
    if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 80);
    }
}


$('a[href*=\\#].smoothscroll').on('click', function (event) {
    event.preventDefault();
    $('html,body').animate({scrollTop: $(this.hash).offset().top-70}, 500);
});


// This will capture hash changes while on the page
window.addEventListener("hashchange", offsetAnchor);

// This is here so that when you enter the page with a hash,
// it can provide the offset in that case too. Having a timeout
// seems necessary to allow the browser to jump to the anchor first.
window.setTimeout(offsetAnchor, 1); // The delay of 1 is arbitrary and may not always work right (although it did in my testing)


function on_question_clicked(element) {

    var subject = $(element).data("subject");
    $("#form-subject").val(subject);


}




var cc = false;

function correctCaptcha(response){
    if(response.length >0)
        cc = true;
}

$(document).on('ready', function () {
    $.HSCore.components.HSGoTo.init('.js-go-to');

    $("#message_form").on("submit", function (e) {
        if(!cc)
            alert("Incorrect Captcha");
        return cc;
    })
});