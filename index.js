const m = document.getElementById("life").getContext("2d");

let draw = (x, y, c, w, h) => {
  m.fillStyle = c;
  m.fillRect(x, y, w, h);
};

let particles = [];

function particle(x, y, c) {
  return {
    x: x,
    y: y,
    vx: 0,
    vy: 0,
    color: c,
  };
}

function random() {
  return Math.random() * 400 + 50;
}

function create(number, color) {
  let group = [];
  for (let i = 0; i < number; i++) {
    group.push(particle(random(), random(), color));
    particles.push(group[i]);
  }
  return group;
}

function rule(particles1, particles2, g) {
  for (let i = 0; i < particles1.length; i++) {
    let fx = 0;
    let fy = 0;
    for (let j = 0; j < particles2.length; j++) {
      let a = particles1[i];
      let b = particles2[j];
      let dx = a.x - b.x;
      let dy = a.y - b.y;
      let d = Math.sqrt(dx * dx + dy * dy); //distance between two particles

      if (d > 0 && d < 100) {
        let force = g * 1 / d;
        fx += (force * dx);
        fy += (force * dy);
      }
    
     a.vx = (a.vx+fx) * 0.2
     a.vy = (a.vy+fy) * 0.2

     a.x += a.vx
     a.y += a.vy

       if(a.x <= 0 || a.x >= 500){ a.vx *= -20}
       if(a.y <= 0 || a.y >= 500){ a.vy *= -20}

     
    }
  }
}

//initialise particle clusters
let yellow = create(200, "yellow");
let red = create(200,"red")
function update() {
  rule(red,red,-0.01)
  rule(red,yellow,-0.02)
  rule(yellow,red,0.02)
  m.clearRect(0, 0, 500, 500);
  draw(0, 0, "black", 500, 500);
  for (let i = 0; i < particles.length; i++) {
    draw(particles[i].x, particles[i].y, particles[i].color, 5, 5);
  }
  requestAnimationFrame(update);
}

update();

