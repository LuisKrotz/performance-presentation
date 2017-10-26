/*jslint browser: true*/
/*global $ , Globals, jQuery, alert, window, console, FB */
(function () {
    'use strict';

    function PostHandler() {
        var rememberY, modalopen, postDestiny, getUrl;

        modalopen = false;
        postDestiny = $('#postDestiny');
        getUrl = Globals.Util.getURLParameter('postHandler');

        function modalOpen() {
            rememberY = window.scrollY;

            Globals.Body.addClass('modal-active');

            Globals.Util.pause(Globals.Body.find('video'));

            window.scrollTo(0, 0);
            Globals.ScrollY = 0;
            modalopen = true;
        }

        function modalClose() {
            Globals.Body.removeClass('modal-active');

            history.pushState(null, null, window.location.origin);
            window.scrollTo(0, rememberY);
            modalopen = false;

            Globals.ScrollY = rememberY;

            Globals.Util.play(Globals.Body.find('video'));
            postDestiny.html('');
        }

        function postHandler(postUrl) {

            //--
            function render() {
                postDestiny.html(Globals.JQXHR.responseText);

                history.pushState(null, null, postUrl);
                Globals.bLazy.revalidate();

                FB.XFBML.parse();
            }


            //--
            Globals.JQXHR = $.get(postUrl, function () {
                render();

            }).done(function () {
                Globals.Util.track('Post Handler', 'Done', postUrl);


            }).fail(function () {

                // --
                if (Globals.JQXHR.status === 0) {
                    Globals.Util.netwokFail(postUrl);

                } else if (Globals.JQXHR.status === 404) {
                    Globals.JQXHR = $.get(Globals.home + '/post-404', function () {
                        render();

                    }).done().fail(function () {
                        Globals.Util.track('Post Handler', '404 - Request Fail', Globals.home + '/post-404');

                        modalClose();

                        console.warn("ERROR: could not open 404");
                    }).always(function () {
                        console.warn("ERROR: could not complete " + postUrl + " request, handle with 404");
                    });
                } else if (Globals.JQXHR.status === 500) {
                    Globals.JQXHR = $.get(Globals.home + '/post-500', function () {
                        render();

                    }).done().fail(function () {
                        Globals.Util.track('Post Handler', '500 - Request Fail', Globals.home + '/post-500');

                        modalClose();

                        console.warn("ERROR: could not open 500");
                    }).always(function () {
                        console.warn("ERROR: could not complete " + postUrl + " request, handle with 500");
                    });
                } else {
                    modalClose();

                    console.warn("Post Handler Exception", "Modal Closed", "Could not resolve.");
                }

                Globals.Util.track('Post Handler', 'Fail', postUrl);
                console.warn("Fail", "URL:" + postUrl);

            }).always(function () {
                Globals.Body.addClass('hide-post-loader');
                Globals.Util.track('Post Handler', 'Render Completed', postUrl);
            });
        }


        // OnLoad
        if (getUrl) {
            modalOpen();

            postHandler(window.location.origin + getUrl);
            Globals.Util.track('Modal Open', 'redirect', window.location.origin + getUrl);
        }


        // Events
        Globals.Document.on('click', '.modal-open', function (e) {
            e.preventDefault();

            var href = $(this).attr("href");

            console.log(href)

            modalOpen();
            postHandler(href);
            Globals.Util.track('Modal Open', 'click', href);

            e.stopPropagation();
        });

        Globals.Document.on('click', '.modal-close, .logo', function (e) {
            if (modalopen) {
                e.preventDefault();
                modalClose();

                Globals.Body.removeClass('hide-post-loader');
                e.stopPropagation();
            }
        });
    }

    Globals.Window.on('load', PostHandler);
}(document, window, jQuery));