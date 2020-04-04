const apiKey = "AIzaSyD_ublknDdJsQPafgZJAjl2t50J4AvSUYw";
let video = document.getElementById("video-player");

async function getRandomWord() {
    let response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    let word = await response.json();
    word = word[0];
    return word;
}

async function getRandomVideoID() {
    const randomWord = await getRandomWord();

    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?&type=video&part=snippet&q=${randomWord}&maxResults=5&key=${apiKey}`);
    let data = await response.json();
    let videos = data.items;
    const randomVideoID = videos[Math.floor(Math.random() * videos.length)].id.videoId;
    return randomVideoID;
}

async function showRandomVideo(){
    const videoID = await getRandomVideoID();

    const videoUrl = 'https://www.youtube.com/embed/' + videoID;
    video.setAttribute("src", videoUrl); 
}

showRandomVideo();
