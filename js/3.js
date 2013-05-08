$(function() {
	var vertex_shader, fragment_shader;
	var main = function(data){
		console.log(data);
		data = data.split('##BREAK');

		vertex_shader = data[0];
		fragment_shader = data[1];

		var title = 'Experiment 3: Perlin Noise & Turbulence';

		$('.title').fadeOut(500,function(){
			$('.title').text(title);
			$('.title').fadeIn(500);

		})

		var scene, camera, renderer;

		var WIDTH, HEIGHT;

		WIDTH = 900,
		HEIGHT = 500;

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(70, WIDTH/HEIGHT, 1, 1000);

		//Should really add some kind of fallback, try/catch, or Detector.js
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(WIDTH, HEIGHT);

		//Append canvas element that renderer generates to html
		$("#main").append(renderer.domElement);

		// var geometry, material, sphere;

		geometry = new THREE.SphereGeometry(25,25,25);

		material = new THREE.ShaderMaterial({
			vertexShader: vertex_shader,
			fragmentShader: fragment_shader
		});

		spherePerlin = new THREE.Mesh(geometry, material);
		

		scene.add(spherePerlin);
		camera.position.z = 50;

		var zDir = 1;


		var render = function () {
			requestAnimationFrame(render);
			spherePerlin.rotation.y += .01;
			spherePerlin.rotation.z += 0.005;

			renderer.render(scene, camera);
		};

		render();
	}
	$.get('js/shaders/3.glsl', main);

});