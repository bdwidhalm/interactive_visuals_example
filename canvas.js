const cvs = document.querySelector('canvas');
const c = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

window.addEventListener('resize', function() {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
});

let mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', function(e) {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
  };

  draw = () => {
    // this is where we control the shape's appearance
  };

  update = () => {
    // this is where we control movement and interactivity
    this.draw();
  };
};

class Line {
  constructor(x, y, offset) {
    this.x = x;
    this.y = y;
    this.offset = offset;
    this.radians = 0;
    this.velocity = 0.01;
  }

  draw = () => {
    c.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    c.fillStyle = 'rgba(255, 255, 255, 0.3)';

    c.beginPath();
    c.arc(this.x, this.y, 1, 0, Math.PI * 2, false);
    c.fill();
    c.moveTo(this.x, this.y);
    c.lineTo(this.x + 300, this.y -1000);
    c.stroke();
    c.closePath();

    this.update();
  }

  update = () => {
    // this is where we control movement and interactivity
  }
}

const lineArray = [];

for (let i = 0; i < 100; i++) {
  const start = { x: -250, y: 800 };
  const random = Math.random() - 0.5;
  const unit = 25;

  lineArray.push(
    new Line(
      start.x + ((unit + random) * i),
      start.y + (i + random) * -3 + Math.sin(i) * unit,
      0.1 + (1 * i)
    )
  );
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  /* this is where we call our animation methods, such as
  Shape.draw() */
  lineArray.forEach(line => {
    line.draw();
  });
};

animate();
