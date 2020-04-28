window.onload = function(){

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    document.getElementById('product-input').value = getParameterByName('product');
}

function sendDetails(){
    var product = document.getElementById('product-input');
    var contact = document.getElementById('contact-pref');
    var obj = {
        "name": document.getElementById('input-name').value,
        "email": document.getElementById('input-email').value,
        "company": document.getElementById('input-org').value,
        "phone": document.getElementById('input-tel').value,
        "product": product.options[product.selectedIndex].text,
        "contact": contact.options[contact.selectedIndex].text,
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-semi-production.cloudfunctions.net/email-product-request', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(obj));
    xhr.onloadend = function () {
        window.location.href = "./thank-you/";
    };
}