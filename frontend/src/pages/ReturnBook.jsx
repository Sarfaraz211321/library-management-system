
// import React, { useState, useEffect } from 'react';
// import api from '../api/api';
// import Alerts from '../components/Alerts';
// import { useLocation, useNavigate } from 'react-router-dom';

// export default function ReturnBook(){
//   const loc = useLocation();
//   const preSerial = loc.state?.serialNo || '';
//   const [serialNo,setSerialNo]=useState(preSerial);
//   const [transactionId,setTransactionId]=useState('');
//   const [issueRecord,setIssueRecord]=useState(null);
//   const [returnDate,setReturnDate]=useState('');
//   const [remarks,setRemarks]=useState('');
//   const [paidFine,setPaidFine]=useState(false);
//   const [confirmReturn,setConfirmReturn]=useState(false);
//   const [error,setError]=useState(null);
//   const navigate = useNavigate();

//   const fetchTransactionBySerial = async () => {
//     setError(null);
//     try {
//       const resAll = await api.get('/transactions');
//       const list = resAll.data;
//       const t = list.find(tr => tr.book?.serialNo === serialNo && !tr.returned) || null;
//       if (!t) return setError('No active issue found for this serial');
//       setIssueRecord(t);
//       setTransactionId(t._id);

//       // Use returnDate from transaction if exists, else default to today
//       const defaultReturn = t.returnDate 
//         ? new Date(t.returnDate).toISOString().slice(0,10)
//         : new Date().toISOString().slice(0,10);
//       setReturnDate(defaultReturn);
//     } catch (err) {
//       setError('Could not fetch transaction');
//     }
//   };

//   const handleFind = async () => fetchTransactionBySerial();

//   const submitReturn = async (e) => {
//     e.preventDefault();
//     setError(null);
//     if (!transactionId) return setError('Select a transaction to return');

//     // Optional validation: returnDate cannot be after allowed date
//     const issuedOn = new Date(issueRecord.issueDate);
//     const maxReturn = new Date(issuedOn);
//     maxReturn.setDate(maxReturn.getDate() + 15); // assuming 15 days max
//     if(new Date(returnDate) > maxReturn) {
//       return setError(`Return date cannot be after ${maxReturn.toLocaleDateString()}`);
//     }

//     try {
//       const res = await api.post('/transactions/return', { transactionId, returnDate, confirmReturn, finePaid: paidFine, remarks });
//       if (res.data.requiresPayment) {
//         navigate(`/pay-fine/${transactionId}`, { state: { fineAmount: res.data.fineAmount } });
//       } else {
//         alert('Return completed');
//         setIssueRecord(null);
//         setSerialNo('');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Return failed');
//     }
//   };

//   return (
//     <div className="col-md-8">
//       <h4>Return Book</h4>
//       <Alerts message={error} />
//       <div className="mb-3">
//         <label>Serial No</label>
//         <input value={serialNo} onChange={e=>setSerialNo(e.target.value)} className="form-control" />
//       </div>
//       <div className="mb-3">
//         <button className="btn btn-outline-primary me-2" onClick={handleFind}>Find Issue</button>
//       </div>

//       {issueRecord && (
//         <form onSubmit={submitReturn}>
//           <div className="mb-2"><strong>Book:</strong> {issueRecord.book?.title} - {issueRecord.book?.author}</div>
//           <div className="mb-2"><strong>Issued On:</strong> {new Date(issueRecord.issueDate).toLocaleDateString()}</div>
//           <div className="mb-3">
//             <label>Return Date</label>
//             <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" className="form-control" />
//           </div>
//           <div className="form-check mb-2">
//             <input type="checkbox" checked={paidFine} onChange={e=>setPaidFine(e.target.checked)} className="form-check-input" id="paidFine" />
//             <label className="form-check-label" htmlFor="paidFine">Fine Paid</label>
//           </div>
//           <div className="form-check mb-3">
//             <input type="checkbox" checked={confirmReturn} onChange={e=>setConfirmReturn(e.target.checked)} className="form-check-input" id="confirmReturn" />
//             <label className="form-check-label" htmlFor="confirmReturn">Confirm (will go to Pay Fine page if required)</label>
//           </div>
//           <div className="mb-3">
//             <label>Remarks</label>
//             <input value={remarks} onChange={e=>setRemarks(e.target.value)} className="form-control" />
//           </div>
//           <button className="btn btn-success">Return Book</button>
//         </form>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Alerts from '../components/Alerts';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ReturnBook() {
const loc = useLocation();
const preSerial = loc.state?.serialNo || '';
const [serialNo, setSerialNo] = useState(preSerial);
const [transactionId, setTransactionId] = useState('');
const [issueRecord, setIssueRecord] = useState(null);
const [returnDate, setReturnDate] = useState('');
const [remarks, setRemarks] = useState('');
const [paidFine, setPaidFine] = useState(false);
const [confirmReturn, setConfirmReturn] = useState(false);
const [error, setError] = useState(null);
const navigate = useNavigate();


