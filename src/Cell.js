class Cell {
  constructor(r, c) {
    this.r = r;
    this.c = c;
    this.x = this.r * resolution;
    this.y = this.c * resolution;
    this.resolution = resolution - 1;

    this.parent = undefined;

    //For dijkstra algo
    this.d = Infinity;

    //For aStar and greedy
    this.f = 0.0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];
    this.wall = false;
  }

  showCell(color) {
    if (this.wall) {
      fill("#708090");
    } else {
      fill(color);
    }
    stroke("#99ccff");
    strokeWeight(1);
    rect(this.x, this.y, this.resolution, this.resolution);
  }

  //Add neighbors of current
  addNeighbors() {
    let i = this.r;
    let j = this.c;
    if (i > 0) this.neighbors.push(grid[i - 1][j]);
    if (i < n - 1) this.neighbors.push(grid[i + 1][j]);
    if (j > 0) this.neighbors.push(grid[i][j - 1]);
    if (j < m - 1) this.neighbors.push(grid[i][j + 1]);
  }

  clicked() {
    if (strartSelected) {
      this.showCell(color("#1a3da6"));
    } else if (endSelected) {
      this.showCell(color("#fd1036"));
    } else if (!this.wall) {
      this.wall = true;
      this.showCell(color("#708090"));
    }
  }
}

//Put walls on canvas by 0.1 probablity
function putWalls() {
  console.log("Walls");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] != source && grid[i][j] != end) {
        if (random(1) < 0.1) {
          grid[i][j].wall = true;
        }
      }
    }
  }

  source.wall = false;
  end.wall = false;

  background("#FFFFFF");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      grid[i][j].showCell(color("#FFFFFF"));
    }
  }

  source.showCell(color("#1a3da6"));
  end.showCell(color("#fd1036"));
}
