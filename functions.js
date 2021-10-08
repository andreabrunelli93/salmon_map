  /* CATEGORY FILTER */

  var $btns = $('.btn').click(function () {
    if (this.id == 'all') {
      $('#listings > div').fadeIn(450);
      $('.mapboxgl-canvas-container > div').fadeIn(450)
    } else {
      var $el = $('.' + this.id).fadeIn(450);
      $('#listings > div').not($el).hide();
      $('.mapboxgl-canvas-container > div').not($el).hide();
    }
    $btns.removeClass('active');
    $(this).addClass('active');
  });

  /* TEXT SEARCH */
  function textFilter() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("listings");
    li = ul.getElementsByClassName('item');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  document.querySelector("#listings").onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    $header = $(".header");
    $content = $("#expand-contract")
    if (document.querySelector("#listings").scrollTop > 80 || document.querySelector("#listings").scrollTop > 80) {
      console.log('sono nell if');
      $content.slideToggle(500, function () {
        $header.text(function () {
          return $content.is(":visible") ? "Collapse" : "Collapse";
        });
      });
    } else {
      $content.slideToggle(500, function () {
        $header.text(function () {
          return $content.is(":visible") ? "Expand" : "Expand";
        });
      });
    }
  }
  /*
    function scrollFunction() {

      $content.slideToggle(500, function () {
          $header.text(function () {
              return $content.is(":visible") ? "Collapse" : "Expand";
          });
      });
  };*/