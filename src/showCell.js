//Trace Path start to end by parent cell
function tracePath(currentCell) {
  path = [];
  let cell = currentCell;
  path.push(cell);
  while (cell.parent) {
    path.push(cell.parent);
    cell = cell.parent;
  }
}

function show() {
  //Show cells
  background("#FFFFFF");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      grid[i][j].showCell(color("#FFFFFF"));
    }
  }

  //Visited Cells
  for (let i = 0; i < closeList.length; i++) {
    closeList[i].showCell(color("#FAD4D8"));
  }

  //Unvisited Cells
  for (let i = 0; i < openList.length; i++) {
    if (algo === "Dijkstra") {
      if (openList[i].d != Infinity) {
        openList[i].showCell(color("#CCFFCC"));
      }
    } else {
      openList[i].showCell(color("#CCFFCC"));
    }
  }

  //Color path
  tracePath(currentCell);
  for (let i = 0; i < path.length; i++) {
    path[i].showCell(color("#FAD4D8"));
  }

  //Draw line on path
  noFill();
  strokeWeight(4);
  stroke("#c67aff");
  beginShape();
  tracePath(currentCell);
  for (let i = 0; i < path.length; i++) {
    vertex(
      path[i].r * resolution + resolution / 2,
      path[i].c * resolution + resolution / 2
    );
  }
  endShape();

  source.showCell(color("#1a3da6"));
  end.showCell(color("#fd1036"));
}
