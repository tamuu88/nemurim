/* =========================
どうでもいい質問
========================= */

const questions = [
"最近の一番どうでもよかった出来事は？",
"今、家の中でいちばん好きなコーナーは？",
"子どもの頃、好きだったお菓子は？",
"今度の休みが雨だったら何したい？",
"コンビニで気になってるものは？",
"今まで食べた中で、また食べたいものは？",
"最近ちょっと嬉しかったことは？",
"好きな匂いを3つ思い出す",
"今度、飲んでみたい飲みものは？",
"小さい頃、好きだった遊びは？",
"明日食べたいものは？",
"また行ってみたい場所ある？",
"今度作ってみたいレシピは？",
"家の中で一番古そうなものは？",
"冷蔵庫の中で一番存在感のないものは？",
"家の中の白いものを3つ思い浮かべる",
"あ行ではじまる動物を思い浮かべる",
"は行ではじまる食べ物を思い浮かべる",
"最近、ちょっとおかしかったことは？"
];

let lastQuestion = -1;

function showQuestion() {
hideAll();

document
.getElementById("questionScreen")
.classList.add("active");

newQuestion();
}

function newQuestion() {
let index;

do {
index = Math.floor(
Math.random() * questions.length
);
} while (
index === lastQuestion &&
questions.length > 1
);

lastQuestion = index;

document
.getElementById("question")
.textContent = questions[index];
}

/* =========================
認知シャッフル
========================= */

let shuffleCount = 0;

function showShuffle() {
hideAll();

document
.getElementById("shuffleScreen")
.classList.add("active");

resetShuffle();
}

function nextShuffle() {
shuffleCount++;

document
.getElementById("shuffleText")
.textContent =
"その単語の" +
shuffleCount +
"文字目から始まる単語を\nひとつ思い浮かべる";
}

function resetShuffle() {
shuffleCount = 0;

document
.getElementById("shuffleText")
.textContent =
"今、見えるものをひとつ思い浮かべる";
}

/* =========================
ゆっくり動く点
========================= */

const dot =
document.getElementById("dot");

const dotArea =
document.getElementById("dotArea");

function showDot() {
hideAll();

document
.getElementById("dotScreen")
.classList.add("active");

setTimeout(() => {

```
const width =
  dotArea.clientWidth;

const height =
  dotArea.clientHeight;

dot.style.left =
  (width / 2) + "px";

dot.style.top =
  (height / 2) + "px";
```

}, 50);
}

dot.addEventListener(
"click",
moveDot
);

function moveDot() {

const width =
dotArea.clientWidth;

const height =
dotArea.clientHeight;

const margin = 30;

const x =
Math.random() *
(width - margin * 2) +
margin;

const y =
Math.random() *
(height - margin * 2) +
margin;

dot.style.left =
x + "px";

dot.style.top =
y + "px";
}

/* =========================
ゆっくり消える円
========================= */

const breathingCircle =
document.getElementById(
"breathingCircle"
);

const circleArea =
document.getElementById(
"circleArea"
);

function showCircle() {
hideAll();

document
.getElementById("circleScreen")
.classList.add("active");

startCircle();
}

function startCircle() {

breathingCircle.style.transition =
"none";

breathingCircle.style.opacity =
"1";

breathingCircle.style.boxShadow =
"0 0 90px rgba(203, 213, 255, 0.35)";

requestAnimationFrame(() => {

```
requestAnimationFrame(() => {

  breathingCircle.style.transition =
    "opacity 6s ease-out, box-shadow 6s ease-out";

  breathingCircle.style.opacity =
    "0.08";

  breathingCircle.style.boxShadow =
    "0 0 4px rgba(203, 213, 255, 0.03)";

});
```

});
}

circleArea.addEventListener(
"click",
startCircle
);

/* =========================
音・プレイリスト
========================= */

const playlistName =
document.getElementById("playlistName");

const playlistUrl =
document.getElementById("playlistUrl");

const playlistList =
document.getElementById("playlistList");

function showMusic() {

hideAll();

document
.getElementById("musicScreen")
.classList.add("active");

loadPlaylists();
}

/* プレイリストを追加 */

function savePlaylist() {

const name =
playlistName.value.trim();

const url =
playlistUrl.value.trim();

if (!name) {
alert("プレイリスト名を入力してください。");
return;
}

if (!url) {
alert("プレイリストのURLを入力してください。");
return;
}

try {
new URL(url);
} catch {
alert("URLを入力してください。");
return;
}

const playlists =
JSON.parse(
localStorage.getItem("sleepPlaylists") || "[]"
);

playlists.push({
id: Date.now(),
name: name,
url: url
});

localStorage.setItem(
"sleepPlaylists",
JSON.stringify(playlists)
);

playlistName.value = "";
playlistUrl.value = "";

loadPlaylists();
}

/* プレイリストを表示 */

function loadPlaylists() {

const playlists =
JSON.parse(
localStorage.getItem("sleepPlaylists") || "[]"
);

playlistList.innerHTML = "";

playlists.forEach(playlist => {

```
const item =
  document.createElement("div");

item.className =
  "playlist-item";

const openButton =
  document.createElement("button");

openButton.className =
  "playlist-open";

openButton.textContent =
  playlist.name;

openButton.onclick = () => {
  window.open(
    playlist.url,
    "_blank"
  );
};


const deleteButton =
  document.createElement("button");

deleteButton.className =
  "playlist-delete";

deleteButton.textContent =
  "削除";

deleteButton.onclick = () => {
  deletePlaylist(playlist.id);
};


item.appendChild(openButton);
item.appendChild(deleteButton);

playlistList.appendChild(item);
```

});
}

/* プレイリストを削除 */

function deletePlaylist(id) {

const playlists =
JSON.parse(
localStorage.getItem("sleepPlaylists") || "[]"
);

const updatedPlaylists =
playlists.filter(
playlist => playlist.id !== id
);

localStorage.setItem(
"sleepPlaylists",
JSON.stringify(updatedPlaylists)
);

loadPlaylists();
}

/* 起動時にプレイリストを読み込む */

loadPlaylists();


/* =========================
画面切り替え
========================= */

function hideAll() {

document
.querySelectorAll(".screen")
.forEach(screen => {
screen.classList.remove("active");
});
}

function goHome() {

hideAll();

document
.getElementById("home")
.classList.add("active");
}

/* =========================
起動時
========================= */

loadPlaylist();
