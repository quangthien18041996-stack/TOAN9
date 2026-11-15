const Room = { w: 800, h: 500, left: -400, right: 400, top: -250, bottom: 250, area: 40 };
const O = { x: 0, y: 0, r: 50 }; // 0.5m radius

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

function computeCoverage(M1, M2, isDual) {
  const step = 10; // 10px = 0.1m -> 80x50 = 4000 points
  let total = 0, blind = 0;
  const usableArea = Room.area - (Math.PI * 0.5 * 0.5);
  for (let x = Room.left + 5; x <= Room.right - 5; x += step) {
    for (let y = Room.top + 5; y <= Room.bottom - 5; y += step) {
      if ((x - O.x)*(x - O.x) + (y - O.y)*(y - O.y) <= O.r * O.r) continue; // inside pillar
      total++;
      let seen1 = M1 ? !isBlocked(M1, {x, y}, O) : false;
      let seen2 = (isDual && M2) ? !isBlocked(M2, {x, y}, O) : false;
      if (!seen1 && !seen2) blind++;
    }
  }
  const blindArea = ((blind / total) * usableArea).toFixed(2);
  const blindPct = ((blind / total) * 100).toFixed(1);
  const covPct = (100 - parseFloat(blindPct)).toFixed(1);
  return { blindArea, blindPct, covPct, total, blind };
}

console.time("calc_all");
console.log("M1 close (0.8m):", computeCoverage({x: -80, y: 0}, null, false));
console.log("M1 medium (2.0m):", computeCoverage({x: -200, y: 0}, null, false));
console.log("M1 far (3.6m):", computeCoverage({x: -360, y: 0}, null, false));
console.log("Dual opposite 180:", computeCoverage({x: -250, y: 0}, {x: 250, y: 0}, true));
console.log("Dual same side 30:", computeCoverage({x: -250, y: -50}, {x: -250, y: 50}, true));
console.timeEnd("calc_all");
