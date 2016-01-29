var initializing = THREE.Scene(); // empty scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
document.body.appendChild(renderer.domElement);
var iter = 1;

var delay = 100;

var p = 3; // dimension count;

var dim = 20; // size of grid

var sizeOfBox = 0.8;

var setGrid = function() {
	// loop over 3d grid, set cubes
	var boolGrid = GOL.getGrid();
	for (var i = 0; i < boolGrid.length; i++) {
		for (var j = 0; j < boolGrid[i].length; j++) {
			for (var k = 0; k < boolGrid[i][j].length; k++) {
				if (boolGrid[i][j][k]) {
					grid[i][j][k] = new THREE.Mesh(cubeGeometry, cubeMaterial);
					grid[i][j][k].position.x = i-0.25;
					grid[i][j][k].position.y = j-0.25;
					grid[i][j][k].position.z = k-0.25;
					scene.add(grid[i][j][k]);
				}
			}
		}
	}
};

var cleanup = function() {
	for( var i = scene.children.length - 1; i >= 0; i--) { 
		obj = scene.children[i];
		scene.remove(obj);
	}
};

var render = function () {
	window.setTimeout( function() {
		requestAnimationFrame(render);
	}, delay);
	

	if (iter) {
		cleanup();

		// handle keybaord events
		if (keyboard.pressed("w")){
			camera.position.z -= 0.5;
		}
		if (keyboard.pressed("s")){
			camera.position.z += 0.5;
		}


		if (keyboard.pressed("left")){
			camera.rotation.y += 0.05;
		}
		if (keyboard.pressed("right")){
			camera.rotation.y -= 0.05;
		}

		if (keyboard.pressed("up")){
			camera.position.y += 0.5;
		}
		if (keyboard.pressed("down")){
			camera.position.y -= 0.5;
		}

		if (keyboard.pressed("a")){
			camera.position.x -= 0.5;
		}
		if (keyboard.pressed("d")){
			camera.position.x += 0.5;
		}
		GOL.updateGrid(p);
	}
	iter++;
	// sleep?
	setGrid();
	renderer.render(scene, camera);
};

var setupGrid = function(xSize, ySize, zSize) {
	var grid = [];
	for (var i = 0; i < xSize; i++) {
		grid.push([]);
		for (var j = 0; j < ySize; j++) {
			grid[i].push([]);
			for (var k = 0; k < zSize; k++) {
				grid[i][j].push(undefined);
			}
		}
	}
	return grid;
};



if (p == 2) {
	GOL.randomSeed(dim, dim, 1);
	var grid = setupGrid(dim, dim, 1); // 3d grid of cubes
} else if (p == 3) {
	GOL.randomSeed(dim, dim, dim);
	var grid = setupGrid(dim, dim, dim); // 3d grid of cubes
}



var cubeGeometry = new THREE.CubeGeometry(sizeOfBox, sizeOfBox, sizeOfBox);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});


var ambientLight = new THREE.AmbientLight(0xffffff); // add lighting
scene.add(ambientLight);

var keyboard = new THREEx.KeyboardState();
var keyPress = false;
camera.position.x = GOL.getGrid().length/2;
camera.position.y = GOL.getGrid()[0].length/2;
camera.position.z = GOL.getGrid()[0][0].length * 2 + 10;



render();

