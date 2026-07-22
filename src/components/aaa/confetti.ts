import confetti from "canvas-confetti";

export function celebrate(x: number, y: number) {
  const origin = { x: x / window.innerWidth, y: y / window.innerHeight };
  const colors = ["#8fd6cd", "#c9efe9", "#4fa89e", "#ffffff", "#78c7bb"];
  confetti({ particleCount: 60, spread: 70, startVelocity: 45, origin, colors, scalar: 0.9, ticks: 200 });
  confetti({ particleCount: 30, spread: 120, startVelocity: 25, origin, colors, shapes: ["circle"], scalar: 0.6, ticks: 250 });
}