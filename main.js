scoreleftwrist=0;
innumberleftwristy=0;
song="";
leftwristx=0;
rightwristx=0;
leftwristy=0;
rightwristy=0;
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function setup(){

    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist="+scoreleftwrist);
                leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("leftwristx"+leftwristx+"leftwristy"+leftwristy);
        console.log("rightwristx"+rightwristx+"rightwristy"+rightwristy);
    }

}
function modelLoaded(){
    console.log("poseNet is Initialised");
}
function draw(){
    image(video,0,0,600,500);
    fill("#7138B5");
    stroke("#7138B5");
    circle(leftwristx,leftwristy,20);
    if(scoreleftwrist>0.2){

    
    innumberleftwristy=Number(leftwristy);
    removedecimal=floor(innumberleftwristy);
    leftwristy_divide=removedecimal/500;
    document.getElementById("volume").innerHTML="volume"+leftwristy_divide;
    song.setVolume(leftwristy_divide);
    }
}