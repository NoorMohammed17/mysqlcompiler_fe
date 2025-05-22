import React, { useState, useRef } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { EditorView } from "@codemirror/view";
import { Play } from "lucide-react";

function SimpleCodeEditor() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState('');
  const editorRef = useRef(null); // to store CodeMirror instance

  const handleRun = () => {
    const cleanedQuery = query
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n");
    const editor = editorRef.current?.view;
    let selectedSQL = "";

    if (editor) {
      const state = editor.state;
      const { from, to } = state.selection.main;
      selectedSQL = state.doc.sliceString(from, to).trim();
    }

    const sqlToRun = selectedSQL || cleanedQuery; // fallback to full query if nothing selected
    runSQL(sqlToRun);
  };

  const runSQL = async (sqlCode) => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/execute", {
        query: sqlCode,
      });
      // console.log(res.data);
      if (res.data.success) {
        // let len = res.data.results.length
        setResult(res.data); // use  result
        setMessage(res.data.message)

        setError("");
      } else {
        setError(res.data.error);
        setResult(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <nav className="navbar">
        <h3
          style={{
            margin: 0,
            fontStyle: "italic",
            fontFamily: "sans-serif",
            fontWeight: 400,
          }}
        >
          MySQL Code Editor
        </h3>
        <button onClick={handleRun}>
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            Run <Play strokeWidth={2.0} />
          </div>
        </button>
      </nav>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Editor */}
        <div
          style={{
            width: "70%",
            borderRight: "1px solid #ccc",
            padding: "5px",
          }}
        >
          <CodeMirror
            value={query}
            height="500px"
            extensions={[sql(), EditorView.lineWrapping]}
            onCreateEditor={(view) => (editorRef.current = { view })}
            onChange={(value) => setQuery(value)}
            theme="dark"
            basicSetup={{ lineNumbers: true }}
          />
        </div>

        {/* Output */}
        <div
          style={{
            width: "30%",
            padding: "10px",
            height: "500px",
            overflowY: "auto",
          }}
          className="output"
        >
          <h2>Output : </h2>
          {message && <p style={{color:'green'}}>{message}</p>}
          {!result && !error && (
            <p style={{ color: "gray" }}>
              Click on RUN button to see the output
            </p>
          )}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {result?.data && <p style={{color:'blue'}}>{result?.data?.length} row(s) returned</p>}
          {result && (
            <table>
              <thead>
                <tr>
                  {result?.columns?.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result?.data?.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimpleCodeEditor;
