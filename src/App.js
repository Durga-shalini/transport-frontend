
import Login from './pages/Login';
import Admin from './pages/Admin';
import BuySell from './pages/BuySell';
import Transporter from './pages/Transporter';
import CreateLoad from './pages/CreateLoad';
import getRole from './utils/getRole';

export default function App(){
 const token=localStorage.getItem('token');
 const role=getRole();

 if(!token) return <Login/>;

 return <>
  <CreateLoad/>
  {role==='ADMIN' && <Admin/>}
  {role==='BUYSELL' && <BuySell/>}
  {role==='TRANSPORTER' && <Transporter/>}
 </>;
}
