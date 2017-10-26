/*jslint browser: true*/
/*alert,WebFont, window, console, Modernizr, performance, window*/

(function () {
  'use strict';

  // Main
  // -------------------------------------------
  function ResponseTime() {
    if (Modernizr.performance) {
      setTimeout(function () {
        var t, time;
        t = performance.timing;
        time = t.loadEventEnd - t.responseEnd;

        if (time > 10000) {
          document.documentElement.className += " slow-network-speed";

          console.warn('Slow Network Detected', (time / 1000) + 's', 'Handled by Loading Fallback Images');
        }
      }, 0);
    }
  }

  function Webfonts() {
    var loaded, timeout;

    loaded = false;


    function show(err) {
      if (!loaded) {
        loaded = true;
        clearTimeout(timeout);

        if (err) {
          console.warn(err);
        }

        document.documentElement.className += " show-font";
      }
    }


    WebFont.load({
      google: {
        families: ['Ubuntu:n5,n2']
      },
      active: function () {
        show();
      },
      inactive: function () {
        show('Problema no carregamento da Webfont');
      }
    });

    timeout = setTimeout(function () {
      show('Timeout no carregamento da Webfont');
    }, 10000);
  }

  function WebWorker() {
    if (Modernizr.serviceworker) {
      navigator.serviceWorker.register('sw.js', { useCache: true });
    }
  }

  // Init
  // -------------------------------------------
  window.addEventListener('DOMContentLoaded', function () {
    Webfonts();
    ResponseTime();
    WebWorker();
  }, true);

}(document, window));