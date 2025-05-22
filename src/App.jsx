import React, { useState } from "react";
import SimpleCodeEditor from "./SimpleCodeEditor";

// import Editor from "react-simple-code-editor";
// import Prism from "prismjs";
// import { highlight } from "prismjs";
// import "prismjs/components/prism-sql";
// import "prismjs/themes/prism-tomorrow.css"; // Dark theme
// import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
//   const [query, setQuery] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const executeQuery = async () => {
//     try {
//        const cleanedQuery = query
//         .split("\n")
//         .filter((line) => !line.trim().startsWith("--"))
//         .join("\n");

//       const res = await axios.post("http://127.0.0.1:5000/execute", {
//         query: cleanedQuery,
//       });
//       if (res.data.success) {
//         setResult(res.data);
//         setError("");
//       } else {
//         setError(res.data.error);
//         setResult(null);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//  const lineNumbers = query.split("\n").map((_, i) => i + 1);


//   return (
//     <div className="container">
//       <div className="navbar">
//         <h2>MySQL Compiler</h2>
//         <button onClick={executeQuery}>Run</button>
//       </div>
//       <div className="main">
//         {/* Editor Area */}
//         <div className="editor-container">
//           <div className="line-numbers">
//             {lineNumbers.map((line) => (
//               <div key={line}>{line}</div>
//             ))}
//           </div>
//           <div className="editor">
//             <Editor
//               value={query}
//               onValueChange={setQuery}
//               highlight={(code) => highlight(code, Prism.languages.sql, "sql")}
//               padding={10}
//               style={{
//                 fontFamily: '"Fira Code", monospace',
//                 fontSize: 14,
//                 minHeight: "100%",
//                 outline: "none",
//               }}
//             />
//           </div>
//         </div>

//         {/* Result Area */}
//         <div className="output">
//           {error && <p className="error">Error: {error}</p>}
//           {result && result.data && (
//             <table>
//               <thead>
//                 <tr>
//                   {result.columns.map((col, idx) => (
//                     <th key={idx}>{col}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {result.data.map((row, i) => (
//                   <tr key={i}>
//                     {row.map((cell, j) => (
//                       <td key={j}>{cell}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
return(
  <div className="App">
   <SimpleCodeEditor/>
  </div>
  
)
}

export default App;
