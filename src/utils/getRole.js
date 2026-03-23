
export default function getRole(){
 const t=localStorage.getItem('token');
 if(!t) return null;
 return JSON.parse(atob(t.split('.')[1])).role;
}
