// Ｅｘｔｒｅｍｅ　３Ｄ　ＧＯＬ

var golgrid = []; 
var GOL = {};

var wrap = function(i) {
	if (i < 0) {
		return golgrid.length + (i % golgrid.length);
	}
	if (i >= golgrid.length) {
		return i % golgrid.length;
	}
	return i;
}

var checkNeighbors = function(x, y, z, p) {
	var neigh = 0;
	//console.log("-------------");
	//console.log(x, y, z);
	//console.log("-------------");
	var adj = [-1, 0, 1];
	for (var i = 0; i < adj.length; i++) {
		for (var j = 0; j < adj.length; j++) {
			if (p === 3) {
				for (var k = 0; k < adj.length; k++) {
					if (!(i === 1 && j === 1 && k === 1)) {
						neigh += golgrid[wrap(x + adj[i])][wrap(y + adj[j])][wrap(z + adj[k])];
					}
				}
			}
			else {
				if (!(i === 1 && j === 1)) {
					//console.log(wrap(x + adj[i]), wrap(y + adj[j]));
					neigh += golgrid[wrap(x + i-1)][wrap(y + j-1)][0];
				}
			}
		}
	}
	//console.log("-------------");
	//console.log(neigh);
	//console.log("-------------");
	return neigh;
};

GOL.updateGrid = function(p) {
	// p = dimension count;
	// iterate over each cell
	var currNeigh;
	var newGrid = JSON.parse(JSON.stringify(golgrid)); //  deep copy
	for (var i = 0; i < golgrid.length; i++) {
		for (var j = 0; j < golgrid[i].length; j++) {
			for (var k = 0; k < golgrid[i][j].length; k++) {
				// check neighbors
				currNeigh = checkNeighbors(i, j, k, p);
				// update state
				if (p === 2) {


					if (golgrid[i][j][k]) {
						if (currNeigh < 2 || currNeigh > 3) {
							//console.log('cell die')
							newGrid[i][j][k] = 0;
						}
						else {
							newGrid[i][j][k] = 1;
							//console.log('cell live')
						}
					}
					else {
						// cell dead
						if (currNeigh == 3) {
							newGrid[i][j][k] = 1;
						}
					}
				}
				else {

					if (golgrid[i][j][k]) {
						if (currNeigh < 4 || currNeigh > 8) {
							//console.log('cell die')
							newGrid[i][j][k] = 0;
						}
						else {
							newGrid[i][j][k] = 1;
							//console.log('cell live')
						}
					}
					else {
						// cell dead
						if (currNeigh == 5) {
							newGrid[i][j][k] = 1;
						}
					}

				}
			}
		}
	}
	golgrid = JSON.parse(JSON.stringify(newGrid));;
};

GOL.setupBoolgrid = function(xSize, ySize, zSize, val) {
	golgrid = []; 
	for (var i = 0; i < xSize; i++) {
		golgrid.push([]);
		for (var j = 0; j < ySize; j++) {
			golgrid[i].push([]);
			for (var k = 0; k < zSize; k++) {
				golgrid[i][j].push(val);
			}
		}
	}
	return golgrid;
};

GOL.set = function(x, y, z, val) {
	golgrid[x][y][z] = val;
}

GOL.getGrid = function() {
	return golgrid;
}

GOL.randomSeed = function(xSize, ySize, zSize) {
	golgrid = [];
	for (var i = 0; i < xSize; i++) {
		golgrid.push([]);
		for (var j = 0; j < ySize; j++) {
			golgrid[i].push([]);
			for (var k = 0; k < zSize; k++) {
				golgrid[i][j].push(Math.floor(Math.random() * 2));
			}
		}
	}
	return golgrid;
};