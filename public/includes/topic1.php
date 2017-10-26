<html lang="EN">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php include('./includes/manifest.php'); ?>
    <?php include('./includes/openGraph.php'); ?>
  </head>

  <body style='display: none;'>
    <div style="display:none">
      <?php include('./includes/header.php'); ?>
    </div>

    
    <h2> Destiny - Yeld content Here 1</h2>


    <div style="display:none">
      <?php include('./includes/footer.php'); ?>

      <script>
        // Redirect JS
        if (window.location.pathname !== '/')
          window.location = '/?postHandler=' + window.location.pathname;
      </script>

      <div id="post-loader" class="loader internal-loader"></div>
    </div>
  </body>
</html>