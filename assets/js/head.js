var colorMode = (function() {
  var docEl = document.documentElement;
  docEl.className = docEl.className.replace('no-js', 'js');

  var docElClassList = docEl.classList;
  var dateObj = new Date();
  var currentHour = dateObj.getHours();
  var cookieColorMode = document.cookie.match(/;\s?color-mode=([^;]+);?/);
  var mode = cookieColorMode ? cookieColorMode[1] : ((currentHour > 6 && currentHour < 20) ? 'light' : 'dark');

  var other = function(v) {
    return (v === 'dark') ? 'light': 'dark';
  }

  var set = function() {
    docElClassList.remove('color-mode-' + other(mode));
    docElClassList.add('color-mode-' + mode);
  };

  var toggle = function() {
    mode = other(mode);
    dateObj.setTime(dateObj.getTime()+(365*24*3600000));
    document.cookie = 'color-mode='+mode+'; expires='+dateObj.toGMTString()+'; path=/'
    set();
  };

  set();

  return {
    toggle: toggle
  };
})();
