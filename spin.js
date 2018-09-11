//Initilaization Stuff:
var canvas = document.body.querySelector("#wheelCanvas");
var ctx = canvas.getContext("2d");

canvas.width = 0.9925 * window.innerWidth;
canvas.height = 0.98 * window.innerHeight;
var CW = canvas.width;
var CH = canvas.height;
var CW_resize = canvas.width;
var CH_resize = canvas.height;

//---------------------------------------------------------------------------------------//
//Let's get the actual drawing/animating goin'
//functions & classes definitions

var radius = 200;
var rotateVar = 30;
var rotateIncrease = 0;
function getPoint(c1, c2, radius, angle) {
    return [c1 + Math.cos(angle) * radius, c2 + Math.sin(angle) * radius];
}
class arc {
    constructor(centerX, centerY, sAngle, eAngle, fill) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.sAngle = sAngle;
        this.eAngle = eAngle;
        this.fill = fill;
    }
    drawArc() {
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.fillStyle = this.fill;
        ctx.rotate(rotateVar * Math.PI / 180);
        ctx.beginPath();
        ctx.arc(0, 0, radius, this.sAngle, this.eAngle);
        ctx.moveTo(getPoint(0, 0, radius, this.sAngle)[0], getPoint(0, 0, radius, this.sAngle)[1]);
        ctx.lineTo(0, 0);
        ctx.lineTo(getPoint(0, 0, radius, this.eAngle)[0], getPoint(0, 0, radius, this.eAngle)[1]);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}
var imgData;
function copyColor() {
    imgData = ctx.getImageData((CW / 2), (CH / 2) + 200, 1, -10);
    return (imgData.data[0].toString() + imgData.data[1].toString() + imgData.data[2].toString())
}

var circleArr = [];
var colorArr = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var rgbArr = ["25500", "2551650", "2552550", "01280", "00255", "750130", "238130238"]

var PIcounter = 0;
var arcCounter = 7;
var clrCounter = 0;
for (var counter = 0; counter < arcCounter; counter++ , PIcounter += (Math.PI * 2) / arcCounter, clrCounter++) {
    circleArr.push(new arc(CW / 2, CH / 2, PIcounter, PIcounter + (Math.PI * 2) / arcCounter, colorArr[clrCounter]))
    if (clrCounter == 6) {
        clrCounter = 0;
    }
}

canvas.addEventListener('click', function(){
    rotateIncrease += Math.random() * 5;
})
function mainLoop() {
    canvas.width = 0.9925 * window.innerWidth;
    canvas.height = 0.98 * window.innerHeight;
    CW = canvas.width;
    CH = canvas.height;

    ctx.save();
    ctx.translate(CW / 2, (CH / 2) + 200);
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(20, 20);
    ctx.lineTo(-20, 20);
    ctx.lineTo(0, 0)
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    for (var circle of circleArr) {
        circle.drawArc();
        circle.centerX = CW / 2;
        circle.centerY = CH / 2;
    }
    rotateVar += rotateIncrease;
    rotateIncrease -= 0.1;
    if (rotateIncrease < 0) {
        rotateIncrease = 0;
        ctx.save()
        ctx.translate(CW / 2, CH / 2 + 250);
        ctx.textAlign = "center";
        ctx.font = "30px Arial";
        ctx.fillText(colorArr[rgbArr.indexOf(copyColor())] + " wins!", 0, 0);
        ctx.restore()
    }
    requestAnimationFrame(mainLoop);
}
mainLoop();
