var speedCanvas = document.getElementById("speedChart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 16;

var chartOptions = {
  responsive:true,
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: true,
        maxRotation: 90,
        minRotation: 90,
        maxTicksLimit: 30
      }
    }],
    yAxes: [{
      ticks: {
        userCallback: function (value, index, values) {
          // Convert the number to a string and splite the string every 3 charaters from the end
          value = value.toString();
          value = Math.floor(value / 100000);
          // Convert the array to a string and format the output
          return value + "L";
        }
      }
    }]
  },
  legend: {
    maintainAspectRatio: false,
    display: true,
    position: 'right',
    labels: {
      boxWidth: 20,
      fontColor: 'black'
    }
  }
};

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        data: JSON.parse(this.responseText),
        options: chartOptions
      });
    }
  };
  xhttp.open("GET", "http://ec2-13-234-114-89.ap-south-1.compute.amazonaws.com:3000/api", true);
  xhttp.send();
}

loadDoc();
