import React from 'react';

export default function Masthead() {
  return (
    <header className="mast">
      <div className="mast-title">
        <img
          src="./dsa_title_photo.png"
          alt="DSA Classic Manuscript & Study Desk"
          className="title-photo"
        />
        <h1>DSA — Complete Atomic Breakdown</h1>
      </div>
      <p className="howto">
        <strong>How to use this:</strong> each line is one sitting (60–120 min: learn the idea → implement from scratch once → solve 3–8 problems). Click any topic row to open the complete centered study breakdown!
      </p>
      <p className="total">
        <strong>Total: 395 master atoms.</strong> At 2/day that's ~6.5 months. At 1/day, ~13 months.
      </p>
    </header>
  );
}
