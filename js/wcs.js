/**
 * Create the cluster service
 * @param id {string} | element id of the cookie bar
 */
var WCSURL = 'https://wcs.api.semi.technology/v1';

function validateEmail(emailAddress){
var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
var sQuotedPair = '\\x5c[\\x00-\\x7f]';
var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
var sDomain_ref = sAtom;
var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
var sWord = '(' + sAtom + '|' + sQuotedString + ')';
var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

var reValidEmail = new RegExp(sValidEmail);

return reValidEmail.test(emailAddress);
}

function loadJSON(url, method, body, cb) {
    var xmlhttp = new XMLHttpRequest();
    var url = url;
    xmlhttp.onload = function () {
        cb(JSON.parse(this.responseText))
    }

    xmlhttp.open(method, url, true);

    if(method=='POST'){
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(body));
    } else {
        xmlhttp.send();
    }

}

function addDotToBlock(){
    document.getElementById('status-overview').innerText += "."
}

function addToBlock(message, percentage){
    document.getElementById('status-overview').innerText += "\n" + percentage + "% // " + message;
}

function processRequest(i){
    document.getElementById('request').style.display = 'none';
    document.getElementById('showProgress').style.display = 'block';

    addToBlock(i['status']['state']['message'], i['status']['state']['percentage'])

    var previousPercentage = i['status']['state']['percentage'];

    var interval = setInterval(function(){
        loadJSON(WCSURL + '/clusters/' + i['id'], 'GET', {}, function(i){
            if(previousPercentage != i['status']['state']['percentage']){
                addToBlock(i['status']['state']['message'], i['status']['state']['percentage']);
                previousPercentage = i['status']['state']['percentage'];
                fakePercentage = previousPercentage
            } else {
                addDotToBlock();
            }
            if(previousPercentage == 100){
                addToBlock("---", 100)
                addToBlock("Done! You've got mail...", 100)
                clearInterval(interval);
            }
        })
    }, 4400);
}

function createCluster(){
    var email = document.getElementById('input-email').value
    if(validateEmail(email) !== false){
        requestObj = {
            "email": email
        }

        var e = document.getElementById("demo-dataset");
        var selectedDataset = e.options[e.selectedIndex].value;

        if(selectedDataset != 'empty'){
            requestObj['configuration'] = {}
            requestObj['configuration']['demoData'] = selectedDataset
        }

        loadJSON(WCSURL + '/clusters', 'POST', requestObj, processRequest)
    }
}

window.onload = function(){
    loadJSON(WCSURL + '/demodatasets', 'GET', {}, function(result){
        var datasets = result['dataSets'];
        for (i = 0; i < datasets.length; i++) {
            var select = document.getElementById("demo-dataset");
            var option = document.createElement("option");
            option.text = datasets[i]['description'].substring(0, 48);
            option.value = datasets[i]['name'];
            select.add(option);
        }
    })
}