import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Loader2 } from 'lucide-react';
import { books } from '../../data/books';
import { useProgress } from '../../context/ProgressContext';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker from unpkg for simplicity in this environment
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFReader = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { booksProgress, updateBookProgress } = useProgress();
  
  const book = books.find(b => b.id === bookId);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (booksProgress[bookId]?.lastPage) {
      setPageNumber(booksProgress[bookId].lastPage);
    }
  }, [bookId]);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <p className="text-xl font-bold dark:text-white">Book not found</p>
        <button onClick={() => navigate('/library')} className="bg-primary text-white px-6 py-2 rounded-lg">Back to Library</button>
      </div>
    );
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const handlePageChange = (newPage) => {
    const page = Math.max(1, Math.min(newPage, (numPages || 1)));
    setPageNumber(page);
    updateBookProgress(bookId, { 
      lastPage: page,
      progress: numPages ? Math.round((page / numPages) * 100) : 0
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="h-16 bg-slate-800 flex items-center justify-between px-4 sm:px-6 text-white border-b border-slate-700">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/library')}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-bold text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">{book.title}</h1>
            <p className="text-xs text-slate-400">Page {pageNumber} of {numPages || '...'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center bg-slate-700 rounded-lg p-1">
            <button 
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="p-1 hover:bg-slate-600 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
            <button 
              onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
              className="p-1 hover:bg-slate-600 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              disabled={pageNumber <= 1}
              onClick={() => handlePageChange(pageNumber - 1)}
              className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              disabled={pageNumber >= numPages}
              onClick={() => handlePageChange(pageNumber + 1)}
              className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Viewer */}
      <div className="flex-1 overflow-auto bg-slate-900 flex justify-center p-4">
        <Document
          file={book.pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center mt-20 gap-4 text-white">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p>Loading PDF...</p>
            </div>
          }
          error={
            <div className="text-white mt-20 text-center">
              <p className="text-red-400 mb-4">Failed to load PDF</p>
              <p className="text-sm text-slate-400">{book.pdfUrl}</p>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale}
            className="shadow-2xl"
            renderAnnotationLayer={true}
            renderTextLayer={true}
          />
        </Document>
      </div>

      {/* Progress bar at bottom */}
      <div className="h-1 bg-slate-800 w-full">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(pageNumber / (numPages || 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PDFReader;