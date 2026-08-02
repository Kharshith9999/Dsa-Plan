import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Masthead from './components/Masthead.jsx';
import LineSidebar from './components/LineSidebar.jsx';
import TopicCard from './components/TopicCard.jsx';
import DrilldownModal from './components/DrilldownModal.jsx';
import { TIERS } from './data/topicsData.js';

export default function App() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeTierId, setActiveTierId] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTierName, setSelectedTierName] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dsa_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dsa_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const handleScroll = () => {
      const tierElems = document.querySelectorAll('.tier');
      let currentId = 0;
      tierElems.forEach(elem => {
        const rect = elem.getBoundingClientRect();
        if (rect.top <= 140) {
          currentId = parseInt(elem.dataset.tier, 10);
        }
      });
      setActiveTierId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectTopic = (topic, tierName) => {
    setSelectedTopic(topic);
    setSelectedTierName(tierName);
  };

  return (
    <div className="app-root">
      <Header
        activeFilter={activeFilter}
        onSelectFilter={key => setActiveFilter(key)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className="shell">
        <Masthead />

        <div className="cols">
          <div className="rail-col">
            <LineSidebar tiers={TIERS} activeTierId={activeTierId} />
          </div>

          <main className="main">
            {TIERS.map(tier => (
              <section
                key={tier.id}
                className="tier"
                id={`tier-${tier.id}`}
                data-tier={tier.id}
              >
                <header className="tier-head">
                  <span className="tier-num">{tier.id}</span>
                  <h2>{tier.name}</h2>
                </header>
                {tier.note && <p className="tier-note">{tier.note}</p>}

                {tier.groups.map((grp, gIdx) => (
                  <section key={gIdx} className="group">
                    {grp.title && <h3 className="grp">{grp.title}</h3>}
                    <ul className="items">
                      {grp.items
                        .filter(item => !activeFilter || item.tag === activeFilter)
                        .map(item => (
                          <TopicCard
                            key={item.num}
                            item={item}
                            tierName={tier.name}
                            onSelect={handleSelectTopic}
                          />
                        ))}
                    </ul>
                  </section>
                ))}
              </section>
            ))}
          </main>
        </div>
      </div>

      <DrilldownModal
        topic={selectedTopic}
        tierName={selectedTierName}
        onClose={() => setSelectedTopic(null)}
      />
    </div>
  );
}
