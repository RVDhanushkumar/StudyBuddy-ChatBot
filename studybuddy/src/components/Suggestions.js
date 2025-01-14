import React from 'react';
import './Suggestions.css';

function Suggestions({ onSuggest }) {
  const suggestions = ['Math', 'Science', 'History', 'Literature'];

  return (
    <div className="suggestions">
      {suggestions.map((topic, index) => (
        <button key={index} onClick={() => onSuggest(topic)}>
          {topic}
        </button>
      ))}
    </div>
  );
}

export default Suggestions;
