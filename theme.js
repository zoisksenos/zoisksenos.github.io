/* Θέμα φωτεινό / σκοτεινό — κοινό για όλες τις σελίδες.
   Φορτώνεται στο <head> (χωρίς defer) ώστε να οριστεί το θέμα
   πριν από το πρώτο ζωγραφικό καρέ και να μην υπάρχει αναλαμπή. */
(function () {
  var root = document.documentElement;

  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  root.style.colorScheme = dark ? 'dark' : 'light';

  function wire() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function render() {
      var isDark = root.getAttribute('data-theme') === 'dark';
      btn.hidden = false;
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('aria-label', isDark ? 'Ενεργοποίηση φωτεινού θέματος' : 'Ενεργοποίηση σκοτεινού θέματος');
      btn.title = isDark ? 'Φωτεινό θέμα' : 'Σκοτεινό θέμα';
    }

    btn.addEventListener('click', function () {
      var goDark = root.getAttribute('data-theme') !== 'dark';
      root.setAttribute('data-theme', goDark ? 'dark' : 'light');
      root.style.colorScheme = goDark ? 'dark' : 'light';
      try { localStorage.setItem('theme', goDark ? 'dark' : 'light'); } catch (e) {}
      render();
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
