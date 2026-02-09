import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [scale, setScale] = useState(window.innerWidth > 1024 ? 0.8 : 1.0);
  const [containerWidth, setContainerWidth] = useState(0);
  const viewerRef = useRef(null);
  const pageNumberRef = useRef(pageNumber);
  const targetPageRef = useRef(null);
  const manualScrollTimerRef = useRef(null);

  // Sync ref with state
  useEffect(() => {
    pageNumberRef.current = pageNumber;
  }, [pageNumber]);

  useEffect(() => {
    const updateWidth = () => {
      if (viewerRef.current) {
        // Subtract padding (p-4 = 16px each side)
        const width = viewerRef.current.clientWidth - 32;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
      if (manualScrollTimerRef.current) clearTimeout(manualScrollTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          handlePageChange(pageNumber + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          handlePageChange(pageNumber - 1);
          break;
        case 'PageDown':
          handlePageChange(pageNumber + 5);
          break;
        case 'PageUp':
          handlePageChange(pageNumber - 5);
          break;
        case 'Home':
          handlePageChange(1);
          break;
        case 'End':
          handlePageChange(numPages);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageNumber, numPages]);

  useEffect(() => {
    if (booksProgress[bookId]?.lastPage) {
      const lastPage = booksProgress[bookId].lastPage;
      setPageNumber(lastPage);
      // Wait for document to load before scrolling
      if (numPages) {
        setTimeout(() => {
          const pageElement = viewerRef.current?.querySelector(`[data-page-number="${lastPage}"]`);
          pageElement?.scrollIntoView();
        }, 100);
      }
    }
  }, [bookId, numPages]);

  // Observer to update page number on scroll
  useEffect(() => {
    if (!numPages || !viewerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if we're in the middle of a manual scroll
        if (targetPageRef.current !== null) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNum = parseInt(entry.target.getAttribute('data-page-number'));
            if (pageNum && pageNum !== pageNumberRef.current) {
              setPageNumber(pageNum);
              updateBookProgress(bookId, { 
                lastPage: pageNum,
                progress: Math.round((pageNum / numPages) * 100)
              });
            }
          }
        });
      },
      {
        root: viewerRef.current,
        threshold: 0.1,
        rootMargin: '-20% 0px -50% 0px' 
      }
    );

    const pages = viewerRef.current.querySelectorAll('[data-page-number]');
    pages.forEach((page) => observer.observe(page));

    return () => observer.disconnect();
  }, [numPages, bookId]); // Removed pageNumber from dependencies

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
  }

  const handlePageChange = useCallback((newPage) => {
    const page = Math.max(1, Math.min(newPage, (numPages || 1)));
    if (page === pageNumberRef.current) return;

    // Set target to ignore observer during smooth scroll
    if (manualScrollTimerRef.current) clearTimeout(manualScrollTimerRef.current);
    targetPageRef.current = page;
    setPageNumber(page);

    const pageElement = viewerRef.current?.querySelector(`[data-page-number="${page}"]`);
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: 'smooth' });
    }

    // Reset target after scroll is likely finished
    manualScrollTimerRef.current = setTimeout(() => {
      targetPageRef.current = null;
      manualScrollTimerRef.current = null;
    }, 800);
  }, [numPages]);

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
      <div 
        ref={viewerRef}
        className="flex-1 overflow-auto bg-slate-900 p-4 scroll-smooth"
      >
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
          {numPages && Array.from(new Array(numPages), (el, index) => (
            <div 
              key={`page_${index + 1}`} 
              data-page-number={index + 1}
              className="mb-8 last:mb-0 mx-auto w-fit"
            >
              <Page 
                pageNumber={index + 1} 
                scale={scale}
                width={containerWidth > 0 ? containerWidth : undefined}
                className="shadow-2xl"
                renderAnnotationLayer={true}
                renderTextLayer={true}
                loading={
                  <div 
                    className="bg-slate-800 animate-pulse shadow-2xl" 
                    style={{ 
                      width: containerWidth > 0 ? containerWidth * scale : '600px',
                      height: containerWidth > 0 ? (containerWidth * scale * 1.4) : '840px' 
                    }} 
                  />
                }
              />
            </div>
          ))}
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