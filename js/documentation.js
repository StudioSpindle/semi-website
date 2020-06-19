// this function creates links of all documentation h*'s
(function () {
    var allHeaders = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    for (var i = 0; i < allHeaders.length; i++) {
        var inner = allHeaders[i].innerHTML;
        allHeaders[i].innerHTML = '<a href="#' + allHeaders[i].id +'" class="documentation-link"><img src="/img/link.svg"> ' + inner + '</a>';
    }
}) ();