song1 = "";
song2 = "";

right_wrist_x = 0;
right_wrist_y = 0;

left_wrist_x = 0;
left_wrist_y = 0;

score_left_wrist = 0;
score_right_wrist = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    pose_net = ml5.poseNet(video, model_loaded);
    pose_net.on('pose', gotPoses);
}

function model_loaded(){
    console.log("PoseNet is initiated");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("Right wrist x = "+ right_wrist_x+ ", Right wrist y = "+ right_wrist_y);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+ left_wrist_x+ ", Left wrist y = "+ left_wrist_y);

        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("green");
    stroke("green");


    if(score_left_wrist>0.2){
        circle(left_wrist_x, left_wrist_y, 20);
        song2.stop();
        console.log("1");
        
        song1.play();
        document.getElementById("song_name").innerHTML = "Song Name- Harry potter theme song";
        console.log("song_played");
        
    }
    if(score_right_wrist>0.2){
        circle(right_wrist_x, right_wrist_y, 20);
        song1.stop();
        console.log("1");
        
        song2.play();
        document.getElementById("song_name").innerHTML = "Song Name- Peter Pan theme song";
        console.log("song_played");
        
    }
}