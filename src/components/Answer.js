const AnswerComponent = ({answer, handleAnswerChange}) => {
    return (
        <div className="textarea-row">
            <label>
                Answer: 
            </label>
            <select name="answer" value={answer} onChange={handleAnswerChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    )
}

export default AnswerComponent;
