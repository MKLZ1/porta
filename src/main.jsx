import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CreateMLCEngine } from "@mlc-ai/web-llm";
// CreateMLCEngine("Llama-3.2-3B-Instruct-q4f32_1-MLC", {
//   initProgressCallback: (data) => console.log("el progreso es", data),
// });
// function startIA() {
//   const chat = new webllm.ChatModule();
//   chat.setInitProgressCallback(
//     (report) => (progressReporter.innerText = report.text)
//   );
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
