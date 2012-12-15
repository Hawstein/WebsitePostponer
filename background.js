	﻿if(!localStorage["count"])	//init only once
		localStorage["count"] = 0;  //the total number of urls

	// Called when the url of a tab changes.
	function showPageAction(url, tabId) {
	  // If the url is:chrome://chrome/extensions
	  if (url.indexOf('chrome://chrome/extensions') > -1) {
	    // ... show the page action.
	    chrome.pageAction.show(tabId);
	  }
	};

	function blockWebsite(newUrl, tabId, tab) {
		if(!newUrl) return;
		var num = localStorage["count"];
		var time = localStorage["time"];
		var today=new Date();
		var now=today.getHours();
		for(var i=0; i<num; ++i){
			var urli = "url" + i;
			var url = localStorage[urli];
			if(newUrl.indexOf(url)>-1 && now<time) { //if the website is in the list and the time is less what you set,redirect.
				chrome.tabs.update(tabId, { url: "http://www.google.ca" });	
				break;
			}
		}
	}
	// Listen for any changes to the URL of any tab.
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
		var myurl = tab.url;
		showPageAction(myurl, tabId); //show pageAction or not
		blockWebsite(myurl, tabId); //if the website is in the list, block it;
	});

	//open the options page
	function openOptions(){
		var url = "options.html";
		var fullUrl = chrome.extension.getURL(url);//chrome-extension://your extension id//options.html	
		chrome.tabs.getAllInWindow(null, function(tabs){
			for(var i in tabs){
				var tab = tabs[i];
				if(tab.url == fullUrl){
					chrome.tabs.update(tab.id, {selected: true});
					return;
				}
			}
			chrome.tabs.getSelected(null, function(tab){
				chrome.tabs.create({ url: url, index: tab.index+1});
			});
		});
	}

	chrome.pageAction.onClicked.addListener(openOptions);
