import React from 'react';
import { books } from '../../data/books';
import { resources } from '../../data/resources';
import { useProgress } from '../../context/ProgressContext';
import BookCard from './BookCard';
import { Newspaper, Youtube, Link as LinkIcon } from 'lucide-react';

const LibraryPage = () => {
  const { booksProgress, updateBookProgress } = useProgress();

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold dark:text-white">Reading Room</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">The essential books and resources for your career pivot.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {books.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            progress={booksProgress[book.id]?.progress || 0}
            onUpdateProgress={updateBookProgress}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
            <Newspaper className="w-5 h-5 text-primary" />
            Newsletters
          </h3>
          <div className="space-y-2">
            {resources.newsletters.map((n, i) => (
              <a 
                key={i} 
                href={n.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 card hover:border-primary transition-colors text-sm dark:text-slate-300"
              >
                {n.name}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
            <Youtube className="w-5 h-5 text-red-500" />
            YouTube
          </h3>
          <div className="space-y-2">
            {resources.youtubeChannels.map((y, i) => (
              <a 
                key={i} 
                href={y.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 card hover:border-primary transition-colors text-sm dark:text-slate-300"
              >
                {y.name}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
            <LinkIcon className="w-5 h-5 text-teal-500" />
            Communities
          </h3>
          <div className="space-y-2">
            {resources.communities.map((c, i) => (
              <a 
                key={i} 
                href={c.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-3 card hover:border-primary transition-colors text-sm dark:text-slate-300"
              >
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;