<?php $uri = $_SERVER['REQUEST_URI']; ?>
<!DOCTYPE html>
<html lang="EN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <?php include('./includes/manifest'); ?>
        <?php include('./includes/openGraph'); ?>
        <?php include('./includes/styles'); ?>
    </head>
    <body>
        <div id="fb-root"></div>

        <h1 class="visuallyhidden">Title</h1>
        <?php include('./includes/header'); ?>
        <?php include('./includes/main'); ?>

        <?php include('./includes/footer'); ?>
        <?php include('./includes/loader'); ?>
        <?php include('./includes/network-fail'); ?>

        <?php include('./includes/scripts'); ?>
    </body>
</html>
