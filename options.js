// Saves options to localStorage.

function checkExisted(newUrl){
	var num = localStorage["count"];
	for(var i=0; i<num; ++i){
		var urli = "url" + i;
		var url = localStorage[urli];
		if(newUrl==url) return true;
	}
	return false;
}

function save_options() {
  var select = document.getElementById("time");  //get the time
  var time = select.children[select.selectedIndex].value;
  var timeshow = select.children[select.selectedIndex].text;
  localStorage["time"] = time;
  localStorage["timeshow"] = timeshow;
  //alert(time);

  var url = document.getElementById("url").value;  //get the url
  if(url){	//url: not null
    var existed = checkExisted(url);
	if(!existed){	// add url when it is not existed in the localStorage
		var num = localStorage["count"];
		var urli = "url" + num;
		localStorage[urli] = url;
		localStorage["count"] = parseInt(num) + 1;
	}
	
  }
  
  //alert(url);
  
  restore_options();
}
// Restores select box state to saved value from localStorage.
function restore_options() {
  var timeshow = localStorage["timeshow"];
  document.getElementById("selectedtime").innerHTML = ""; //clear the old time first
  if (timeshow) {
    document.getElementById("selectedtime").innerHTML = timeshow;
  }
  var num = localStorage["count"];
  document.getElementById("weblist").innerHTML = ""; //clear the old weblist first
  for(var i=0; i<num; ++i){
    var urli = "url" + i;
	var url = localStorage[urli];
	if(url) {
		document.getElementById("weblist").innerHTML = document.getElementById("weblist").innerHTML + "</br>" + url;
	}
  }
  
  
}

function clear_options() {
  var num = localStorage["count"];
  for(var i=0; i<num; ++i){
    var urli = "url" + i;
	localStorage[urli] = "";
	//if(!localStorage[urli]) alert("done");
  }
  localStorage["count"] = 0;
  localStorage["time"] = "";
  localStorage["timeshow"] = "";
  restore_options();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#btnSave').addEventListener('click', save_options);  //通过id找到相应元素
  document.querySelector('#btnClear').addEventListener('click', clear_options);
  window.addEventListener('load', restore_options);
});
