import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Alerts from '../components/Alerts';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function PayFine(){
  const { transactionId } = useParams();
  const loc = useLocation();
  const [fineAmount,setFineAmount]=useState(loc.state?.fineAmount || 0);
  const [amount,setAmount]=useState(fineAmount);
  const [error,setError]=useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    // optionally fetch transaction to get fine
    async function fetchIt(){
      try {
        const res = await api.get('/transactions');
        const t = res.data.find(x => x._id === transactionId);
        if (t) setFineAmount(t.fineAmount || 0);
      } catch {}
    }
    if (!fineAmount) fetchIt();
  }, []);

  const pay = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post('/transactions/pay', { transactionId, amount });
      alert('Fine paid and return completed if pending');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
    }
  };

  return (
    <div className="col-md-6">
      <h4>Pay Fine</h4>
      <Alerts message={error} />
      <div className="mb-3">Fine to pay: <strong>{fineAmount}</strong></div>
      <form onSubmit={pay}>
        <div className="mb-3">
          <label>Amount</label>
          <input value={amount} onChange={e=>setAmount(Number(e.target.value))} className="form-control" type="number" min="0" />
        </div>
        <button className="btn btn-primary">Pay</button>
      </form>
    </div>
  );
}
