import { useState, useEffect } from 'react';

import QuestionComponent from '../components/Question';
import OptionsComponent from '../components/Options';
import AnswerComponent from '../components/Answer';
import NavigationComponent from '../components/Navigation';

const EditorPage = () => {
    const [files, setFiles] = useState({text: '', jsonl: []});  // initialize text and jsonl
    const [currentIndex, setCurrentIndex] = useState(0);  // initialize question index 0-49

    useEffect(() => {
        const savedFiles = JSON.parse(localStorage.getItem("files"));
        setFiles(savedFiles);
    }, [])

    const handleJsonlChange = (e, index) => {
        const newJsonl = [...files.jsonl];
        if (e.target.name === 'answer') {
            newJsonl[currentIndex][e.target.name] = parseInt(e.target.value);
        } else {
            newJsonl[currentIndex][e.target.name] = e.target.value;
        }
        setFiles({ ...files, jsonl: newJsonl });
    }    

    // button
    const handleNext = () => {  // next question
        setCurrentIndex((currentIndex + 1) % files.jsonl.length);
    }
    const handlePrevious = () => {  // previous question
        setCurrentIndex((currentIndex - 1 + files.jsonl.length) % files.jsonl.length);
    }
    const handleOptionChange = (e, index) => {
        const newJsonl = [...files.jsonl];
        newJsonl[currentIndex].options[index] = e.target.value;
        setFiles({ ...files, jsonl: newJsonl });
    }    

    const handleDownload = () => {
        const jsonlString = JSON.stringify(files.jsonl);
        const blob = new Blob([jsonlString], { type: 'text/plain' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        const fileName = localStorage.getItem("fileName");
        link.download = `${fileName}.jsonl`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return <div className='editor'>
        <h1 className='editor-header'>Q&A Editor</h1>
        <div className='editor-content'>
            <div className="editor-text">
                <textarea className='editor-textarea' value={files.text} readOnly />
            </div>
            <div className='editor-controls'>
                <NavigationComponent currentIndex={currentIndex} handlePrevious={handlePrevious} handleNext={handleNext} />
                {files.jsonl[currentIndex] && 
                <>
                    <QuestionComponent question={files.jsonl[currentIndex].question} handleJsonlChange={handleJsonlChange} />
                    <OptionsComponent options={files.jsonl[currentIndex].options} handleOptionChange={handleOptionChange} />
                    <AnswerComponent answer={files.jsonl[currentIndex].answer} handleAnswerChange={handleJsonlChange} />
                </>
                }
            </div>
            <div className='editor-footer'>
                <p className='editor-note'>Please click the "Download" button to save the file locally before closing the web page</p>
                <button className='editor-download' onClick={handleDownload}>Download</button>
            </div>
        </div>
    </div>
}

export default EditorPage;