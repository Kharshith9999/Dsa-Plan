import React, { useEffect, useState } from 'react';

export default function LineSidebar({ tiers, activeTierId }) {
  const [activeTop, setActiveTop] = useState(0);

  useEffect(() => {
    const activeRung = document.querySelector(`.rung[data-tier="${activeTierId}"]`);
    if (activeRung) {
      const parent = document.querySelector('.rungs');
      if (parent) {
        const pRect = parent.getBoundingClientRect();
        const rRect = activeRung.getBoundingClientRect();
        setActiveTop(rRect.top - pRect.top);
      }
    }
  }, [activeTierId]);

  return (
    <nav className="rail" aria-label="Tiers">
      <p className="rail-h">Tiers</p>
      <div className="rungs-wrapper">
        <div className="line-sidebar-track"></div>
        <div
          className="line-sidebar-active"
          style={{ transform: `translateY(${activeTop}px)` }}
        ></div>
        <div className="rungs">
          {tiers.map(tier => (
            <a
              key={tier.id}
              className={`rung ${activeTierId === tier.id ? 'on' : ''}`}
              href={`#tier-${tier.id}`}
              data-tier={tier.id}
            >
              <span className="rung-num">{tier.id}</span>
              <span className="rung-name">{tier.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
