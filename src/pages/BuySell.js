
import React,{useEffect,useState} from 'react';
import api from '../api/axios';

export default function BuySell(){
 const [loads,setLoads]=useState([]);

 useEffect(()=>{api.get('/load/my').then(r=>setLoads(r.data));},[]);

 return <div className="container mt-5">
  <h2>My Loads</h2>
  {loads.map(l=><div key={l._id}>{l.origin} → {l.destination}</div>)}
 </div>
}
