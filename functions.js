var $btns = $('.btn').click(function() {
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
  }) 