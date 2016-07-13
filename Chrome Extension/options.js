var ebug = document.getElementById("emailBug");
ebug.addEventListener("click", function () {
	window.open("mailto:ex.ua.adblock@gmail.com?subject=%D0%A1%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BE%20%D0%B1%D0%B0%D0%B3%D0%B5%20EX.ua%20%D0%B1%D0%B5%D0%B7%20%D1%80%D0%B5%D0%BA%D0%BB%D0%B0%D0%BC%D1%8B!");
});

var eother = document.getElementById("emailOther");
eother.addEventListener("click", function () {
	window.open("mailto:ex.ua.adblock@gmail.com");
});

function save_options() {
	var showpageaction = document.getElementById('showpageaction').checked;
	var exmail = document.getElementById('exmail').checked;
	var newsblock = document.getElementById('newsblock').checked;
	var gismeteo = document.getElementById('gismeteo').checked;
	var exshop = document.getElementById('exshop').checked;
	var sharebuttons = document.getElementById('sharebuttons').checked;
	chrome.storage.local.set({
		showpageaction: showpageaction,
		exmail: exmail,
		newsblock: newsblock,
		gismeteo: gismeteo,
		exshop: exshop,
		sharebuttons: sharebuttons
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Сохранено';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.local.get({
		showpageaction: true,
		exmail: true,
		newsblock: false,
		gismeteo: true,
		exshop: true,
		sharebuttons: true
	}, function(items) {
		document.getElementById('showpageaction').checked = items.showpageaction;
		document.getElementById('exmail').checked = items.exmail;
		document.getElementById('newsblock').checked = items.newsblock;
		document.getElementById('gismeteo').checked = items.gismeteo;
		document.getElementById('exshop').checked = items.exshop;
		document.getElementById('sharebuttons').checked = items.sharebuttons;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);