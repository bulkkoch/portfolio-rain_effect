import { useRef, useEffect } from "react";

export default function RainCanvas({ sizeConstant, speedConstant }) {
  const canvasRef = useRef(null);
  const raindropsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    raindropsRef.current = Array(100)
      .fill()
      .map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 3,
        size: Math.random() + 1,
      }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      raindropsRef.current.forEach((raindrop) => {
        ctx.beginPath(); //그리기 시작

        ctx.arc(raindrop.x, raindrop.y, raindrop.size, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();

        raindrop.y += raindrop.speed;
        if (raindrop.y > canvas.height) {
          raindrop.y = 0;
          raindrop.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(draw);
    }

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
