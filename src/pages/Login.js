
import React,{useState} from 'react';
import api from '../api/axios';

export default function Login(){
 const [mobile,setMobile]=useState('');
 const [role,setRole]=useState('BUYSELL');

 const login=async()=>{
  const res=await api.post('/auth/login',{mobile,role});
  localStorage.setItem('token',res.data.token);
  window.location.reload();
 };

 return <div className="container mt-5">
  <h2>Login</h2>
  <input className="form-control" placeholder="Mobile" onChange={e=>setMobile(e.target.value)} />
  <select className="form-control mt-2" onChange={e=>setRole(e.target.value)}>
   <option value="BUYSELL">BuySell</option>
   <option value="TRANSPORTER">Transporter</option>
   <option value="ADMIN">Admin</option>
  </select>
  <button className="btn btn-primary mt-2" onClick={login}>Login</button>
 </div>
}
