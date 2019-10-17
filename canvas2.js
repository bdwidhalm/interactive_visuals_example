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

    const drawLinePath = (width = 0, color) => {
      c.beginPath();
      c.moveTo(this.x - (width / 2), this.y + (width / 2));
      c.lineTo(this.x - (width / 2) + 300, this.y - (width / 2) - 1000);
      c.lineTo(this.x + (width / 2) + 300, this.y - (width / 2) - 1000);
      c.lineTo(this.x + (width / 2), this.y - (width / 2));
      c.closePath();
      if (c.isPointInPath(mouse.x, mouse.y) && color) {
        c.strokeStyle = color;
      };
    };

    drawLinePath(150, '#baf2ef');
    drawLinePath(50, 'dcf3ff');

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
    this.radians += this.velocity;
    this.y = this.y + Math.cos(this.radians + this.offset);
  }
}

class Diamond {
  constructor(x, y, dx, dy, width) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.minWidth = width;
    this.maxWidth = width * 4;

    let colorArray = [
      '#de3d3d',
      '#090c0b',
      '#0d2527',
      '#267368',
      '#00b1a0'
    ];

    this.color = colorArray[
      Math.floor(Math.random() * colorArray.length)
    ];
  }

  draw = () => {
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(
      this.x - this.width / 2,
      this.y
    );
    c.lineTo(
      this.x,
      this.y + this.width / 2
    );
    c.lineTo(
      this.x + this.width / 2,
      this.y
    );
    c.lineTo(
      this.x,
      this.y - this.width / 2
    );
    c.lineTo(
      this.x - this.width / 2,
      this.y
    );
    c.closePath();

    c.fillStyle = this.color;
    c.fill();

    this.update();
  }

  update = () => {
    // this is where we control movement and interactivity
    if (this.x + (this.width / 2) >= window.innerWidth || this.x - (this.width / 2) <= 0) {
      this.dx = -this.dx;
    }

    if (this.y + (this.width / 2) >= window.innerHeight || this.y - (this.width / 2) <= 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

}

const diamondArray = [];

for (let i = 0; i < 400; i++) {
  let width = Math.random() * 20 + 4;
  let x = Math.random() * window.innerWidth;
  let dx = (Math.random() - 0.5) * 1;
  let y = Math.random() * window.innerHeight;
  let dy = (Math.random() - 0.5) * 1;
  diamondArray.push(new Diamond(x, y, dx, dy, width));
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  /* this is where we call our animation methods, such as
  Shape.draw() */
  diamondArray.forEach(diamond => {
    diamond.draw();
  });
};

animate();
