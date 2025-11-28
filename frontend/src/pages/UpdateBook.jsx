import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Alerts from '../components/Alerts';
import { useParams } from 'react-router-dom';

export default function UpdateBook(){
  const { id } = useParams();
  const [book,setBook]=useState(null);
  const [error,setError]=useState(null);

  useEffect(()=>{
    async function load(){
      try {
        const res = await api.get(`/books/search?q=`);
        const b = res.data.find(x => x._id === id);
        if (!b) return setError('Book not found');
        setBook(b);
      } catch (err) {
        setError('Failed to fetch');
      }
    }
    if (id) load();
  },[id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${id}`, { title: book.title, author: book.author, serialNo: book.serialNo, type: book.type, available: book.available });
      alert('Updated');
    } catch (err) {
      setError('Update failed');
    }
  };

  if (!book) return <div>{error ? <Alerts message={error} /> : 'Loading...'}</div>;

  return (
    <div className="col-md-8">
      <h4>Update Book</h4>
      <Alerts message={error} />
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Type</label>
          <select value={book.type} onChange={e=>setBook({...book, type:e.target.value})} className="form-select">
            <option value="book">Book</option>
            <option value="movie">Movie</option>
          </select>
        </div>
        <div className="mb-3"><label>Title</label><input value={book.title} onChange={e=>setBook({...book,title:e.target.value})} className="form-control" /></div>
        <div className="mb-3"><label>Author</label><input value={book.author} onChange={e=>setBook({...book,author:e.target.value})} className="form-control" /></div>
        <div className="mb-3"><label>Serial No</label><input value={book.serialNo} onChange={e=>setBook({...book,serialNo:e.target.value})} className="form-control" /></div>
        <div className="form-check mb-3">
          <input type="checkbox" checked={book.available} onChange={e=>setBook({...book, available: e.target.checked})} className="form-check-input" id="available" />
          <label className="form-check-label" htmlFor="available">Available</label>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
