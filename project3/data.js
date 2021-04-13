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
