import React from 'react';

const TextComponent = ({ text, handleTextChange }) => {
    return (
        <div className="textarea-row">
            <p>Text</p>
            <textarea type="text" value={text} onChange={handleTextChange} />
        </div>
    )
}

export default TextComponent;
