<script>
    window.Globals = {};

    window.Globals = {
        home: '<?php $uri; ?>',
        facebook: 'fb_id',
        pixel: 'fb_id',
        ga: '{{ ga_key }}'
    };
</script>
<script src="<?php echo($uri); ?>js/base.min.js?v=0.0.0"></script>
<script async src="<?php echo($uri); ?>js/app.min.js?v=0.0.0"></script>
