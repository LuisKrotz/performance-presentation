<html lang="EN">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1"> @include('includes/openGraph')

    <?php include('./includes/manifest'); ?>
    <?php include('./includes/openGraph'); ?>
  </head>

  <body style='display: none;'>
    <div style="display:none">
      <?php include('includes/app/header'); ?>
    </div>

    
    <h2> Destiny - Yeld content Here </h2>


    <div style="display:none">
      <?php include('includes/app/footer'); ?>

      <script>
        // Redirect JS
        if (window.location.pathname !== '/')
          window.location = '/?postHandler=' + window.location.pathname;
      </script>

      <div id="post-loader" class="loader internal-loader"></div>
    </div>
  </body>
</html>