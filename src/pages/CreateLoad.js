
import React,{useState} from 'react';
import api from '../api/axios';

export default function CreateLoad(){
 const [f,setF]=useState({});

 const submit=async()=>{
  await api.post('/load',f);
  alert('Created');
 };

 return <div className="container mt-5">
  <h3>Create Load</h3>
  <input placeholder="Origin" className="form-control" onChange={e=>setF({...f,origin:e.target.value})}/>
  <input placeholder="Destination" className="form-control mt-2" onChange={e=>setF({...f,destination:e.target.value})}/>
  <button className="btn btn-success mt-2" onClick={submit}>Create</button>
 </div>
}
