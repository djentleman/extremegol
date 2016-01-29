var initializing = THREE.Scene(); // empty scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
document.body.appendChild(renderer.domElement);

var setGrid = function(boolGrid) {
	// loop over 3d grid, set cubes
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
	console.log(grid)
};

var render = function () {
	requestAnimationFrame(render);
	// handle keybaord events
	if (keyboard.pressed("up")){
		camera.position.z += 0.1;
	}
	if (keyboard.pressed("down")){
		camera.position.z -= 0.1
	}

	if (keyboard.pressed("w")){
		camera.position.y += 0.1;
	}
	if (keyboard.pressed("s")){
		camera.position.y -= 0.1
	}

	if (keyboard.pressed("a")){
		camera.position.x -= 0.1;
	}
	if (keyboard.pressed("d")){
		camera.position.x += 0.1
	}
	
	setGrid(boolGrid);
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

var boolGrid = 	[
					[
						[1, 1],
						[1, 1],
					],
					[
						[1, 1],
						[1, 1],
					],
				];


var grid = setupGrid(2, 2, 2); // 3d grid of cubes

console.log(JSON.stringify(grid));

var cubeGeometry = new THREE.CubeGeometry(0.5, 0.5, 0.5);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});


var ambientLight = new THREE.AmbientLight(0xffffff); // add lighting
scene.add(ambientLight);

var keyboard = new THREEx.KeyboardState();
var keyPress = false;
camera.position.z = 5;



render();

