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

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  /* this is where we call our animation methods, such as
  Shape.draw() */

};

animate();
