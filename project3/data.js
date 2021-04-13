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

