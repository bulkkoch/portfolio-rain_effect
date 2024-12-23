import { useRef, useEffect } from "react";
import { Howl } from "howler";
import rainDropSound from "../assets/water-drop-stereo.mp3";

export default function RainCanvas({ sizeConstant, speedConstant }) {
  const canvasRef = useRef(null);
  const raindropsRef = useRef([]);
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    //캔버스 크기 조절 함수수
    function setCanvasSize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    raindropsRef.current = Array(100)
      .fill()
      .map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 3,
        groundHeight:
          canvas.height * 0.1 + Math.random() * (canvas.height * 0.8),
        size: Math.random() + 1,
      }));

    const rainAudio = new Howl({
      src: [rainDropSound],
      volume: 0.03,
      preload: false
    });

    function playRainSound() {
      if (rainAudio.state() === "unloaded") {
        rainAudio.load();
      }

      rainAudio.once("load", rainAudio.play());
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#d2b48c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(173,216,230,0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      raindropsRef.current.forEach((raindrop) => {
        ctx.beginPath(); //그리기 시작

        ctx.arc(raindrop.x, raindrop.y, raindrop.size, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();

        raindrop.y += raindrop.speed;
        if (raindrop.y >= raindrop.groundHeight) {
          playRainSound();
          raindrop.y = 0;
          raindrop.x = Math.random() * canvas.width;

          //빗방울 땅에 닿을 때 물결 효과 추가
          ripplesRef.current.push({
            x: raindrop.x,
            y: raindrop.groundHeight,
            radius: 0,
            alpha: 1,
          });
        }
      });

      ripplesRef.current.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,255,${ripple.alpha})`; //선 색깔
        ctx.lineWidth = 2; //선 굵기
        ctx.stroke();

        ripple.radius += 0.5;
        ripple.alpha -= 0.01;

        if (ripple.alpha <= 0) {
          ripplesRef.current.splice(index, 1);
        }
      });

      requestAnimationFrame(draw);
    }

    setCanvasSize();
    window.addEventListener('resize',setCanvasSize);
    draw();
  }, []);

  useEffect(() => {
    raindropsRef.current.forEach((raindrop) => {
      raindrop.speed = speedConstant * (Math.random() * 2 + 3);
      raindrop.size = sizeConstant * (Math.random() + 1);
    });
  }, [speedConstant, sizeConstant]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}
