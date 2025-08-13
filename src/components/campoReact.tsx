// "use client";
// import { useState, useEffect, useRef } from "react";

// export default function Camporeact() {
//   const [campo, setCampo] = useState<number[][]>([]);
//   const [snakePosiçao, setsnakePosiçao] = useState<number[][]>([
//     [8, 8],
//     [7, 8],
//     [6, 8],
//   ]);
//   const [direçao, setDireçao] = useState("ArrowRight");
//   const IntervalRef = useRef(direçao);
//   const canvasRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const arr = [];
//     for (let i = 0; i < 255; i++) {
//       arr.push([i % 17, Math.floor(i / 17)]);
//     }
//     setCampo(arr);
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "ArrowUp") setDireçao("ArrowUp");
//       if (event.key === "ArrowDown") setDireçao("ArrowDown");
//       if (event.key === "ArrowLeft") setDireçao("ArrowLeft");
//       if (event.key === "ArrowRight") setDireçao("ArrowRight");
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   useEffect(() => {
//     IntervalRef.current = direçao;
//   }, [direçao]);

//   useEffect(() => {
//     const intervalo = setInterval(() => {
//       setsnakePosiçao((pos) => {
//         if (!pos.length) return pos; // evita erro na primeira execução
//         const snake = [
//           [8, 8],
//           [7, 8],
//           [6, 8],
//         ];
//         const d = IntervalRef.current;
//         let [x, y] = pos[0];
//         if (
//           pos[0][0] >= 16 ||
//           pos[0][0] <= 0 ||
//           pos[0][1] <= 0 ||
//           pos[0][1] >= 14
//         )
//           return pos;

//         if (d === "ArrowRight") {
//           if (pos[0][0] + 1 === pos[1][0])
//             return [[x - 1, y], ...pos.slice(0, -1)];

//           return [[x + 1, y], ...pos.slice(0, -1)];
//         }

//         if (d === "ArrowLeft") {
//           if (pos[0][0] - 1 === pos[1][0])
//             return [[x + 1, y], ...pos.slice(0, -1)];

//           return [[x - 1, y], ...pos.slice(0, -1)];
//         }

//         if (d === "ArrowUp") {
//           if (pos[0][1] - 1 === pos[1][1])
//             return [[x, y + 1], ...pos.slice(0, -1)];

//           return [[x, y - 1], ...pos.slice(0, -1)];
//         }

//         if (d === "ArrowDown") {
//           if (pos[0][1] + 1 === pos[1][1])
//             return [[x, y - 1], ...pos.slice(0, -1)];

//           return [[x, y + 1], ...pos.slice(0, -1)];
//         }
//         return snake;
//       });
//     }, 220);

//     return () => clearInterval(intervalo);
//   }, []);

//   return (
//     <div className="flex  justify-center items-center h-screen">
//       <div className="grid grid-cols-17 ">
//         {campo.map((item, index) => (
//           <div
//             key={index}
//             className={`w-7 h-7 m-0 p-0  ${
//               index % 2 == 0 ? "bg-[#a3d96b] " : "bg-[#b3e283] "
//             }
//              ${
//                (item &&
//                  snakePosiçao.length &&
//                  item[0] === snakePosiçao[0][0] &&
//                  item[1] === snakePosiçao[0][1]) ||
//                (item[0] === snakePosiçao[1][0] &&
//                  item[1] === snakePosiçao[1][1]) ||
//                (item[0] === snakePosiçao[2][0] &&
//                  item[1] === snakePosiçao[2][1])
//                  ? " bg-blue-800"
//                  : ""
//              }`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// }
