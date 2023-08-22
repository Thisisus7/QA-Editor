const AnswerComponent = ({answer, handleAnswerChange}) => {
    const displayValue = Array.isArray(answer) ? answer.join("&&") : answer;
    return (
        <div className="textarea-row">
            <label>
                Answer: 
            </label>
            <select name="answer" value={displayValue} onChange={handleAnswerChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="0&&1">0&&1</option>
                <option value="0&&2">0&&2</option>
                <option value="0&&3">0&&3</option>
                <option value="1&&2">1&&2</option>
                <option value="1&&3">1&&3</option>
                <option value="2&&3">2&&3</option>
            </select>
        </div>
    )
}

export default AnswerComponent;
