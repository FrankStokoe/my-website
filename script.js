/* =========================
INDEX PAGE VIDEO LIGHTBOX
========================= */

const tiles = document.querySelectorAll(".tile");
const indexLightbox = document.getElementById("lightbox");
const indexVideo = document.getElementById("lightboxVideo");

if (tiles.length && indexLightbox && indexVideo) {

tiles.forEach(tile => {

const hoverVideo = tile.querySelector(".video-hover");

if (hoverVideo) {

tile.addEventListener("mouseenter", () => {
hoverVideo.play();
});

tile.addEventListener("mouseleave", () => {
hoverVideo.pause();
hoverVideo.currentTime = 0;
});

}

tile.addEventListener("click", () => {

const videoSrc = tile.dataset.video;

if(videoSrc){

indexVideo.src = videoSrc;

indexLightbox.style.display = "flex";

indexVideo.play();

}

});

});


indexLightbox.addEventListener("click", () => {

indexVideo.pause();
indexVideo.src = "";

indexLightbox.style.display = "none";

});

}


/* =========================
GALLERY PAGE LIGHTBOX
========================= */

const galleryTiles = document.querySelectorAll(".media-tile");
const galleryLightbox = document.getElementById("gallery-lightbox");

if (galleryTiles.length && galleryLightbox) {

const lightboxMedia = document.querySelector(".lightbox-media");
const lightboxDescription = document.querySelector(".lightbox-description");

galleryTiles.forEach(tile => {

tile.addEventListener("click", () => {

const media = tile.dataset.media;
const description = tile.dataset.description;
const type = tile.dataset.type;

lightboxMedia.innerHTML = "";
lightboxDescription.innerHTML = "";

if(type === "video"){

lightboxMedia.innerHTML = `
<video controls autoplay muted playsinline>
<source src="${media}">
</video>
`;

}else{

lightboxMedia.innerHTML = `
<img src="${media}">
`;

}

if(description){

lightboxDescription.textContent = description;

}else{

lightboxDescription.textContent = "";

}

galleryLightbox.style.display = "flex";

});

});


galleryLightbox.addEventListener("click", () => {

galleryLightbox.style.display = "none";

lightboxMedia.innerHTML = "";
lightboxDescription.innerHTML = "";

});

}


/* =========================
MASONRY LAYOUT
========================= */

function resizeMasonry(){

const grid = document.querySelector(".media-grid");
if(!grid) return;

const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
const gap = parseInt(getComputedStyle(grid).getPropertyValue("gap"));

grid.querySelectorAll(".media-tile").forEach(tile => {

const media = tile.querySelector("img, video");
if(!media) return;

const height = media.getBoundingClientRect().height;

const span = Math.ceil((height + gap) / (rowHeight + gap));

tile.style.gridRowEnd = "span " + span;

});

}

window.addEventListener("load", resizeMasonry);
window.addEventListener("resize", resizeMasonry);

document.querySelectorAll("video").forEach(video=>{
video.addEventListener("loadeddata", resizeMasonry);
});

/* =========================
AUTO PLAY VIDEOS WHEN VISIBLE
========================= */

const autoVideos = document.querySelectorAll("video.auto-video");

const videoObserver = new IntersectionObserver((entries) => {

entries.forEach(entry => {

const video = entry.target;

if(entry.isIntersecting){

video.play();

}else{

video.pause();

}

});

},{
threshold:0.5
});

autoVideos.forEach(video => {
videoObserver.observe(video);
});