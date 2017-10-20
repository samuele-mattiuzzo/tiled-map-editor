var tableId = 'MAP',
    grid,
    gridSize = 10,
    gridContainer = document.getElementById('grid-container'),
    gridResult = document.getElementById('grid-result'),
    gridResultText = document.getElementById('grid-result-text'),
    drawButton,
    resetButton,
    exportButton,
    importButton;


function changeTileType(tile, switchValue) {

    // the values are as follows:
    // - 0 for walls/inert
    // - 1 for walkable tiles
    // - 2 for the start tile
    // - 3 for the end tile
    // - 4 inverts start and end
    // - 5 inverts controls
    // - 6 flips level 90 degrees
    // - 7 extends the field of view by 1

    switch (switchValue) {
        case '':
        case 1:
            tile.className = 'clicked'
            tile.setAttribute('data-tile-value', 1);
            break;
        case 'clicked':
        case 2:
            tile.className = 'clicked-start';
            tile.setAttribute('data-tile-value', 2);
            break;
        case 'clicked-start':
        case 3:
            tile.className = 'clicked-end';
            tile.setAttribute('data-tile-value', 3);
            break;
        case 'clicked-end':
        case 4:
            tile.className = 'clicked-invert-start';
            tile.setAttribute('data-tile-value', 4);
            break;
        case 'clicked-invert-start':
        case 5:
            tile.className = 'clicked-invert-controls';
            tile.setAttribute('data-tile-value', 5);
            break;
        case 'clicked-invert-controls':
        case 6:
            tile.className = 'clicked-flip';
            tile.setAttribute('data-tile-value', 6);
            break;
        case 'clicked-flip':
        case 7:
            tile.className = 'clicked-extend';
            tile.setAttribute('data-tile-value', 7);
            break;
        default:
            tile.className = '';
            tile.setAttribute('data-tile-value', 0);
            break;
    }
}

function onTileClick(tile) {
    changeTileType(tile, tile.className);
}

function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.id = tableId;

    for (var r=0; r<rows; ++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0; c<cols; ++c){

            var cell = tr.appendChild(document.createElement('td'));
            cell.setAttribute('data-tile-value', 0);

            cell.addEventListener('click',(function(el){
                return function(){
                    callback(el);
                }
            })(cell),false);
        }
    }
    return grid;
}

// resets the entire grid at the current size
function reDraw() {
    grid = clickableGrid(gridSize, gridSize, onTileClick);
    gridContainer.innerHTML = '';
    gridContainer.appendChild(grid);
    gridResultText.innerHTML = '';
    gridResult.style.display = 'none';
}

// creates the grid and appends it to the body
grid = clickableGrid(gridSize, gridSize, onTileClick);
gridContainer.appendChild(grid);

// set the onclick events on the buttons
drawButton = document.getElementById('draw');
resetButton = document.getElementById('reset');
exportButton = document.getElementById('export');
importButton = document.getElementById('import');

drawButton.onclick = function(el) {
    // draws the grid with the requested size
    gridSize = parseInt(document.getElementById('draw-size').value);
    reDraw();
}

resetButton.onclick = function(el) {
    // resets the board at the current size
    reDraw();
}

exportButton.onclick = function(el) {
    // exports a comma separated list of 0,1,2 to re-import in unity
    var table = document.getElementById(tableId),
        collected = [];

    // loop through all the cells
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, cell; cell = row.cells[j]; j++) {
            // collect values
            collected.push(cell.getAttribute('data-tile-value'));
        }
    }

    // return '0, 1, 0, 0, 0 ' etc
    gridResultText.innerHTML = collected.join(', ');
    gridResult.style.display = 'block';
}

importButton.onclick = function(el) {
    var importValue = document.getElementById('import-grid').value.split(", "),
        arrayIndex = 0;

    gridSize = Math.sqrt(importValue.length);
    reDraw();
    var table = document.getElementById(tableId);

    // loop through all the cells
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, cell; cell = row.cells[j]; j++) {
            changeTileType(cell, parseInt(importValue[arrayIndex]));
            arrayIndex += 1;
        }
    }
}
