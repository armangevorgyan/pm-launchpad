import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, progress, onUpdateProgress }) => {
  return (
    <div className="card flex flex-col sm:flex-row gap-6 p-6 hover:shadow-md transition-shadow">
      <div 
        className="w-full sm:w-32 h-48 rounded-lg shadow-inner flex items-center justify-center text-white p-4 text-center font-bold relative overflow-hidden group"
        style={{ backgroundColor: book.coverColor }}
      >
        <span className="relative z-10">{book.title}</span>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold dark:text-white">{book.title}</h3>
            <p className="text-slate-500 dark:text-slate-400">by {book.author}</p>
          </div>
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded text-xs font-bold uppercase tracking-wider">
            {book.weeks}
          </span>
        </div>
        
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 flex-1">
          {book.description}
        </p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
              <span>Reading Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="relative h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link 
              to={`/library/read/${book.id}`}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Read Book
            </Link>
            <a 
              href={book.purchaseUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Buy Book"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;