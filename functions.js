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
    if (document.querySelector("#listings").scrollTop > 50 || document.querySelector("#listings").scrollTop > 50) {
      $("#expand-contract").removeClass('show');
    } else {
      $("#expand-contract").addClass('show');
    }
  }

  var original_marker_width = $('.marker').width();

  map.on('zoomend', (original_marker_width) => {
    var new_width = 12 + ((map.getZoom() - 13) * 5) ;
    $('.marker').css("width", new_width);
    console.log('zoom è ' + map.getZoom());
    console.log('il width è ' + new_width);
    });