function gbfs() {
  if (openList.length > 0) {
    //find least h value in openlist => Sort by h value in openlist
    openList.sort(function (cell1, cell2) {
      return cell1.h - cell2.h;
    });
    currentCell = openList.shift();
    closeList.push(currentCell);

    //check if we reached end cell or not
    if (currentCell === end) {
      console.log("We're Done!");
      noLoop();
    }

    //Go with neighbors
    let neighbors = currentCell.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (
        !closeList.includes(neighbor) &&
        !openList.includes(neighbor) &&
        !neighbor.wall
      ) {
        //Find h for neighbor and set, Push in openlist
        neighbor.h = heuristic(neighbor, end);
        neighbor.parent = currentCell;
        openList.push(neighbor);
      }
    }
  } else {
    console.log("No solution");
    noLoop();
    return;
  }
}
