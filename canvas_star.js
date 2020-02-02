// 변수 ---------------------------
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const STAR_COUNT = (window.innerWidth + window.innerHeight) / 9, // 별 개수
  STAR_SIZE = 3,
  STAR_MIN_SCALE = 0.1, // 최소 스케일
  OVERFLOW_THRESHOLD = 50;

let scale = 1, // 1픽셀
  width,
  height;
let stars = []; // 별 배열
// let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 }; // 별 속도
// let pointerX, pointerY; // 마우스 위치
// let touchInput = false; // 터치 여부

// 함수 실행-----------------------

generate();
resize();
step();

// 함수 등록-----------------------

window.onresize = resize;
// canvas.onmousemove = onMouseMove;
// canvas.ontouchmove = onTouchMove;
// canvas.ontouchend = onMouseLeave;
// document.onmouseleave = onMouseLeave;

// 함수---------------------------

function generate() {
  // 별배열에 별객체 푸쉬
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (0.7 - STAR_MIN_SCALE)
    });
  }
}

function placeStar(star) {
  // 별 위치 생성
  star.x = Math.random() * width;
  star.y = Math.random() * height;
}

function resize() {
  scale = window.devicePixelRatio || 1;
  width = window.innerWidth * scale;
  height = window.innerHeight * scale;
  canvas.width = width;
  canvas.height = height;
  stars.forEach(placeStar);
}

function step() {
  context.clearRect(0, 0, width, height);
  render();
  requestAnimationFrame(step);
}

function render() {
  stars.forEach((star, index) => {
    context.beginPath();
    context.lineCap = "round";
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.strokeStyle =
      index % 9 === 0
        ? "rgba(255,255,255)"
        : "rgba(255,255,255," + (0.3 + 0.7 * Math.random()) + ")";
    // 별 반짝임 opacity
    context.lineTo(star.x, star.y);
    context.stroke();
  });
}

// function movePointer(x, y) {
//   pointerX = x;
//   pointerY = y;
// }

// function onMouseMove(event) {
//   // 마우스 움직임
//   touchInput = false;
//   movePointer(event.clientX, event.clientY); // 마우스 위치값 받기
// }

// function onTouchMove(event) {
//   // 모바일 터치
//   touchInput = true;
//   movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
//   event.preventDefault();
// }

// function onMouseLeave() {
//   // 마우스위치값 초기화
//   pointerX = null;
//   pointerY = null;
// }
