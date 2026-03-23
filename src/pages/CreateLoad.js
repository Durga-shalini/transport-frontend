import { useState } from 'react';
import api from '../api/axios';
import { showError, showSuccess } from '../utils/toast';
import { validateLoad } from '../utils/validation';

export default function CreateLoad() {

  const [form, setForm] = useState({
    origin: '',
    destination: '',
    date: '',
    material: '',
    weight: '',
    price: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const submit = async () => {

    const error = validateLoad(form);

    if (error) {
      return showError(error);
    }

    try {
      setLoading(true);

      await api.post('/load', {
        ...form,
        weight: Number(form.weight),
        price: Number(form.price)
      });

      showSuccess("Load Created Successfully 🚛");

      // reset form
      setForm({
        origin: '',
        destination: '',
        date: '',
        material: '',
        weight: '',
        price: ''
      });

    } catch (err) {
      showError(err.response?.data || "Failed to create load");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-modern p-4 bg-white mb-4">

      <h5 className="mb-3">Create Load</h5>

      <div className="row">

        {/* Origin */}
        <div className="col-md-6 mb-3">
          <input
            placeholder="Origin"
            className="form-control"
            value={form.origin}
            onChange={e => handleChange('origin', e.target.value)}
          />
        </div>

        {/* Destination */}
        <div className="col-md-6 mb-3">
          <input
            placeholder="Destination"
            className="form-control"
            value={form.destination}
            onChange={e => handleChange('destination', e.target.value)}
          />
        </div>

        {/* Date */}
        <div className="col-md-6 mb-3">
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={e => handleChange('date', e.target.value)}
          />
        </div>

        {/* Material */}
        <div className="col-md-6 mb-3">
          <input
            placeholder="Material"
            className="form-control"
            value={form.material}
            onChange={e => handleChange('material', e.target.value)}
          />
        </div>

        {/* Weight */}
        <div className="col-md-6 mb-3">
          <input
            placeholder="Weight (tons)"
            className="form-control"
            value={form.weight}
            onChange={e =>
              handleChange('weight', e.target.value.replace(/\D/g, ''))
            }
          />
        </div>

        {/* Price */}
        <div className="col-md-6 mb-3">
          <input
            placeholder="Price (₹)"
            className="form-control"
            value={form.price}
            onChange={e =>
              handleChange('price', e.target.value.replace(/\D/g, ''))
            }
          />
        </div>

      </div>

      <button
        className="btn btn-success"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Load"}
      </button>

    </div>
  );
}