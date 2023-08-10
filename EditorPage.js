import { useState, useEffect } from 'react';

import NavigationComponent from '../components/Navigation';
import QuestionComponent from '../components/Question';
import OptionsComponent from '../components/Options';
import AnswerComponent from '../components/Answer';
import TypeComponent from '../components/Type';
import TextComponent from '../components/Text';

const EditorPage = () => {
    const [files, setFiles] = useState({text: '', jsonl: []});  // initialize text and jsonl
    const [currentIndex, setCurrentIndex] = useState(0);  // initialize question index 0-49
    const [textDocument, setTextDocument] = useState(''); // For the left part

    useEffect(() => {
        const savedFiles = JSON.parse(localStorage.getItem("files"));
        setFiles(savedFiles);
        setTextDocument(savedFiles.text);
    }, [])

    // Left
    const handleTextDocumentChange = (e) => {
        setTextDocument(e.target.value);
    }
    // Right
    const handleJsonlChange = (e, index) => {
        const newJsonl = [...files.jsonl];
        newJsonl[currentIndex][e.target.name] = e.target.value;
        setFiles({ ...files, jsonl: newJsonl });
    }
    const handleAnswerChange = (e, index) => {
        const newJsonl = [...files.jsonl];
        newJsonl[currentIndex].answer = parseInt(e.target.value);
        setFiles({ ...files, jsonl: newJsonl });
    }
    const handleTypeChange = (e, index) => {
        const newJsonl = [...files.jsonl];
        newJsonl[currentIndex].type = e.target.value;
        setFiles({ ...files, jsonl: newJsonl });
    }  
    const handleTextChange = (e) => {
        const newJsonl = [...files.jsonl];
        newJsonl[currentIndex].text = e.target.value;
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
        // Download JSONL
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

        // Download text
        const textBlob = new Blob([textDocument], { type: 'text/plain' });
        const textHref = URL.createObjectURL(textBlob);
        const textLink = document.createElement('a');
        textLink.href = textHref;
        textLink.download = `${fileName}.txt`;
        document.body.appendChild(textLink);
        textLink.click();
        document.body.removeChild(textLink);
    }

    return <div className='editor'>
        <h1 className='editor-header'>Q&A Editor</h1>
        <div className='editor-content'>
            <div className="editor-text">
                <textarea 
                    className='editor-textarea' 
                    value={textDocument} 
                    onChange={handleTextDocumentChange}
                />
            </div>
            <div className='editor-controls'>
                <NavigationComponent currentIndex={currentIndex} handlePrevious={handlePrevious} handleNext={handleNext} />
                {files.jsonl[currentIndex] && 
                <>
                    <QuestionComponent question={files.jsonl[currentIndex].question} handleJsonlChange={handleJsonlChange} />
                    <OptionsComponent options={files.jsonl[currentIndex].options} handleOptionChange={handleOptionChange} />
                    <AnswerComponent answer={files.jsonl[currentIndex].answer} handleAnswerChange={handleAnswerChange} />
                    <TypeComponent type={files.jsonl[currentIndex].type} handleTypeChange={handleTypeChange} />
                    <TextComponent text={files.jsonl[currentIndex].text} handleTextChange={handleTextChange} />
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