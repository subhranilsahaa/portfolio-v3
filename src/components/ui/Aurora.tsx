import React, { useEffect, useRef } from 'react';

export const Aurora: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let raf: number, t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const noise = (x: number, y: number, seed = 0) => {
      const X = Math.floor(x), Y = Math.floor(y);
      const xf = x - X, yf = y - Y;
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      const h = (n: number) => {
        let s = n + seed * 1000;
        s = ((s >> 16) ^ s) * 0x45d9f3b;
        s = ((s >> 16) ^ s) * 0x45d9f3b;
        s = (s >> 16) ^ s;
        return (s & 0xffff) / 0xffff;
      };
      const a = h(X + Y * 57), b = h(X + 1 + Y * 57);
      const c = h(X + (Y + 1) * 57), d = h(X + 1 + (Y + 1) * 57);
      return a + u * (b - a) + v * (c - a) + u * v * (a - b - c + d);
    };

    const blobs = [
      { x: 0.25, y: 0.45, r: 0.55, hue: 220, sat: 100, lit: 60, alpha: 0.13, sx: 0.0003, sy: 0.00018, phase: 0 },
      { x: 0.72, y: 0.38, r: 0.5, hue: 255, sat: 90, lit: 65, alpha: 0.11, sx: 0.00025, sy: 0.00022, phase: 2.1 },
      { x: 0.5, y: 0.65, r: 0.45, hue: 195, sat: 100, lit: 58, alpha: 0.09, sx: 0.00035, sy: 0.0002, phase: 4.3 },
      { x: 0.15, y: 0.7, r: 0.32, hue: 38, sat: 100, lit: 70, alpha: 0.05, sx: 0.00015, sy: 0.00012, phase: 1.2 },
    ];

    let beamAngle = -0.6;

    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b, i) => {
        const cx = (b.x + Math.sin(t * b.sx + b.phase) * 0.18) * w;
        const cy = (b.y + Math.cos(t * b.sy + b.phase) * 0.14) * h;
        const rx = b.r * w * (0.9 + 0.1 * Math.sin(t * 0.0004 + i));
        const ry = b.r * h * 0.6 * (0.9 + 0.1 * Math.cos(t * 0.0005 + i));

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(rx / ry, 1);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, ry);
        const hueShift = b.hue + Math.sin(t * 0.0003 + i) * 18;
        g.addColorStop(0, `hsla(${hueShift}, ${b.sat}%, ${b.lit}%, ${b.alpha})`);
        g.addColorStop(0.4, `hsla(${hueShift + 15}, ${b.sat}%, ${b.lit - 8}%, ${b.alpha * 0.6})`);
        g.addColorStop(1, `hsla(${hueShift + 30}, ${b.sat}%, ${b.lit - 15}%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, ry, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      const step = 40;
      for (let nx = 0; nx < w; nx += step) {
        for (let ny = 0; ny < h; ny += step) {
          const n1 = noise(nx / 300 + t * 0.0002, ny / 300, 0);
          const n2 = noise(nx / 200 + t * 0.00015, ny / 200, 7);
          const combined = (n1 * 0.6 + n2 * 0.4);
          if (combined > 0.58) {
            const gx = ctx.createRadialGradient(nx, ny, 0, nx, ny, step * 1.2);
            gx.addColorStop(0, `rgba(140,170,255,${(combined - 0.58) * 0.08})`);
            gx.addColorStop(1, 'transparent');
            ctx.fillStyle = gx;
            ctx.fillRect(nx - step, ny - step, step * 3, step * 3);
          }
        }
      }

      const vig = ctx.createRadialGradient(w * 0.5, h * 0.45, h * 0.15, w * 0.5, h * 0.45, h * 1.0);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(0,0,0,0.72)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
    />
  );
};
