Fotorama initialized automatically in all the blocks with the `fotorama` class.

Change this with `data-auto="false"`:

    <div class="fotorama"
         data-auto="false">
      <img src="1.jpg">
      <img src="2.jpg">
    </div>

...and turn it on manually:

    $(function () {
      $('.fotorama').fotorama();
    });