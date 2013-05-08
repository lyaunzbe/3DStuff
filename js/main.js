$(function() {

	var count = 0;

	function init () {
		count++;
		load();
	}
	//Load the current experiment
	function load (e) {
		//cleanup	    	
		$('#main').empty();

		if(count > 1){
			$('button.prev').removeAttr('disabled');
		}else{
			$('button.prev').attr('disabled', '');

		}

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
		var target = e.currentTarget.className;
		if(target == 'next'){
			count++;
		}else{
			count--;
		}
		load();
	}

	$('button.next').on('click', seek);

	$('button.prev').on('click', seek);


	init();

});