// The function actually applying the offset

function offsetAnchor() {
    if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 80);
    }
}



$('a[href*=\\#].smoothscroll').on('click', function (event) {
    event.preventDefault();
    $('html,body').animate({scrollTop: $(this.hash).offset().top}, 500);
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

function correctCaptcha(response) {
    if (response.length > 0)
        cc = true;
}

var loader = $("#loader");

$(document).on('ready', function () {
    $("form").on("submit", function (e) {

        $(loader).show();
        if ($(this).attr("class") === "validate")
            return;

        e.preventDefault();
        if (!cc) {
            alert("Incorrect Captcha");
            $(loader).hide();
        } else {
            $(loader).hide();
            showModal();
            $.ajax({ // create an AJAX call...
                data: $(this).serialize(), // get the form data
                type: $(this).attr('method'), // GET or POST
                url: $(this).attr('action'), // the file to call
                success: function (response) { // on success..
                    $(loader).hide();
                    //showModal();
                },
                error: function (jqXHR, err) {
                    $(loader).hide();
                    //alert("Something went wrong");
                    console.log(err);

                }
            });
        }

    })
});

var modal = $("#thankyouModal");

function showModal(){
    modal.modal('show');
}

$(modal).on('hidden.bs.modal', function () {
    location.reload();
});






var analytics_ID = "UA-103088784-2";


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', analytics_ID, 'auto');
ga('send', 'pageview');



(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:696704,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');





$("a.download").on("click",function(){

    ga('send','event','File','Download',this.href);
    gtag_report_conversion();

});


















