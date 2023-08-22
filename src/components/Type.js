import React from 'react';

const TypeComponent = ({ type, handleTypeChange }) => {
    
    return (
        <div className="textarea-row">
            <label>
                Type: 
            </label>
            <select name="type" value={type} onChange={handleTypeChange}>
                <option value="Common sense">Common sense</option>
                <option value="Politics">Politics</option>
                <option value="Etiquette">Etiquette</option>
                <option value="Military">Military</option>
                <option value="Technology">Technology</option>
                <option value="Emotion">Emotion</option>
                <option value="Belief">Belief</option>
                <option value="Art">Art</option>
            </select>
        </div>
    )
}

export default TypeComponent;
