function checkMouseXY(mouseX, mouseY, cell) {
  return (
    mouseX >= cell.x &&
    mouseX <= cell.x + cell.resolution &&
    mouseY >= cell.y &&
    mouseY <= cell.y + cell.resolution
  );
}

function mousePressed() {
  if (started) {
    return;
  }
  // console.log("Clicked");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (checkMouseXY(mouseX, mouseY, grid[i][j])) {
        if (grid[i][j] != source && grid[i][j] != end) {
          grid[i][j].clicked();
        } else {
          if (grid[i][j] === source) {
            strartSelected = true;
          } else if (grid[i][j] === end) {
            endSelected = true;
          }
        }
      }
    }
  }
}

function mouseDragged() {
  if (started) {
    return;
  }
  // console.log("Dragged");
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (checkMouseXY(mouseX, mouseY, grid[i][j])) {
        if (grid[i][j] != source && grid[i][j] != end) {
          grid[i][j].clicked();
        }
        if (strartSelected) {
          source.showCell("#FFFFFF");
          source = grid[i][j];
          grid[i][j].clicked();
        }
        if (endSelected) {
          end.showCell("#FFFFFF");
          end = grid[i][j];
          grid[i][j].clicked();
        }
      }
    }
  }
}

function mouseReleased() {
  if (strartSelected || endSelected) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (checkMouseXY(mouseX, mouseY, grid[i][j])) {
          if (strartSelected) {
            if (grid[i][j] === end) {
              end = grid[i - 1][j];
              end.wall = false;
              end.showCell(color("#fd1036"));

              source = grid[i][j];
              grid[i][j].wall = false;
              source.showCell(color("#1a3da6"));
              strartSelected = false;
            } else {
              source = grid[i][j];
              grid[i][j].wall = false;
              source.showCell(color("#1a3da6"));
              strartSelected = false;
              console.log(source);
            }
          } else if (endSelected) {
            if (grid[i][j] === source) {
              source = grid[i - 1][j];
              source.wall = false;
              source.showCell(color("#1a3da6"));

              end = grid[i][j];
              grid[i][j].wall = false;
              end.showCell(color("#fd1036"));
              endSelected = false;
            } else {
              end = grid[i][j];
              grid[i][j].wall = false;
              end.showCell(color("#fd1036"));
              endSelected = false;
            }
          }
        }
      }
    }
  }
}