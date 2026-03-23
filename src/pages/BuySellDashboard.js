import { useEffect, useState } from 'react';
import api from '../api/axios';
import LoadCard from '../components/LoadCard';

export default function BuySellDashboard() {
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/load')
      .then(res => {
        const data = res.data?.data || res.data || [];
        setLoads(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Error fetching loads:', err);
        setLoads([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h5>Loading...</h5>;
  }

  if (!loads || loads.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h4>No Loads Available</h4>
        <p>Create a new load to get started </p>
      </div>
    );
  }

  return (
    <div>
      {loads.map(l => (
        <LoadCard key={l._id} load={l} />
      ))}
    </div>
  );
}