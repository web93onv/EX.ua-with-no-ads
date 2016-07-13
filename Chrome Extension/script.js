console.log("EX.ua без рекламы!");

chrome.storage.local.get({
	showpageaction: true,
	generalswitch: true,
	exmail: true,
	newsblock: false,
	gismeteo: true,
	exshop: true,
	sharebuttons: true
}, function(options) {

	var generalObserver = new MutationObserver(doMagic);
	generalObserver.observe(document, { subtree: true, childList: true });

	var documentHead = undefined;
	var exmailLinkFinished = false;
	var exshopFinished = false;
	var foxnewsFinished = false;
	var gismeteoFinished = false;
	var sharingFinished = false;

	/* Отобразить иконку настроек в адресной строке */
	if(options.showpageaction) {
		chrome.runtime.sendMessage({action: "showPageAction"});
	}

	/* Общий файл блокировки рекламных баннеров */
	chrome.runtime.sendMessage({action: "insertCSS", file: "general.css"});

	/* Блокировка рекламы в видеоплеере */
	if(/loaded|complete|interactive/.test(document.readyState) || document.loaded) {
		removeVideoAds();
	} else {
		window.addEventListener('DOMContentLoaded', removeVideoAds, false);
	}

	function removeVideoAds() {
		var script = document.createElement('script');
		script.innerHTML = "window.player_ad_url_1='';window.player_ad_url_2='';window.player_ad_url_3='';" // для старого плеера
			+ "player_conf.adsOptions.pre.splice(0, player_conf.adsOptions.pre.length);"; // обновление от 12 октября для нового плеера
		var head = (document.head || document.body);
		head.appendChild(script);
	}

	/* Блокировка различных компонентов EX-почты */
	if(options.exmail) {
		chrome.runtime.sendMessage({action: "insertCSS", file: "exmail.css"});
	}

	function doMagic() {
		var documentHead = document.querySelector("head");
		
		/* Удаление ссылки "EX-Почта" в главном меню */
		if(options.exmail && !exmailLinkFinished) {
			var exmailLink = document.querySelector("a[href='https://mail.ex.ua/']");
			if(!!exmailLink) {
				exmailLink.href = "/";
				exmailLink.parentNode.removeChild(exmailLink.nextSibling);
				exmailLink.childNodes[1].textContent = "-" + exmailLink.nextSibling.textContent;
				exmailLink.parentNode.removeChild(exmailLink.nextSibling);
				
				exmailLinkFinished = true;
			}
		}
		
		/* Удаление кнопок социального шаринга (vk, facebook, twitter, google+) */
		if(options.sharebuttons && !sharingFinished) {
		/* p>a>img[src="/i/f.png"], p>a>img[src="/i/v.png"], p>a>img[src="/i/t.png"], #___plusone_0 {display: none !important;} */
			var vkShareButton = document.querySelector("a[href^='http://vkontakte.ru/share'");
			if(!!vkShareButton) {
				var sharingButtonsContainer = vkShareButton.parentNode;
				var whitespace = sharingButtonsContainer.previousSibling;
				if(whitespace.innerHTML == "&nbsp;") {
					whitespace.parentNode.removeChild(whitespace);
				}
				sharingButtonsContainer.parentNode.removeChild(sharingButtonsContainer);
				
				sharingFinished = true;
			}
		}
		
		if(document.location.pathname == "/") {
		
			/* Удаление контейнера Товары на EX.ua */
			if(options.exshop && !exshopFinished && documentHead) {
				var exshopStyle = document.createElement('style');
				exshopStyle.innerHTML = "#ad_ph_1 { display: none !important; }";
				documentHead.appendChild(exshopStyle);
				
				exshopFinished = true;
			}
			
			/* Блокировка блока новостей */
			if(options.newsblock && !foxnewsFinished) {
				var foxnewsContainer = document.querySelector("#fox_news .news");
				if(!!foxnewsContainer) {
					foxnewsContainer.parentNode.removeChild(foxnewsContainer);
					
					foxnewsFinished = true;
				}
			}
			
			/* Удаление погоды Gismeteo */
			if(options.gismeteo && !gismeteoFinished) {
				var k = document.querySelector("div[id^='gsInformer'");
				if(!!k) {
					k.parentNode.parentNode.removeChild(k.parentNode);
					
					gismeteoFinished = true;
				}
			}
		
		}
	}

});