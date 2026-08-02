import React from 'react';

export default function Header({ activeFilter, onSelectFilter }) {
  const filters = [
    { key: 'I', label: 'I', desc: 'Interview-critical — FAANG/product rounds' },
    { key: 'C', label: 'C', desc: 'Codeforces / ICPC' },
    { key: 'B', label: 'B', desc: 'Both' },
    { key: 'O', label: 'O', desc: 'Optional' },
  ];

  return (
    <header className="bar">
      <div className="bar-in">
        <span className="brand">DSA — 395 Master Topics</span>
        <div className="filters">
          {filters.map(f => (
            <button
              key={f.key}
              type="button"
              className={`filter ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => onSelectFilter(activeFilter === f.key ? null : f.key)}
            >
              <span className={`tag tag-${f.key}`}>{f.label}</span>
              <span className="filter-txt">{f.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
