var tableId = 'MAP',
    grid,
    gridSize = 10,
    gridContainer = document.getElementById('grid-container'),
    gridResult = document.getElementById('grid-result'),
    gridResultText = document.getElementById('grid-result-text'),
    drawButton,
    resetButton,
    exportButton;

function onTileClick(el, row, col, i) {
    // the values are as follows:
    // - 0 for walls/inert
    // - 1 for walkable tiles
    // - 2 for the start tile
    // - 3 for the end tile

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
