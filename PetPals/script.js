window.addEventListener('load', function() {
var audio = document.getElementById('musica'); audio.play(); });

document.addEventListener("DOMContentLoaded", function () {

function updateTamagotchi() { updateBars(); }

const needsInterval = setInterval(decreaseNeeds, 500);
    
function decreaseNeeds() {
    for (const key in bars) { bars[key].value -= bars[key].decreaseRate; }
        updateBars();

    if (areAllBarsEmpty()) {
        tamagotchiImage.style.backgroundImage = "url('personaje/dead.png')";
        tamagotchiImage.classList.add("stopped");
      
    if (!gameOverDisplayed) { gameOverDisplayed = true; showGameOverMessage(); }}
    else {
        if (bars.hunger.value < 60 && bars.health.value < 60 && bars.energy.value < 60 && bars.happiness.value < 60) {
            tamagotchiImage.style.backgroundImage = dyingBackground; }}}
            
function calculateAverageNeeds() {
    const values = Object.values(bars).map(bar => bar.value);
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length; }

    const bars = {
        hunger: { bar: document.getElementById("hunger-bar"), value: 100, decreaseRate: 0.4, },
        health: { bar: document.getElementById("health-bar"), value: 100, decreaseRate: 0.4, },
        energy: { bar: document.getElementById("energy-bar"), value: 100, decreaseRate: 0.4, },
        happiness: { bar: document.getElementById("happiness-bar"), value: 100, decreaseRate: 0.4, },
    };
    const buttons = {
        play: document.getElementById("play"),
        feed: document.getElementById("feed"),
        heal: document.getElementById("heal"),
        sleep: document.getElementById("sleep"),
    };

function updateBars() {
    for (const key in bars) {
    const bar = bars[key];
        bar.value = Math.max(0, bar.value);
        bar.value = Math.min(100, bar.value);
        bar.bar.style.width = `${bar.value}%`;
    
    if (bar.value === 0) { bar.bar.style.color = "red"; } 
    else { bar.bar.style.color = "white"; } }}
    
for (const key in buttons) {
    buttons[key].addEventListener("click", function () {
    switch (key) {
        case "play": bars.happiness.value += 15; break;
        case "feed": bars.hunger.value += 15; break;
        case "heal": bars.health.value += 15; break;
    } updateTamagotchi(); }); }
    
    const tamagotchiImage = document.getElementById("tamagotchi-image");
    const originalBackground = "url('personaje/caminando.gif')";
    const newBackground = "url('personaje/saludo.gif')";
    const eatingBackground = "url('personaje/comiendo.gif')";
    const healingBackground = "url('personaje/health.gif')";
    const patsBackground = "url('personaje/caricias.gif')";
    const dyingBackground = "url('personaje/muriendo.gif')";

    const playButton = document.getElementById("play");
        
    let isEating = false;
    let isHealing = false;
    let isSaluting = false;
      
function updateCharacterBackground() {
    const averageNeeds = calculateAverageNeeds();
        
        if (averageNeeds < 60) { tamagotchiImage.style.backgroundImage = dyingBackground; }
        else { tamagotchiImage.style.backgroundImage = originalBackground; } }
    updateCharacterBackground();
     
function changeBackgroundTemporarily(newBg, duration, disableAnimation) {
    if (tamagotchiImage.style.backgroundImage.includes("dead.png")) { return; }
    if (tamagotchiImage.style.backgroundImage.includes("muriendo.gif")) { return; }
    tamagotchiImage.style.backgroundImage = newBg;
        
    if (disableAnimation) { tamagotchiImage.classList.add("stopped"); } 
    else { tamagotchiImage.classList.remove("stopped"); }
    
setTimeout(() => {
    tamagotchiImage.style.backgroundImage = originalBackground;
            
    if (disableAnimation) { tamagotchiImage.classList.remove("stopped"); } 
    else { tamagotchiImage.classList.add("stopped"); }
        isEating = false;
        isHealing = false;
        isSaluting = false;
        }, duration);}
           
function playPatsAnimation() {
    if (!isSaluting) {
        isSaluting = true;
        tamagotchiImage.style.backgroundImage = patsBackground;
        bars.happiness.value += 15;
        updateTamagotchi();
            
        changeBackgroundTemporarily(patsBackground, 1500, true);
            
setTimeout(() => {
    if (!isEating && !isHealing) { tamagotchiImage.style.backgroundImage = originalBackground; } }, 5000); } }
        tamagotchiImage.addEventListener("click", playPatsAnimation);
        tamagotchiImage.addEventListener("mouseenter", playPatsAnimation);
        let playInterval = null;
        
    let isPlaying = false;
playButton.addEventListener("click", function () {
    if (isPlaying) { return; }    
    tamagotchiImage.style.opacity = "0";
    room.style.backgroundImage = "url('room/jugando.gif')";
        
    isPlaying = true;
        
playInterval = setInterval(function () {
    bars.happiness.value += 15;
    updateBars();
        
    if (bars.happiness.value >= 100) {
        clearInterval(playInterval);
        tamagotchiImage.style.opacity = "1";
        room.style.backgroundImage = dayBackground;
        isPlaying = false; }}, 1000);});
        
    const feedButton = document.getElementById("feed");
    feedButton.addEventListener("click", function () {
        if (!isEating) {
            isEating = true;
            changeBackgroundTemporarily(eatingBackground, 1500, true);
        updateTamagotchi();  } });
        
    const healButton = document.getElementById("heal");
    healButton.addEventListener("click", function () {
        if (!isHealing) {
            isHealing = true;
            changeBackgroundTemporarily(healingBackground, 1500, true);
        updateTamagotchi(); } });
            
    tamagotchiImage.addEventListener("mouseenter", function () {
        if (!isSaluting) {
            isSaluting = true;
            tamagotchiImage.style.backgroundImage = patsBackground;
            bars.happiness.value += 15;    
        updateTamagotchi();
            
    changeBackgroundTemporarily(patsBackground, 5000, true);
            
setTimeout(() => { if (!isEating && !isHealing) { tamagotchiImage.style.backgroundImage = originalBackground; } }, 5000);} });
            
setInterval(() => { if (!isEating && !isHealing && !isSaluting) { changeBackgroundTemporarily(newBackground, 2000, true);}}, 5000);
    
const room = document.querySelector(".room");
const nightBackground = "url('room/room-night.gif')";
const dayBackground = "url('room/room-day.gif')";
    
let energyInterval = null;
let isSleeping = false;
        
buttons.sleep.addEventListener("click", function () {
    if (isSleeping) { return; }
    
    isSleeping = true;

    if (energyInterval) { clearInterval(energyInterval); }
    
    for (const key in buttons) { if (key !== "sleep") { buttons[key].disabled = true; } }
    
document.body.classList.add('night-mode');    
room.style.backgroundImage = nightBackground;
tamagotchiImage.style.opacity = 0;
    for (const key in buttons) { if (key !== "sleep") { buttons[key].classList.add('not-allowed-cursor'); }}
        
    energyInterval = setInterval(function () {
    bars.energy.value += 10;
    
    if (bars.energy.value >= 100) {
        clearInterval(energyInterval);
        room.style.backgroundImage = dayBackground;
        tamagotchiImage.style.opacity = 1;
        isSleeping = false;
    
    for (const key in buttons) { if (key !== "sleep") { buttons[key].classList.remove('not-allowed-cursor'); }}
    for (const key in buttons) { if (key !== "sleep") { buttons[key].disabled = false; } }
    
document.body.classList.remove('night-mode'); } updateTamagotchi(); }, 1000); });
updateTamagotchi();

function areAllBarsEmpty() {
    for (const key in bars) {
    if (bars[key].value > 0) { return false; } } return true; }

let gameOverDisplayed = false;

function disableInteractions() {
    tamagotchiImage.style.pointerEvents = 'none';
    for (const key in buttons) { buttons[key].disabled = true; }}
    
function enableInteractions() {
    tamagotchiImage.style.pointerEvents = 'auto';
    for (const key in buttons) { buttons[key].disabled = false; }}

function showGameOverMessage() {
    const existingMessage = document.querySelector(".game-over-message");
    if (existingMessage) { existingMessage.remove(); }
      
const gameOverMessage = document.createElement("div");
    gameOverMessage.className = "game-over-message";
    gameOverMessage.innerHTML = "Tu mascota ha muerto. 😢<br><button id='restart'>Reiniciar</button>";
      
    document.body.appendChild(gameOverMessage);
      
    const restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", function () {
    restartGame(); }); 
for (const key in buttons) { buttons[key].disabled = true; buttons[key].classList.add('not-allowed-cursor'); } disableInteractions();}

function restartGame() {
    for (const key in bars) { bars[key].value = 100; }
const gameOverMessage = document.querySelector(".game-over-message");
    if (gameOverMessage) { gameOverMessage.remove(); }
    
    tamagotchiImage.style.backgroundImage = originalBackground;
    tamagotchiImage.classList.remove("stopped");
    
    for (const key in buttons) {
        buttons[key].disabled = false;
        buttons[key].classList.remove('not-allowed-cursor');}

    document.body.style.cursor = 'auto';
    gameOverDisplayed = false;
enableInteractions();}

updateTamagotchi(); });