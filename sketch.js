let etapa = 1;
let fade = 0;
let bgMusic;
let particles = [];
let letters = [];
let message = [
  "Nesse Dia dos Namorados…",
  "Quer ficar abraçadinho comigo?",
  "12/06 às 20:30"
];
let imgBook, imgPaper;

function preload(){
  bgMusic = loadSound()
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvasContainer');
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  bgMusic.loop();
  imgBook = createGraphics(800, 400);
  imgPaper = createGraphics(800, 400);
  drawTextures();
  initParticles();
}

function draw() {
  background(30, 20, 25);
  if(etapa === 1) drawCover();
  else if(etapa === 2) drawTransition();
  else if(etapa === 3) drawLetter();
  updateParticles();
}

function drawCover(){
  push();
  translate(width/2, height/2);
  image(imgBook, 0, 0);
  drawTitle();
  drawInteractiveHeart();
  pop();
  drawParticles();
}

function drawTitle(){
  textFont('Great Vibes');
  fill(255, 200, 200);
  textSize(80);
  text("Scrapbook de Iury & Karina", 0, -120);
}

function drawInteractiveHeart(){
  let x = 0, y = 60;
  let d = 120 + sin(millis()/300)*10;
  let hovered = dist(mouseX-width/2, mouseY-height/2, x, y) < d/2;
  fill(hovered?'#ff4d6d':'#ff7b9c');
  heart(0, 60, d/2);
  textFont('Dancing Script');
  fill(240);
  textSize(24);
  text("abra aqui", 0, 160);
  if(hovered && mouseIsPressed) etapa = 2;
}

function drawTransition(){
  fade += 5;
  fill(30, 20, 25, fade);
  rect(0,0,width,height);
  if(fade > 255) etapa = 3;
}

function drawLetter(){
  push();
  translate(width/2, height/2);
  image(imgPaper, 0, 0);
  drawTypingText();
  pop();
  drawParticles();
}

function drawTypingText(){
  textFont('Dancing Script');
  fill(80,0,40);
  let baseY = -80;
  letters.forEach((l)=> {
    text(l.char, -l.width/2 + l.offset, l.y);
  });
}

function initParticles(){
  for(let i=0; i<100; i++){
    particles.push({
      x: random(width),
      y: random(height),
      size: random(2,5),
      alpha: random(50,200),
      speed: random(0.2,0.8)
    });
  }
}

function drawParticles(){
  noStroke();
  fill(255,255,255,200);
  particles.forEach(p => ellipse(p.x, p.y, p.size));
}

function updateParticles(){
  particles.forEach(p => {
    p.y -= p.speed;
    if(p.y < 0) p.y = height;
  });
}

function drawTextures(){
  imgBook.background('#f8e8ea');
  imgBook.fill('#ddc');
  imgBook.rect(0,0,800,400,20);
  imgBook.noStroke();
  imgPaper.background('#fffaf0');
  imgPaper.noStroke();
  imgPaper.fill('#eed');
  imgPaper.rect(0,0,800,400,20);
}

function heart(x,y,s){
  beginShape();
  vertex(x,y);
  bezierVertex(x - s, y - s, x - s*1.5, y + s/3, x, y + s);
  bezierVertex(x + s*1.5, y + s/3, x + s, y - s, x, y);
  endShape(CLOSE);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
