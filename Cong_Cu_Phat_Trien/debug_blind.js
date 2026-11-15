const Room = { w: 800, h: 500, left: -400, right: 400, top: -250, bottom: 250, area: 40 };
const O = { x: 0, y: 0, r: 50 };

function isBlocked(M, P, O) {
  const dx = P.x - M.x, dy = P.y - M.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return false;
  let t = ((O.x - M.x) * dx + (O.y - M.y) * dy) / lenSq;
  if (t <= 0 || t >= 1) return false;
  const projX = M.x + t * dx, projY = M.y + t * dy;
  const distSq = (projX - O.x) * (projX - O.x) + (projY - O.y) * (projY - O.y);
  return distSq < O.r * O.r;
}

const M1 = { x: -375, y: 0 };
const M2 = { x: 13, y: -195 };

console.time("calc");
let total = 0, blind = 0;
const usableArea = Room.area - (Math.PI * 0.5 * 0.5);
for (let x = Room.left + 4; x <= Room.right - 4; x += 8) {
  for (let y = Room.top + 4; y <= Room.bottom - 4; y += 8) {
    if ((x - O.x)*(x - O.x) + (y - O.y)*(y - O.y) <= O.r * O.r) continue;
    total++;
    let seen1 = !isBlocked(M1, {x, y}, O);
    let seen2 = !isBlocked(M2, {x, y}, O);
    if (!seen1 && !seen2) blind++;
  }
}
console.timeEnd("calc");
console.log({ total, blind, area: (blind / total * usableArea).toFixed(2) });
