
import React,{useEffect,useState} from 'react';
import api from '../api/axios';

export default function Admin(){
 const [loads,setLoads]=useState([]);

 useEffect(()=>{api.get('/load/admin').then(r=>setLoads(r.data));},[]);

 const del=async(id)=>{
  await api.delete('/load/'+id);
  setLoads(loads.filter(l=>l._id!==id));
 };

 return <div className="container mt-5">
  <h2>Admin Panel</h2>
  {loads.map(l=>
   <div key={l._id} className="card p-2 mt-2">
    {l.origin} → {l.destination}
    <button className="btn btn-danger" onClick={()=>del(l._id)}>Delete</button>
   </div>
  )}
 </div>
}
