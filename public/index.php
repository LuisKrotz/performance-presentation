<?php $uri = $_SERVER['REQUEST_URL']; ?>
<!DOCTYPE html>
<html lang="EN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <?php include('./includes/manifest.php'); ?>
        <?php include('./includes/openGraph.php'); ?>
        <?php include('./includes/styles.php'); ?>
    </head>
    <body>
        <div id="fb-root"></div>

        <h1 class="visuallyhidden">Title</h1>
        <?php include('./includes/header.php'); ?>
        <?php include('./includes/main.php'); ?>

        <?php include('./includes/footer.php'); ?>
        <?php include('./includes/loader.php'); ?>
        <?php include('./includes/network-fail.php'); ?>

        <?php include('./includes/scripts.php'); ?>
    </body>
</html>
