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

    document.getElementById('solution-input').value = getParameterByName('solution');
}

function sendDetails(){
    var solution = document.getElementById('solution-input');
    var contact = document.getElementById('contact-pref');
    var obj = {
        "name": document.getElementById('input-name').value,
        "email": document.getElementById('input-email').value,
        "company": document.getElementById('input-org').value,
        "phone": document.getElementById('input-tel').value,
        "solution": solution.options[solution.selectedIndex].text,
        "contact": contact.options[contact.selectedIndex].text,
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://us-central1-semi-solutionion.cloudfunctions.net/email-solution-request', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(obj));
    xhr.onloadend = function () {
        window.location.href = "./thank-you/";
    };
}