import React, { useState } from "react";
import PdfViewer from "./components/PdfViewer";
import SectionButtons from "./components/SectionButtons";
import sections from "./sections";
import "./App.css";

function App() {
  const [currentSection, setCurrentSection] = useState(sections[0]);
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="logo-area">
          <img src="/lahun-logo.jpeg" alt="logo" className="logo-img" />
          <div className="brand-title">جهاز مستقبل مصر</div>
        </div>
      </header>

      <main className="main-content">
        <PdfViewer
          file="/الكتيب النهائي.pdf"
          section={currentSection}
          onNumPages={(n) => setNumPages(n)}
        />

        <SectionButtons
          sections={sections}
          activeSection={currentSection}
          onJump={(sec) => setCurrentSection(sec)}
        />
      </main>
    </div>
  );
}

export default App;
