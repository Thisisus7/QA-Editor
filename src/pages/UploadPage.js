import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NoteComponent from '../components/Note';

const UploadPage = () => {
    const [numQuestions, setNumQuestions] = useState(50);
    const defaultJsonl = Array.from({length: numQuestions}, (_, index) => ({
        question: `Q${index + 1}: `, 
        options: ["", "", "", ""], 
        answer: 0
    }));

    const [files, setFiles] = useState({text: "", jsonl: defaultJsonl});  // initialize txt and jsonl
    const [filesLoaded, setFilesLoaded] = useState({text: false, jsonl: false}); // track if files have been loaded
    const navigate = useNavigate();

    const handleNumQuestionsChange = (event) => {
        const num = parseInt(event.target.value);
        if (!isNaN(num) && num > 0) {
            setNumQuestions(num);
            setFiles(prevState => ({
                text: prevState.text,
                jsonl: Array.from({length: num}, (_, index) => ({
                    question: `Q${index + 1}: `, 
                    options: ["", "", "", ""], 
                    answer: 0
                }))
            }));
        }
    }

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            // No file was selected
            return;
        }
        const name = event.target.name;
        const reader = new FileReader();
    
        if (file.name.endsWith('.txt')) {
            const fileName = file.name.replace('.txt', '');
            localStorage.setItem("fileName", fileName);
        }
    
        reader.onload = (event) => {
            let content = event.target.result;
            if (name === "jsonl") {  
                content = JSON.parse(content);
            }
            setFiles(preState => ({...preState, [name]: content}));
            setFilesLoaded(preState => ({...preState, [name]: true})); 
        }
        reader.readAsText(file);    
    }        
    
    const handleConfirm = () => {
        // Save the files in localStorage or context
        if(!filesLoaded.text) {
            alert("Please upload the text file before proceeding.");
        } else if (numQuestions <= 0) {
            alert("Please provide a valid number of questions before proceeding.")
        } else {
            localStorage.setItem("files", JSON.stringify(files));
            navigate("/editor");
        }
    }

    return <div>
        <h1 className='editor-header'>Q&A Generator</h1>
        <input type="file" name="text" onChange={handleUpload} accept='.txt'/>
        <input type="file" name="jsonl" onChange={handleUpload} accept='.jsonl'/>
        <input type="number" min="1" value={numQuestions} onChange={handleNumQuestionsChange} disabled={filesLoaded.jsonl}/>
        <button onClick={handleConfirm}>Next Step</button>
        <NoteComponent />
    </div>
}

export default UploadPage;