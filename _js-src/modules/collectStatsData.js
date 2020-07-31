/**
 * Collects data about Github and Docker pulls
 */
export default function() {
  function setTotalPulls() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        document.getElementById('totalpulls').src = 'https://img.shields.io/badge/total--pulls-' + req.responseText + '-yellow?style=flat-square'
      }
    };
    req.open('GET', 'https://europe-west1-semi-production.cloudfunctions.net/docker-hub-pulls');
    req.send(null);
  }
  

  // run the command
  setTotalPulls()

}
