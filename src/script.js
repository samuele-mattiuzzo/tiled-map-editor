var grid,
    gridSize = 10,
    gridContainer = document.getElementById("grid-container"),
    drawButton,
    resetButton,
    exportButton;

function onTileClick(el, row, col, i) {
    console.log("You clicked on:", row, col);

    switch (el.className) {
        case '':
            el.className = 'clicked'
            // value is 1
            break;
        case 'clicked':
            el.className = 'clicked-start';
            // value is 2
            break;
        case 'clicked-start':
            el.className = 'clicked-end';
            // value is 3
            break;
        default:
            el.className = '';
            // value is 0
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

function reDraw() {
    grid = clickableGrid(gridSize, gridSize, onTileClick);
    gridContainer.innerHTML = '';
    gridContainer.appendChild(grid);
}

// creates the grid and appends it to the body
grid = clickableGrid(gridSize, gridSize, onTileClick);
gridContainer.appendChild(grid);

// set the onclick events on the buttons
drawButton = document.getElementById("draw");
resetButton = document.getElementById("reset");
exportButton = document.getElementById("export");

drawButton.onclick = function(el) {
    // draws the grid with the requested size
    gridSize = parseInt(document.getElementById("draw-size").value);
    reDraw();
}

resetButton.onclick = function(el) {
    // resets the board at the current size
    reDraw();
}

exportButton.onclick = function(el) {
    // exports a comma separated list of 0,1,2 to re-import in unity
    // loop through all the cells
    // collect values
    // return "0, 1, 0, 0, 0 " etc
}
