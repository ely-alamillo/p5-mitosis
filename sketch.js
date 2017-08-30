var cells = [];

function setup() {
  createCanvas(800,800);
  cell = new Cell();
  cellB = new Cell()
  cellC = new Cell();
  cellD = new Cell();
  cells.push(cell);
  cells.push(cellB);
  cells.push(cellC);
  cells.push(cellD);
}

function draw() {
  background(105,105,105);
  for (var i = 0; i < cells.length; i++) {
    cells[i].move();
    cells[i].show();
  }
}

function Cell(position, radius, col) {
  if (position) {
    this.pos = position.copy();
  } else {
    this.pos = createVector(random(width), random(height));
  }
  // this.pos = positon || createVector(random(width), random(height));
  this.radius = radius || 250;
  this.color = col || color(random(100, 255), 0, random(100, 255), 100);

  this.mitosis = function() {
    this.pos.x += random(-this.radius, this.radius);
    var cell = new Cell(this.pos, this.radius*.8, this.color);
    return cell;
  }
  this.clicked = function(x, y) {
    var distance = dist(this.pos.x, this.pos.y, x, y);
    if (distance < this.radius) {
      return true;
    }
    return false;
  }

  this.move = function() {
    var velocity = p5.Vector.random3D();
    this.pos.add(velocity);
  }

  this.show = function() {
    noStroke();
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius)
  }
}

function mousePressed() {
  for (var i = cells.length - 1; i >= 0; i--) {
    if (cells[i].clicked(mouseX, mouseY)) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1)
    }
  }
}
