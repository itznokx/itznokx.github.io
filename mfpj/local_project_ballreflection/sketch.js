import * from 'https://itznokx.github.io/mfpj/local_project_ballreflection/src/vec2.js'
function linePlaneIntersection(p1,p2,q,n){
  let num = q.sub(p1).dot(n)
  let div = p2.sub(p2).dot(n)
  return num/div
}
function intersect(A,B,C,D){
  let AB = B.dif(A);
  let AC = C.dif(A);
  let AD = D.dif(A);
  let cond1 = (AB.cross(AC))*(AB.cross(AD));
  if (cond1 > 0){
    let CA = A.dif(C);
    let CB = B.dif(C);
    let CD = D.dif(C);
    let cond2 = (CD.cross(CB))*(CD.cross(CA));
    if (cond2 > 0)
      return false;
  }else{
    return true
  }
}
/// guardam a posição do mouse no plano cartesiano
var mouseXC, mouseYC = 0
//Particula
let pos = new Vec2(0,0)
let dr = new Vec2(64,36)
let vel = 0.01
let edges = []

let alfa = 1;
let beta = 1;
function setup(){
  createCanvas(400,400)
  frameRate(60)
  edges.push([new Vec2 (-width/2,height/2),
              new Vec2 (-width/2,-height/2)
             ])
  edges.push([new Vec2 (width/2,height/2),
              new Vec2 (width/2,-height/2)
             ])
  edges.push([new Vec2 (width/2,height/2),
              new Vec2 (-width/2,height/2)
              ])
  edges.push([new Vec2 (width/2,-height/2),
              new Vec2 (-width/2,-height/2)
              ])
}
function draw(){
  goCartesian()
  strokeWeight(2)
  //point(mouseXC,mouseYC);
  line(-width/2,height/2,-width/2,-height/2)
  line(width/2,height/2,width/2,-height/2)
  line(width/2,height/2,-width/2,height/2)
  colore(255,0,0)
  line(width/2,-height/2,-width/2,-height/2)
  strokeWeight(1)
  
  let w2 = width/2;
  let pos2 = pos.sum(dr.mult(vel));
  let minT = Infinity;
  let colisao = false;
  for (let i=0;i<edges.lenght;i++){
    let ei = edges[i]
    if (intersect(dr,dr.pos,ei[0],ei[1]),pos,pos2,ei[0],ei[1]){
      let nC = ei[1].sub(ei[0]).rot90()
      let q = ei[0]
      let t = linePlaneIntersection(pos,pos2,q,nC)
      if (t<minT){
        let minT = t;
        n = nC;
        colIndex = i;
      }
      colisao = true
      stroke(255,0,0)
      strokeWeight(3)
      line(pos.x,pos.y,pos2.x,pos2.y)
    }
  }
  if (!colisao){
    pos = pos2
  }else{
    let t = minT*0.9999
    let p1 = pos;
    let p2 = pos2;
    let pt = p1.add(p2.sub(p1).mult(t));
  }
  colore(255,0,255)
  
  dr.pos = pos;
  dr.render()
  
  circle(pos.x,pos.y,10)
}

function goCartesian()
{
  background(255)
  
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
  
  colore(128,0,0)
  //seta(0,height/2,width, height/2)
  colore(0,128,0)
  //seta(width/2,height,width/2, 0)
  
  translate(width/2,height/2)
  scale(1,-1,1)  
}
function grabMouse()
{
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
}

function texto(str,x,y)
{
  push()
    translate( x, y)
    scale(1,-1)
    translate(-x,-y)
  
    // desenha o texto normalmente
    text(str,x,y)
  pop()
}
function colore(c1,c2,c3,c4)
{
  if(c4 != null)
  {
    fill(c1,c2,c3,c4)
    stroke(c1,c2,c3,c4)
    return
  }
  if(c3 != null)
  {
    fill(c1,c2,c3)
    stroke(c1,c2,c3)
    return
  }
  
  if(c2 == null )
  {
    fill(c1)
    stroke(c1)
  }
  else
  {
    fill(c1,c1,c1,c2)
    stroke(c1,c1,c1,c2)
  }    
}

function seta(x1,y1,x2,y2)
{
  // o segmento de reta
  line(x1,y1,x2,y2)
  var dx = x2-x1, dy = y2-y1
  var le = sqrt(dx*dx + dy*dy) // comprimento do vetor
  // o vetor v é unitário paralelo ao segmento, com mesmo sentido
  var vx = dx/le, vy = dy/le
  // o vetor u é unitário e perpendicular ao segmento
  var ux = -vy
  var uy = vx
  // a cabeça triangular
  triangle(x2,y2,
           x2-5*vx+2*ux, y2-5*vy+2*uy,
           x2-5*vx-2*ux, y2-5*vy-2*uy)
}
