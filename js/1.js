$(function() {

	var title = 'Experiment 1: Basic Transformations';

	$('.title').fadeOut(500,function(){
		$('.title').text(title);
		$('.title').fadeIn(500);

	})

	var scene, camera, renderer;

	var WIDTH, HEIGHT;

	WIDTH = 900,
	HEIGHT = 500;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 1, 1000);

	//Should really add some kind of fallback, try/catch, or Detector.js
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);

	//Append canvas element that renderer generates to html
	$("#main").append(renderer.domElement);

	var geometry, material, cube;

	geometryA = new THREE.CubeGeometry(0.5,0.6,0.5);
	geometryB = new THREE.CubeGeometry(0.5,0.5,0.5);
	geometryC = new THREE.SphereGeometry(.2,15,15);

	material = new THREE.MeshBasicMaterial({
		color: 0x89B0B3,
		wireframe: true,
		wireframeLinewidth: 3,
		vertexColors: true
	});

	sphere_mat = new THREE.MeshBasicMaterial({
		color: 0x87D0C5,
		wireframe: true,
		wireframeLinewidth: 2
	});
	
	cubeA = new THREE.Mesh(geometryA, material);
	cubeB = new THREE.Mesh(geometryB, material);
	sphere = new THREE.Mesh(geometryC, sphere_mat);


	scene.add(cubeA);
	scene.add(cubeB);
	scene.add(sphere);

	//back up the camera
	camera.position.z = 2;
	
    /*
	* xDir - Horizontal (x) velocity
	* yRotDir - The direction of the cube's horizontal rotation (left/right)
	* limit - The bounding x coordinates for the visible area.
	*/
	var xDir = 0.01,
	 	yRotDir = 1,
	 	limit = 2.1;

	cubeA.position.y = 1;
	cubeB.position.y = 0;
	var cubeA_anim = function () {
		cubeA.position.x -= xDir;

		if(cubeA.position.x >= limit)
			xDir = -xDir;
		else if(cubeA.position.x <= -limit)
			xDir = Math.abs(xDir);
	}

	var cubeB_anim = function () {
		cubeB.position.x += xDir;

		//Slow down the speed as you get closer to the edge
		cubeB.rotation.y += (0.1*(limit-Math.abs(cubeB.position.x))) * yRotDir;

		if(cubeB.position.x >= limit){
			xDir = -xDir;
			yRotDir = -yRotDir;
		}else if(cubeB.position.x <= -limit){
			xDir = Math.abs(xDir);
			yRotDir = -yRotDir;
		}
	}

	var sphere_anim = function (){
		var diff = Math.abs(limit - sphere.position.x);
		sphere.position.x += xDir;
		// SIN/COS wave
		sphere.position.y = 0.3* Math.cos((-diff)*Math.PI*sphere.position.x)-.9; 
		// SAW wave
		// sphere.position.y = 1*((sphere.position.x/1) - Math.floor(.5+(sphere.position.x/1)))-1;


		sphere.rotation.z += 0.05*yRotDir;

		if(sphere.position.x >= limit){
			xDir = -xDir;
		}else if(cubeB.position.x <= -limit){
			xDir = Math.abs(xDir);
		}
	}

	var render = function () {
		requestAnimationFrame(render);
		cubeA_anim();
		cubeB_anim();
		sphere_anim();
		renderer.render(scene, camera);
	};

	render();		

});