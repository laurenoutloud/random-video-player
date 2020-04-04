const apiKey = "AIzaSyD_ublknDdJsQPafgZJAjl2t50J4AvSUYw";
let video = document.getElementById("video-player");
let backupVideoIDs = ['cwEmnfy2BhI','fnvhabwjMZA','fmywIv4p8D8','CLjmoqGtd5Q','uJJP5AfCTX8','W8tbQgXyn1c','fX0f6Mzm_-8','oz9kNsjI9HQ','43z7NovmlHk','OENpmyEDCTI','mfa9t-TeeVU','jdWalfG5fk8','6OXMnRH-VmU','ZZjttmYcah4','l6MJe5wKT7Y','ENX0totqysA'];

function getRandomIndex(numberOfItems) {
    return Math.floor(Math.random() * numberOfItems);
}

async function getRandomWord() {
    let response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    let word = await response.json();
    word = word[0];
    return word;
}

async function getRandomVideoID() {
    const randomWord = await getRandomWord();
    let randomVideoID;
    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?&type=video&part=snippet&q=${randomWord}&maxResults=5&key=${apiKey}`);
    
    if (response.ok) {
        let data = await response.json();
        let videos = data.items;
        randomVideoID = videos[getRandomIndex(videos.length)].id.videoId;
    } else {
        randomVideoID = backupVideoIDs[getRandomIndex(backupVideoIDs.length)];
    }
    return randomVideoID;
}

async function showRandomVideo(){
    const videoID = await getRandomVideoID();

    const videoUrl = 'https://www.youtube.com/embed/' + videoID;
    video.setAttribute("src", videoUrl); 
}

showRandomVideo();
