var gridSize = 10,
    gridContainer = document.getElementById("grid-container");

function onTileClick(el, row, col, i) {
    console.log("You clicked on:", row, col);

    switch (el.className) {
        case '':
            el.className = 'clicked'
            break;
        case 'clicked':
            el.className = 'clicked-start';
            break;
        case 'clicked-start':
            el.className = 'clicked-end';
            break;
        default:
            el.className = '';
            break;
    }
}

function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';

    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = ++i;
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}

// creates the grid and appends it to the body
var grid = clickableGrid(gridSize, gridSize, onTileClick);
gridContainer.appendChild(grid);

// set the onclick events on the buttons
var drawButton = document.getElementById("draw"),
    resetButton = document.getElementById("reset"),
    exportButton = document.getElementById("export");

drawButton.onclick = function(el) {
    // draws the grid with the requested size
    gridSize = parseInt(document.getElementById("draw-size").value);
    grid = clickableGrid(gridSize, gridSize, onTileClick);
    gridContainer.innerHTML = '';
    gridContainer.appendChild(grid);
}

resetButton.onclick = function(el) {
    // reset the board at the current size
    grid = clickableGrid(gridSize, gridSize, onTileClick);
    gridContainer.innerHTML = '';
    gridContainer.appendChild(grid);
}

exportButton.onclick = function(el) {
    // exports a comma separated list of 0,1,2 to re-import in unity
}
