"use client";
import { useState, useEffect, useRef } from "react";

export default function Campo() {
  const [snakePosiçao, setsnakePosiçao] = useState<number[][]>([
    [8, 8],
    [7, 8],
    [6, 8],
  ]);
  const [direçao, setDireçao] = useState("ArrowRight");
  const IntervalRef = useRef(direçao);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temMaça, setTemMaça] = useState(false);
  const [localMaça, setLocalMaça] = useState<number[]>([]);
  const maçaRef = useRef<number[]>([]);
  const [quantM, setQuantM] = useState<number>(0);

  function desenharCampo(ctx: CanvasRenderingContext2D | null | undefined) {
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 17; x++) {
        ctx!.fillStyle = (x + y) % 2 === 0 ? "#a3d96b" : "#b3e283";
        ctx!.fillRect(x * 20, y * 20, 20, 20);
      }
    }
  }
  function desenharMaça(ctx: CanvasRenderingContext2D | null | undefined) {
    if (!ctx) return;

    if (!temMaça) {
      const x = Math.floor(Math.random() * 16);
      const y = Math.floor(Math.random() * 14);
      setLocalMaça([x, y]);
      setTemMaça(true);

      ctx.fillStyle = "red";
      ctx.fillRect(x * 20, y * 20, 20, 20);
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(localMaça[0] * 20, localMaça[1] * 20, 20, 20);
    }
  }

  function desenharSnake(
    ctx: CanvasRenderingContext2D | null | undefined,
    snake: number[][]
  ) {
    ctx!.fillStyle = "blue";
    snake.forEach(([x, y]) => {
      ctx!.fillRect(x * 20, y * 20, 20, 20);
    });
  }

  useEffect(() => {
    maçaRef.current = localMaça;
  }, [localMaça]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    desenharCampo(ctx);
    desenharMaça(ctx);
    desenharSnake(ctx, snakePosiçao);
  }, [snakePosiçao]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") setDireçao("ArrowUp");
      if (event.key === "ArrowDown") setDireçao("ArrowDown");
      if (event.key === "ArrowLeft") setDireçao("ArrowLeft");
      if (event.key === "ArrowRight") setDireçao("ArrowRight");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    IntervalRef.current = direçao;
  }, [direçao]);

  useEffect(() => {
    let lastTime = 0;
    const velocidade = 200;

    function gameLoop(timestamp: number) {
      if (timestamp - lastTime > velocidade) {
        lastTime = timestamp;
        setsnakePosiçao((pos) => {
          if (!pos.length) return pos; // evita erro na primeira execução
          const snake = [
            [8, 8],
            [7, 8],
            [6, 8],
          ];
          const m = maçaRef.current;
          const d = IntervalRef.current;
          let [x, y] = pos[0];
          if (
            pos[0][0] >= 16 ||
            pos[0][0] <= 0 ||
            pos[0][1] <= 0 ||
            pos[0][1] >= 14
          ) {
            // alert("Voce perdeu");
            return snake;
          }
          for (let i = 1; i < pos.length; i++) {
            if (pos[0][0] === pos[i][0] && pos[0][1] === pos[i][1]) {
              return snake;
            }
          }

          if (d === "ArrowRight") {
            if (pos[0][0] + 1 === pos[1][0])
              return [[x - 1, y], ...pos.slice(0, -1)];
            if (m[0] === pos[0][0] && m[1] === pos[0][1]) {
              setQuantM(quantM + 1);
              setTemMaça(false);
              return [[x + 1, y], ...pos];
            }
            return [[x + 1, y], ...pos.slice(0, -1)];
          }

          if (d === "ArrowLeft") {
            if (pos[0][0] - 1 === pos[1][0])
              return [[x + 1, y], ...pos.slice(0, -1)];
            if (m[0] === pos[0][0] && m[1] === pos[0][1]) {
              setQuantM(quantM + 1);
              setTemMaça(false);
              return [[x - 1, y], ...pos];
            }
            return [[x - 1, y], ...pos.slice(0, -1)];
          }

          if (d === "ArrowUp") {
            if (pos[0][1] - 1 === pos[1][1])
              return [[x, y + 1], ...pos.slice(0, -1)];
            if (m[0] === pos[0][0] && m[1] === pos[0][1]) {
              setQuantM(quantM + 1);
              setTemMaça(false);
              return [[x, y - 1], ...pos];
            }
            return [[x, y - 1], ...pos.slice(0, -1)];
          }

          if (d === "ArrowDown") {
            if (pos[0][1] + 1 === pos[1][1])
              return [[x, y - 1], ...pos.slice(0, -1)];
            if (m[0] === pos[0][0] && m[1] === pos[0][1]) {
              setQuantM(quantM + 1);
              setTemMaça(false);
              return [[x, y + 1], ...pos];
            }
            return [[x, y + 1], ...pos.slice(0, -1)];
          }
          return snake;
        });
      }

      requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
    // return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex  justify-center items-center h-screen">
      <h1>{quantM}</h1>
      <canvas ref={canvasRef} width={340} height={300} />
    </div>
  );
}
