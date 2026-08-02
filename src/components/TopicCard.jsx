import React from 'react';

export default function TopicCard({ item, tierName, onSelect }) {
  return (
    <li className="item">
      <div
        className="item-row"
        onClick={() => onSelect(item, tierName)}
        title={`Click to open full study breakdown for Topic #${item.num}`}
      >
        <span className="txt">{item.title}</span>
        <span className={`tag tag-${item.tag}`} title={`Tag ${item.tag}`}>
          {item.tag}
        </span>
      </div>
    </li>
  );
}
