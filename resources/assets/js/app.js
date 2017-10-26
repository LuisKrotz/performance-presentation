/*jslint browser: true*/
/*global $ , Globals, jQuery, alert, Blazy, WebFont, window, ga, FB, console, Modernizr, performance */

(function (doc, win) {
    'use strict';

    //  Globals
    // -------------------------------------

    Globals.document = doc;
    Globals.window = win;

    Globals.Window = $(window);
    Globals.Document = $(document);
    Globals.Body = $('body, html')
    Globals.ScrollY = 0;
    Globals.ScrollX = 0;

    Globals.Window.on('scroll', function (e) {
        Globals.ScrollY = this.scrollY;
        Globals.ScrollX = this.scrollX;

        e.stopPropagation();
    });

    Globals.Viewport = Globals.Window.width();
    Globals.Height = Globals.Window.height();
    window.Globals = Globals;

    // --
    var postDestiny = $('#postDestiny');

    // General
    // -------------------------------------------
    Globals.Util = {
        track: function (category, action, label) {
            ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: label
            });
        },
        getURLParameter: function (param) {
            var pageurl, urlvariables, i, parametername;

            pageurl = window.location.search.substring(1);
            urlvariables = pageurl.split('&');

            for (i = 0; i < urlvariables.length; i++) {
                parametername = urlvariables[i].split('=');

                if (parametername[0] === param) {
                    return parametername[1];
                }
            }
        },
        sortByKey: function (array, key) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];

                if (typeof x == "string") {
                    x = x.toLowerCase();
                }
                if (typeof y == "string") {
                    y = y.toLowerCase();
                }
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        },
        unnaccent: function (string) {
            string = string.toString().toLowerCase();
            string = string.replace(/[àáâãäå]/g, 'a');
            string = string.replace(/[èéêë]/g, 'e');
            string = string.replace(/[ìíîï]/g, 'i');
            string = string.replace(/[òóôõö]/g, 'o');
            string = string.replace(/[ùúûü]/g, 'u');
            string = string.replace(/ýÿ/g, 'y');
            string = string.replace(/ç/g, 'c');
            string = string.replace(/ñ/g, 'n');
            string = string.replace(/ß/g, 's');

            return string;
        },
        render: function (url) {
            postDestiny.html(Globals.JQXHR.responseText);
            Globals.Util.detach();

            history.pushState(null, null, url);
            Globals.bLazy.revalidate();

            FB.XFBML.parse();
            Globals.Body.addClass('hide-post-loader');
        },
        networkFail: function (url) {
            Globals.Body.toggleClass('network-fail');

            Globals.Body.on('click', '.network-fail', function (e) {
                e.preventDefault();

                Globals.Body.toggleClass('network-fail');

                e.stopPropagation();
            });

            console.warn("ERROR: could not complete " + url + " request, handle with Network Fail");
        },
        play: function (videos) {
            var i, t;

            for (i = 0, t = videos.length; i < t; i += 1) {
                videos[i].play();
            }
        },
        pause: function (videos) {
            var i, t;

            for (i = 0, t = videos.length; i < t; i += 1) {
                videos[i].pause();
            }
        }
    };

    // Main
    // -------------------------------------------
    function Lazyload() {
        Globals.bLazy = new Blazy({
            offset: 500,
            breakpoints: [{
                width: 767,
                src: 'data-src-mobile'
            }],
            error: function (ele, msg) {
                console.warn(ele, msg);
            }
        });
    }

    function AjaxSetup() {
        $.ajaxSetup({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            cache: true
        });
    }

    // Init
    // -------------------------------------------

    Globals.Window.on('load', Lazyload);
    Globals.Window.on('load', AjaxSetup);
}(document, window, jQuery));