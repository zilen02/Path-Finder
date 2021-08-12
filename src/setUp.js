//Main File
function setup() {
  let screen = createCanvas(
    windowWidth - windowHeight * 0.05,
    windowHeight - windowHeight * 0.2
  );
  screen.parent("sketch01");
  resetCanvas();
}

function draw() {
  if (started) {
    switch (algo) {
      case "A* Search":
        aStar();
        break;
      case "Greedy Best First Search":
        gbfs();
        break;
      case "Dijkstra":
        dijkstra();
        break;
      case "Breadth First Search":
        bfs();
        break;
      case "Depth First Search":
        dfs();
        break;
    }
    show();
  }
}
