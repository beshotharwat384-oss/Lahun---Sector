import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSwipeable } from "react-swipeable";
import "./../App.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfViewer({ file = "/الكتيب النهائي.pdf", section, onNumPages }) {
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(section.start);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    setPage(section.start);
  }, [section]);

  useEffect(() => {
    function onResize() {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const basePdfWidth = 800;
      const newScale = Math.max(0.6, Math.min(1.6, w / basePdfWidth));
      setScale(newScale);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    onNumPages && onNumPages(numPages);
  }

  function changePage(offset) {
    setPage(prev => {
      let next = prev + offset;
      if (next < section.start) next = section.start;
      if (next > section.end) next = section.end;
      return next;
    });
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => changePage(1),
    onSwipedRight: () => changePage(-1),
    trackMouse: true
  });

  return (
    <div className="pdf-wrapper" ref={containerRef}>
      <div className="pdf-controls">
        <button className="nav-btn" onClick={() => changePage(-1)}>&lt;</button>
        <div className="slider-area">
          <input
            type="range"
            min={section.start}
            max={section.end}
            value={page}
            onChange={(e) => setPage(parseInt(e.target.value))}
            className="page-slider"
          />
          <div className="page-indicator">
            صفحة {page} / {section.end}
          </div>
        </div>
        <button className="nav-btn" onClick={() => changePage(1)}>&gt;</button>
      </div>

      <div {...handlers} className="pdf-viewer" aria-live="polite">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="loader">تحميل الكتيب…</div>}
        >
          <Page pageNumber={page} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </div>
    </div>
  );
}
