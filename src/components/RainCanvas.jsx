import { useRef, useEffect } from "react";
import { Howl } from "howler";
import rainDropSound from "../assets/water-drop-stereo.mp3";
import waterLily from "../assets/water-lily.png";

export default function RainCanvas({ sizeConstant, speedConstant }) {
  const canvasRef = useRef(null);
  const raindropsRef = useRef([]);
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    //캔버스 크기 조절 함수
    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const floatingLeaf = {
      x: 0,
      y: window.innerHeight * 0.7,
      width: 70,
      height: 70,
      speed: 2,
      angle: 0,
      rotationSpeed: 0.1,
    };

    const floatingLeafImg = new Image();
    floatingLeafImg.src = waterLily;

    raindropsRef.current = Array(55)
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
      preload: false,
    });

    function playRainSound() {
      if (rainAudio.state() === "unloaded") {
        rainAudio.load();
      }

      rainAudio.once("load", rainAudio.play());
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ctx.fillStyle = "#d2b48c";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgb(173,216,255)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      raindropsRef.current.forEach((raindrop) => {
        ctx.beginPath(); //그리기 시작

        ctx.arc(raindrop.x, raindrop.y, raindrop.size, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();

        raindrop.y += raindrop.speed;
        if (raindrop.y >= raindrop.groundHeight) {
          playRainSound();

          //빗방울 땅에 닿을 때 물결 효과 추가
          ripplesRef.current.push({
            x: raindrop.x,
            y: raindrop.groundHeight,
            radius: 0,
            alpha: 1,
          });

          raindrop.y = 0;
          raindrop.x = Math.random() * canvas.width;
        }
      });

      ripplesRef.current.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(0,0,230,${ripple.alpha})`; //선 색깔
        ctx.lineWidth = 2; //선 굵기
        ctx.stroke();

        ripple.radius += 0.5;
        ripple.alpha -= 0.01;

        if (ripple.alpha <= 0) {
          ripplesRef.current.splice(index, 1);
        }
      });

      ctx.save();
      ctx.translate(
        floatingLeaf.x + floatingLeaf.width / 2,
        floatingLeaf.y + floatingLeaf.height / 2
      );
      ctx.rotate(floatingLeaf.angle);
      ctx.drawImage(
        floatingLeafImg,
        -floatingLeaf.width / 2,
        -floatingLeaf.height / 2,
        floatingLeaf.width,
        floatingLeaf.height
      );
      ctx.restore();

      floatingLeaf.x += floatingLeaf.speed;
      floatingLeaf.angle += floatingLeaf.rotationSpeed;

      if (floatingLeaf.x > canvas.width) {
        floatingLeaf.x = -floatingLeaf.width;
      }

      requestAnimationFrame(draw);
    }

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
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
