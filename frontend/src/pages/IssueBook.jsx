import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Alerts from '../components/Alerts';
import { useLocation } from 'react-router-dom';

export default function IssueBook(){
  const loc = useLocation();
  const preSerial = loc.state?.serialNo || '';
  const [serialNo,setSerialNo]=useState(preSerial);
  const [membershipNumber,setMembershipNumber]=useState('');
  const [issueDate,setIssueDate]=useState('');
  const [returnDate,setReturnDate]=useState('');
  const [remarks,setRemarks]=useState('');
  const [error,setError]=useState(null);
  const [authorHint,setAuthorHint]=useState('');

  useEffect(()=>{
    const today = new Date().toISOString().slice(0,10);
    setIssueDate(today);
    const ret = new Date();
    ret.setDate(ret.getDate()+15);
    setReturnDate(ret.toISOString().slice(0,10));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    // Validations per spec:
    if (!serialNo) return setError('Select or enter Serial No of book');
    if (!membershipNumber) return setError('Membership number required');
    if (!issueDate) return setError('Issue date required');
    const issue = new Date(issueDate);
    const today = new Date(); today.setHours(0,0,0,0);
    if (issue < today) return setError('Issue Date cannot be less than today');
    const maxRet = new Date(issue); maxRet.setDate(maxRet.getDate()+15);
    if (new Date(returnDate) > maxRet) return setError('Return Date cannot be greater than 15 days from issue');

    try {
      const res = await api.post('/transactions/issue', { serialNo, membershipNumber, issueDate, returnDate, remarks });
      alert('Book issued successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Issue failed');
    }
  };

  return (
    <div className="col-md-8">
      <h4>Issue Book</h4>
      <Alerts message={error} />
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Serial No (required)</label>
          <input value={serialNo} onChange={e=>setSerialNo(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Membership Number (required)</label>
          <input value={membershipNumber} onChange={e=>setMembershipNumber(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Issue Date</label>
          <input value={issueDate} onChange={e=>setIssueDate(e.target.value)} className="form-control" type="date" />
        </div>
        <div className="mb-3">
          <label>Return Date</label>
          <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} className="form-control" type="date" />
          <div className="form-text">Default 15 days ahead. Can be edited earlier but not greater than 15 days.</div>
        </div>
        <div className="mb-3">
          <label>Remarks (optional)</label>
          <textarea value={remarks} onChange={e=>setRemarks(e.target.value)} className="form-control"></textarea>
        </div>
        <button className="btn btn-primary">Issue</button>
      </form>
    </div>
  );
}
