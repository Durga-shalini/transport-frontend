
import React,{useEffect,useState} from 'react';
import api from '../api/axios';

export default function Transporter(){
 const [loads,setLoads]=useState([]);

 useEffect(()=>{api.get('/load/available').then(r=>setLoads(r.data));},[]);

 return <div className="container mt-5">
  <h2>Available Loads</h2>
  {loads.map(l=><div key={l._id}>{l.origin} → {l.destination}</div>)}
 </div>
}
