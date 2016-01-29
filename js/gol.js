// Ｅｘｔｒｅｍｅ　３Ｄ　ＧＯＬ

var golgrid = [[[]]]; 
var GOL = {};

GOL.updateGrid = function(p) {
	// p = dimension count;
	// iterate over each cell
	for (var i = 0; i < golgrid.length; i++) {
		for (var j = 0; j < golgrid[i].length; j++) {
			for (var k = 0; k < golgrid[i][j].length; k++) {
				// check neighbors

				// update state
			}
		}
	}
};

GOL.setupBoolgrid = function(xSize, ySize, zSize, val) {
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