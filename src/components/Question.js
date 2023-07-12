const QuestionComponent = ({question, handleJsonlChange}) => {
    return (
        <label>
            Question: 
            <textarea type="text" name="question" value={question} onChange={handleJsonlChange} />
        </label>
    );
}

export default QuestionComponent;