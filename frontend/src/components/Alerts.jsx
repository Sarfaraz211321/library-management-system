import React from 'react';

export default function Alerts({ message, type='danger' }){
  if (!message) return null;
  return <div className={`alert alert-${type}`}>{message}</div>;
}
