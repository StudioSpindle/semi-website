<<<<<<< HEAD
var WCSURL = "https://wcs.api.semi.technology/v1"; function validateEmail(e) { return new RegExp("^([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x22)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x22))*\\x40([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d))*$").test(e) } function loadJSON(e, t, x, a) { var n = new XMLHttpRequest; e = e; n.onload = function () { a(JSON.parse(this.responseText)) }, n.open(t, e, !0), "POST" == t ? (n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), n.send(JSON.stringify(x))) : n.send() } function addDotToBlock() { document.getElementById("status-overview").innerText += "." } function addToBlock(e, t) { document.getElementById("status-overview").innerText += "\n" + t + "% // " + e } function processRequest(e) { document.getElementById("request").style.display = "none", document.getElementById("showProgress").style.display = "block", addToBlock(e.status.state.message, e.status.state.percentage); var t = e.status.state.percentage, x = setInterval(function () { loadJSON(WCSURL + "/clusters/" + e.id, "GET", {}, function (e) { t != e.status.state.percentage ? (addToBlock(e.status.state.message, e.status.state.percentage), t = e.status.state.percentage, fakePercentage = t) : addDotToBlock(), 100 == t && (addToBlock("---", 100), addToBlock("Done! You've got mail...", 100), clearInterval(x)) }) }, 4400) } function createCluster() { var e = document.getElementById("input-email").value; if (!1 !== validateEmail(e)) { requestObj = { email: e }; var t = document.getElementById("demo-dataset"), x = t.options[t.selectedIndex].value; "empty" != x && (requestObj.configuration = {}, requestObj.configuration.demoData = x), loadJSON(WCSURL + "/clusters", "POST", requestObj, processRequest) } } window.onload = function () { loadJSON(WCSURL + "/demodatasets", "GET", {}, function (e) { var t = e.dataSets; for (i = 0; i < t.length; i++) { var x = document.getElementById("demo-dataset"), a = document.createElement("option"); a.text = t[i].description.substring(0, 48), a.value = t[i].name, x.add(a) } }) };
=======
var WCSURL="https://wcs.api.semi.technology/v1";function validateEmail(e){return new RegExp("^([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x22)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x22))*\\x40([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d))*$").test(e)}function loadJSON(e,t,x,a){var n=new XMLHttpRequest;e=e;n.onload=function(){a(JSON.parse(this.responseText))},n.open(t,e,!0),"POST"==t?(n.setRequestHeader("Content-Type","application/json;charset=UTF-8"),n.send(JSON.stringify(x))):n.send()}function addDotToBlock(){document.getElementById("status-overview").innerText+="."}function addToBlock(e,t){document.getElementById("status-overview").innerText+="\n"+t+"% // "+e}function processRequest(e){document.getElementById("request").style.display="none",document.getElementById("showProgress").style.display="block",addToBlock(e.status.state.message,e.status.state.percentage);var t=e.status.state.percentage,x=setInterval(function(){loadJSON(WCSURL+"/clusters/"+e.id,"GET",{},function(e){t!=e.status.state.percentage?(addToBlock(e.status.state.message,e.status.state.percentage),t=e.status.state.percentage,fakePercentage=t):addDotToBlock(),100==t&&(addToBlock("---",100),addToBlock("Done! You've got mail...",100),clearInterval(x))})},4400)}function createCluster(){var e=document.getElementById("input-email").value;if(!1!==validateEmail(e)){requestObj={email:e};var t=document.getElementById("demo-dataset"),x=t.options[t.selectedIndex].value;"empty"!=x&&(requestObj.configuration={},requestObj.configuration.demo=x),loadJSON(WCSURL+"/clusters","POST",requestObj,processRequest)}}window.onload=function(){loadJSON(WCSURL+"/demodatasets","GET",{},function(e){var t=e.dataSets;for(i=0;i<t.length;i++){var x=document.getElementById("demo-dataset"),a=document.createElement("option");a.text=t[i].description.substring(0,48),a.value=t[i].name,x.add(a)}})};
>>>>>>> gh-416: General updates to the docs
