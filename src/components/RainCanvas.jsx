import { useRef, useEffect } from "react";

export default function RainCanvas({ sizeConstant, speedConstant }) {
  const canvasRef = useRef(null);
  const raindropsRef = useRef([]);
  const ripplesRef = useRef([]);

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
        groundHeight:canvas.height*0.7+Math.random()*(canvas.height*0.2),
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
        if (raindrop.y > raindrop.groundHeight) {
          raindrop.y = 0;
          raindrop.x = Math.random() * canvas.width;

          //빗방울 땅에 닿을 때 물결 효과 추가
          ripplesRef.current.push({
            x:raindrop.x,
            y:raindrop.groundHeight,
            radius:0,
            alpha:1
          })
        }
      });

      ripplesRef.current.forEach((ripple,index)=>{
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0,Math.PI*2);
        ctx.strokeStyle = `rgba(0,0,255,${ripple.alpha})`; //선 색깔
        ctx.lineWidth = 2; //선 굵기
        ctx.stroke();

        ripple.radius += 0.5;
        ripple.alpha -=0.01;

        if(ripple.alpha <= 0){
          ripplesRef.current.splice(index,1);
        }
      })

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
