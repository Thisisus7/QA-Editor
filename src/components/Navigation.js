const NavigationComponent = ({currentIndex, handlePrevious, handleNext}) => {
    return (
        <div className='editor-nav'>
            <button onClick={handlePrevious}>Previous</button>
            <span>Question {currentIndex + 1}</span>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}

export default NavigationComponent;