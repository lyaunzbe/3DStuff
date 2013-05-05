$(function() {

	var count = 0;
	var scene, camera, renderer;
	function init () {
		load();
	}
	//Load the current experiment
	function load (e) {
		//cleanup	    	
		$('#main').empty();

		count++;

		var old, head;

		//remove old dynamically written script tag-    
	    old = document.getElementById('uploadScript');  
	   	if (old != null) {  
	    	old.parentNode.removeChild(old);  
	    	delete old;  
	   	} 

	   	head = document.getElementsByTagName("head")[0];  

		script = document.createElement('script');  
	    script.id = 'uploadScript';  
	    script.type = 'text/javascript';  
	    script.onload = function(){
	    	console.log('Loaded experiment:' +count);
	    }
	    script.src = 'js/'+count+'.js';  

	    head.appendChild(script);  

	}

	//Navigation handler
	function seek (e) {

	}

	$('button.next').on('click', load);

	init();

});