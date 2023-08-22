const OptionsComponent = ({options, handleOptionChange}) => {
    return (
        <label>
            Options:
            {options.map((option, index) => (
                <div key={index} className='textarea-row'>
                    <span>{index}:</span>
                    <input type="text" name={`option${index}`} value={option} onChange={(e) => handleOptionChange(e, index)} />
                </div>
            ))}
        </label>
    )
}

export default OptionsComponent;