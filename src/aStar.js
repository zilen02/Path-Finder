function aStar() {
  if (openList.length > 0) {
    //Find least f value in openlist => Sort by f value in openlist
    openList.sort(function (cell1, cell2) {
      return cell1.f - cell2.f;
    });
    currentCell = openList.shift();
    closeList.push(currentCell);

    //Check if we reached end cell or not
    if (currentCell === end) {
      console.log("We're Done!");
      noLoop();
    }

    //Go with neighbors
    let neighbors = currentCell.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      //Neighbor not in closelist and not wall
      if (!closeList.includes(neighbor) && !neighbor.wall) {
        let tempG = currentCell.g + heuristic(neighbor, currentCell);
        //if nbr already in openlist, So set minimum g in openlist
        let newPath = false;
        if (openList.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          //Not in openlist, So push in openlist
          newPath = true;
          neighbor.g = tempG;
          openList.push(neighbor);
        }
        //Find h and f value for neighbor cell and set parent current cell
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = currentCell;
        }
      }
    }
  } else {
    console.log("No solution");
    noLoop();
    return;
  }
}

function heuristic(cell1, cell2) {
  let d = abs(cell1.r - cell2.r) + abs(cell1.c - cell2.c);
  return d;
}
