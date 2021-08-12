function dijkstra() {
  if (openList.length > 0) {
    //Find least d value in openlist => Sort by d value in openlist
    openList.sort(function (cell1, cell2) {
      return cell1.d - cell2.d;
    });
    currentCell = openList.shift();
    closeList.push(currentCell);

    //If current cell is infinite
    if (currentCell.d === Infinity) {
      console.log("No solution");
      noLoop();
      return;
    }

    //check if we reached end cell or not
    if (currentCell === end) {
      console.log("We're Done!");
      noLoop();
    }

    //Go with neighbors
    let neighbors = currentCell.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!neighbor.wall) {
        //Calculate distance
        let tempD = currentCell.d + 1;
        //if tempD minimum, then change d value in neighbor
        if (tempD < neighbor.d) {
          neighbor.d = tempD;
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
