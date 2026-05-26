import { useState } from 'react';
import BookCard from './BookCard';
import BookDetails from './BookDetails';

export default function BookList({ books, onBorrow, onReturn }) {
  const [selectedBook, setSelectedBook] = useState(null);

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Books Found</h3>
        <p className="text-gray-400">Try adjusting your search or add a new book.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBorrow={onBorrow}
            onReturn={onReturn}
            onViewDetails={setSelectedBook}
          />
        ))}
      </div>
      
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </>
  );
}