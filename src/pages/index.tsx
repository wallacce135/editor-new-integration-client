import { useRef, useState, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import styles from '../styles/Container.module.scss';
import axios from 'axios';


interface MonacoFiles {
  [filename: string] : MonacoFileProps
}

interface MonacoFileProps {
  name: string,
  language: string,
  value: string
}


function MyEditor() {


  const files: MonacoFiles = {
    'index.html': {
      name: "index.html",
      language: "html",
      value: "<div>Something</div>"
    },
    'style.css': {
      name: 'style.css',
      language: 'css',
      value: 'div {color: red;}'
    },
    "main.js": {
      name: 'main.js',
      language: 'javascript',
      value: 'let something = "Hello world!"'
    },
    "settings.json": {
      name: 'settings.json',
      language: 'json',
      value: '2'
    }
  }

  
  const editorRef = useRef<Monaco>();
  
  const [fileName, setFileName] = useState<string>('index.html')
  const file = files[fileName];

  function handleEditorDidMount(editor: any, monaco: Monaco){
    editorRef.current = editor
  }

  const changeCurrentText = (editor: any) => {
    files[fileName].value = editor
  }

  const saveInformation = () => {
    axios.post('http://localhost:8080/information/saveInformation', {
      files
    })
  }

  return (
    <>
    <button onClick={saveInformation}>Отправить на сервер</button>
      <div className={styles.buttonsContainer}>
        <button onClick={() => setFileName('index.html')}>HTML</button>
        <button onClick={() => setFileName('style.css')}>CSS</button>
        <button onClick={() => setFileName('main.js')}>JS</button>
        <button onClick={() => setFileName('settings.json')}>Misc Settings</button>
      </div>
      <Editor
        height="90vh"
        theme="vs-dark"
        language="javascript"
        path={file.name}
        defaultLanguage={file.language}
        onChange={changeCurrentText}
        value={file.value}
        onMount={handleEditorDidMount}
      />
    </>
  );
}

export default MyEditor;
