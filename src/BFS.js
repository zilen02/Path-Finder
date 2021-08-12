function bfs() {
  if (openList.length > 0) {
    //Pop from openlist like queue
    currentCell = openList.shift();

    //check if we reached end cell or not
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
        openList.push(neighbor);
        closeList.push(neighbor);
        neighbor.parent = currentCell;
      }
    }
  } else {
    console.log("No solution");
    noLoop();
    return;
  }
}