const formatDate = (dateStr) => {
const d = new Date(dateStr);
const day = String(d.getDate()).padStart(2, '0');
const month = String(d.getMonth() + 1).padStart(2, '0');
const year = d.getFullYear();
return `${day}/${month}/${year}`;
};

useEffect(() => {
const today = new Date().toISOString().slice(0, 10);
setReturnDate(today);
}, []);

const fetchTransactionBySerial = async () => {
setError(null);
try {
const resAll = await api.get('/transactions');
const list = resAll.data;
const t = list.find(tr => tr.book?.serialNo === serialNo && !tr.returned) || null;
if (!t) return setError('No active issue found for this serial');


  setIssueRecord(t);
  setTransactionId(t._id);

  
  const defaultReturn = t.returnDate 
    ? new Date(t.returnDate).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);
  setReturnDate(defaultReturn);
} catch (err) {
  setError('Could not fetch transaction');
}


};

const handleFind = async () => fetchTransactionBySerial();

const submitReturn = async (e) => {
e.preventDefault();
setError(null);
if (!transactionId) return setError('Select a transaction to return');



const issuedOn = new Date(issueRecord.issueDate);
const maxReturn = new Date(issuedOn);
maxReturn.setDate(maxReturn.getDate() + 15);
if (new Date(returnDate) > maxReturn) {
  return setError(`Return date cannot be after ${formatDate(maxReturn)}`);
}

try {
  const res = await api.post('/transactions/return', {
    transactionId,
    returnDate,
    confirmReturn,
    finePaid: paidFine,
    remarks
  });
  if (res.data.requiresPayment) {
    navigate(`/pay-fine/${transactionId}`, { state: { fineAmount: res.data.fineAmount } });
  } else {
    alert('Return completed');
    setIssueRecord(null);
    setSerialNo('');
  }
} catch (err) {
  setError(err.response?.data?.message || 'Return failed');
}


};

return ( <div className="col-md-8"> <h4>Return Book</h4> <Alerts message={error} /> <div className="mb-3"> <label>Serial No</label>
<input value={serialNo} onChange={e => setSerialNo(e.target.value)} className="form-control" /> </div> <div className="mb-3"> <button className="btn btn-outline-primary me-2" onClick={handleFind}>Find Issue</button> </div>

```
  {issueRecord && (
    <form onSubmit={submitReturn}>
      <div className="mb-2"><strong>Book:</strong> {issueRecord.book?.title} - {issueRecord.book?.author}</div>
      <div className="mb-2"><strong>Issued On:</strong> {formatDate(issueRecord.issueDate)}</div>
      <div className="mb-3">
        <label>Return Date</label>
        <input value={returnDate} onChange={e => setReturnDate(e.target.value)} type="date" className="form-control" />
      </div>
      <div className="form-check mb-2">
        <input type="checkbox" checked={paidFine} onChange={e => setPaidFine(e.target.checked)} className="form-check-input" id="paidFine" />
        <label className="form-check-label" htmlFor="paidFine">Fine Paid</label>
      </div>
      <div className="form-check mb-3">
        <input type="checkbox" checked={confirmReturn} onChange={e => setConfirmReturn(e.target.checked)} className="form-check-input" id="confirmReturn" />
        <label className="form-check-label" htmlFor="confirmReturn">Confirm (will go to Pay Fine page if required)</label>
      </div>
      <div className="mb-3">
        <label>Remarks</label>
        <input value={remarks} onChange={e => setRemarks(e.target.value)} className="form-control" />
      </div>
      <button className="btn btn-success">Return Book</button>
    </form>
  )}
</div>


);
}
