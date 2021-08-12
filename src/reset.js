function twoDArray(m, n) {
  let arrays = new Array(n);
  for (let i = 0; i < arrays.length; i++) {
    arrays[i] = new Array(m);
  }
  return arrays;
}

function resetCanvas() {
  // Initializing variables
  started = false;
  resolution = 30;
  openList = [];
  closeList = [];
  path = [];
  algo = null;
  strartSelected = false;
  endSelected = false;

  m = floor(height / resolution);
  n = floor(width / resolution);
  w = width / n;
  h = height / m;

  grid = twoDArray(m, n);

  //Change Some HTML
  startBtn = document.getElementById("startBtn");
  startBtn.innerHTML = "Visualize";
  startBtn.disabled = false;
  startBtn.onclick = go;

  Walls = document.getElementById("walls");
  Walls.classList.add("text-dark");
  Walls.classList.remove("disabled");

  drpDown = document.getElementById("navbarDropdown");
  drpDown.classList.add("text-dark");
  drpDown.classList.remove("disabled");

  let message = document.getElementById("message");
  let x = Math.floor(Math.random() * 5);
  message.innerHTML = "Insight: " + applicatoions[x];

  //Creating the grid
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  //Determining neighbors of each vertices
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      grid[i][j].addNeighbors();
    }
  }

  //Determining source and end
  if (source === undefined && end === undefined) {
    let x = Math.floor((Math.random() * n) / 2);
    let y = Math.floor(Math.random() * m);
    source = grid[x][y];

    x = Math.floor(
      Math.random() * (n - Math.floor(n / 2 + 1)) + Math.floor(n / 2 + 1)
    );
    y = Math.floor(Math.random() * m);
    end = grid[x][y];
  } else {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let node = grid[i][j];
        if (node.r === source.r && node.c === source.c) {
          source = node;
        }
        if (node.r === end.r && node.c === end.c) {
          end = node;
        }
      }
    }
  }

  // console.log(source);
  // console.log(end);

  source.wall = false;
  end.wall = false;

  //Showing cells
  background("#FFFFFF");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      grid[i][j].showCell(color("#FFFFFF"));
    }
  }

  source.showCell(color("#1a3da6"));
  end.showCell(color("#fd1036"));

  noLoop();
}

function go() {
  //Initialize Starting values
  if (algo === null) {
    startBtn.innerHTML = `Pick An Algorithm!`;
    return;
  }
  switch (algo) {
    case "A* Search":
      openList.push(source);
      break;
    case "Greedy Best First Search":
      openList.push(source);
      break;
    case "Dijkstra":
      source.d = 0;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          openList.push(grid[i][j]);
        }
      }
      break;
    case "Breadth First Search":
      openList.push(source);
      closeList.push(source);
      break;
    case "Depth First Search":
      openList.push(source);
      closeList.push(source);
      break;
  }

  //Disables throw wall and algorithm dropdown
  started = true;
  startBtn.disabled = true;
  Walls.classList.add("disabled");
  Walls.classList.remove("text-dark");

  drpDown.classList.add("disabled");
  drpDown.classList.remove("text-dark");

  //Run draw function
  loop();
}

function dropdown(event) {
  algo = event.target.text;
  startBtn.innerHTML = `Start ${algo}`;

  //Set messages on display
  let message = document.getElementById("message");
  if (algo === "A* Search") {
    message.innerHTML = `Insight: A* Search <span style = "font-weight: bold;">Gurantees</span> Shortest Path`;
  } else if (algo === "Dijkstra") {
    message.innerHTML = `Insight: Dijkstra's Algorithm Or A Variant Of It Is Known As UCS <span style = "font-weight: bold;">Gurantees</span> Shortest Path`;
  } else if (algo === "Breadth First Search") {
    message.innerHTML = `Insight: Breadth First Search (BFS) <span style = "font-weight: bold;">Gurantees</span> Shortest Path In An <span style = "font-weight: bold;">Unweighted Graph</span> And A Feasible Choice <span style = "font-weight: bold;">If The Destination Is Closer To The Source</span>`;
  } else if (algo === "Depth First Search") {
    message.innerHTML = `Insight: Depth First Search (DFS) <span style = "font-weight: bold;">Does Not Gurantee</span> Shortest Path Though Is A Feasible Choice For Memory <span style = "font-weight: bold;">If The Destination Is Far Away From The Source</span>`;
  } else {
    message.innerHTML = `Insight: Greedy Best-First Search <span style = "font-weight: bold;">Does Not Gurantee</span> Shortest Path As It Takes Decision Solely Based On <span style = "font-weight: bold;">Heuristics</span>`;
  }
}
