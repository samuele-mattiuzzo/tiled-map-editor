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


function onTileClick(el, row, col, i) {
    // the values are as follows:
    // - 0 for walls/inert
    // - 1 for walkable tiles
    // - 2 for the start tile
    // - 3 for the end tile
    // - 4 inverts start and end
    // - 5 inverts controls
    // - 6 flips level 90 degrees
    // - 7 extends the field of view by 1

    switch (el.className) {
        case '':
            el.className = 'clicked'
            el.setAttribute('data-tile-value', 1);
            break;
        case 'clicked':
            el.className = 'clicked-start';
            el.setAttribute('data-tile-value', 2);
            break;
        case 'clicked-start':
            el.className = 'clicked-end';
            el.setAttribute('data-tile-value', 3);
            break;
        case 'clicked-end':
            el.className = 'clicked-invert-start';
            el.setAttribute('data-tile-value', 4);
            break;
        case 'clicked-invert-start':
            el.className = 'clicked-invert-controls';
            el.setAttribute('data-tile-value', 5);
            break;
        case 'clicked-invert-controls':
            el.className = 'clicked-flip';
            el.setAttribute('data-tile-value', 6);
            break;
        case 'clicked-flip':
            el.className = 'clicked-extend';
            el.setAttribute('data-tile-value', 7);
            break;
        default:
            el.className = '';
            el.setAttribute('data-tile-value', 0);
            break;
    }
}

function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    grid.id = tableId;

    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){

            var cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = ++i;
            cell.setAttribute('data-tile-value', 0);

            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}

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

            var cellValue = parseInt(importValue[arrayIndex]);
            arrayIndex += 1;

            switch (cellValue) {
                case 1:
                    cell.className = 'clicked'
                    cell.setAttribute('data-tile-value', 1);
                    break;
                case 2:
                    cell.className = 'clicked-start';
                    cell.setAttribute('data-tile-value', 2);
                    break;
                case 3:
                    cell.className = 'clicked-end';
                    cell.setAttribute('data-tile-value', 3);
                    break;
                case 4:
                    cell.className = 'clicked-invert-start';
                    cell.setAttribute('data-tile-value', 4);
                    break;
                case 5:
                    cell.className = 'clicked-invert-controls';
                    cell.setAttribute('data-tile-value', 5);
                    break;
                case 6:
                    cell.className = 'clicked-flip';
                    cell.setAttribute('data-tile-value', 6);
                    break;
                case 7:
                    cell.className = 'clicked-extend';
                    cell.setAttribute('data-tile-value', 7);
                    break;
                default:
                    cell.className = '';
                    cell.setAttribute('data-tile-value', 0);
                    break;
            }
        }
    }

}
