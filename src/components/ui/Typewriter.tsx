import { useState, useEffect } from 'react';

export function useTypewriter(roles: string[] | undefined) {
  const [display, setDisplay] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'erasing'>('typing');

  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const role = roles[roleIdx % roles.length];
    let t: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (display.length < role.length) {
        t = setTimeout(() => setDisplay(role.slice(0, display.length + 1)), 75);
      } else {
        t = setTimeout(() => setPhase('pausing'), 1400);
      }
    } else if (phase === 'pausing') {
      t = setTimeout(() => setPhase('erasing'), 500);
    } else {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(display.slice(0, -1)), 40);
      } else {
        setRoleIdx((i) => i + 1);
        setPhase('typing');
      }
    }
    return () => clearTimeout(t);
  }, [display, phase, roleIdx, roles]);

  return display;
}
