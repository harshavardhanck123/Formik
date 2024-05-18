import React, { useState, useEffect } from 'react';
import BookRecord from './BookRecord';
import AuthorRecord from './AuthorRecord';
import './Dashboard.css'

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editingBookIndex, setEditingBookIndex] = useState(null);
  const [editingAuthorIndex, setEditingAuthorIndex] = useState(null);
  const [bookFormData, setBookFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationDate: ''
  });
  const [authorFormData, setAuthorFormData] = useState({
    name: '',
    birthDate: '',
    biography: ''
  });

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    const storedAuthors = localStorage.getItem('authors');

    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }

    if (storedAuthors) {
      setAuthors(JSON.parse(storedAuthors));
    }
  }, []);

  const handleBookSubmit = (values) => {
    const updatedBooks = editingBookIndex !== null ?
      [...books.slice(0, editingBookIndex), values, ...books.slice(editingBookIndex + 1)] :
      [...books, values];
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    setBookFormData({
      title: '',
      author: '',
      isbn: '',
      publicationDate: ''
    });
    setEditingBookIndex(null);
  };

  const handleAuthorSubmit = (values) => {
    const updatedAuthors = editingAuthorIndex !== null ?
      [...authors.slice(0, editingAuthorIndex), values, ...authors.slice(editingAuthorIndex + 1)] :
      [...authors, values];
    localStorage.setItem('authors', JSON.stringify(updatedAuthors));
    setAuthors(updatedAuthors);
    setAuthorFormData({
      name: '',
      birthDate: '',
      biography: ''
    });
    setEditingAuthorIndex(null);
  };

  const handleBookDelete = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    // Clear editing index if the deleted book is being edited
    if (index === editingBookIndex) {
      setEditingBookIndex(null);
    }
  };

  const handleAuthorDelete = (index) => {
    const updatedAuthors = authors.filter((_, i) => i !== index);
    localStorage.setItem('authors', JSON.stringify(updatedAuthors));
    setAuthors(updatedAuthors);
    // Clear editing index if the deleted author is being edited
    if (index === editingAuthorIndex) {
      setEditingAuthorIndex(null);
    }
  };

  const handleBookEdit = (index) => {
    setEditingBookIndex(index);
    setEditingAuthorIndex(null); // Reset editing index for authors
    // Set book form data to the selected book's values
    setBookFormData({ ...books[index] });
  };

  const handleAuthorEdit = (index) => {
    setEditingAuthorIndex(index);
    setEditingBookIndex(null); // Reset editing index for books
    // Set author form data to the selected author's values
    setAuthorFormData({ ...authors[index] });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">{editingBookIndex !== null ? 'Edit Book' : 'Add Book'}</h2>
              <BookRecord initialValues={bookFormData} onSubmit={handleBookSubmit} />
            </div>
          </div>
          {books.map((book, index) => (
            <div className={`card mb-3 ${editingBookIndex === index ? 'border-primary' : ''}`} key={index}>
              <div className="card-body">
                <h5 className="card-title">Title: {book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <div className="d-flex justify-content-end align-items-center">
                  <button className="btn btn-primary mr-2" onClick={() => handleBookEdit(index)}>Edit</button>
                  <button className="btn btn-danger mr-2" onClick={() => handleBookDelete(index)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">{editingAuthorIndex !== null ? 'Edit Author' : 'Add Author'}</h2>
              <AuthorRecord initialValues={authorFormData} onSubmit={handleAuthorSubmit} />
            </div>
          </div>
          {authors.map((author, index) => (
            <div className={`card mb-3 ${editingAuthorIndex === index ? 'border-primary' : ''}`} key={index}>
              <div className="card-body">
                <h5 className="card-title">Name: {author.name}</h5>
                <p className="card-text">DOB: {author.birthDate}</p>
                <p className="card-text">Bio: {author.biography}</p>
                <div className="d-flex justify-content-end align-items-center">
                  <button className="btn btn-primary mr-2" onClick={() => handleAuthorEdit(index)}>Edit</button>
                  <button className="btn btn-danger mr-2" onClick={() => handleAuthorDelete(index)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
