$(document).ready(function () {
  $.getJSON(
    "http://www.randyconnolly.com/funwebdev/services/visits/browsers.php",
    function (results) {
      var $Browser_dropdown = $("#filterBrowser");
      $Browser_dropdown.empty();
      $Browser_dropdown.append(
        $("<option></option>").attr("value", "").text("Select any Browser")
      );

      $.each(results, function (index, value) {
        $Browser_dropdown.append(
          $("<option></option>").attr("value", value.id).text(value.name)
        );
      });
    }
  );
});

$(document).ready(function () {
  $.getJSON(
    "http://www.randyconnolly.com/funwebdev/services/visits/os.php",
    function (results) {
      var $OS_dropdown = $("#filterOS");
      $OS_dropdown.empty();
      $OS_dropdown.append(
        $("<option></option>").attr("value", "").text("Select any OS")
      );

      $.each(results, function (index, value) {
        $OS_dropdown.append(
          $("<option></option>").attr("value", value.id).text(value.name)
        );
      });
    }
  );
});

$(document).ready(function () {
  $.getJSON(
    "http://www.randyconnolly.com/funwebdev/services/visits/countries.php?continent=EU",
    function (results) {
      var $countries_dropdown = $("#filterCountry");
      $countries_dropdown.empty();
      $countries_dropdown.append(
        $("<option></option>").attr("value", "").text("Select any Country")
      );

      $.each(results, function (index, value) {
        $countries_dropdown.append(
          $("<option></option>").attr("value", value.id).text(value.name)
        );
      });
    }
  );
});

$(document).ready(function () {
  $.getJSON(
    "http://www.randyconnolly.com/funwebdev/services/visits/visits.php?continent=EU&month=1&limit=100",
    function (data) {
      visit_data(data);
    }
  );
});

function visit_data(data) {
  var table_visit = "";

  $.each(data, function (key, visit) {
    table_visit += "<tr>";
    table_visit += "<td>" + visit.id + "</td>";
    table_visit += "<td>" + visit.visit_date + "</td>";
    table_visit += "<td>" + visit.country + "</td>";
    table_visit += "<td>" + visit.browser + "</td>";
    table_visit += "<td>" + visit.operatingSystem + "</td>";
    table_visit += "</tr>";
  });
  $("#visitsBody").html(table_visit);
  filtercall(data);
  piechart(data);
  columnChart(data);
  geoChart(data);
 
}

function filtercall(data) {
  $("#filterBrowser, #filterCountry, #filterOS").on("change", function (e) {
    var filters = {};
    if (e.target.value == 0) {
      delete filters[e.target.id];
    } else {
      filters[e.target.id] = e.target.value;
    }
    var random = $.grep(data, function (el, i) {
      var result = true;
      if (filters[e.target.id] && e.target.id == "filterBrowser") {
        if (filters[e.target.id] != el.browser_id) result = false;
      }
      if (filters[e.target.id] && e.target.id == "filterCountry") {
        if (filters[e.target.id] != el.country) result = false;
      }
      if (filters[e.target.id] && e.target.id == "filterOS") {
        if (filters[e.target.id] != el.os_id) result = false;
      }
      return result;
    });
    visit_data(random);
  });
}
function piechart(data) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);
  var display = [];

  data.forEach((element) => {
    if (
      display.length != 0 &&
      display.map((i) => i[0]).includes(element.browser)
    ) {
      // alert(element.browser);
      var a = display.map((i) => i[0]).indexOf(element.browser.toString());
      //alert(a);
      display[a][1]++;
    } else {
      var emptyArray = [];
      emptyArray.push(element.browser);
      emptyArray.push(1);

      display.push(emptyArray);
      console.log(display);
    }
  });

  console.log(display);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(
      [["", ""]].concat(display)
    );

    var options = {
      title: "Browser Visit Count",
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("piechart")
    );

    chart.draw(data, options);
  }
}

function columnChart(data) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  var display = [];

  data.forEach((element) => {
    if (
      display.length != 0 &&
      display.map((i) => i[0]).includes(element.operatingSystem)
    ) {
      // alert(element.browser);
      var a = display
        .map((i) => i[0])
        .indexOf(element.operatingSystem.toString());
      //alert(a);
      display[a][1]++;
    } else {
      var emptyArray = [];
      emptyArray.push(element.operatingSystem);
      emptyArray.push(1);

      display.push(emptyArray);
      console.log(display);
    }
  });

  function drawChart() {
    var data = google.visualization.arrayToDataTable(
      [["", ""]].concat(display)
    );

    var view = new google.visualization.DataView(data);
    view.setColumns([
      0,
      1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation",
      },
    ]);

    var options = {
      title: "Density of Precious Metals, in g/cm^3",
      width: 600,
      height: 400,
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(
      document.getElementById("columnchart")
    );
    chart.draw(view, options);
  }
}

function geoChart(data) {
  google.charts.load("current", {
    packages: ["geochart"],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  var display = [];

  data.forEach((element) => {
    if (
      display.length != 0 &&
      display.map((i) => i[0]).includes(element.country)
    ) {
      // alert(element.browser);
      var a = display.map((i) => i[0]).indexOf(element.country.toString());
      //alert(a);
      display[a][1]++;
    } else {
      var emptyArray = [];
      emptyArray.push(element.country);
      emptyArray.push(1);

      display.push(emptyArray);
      console.log(display);
    }
  });

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(
      [["", ""]].concat(display)
    );

    var options = {};

    var chart = new google.visualization.GeoChart(
      document.getElementById("geochart")
    );

    chart.draw(data, options);
  }
}


