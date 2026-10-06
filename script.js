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

const playlistUrl =
document.getElementById("playlistUrl");

const openPlaylistButton =
document.getElementById(
"openPlaylistButton"
);

const deletePlaylistButton =
document.getElementById(
"deletePlaylistButton"
);

function showMusic() {

hideAll();

document
.getElementById("musicScreen")
.classList.add("active");

loadPlaylist();
}

/* プレイリストを保存 */

function savePlaylist() {

const url =
playlistUrl.value.trim();

if (!url) {
return;
}

try {
new URL(url);
} catch {
alert("URLを入力してください。");
return;
}

localStorage.setItem(
"sleepPlaylist",
url
);

loadPlaylist();
}

/* 保存されているプレイリストを表示 */

function loadPlaylist() {

const savedUrl =
localStorage.getItem(
"sleepPlaylist"
);

if (savedUrl) {

```
playlistUrl.value =
  savedUrl;

openPlaylistButton.style.display =
  "block";

deletePlaylistButton.style.display =
  "block";
```

} else {

```
playlistUrl.value = "";

openPlaylistButton.style.display =
  "none";

deletePlaylistButton.style.display =
  "none";
```

}
}

/* プレイリストを開く */

function openPlaylist() {

const savedUrl =
localStorage.getItem(
"sleepPlaylist"
);

if (!savedUrl) {
return;
}

window.open(
savedUrl,
"_blank"
);
}

/* プレイリストを削除 */

function deletePlaylist() {

localStorage.removeItem(
"sleepPlaylist"
);

loadPlaylist();
}

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
