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

  /*
  document.querySelector("#listings").onscroll = function () {
    console.log(document.querySelector("#listings").scrollTop);
    if(document.querySelector("#listings").scrollTop > 80 && document.getElementById("expand-contract").classList.contains('show'))
    {
      $("#expand-contract").toggle(100, function() {
        console.log('rimuovo show');
        document.getElementById("expand-contract").classList.remove('show');
      });
    }
    if(document.querySelector("#listings").scrollTop < 80 && !document.getElementById("expand-contract").classList.contains('show'))
    {
      $("#expand-contract").toggle(100, function() {
        console.log('aggiungo show');
        document.getElementById("expand-contract").classList.add('show');
      });
    }
  };
    */
    /*

        if (document.querySelector("#listings").scrollTop > 80 && $('#expand-contract').class) {
      $('#expand-contract').collapse("toggle");
      }
    if (document.querySelector("#listings").scrollTop < 80) {
    $('#expand-contract').expand("toggle");
    }
    */