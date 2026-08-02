import React, { useState, useEffect } from 'react';
import { generateTopicFallback } from '../data/topicsData.js';

export default function DrilldownModal({ topic, tierName, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!topic) return null;

  const data = generateTopicFallback(topic.num, topic.title, topic.tag);

  return (
    <div
      className="drill-overlay open"
      onClick={e => {
        if (e.target.classList.contains('drill-overlay')) onClose();
      }}
    >
      <div className="drill-modal" role="dialog" aria-label="Topic Study Drilldown">
        <div className="drill-modal-header">
          <span className="drill-crumb">
            {tierName || 'DSA Tier'} / Atom #{topic.num}
          </span>
          <button
            type="button"
            className="modal-close-x"
            onClick={onClose}
            title="Close drilldown (ESC)"
          >
            ✕
          </button>
        </div>

        <div className="drill-title-bar">
          <h3 className="drill-atom-title" dangerouslySetInnerHTML={{ __html: topic.title }} />
          <div className="drill-atom-tags">
            <span className={`tag tag-${topic.tag}`}>{topic.tag}</span>
          </div>
        </div>

        <div className="drill-tabs">
          <button
            type="button"
            className={`drill-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📌 Overview & Intuition
          </button>
          <button
            type="button"
            className={`drill-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            💻 C++ Implementation
          </button>
          <button
            type="button"
            className={`drill-tab ${activeTab === 'interview' ? 'active' : ''}`}
            onClick={() => setActiveTab('interview')}
          >
            ❓ Interview Q&A
          </button>
          <button
            type="button"
            className={`drill-tab ${activeTab === 'practice' ? 'active' : ''}`}
            onClick={() => setActiveTab('practice')}
          >
            🎯 Practice Problems
          </button>
        </div>

        <div className="drill-body">
          <div className="drill-card">
            {activeTab === 'overview' && (
              <>
                <div>
                  <h4 className="drill-sec-h">Overview</h4>
                  <p className="drill-p">{data.overview}</p>
                </div>
                {data.definition && (
                  <div>
                    <h4 className="drill-sec-h">Core Definition</h4>
                    {typeof data.definition === 'object' ? (
                      <ul className="drill-list">
                        {Object.entries(data.definition).map(([k, v]) => (
                          <li key={k}>
                            <strong>{k}:</strong> {v}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="drill-p">{data.definition}</p>
                    )}
                  </div>
                )}
                {data.intuition && (
                  <div>
                    <h4 className="drill-sec-h">Key Intuition</h4>
                    <ul className="drill-list">
                      {(Array.isArray(data.intuition)
                        ? data.intuition
                        : [data.intuition]
                      ).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {activeTab === 'code' && (
              <div>
                <h4 className="drill-sec-h">C++ Pattern</h4>
                <pre className="drill-code">
                  <code>{data.cppImplementation?.code}</code>
                </pre>
                {data.cppImplementation?.explanation && (
                  <p className="drill-p">{data.cppImplementation.explanation}</p>
                )}
              </div>
            )}

            {activeTab === 'interview' && (
              <>
                {data.interviewQuestions && (
                  <div>
                    <h4 className="drill-sec-h">Interview Questions & Answers</h4>
                    <div className="drill-qa">
                      {data.interviewQuestions.map((qa, idx) => (
                        <div key={idx} className="drill-qa-item">
                          <p className="drill-qa-q">Q: {qa.question}</p>
                          <p className="drill-qa-a">A: {qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {data.commonMistakes && (
                  <div>
                    <h4 className="drill-sec-h">Common Pitfalls & Edge Cases</h4>
                    <ul className="drill-list">
                      {data.commonMistakes.map((m, idx) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {activeTab === 'practice' && data.practiceProblems && (
              <div>
                <h4 className="drill-sec-h">Curated Practice Problems</h4>
                <div className="drill-p">
                  {Object.entries(data.practiceProblems).map(([lvl, probs]) => (
                    <p key={lvl} style={{ marginBottom: '8px' }}>
                      <strong>{lvl.toUpperCase()}:</strong> {probs.join(', ')}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
