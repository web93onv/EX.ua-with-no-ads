function init() {
  var script = document.createElement('script');
  script.innerHTML = "window.player_ad_url_1='';window.player_ad_url_2='';window.player_ad_url_3='';console.log('EX.ua без рекламы!');";
  var head = (document.head || document.body);
  head.appendChild(script);
}

if(/loaded|complete|interactive/.test(document.readyState) || document.loaded) {
	init();
} else {
  if(window.addEventListener) {
    window.addEventListener('DOMContentLoaded', init, false);
  } else {
    window.attachEvent('onload', init);
  }
}