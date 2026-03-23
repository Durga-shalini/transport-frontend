import { useState } from 'react';
import api from '../api/axios';
import { showError, showSuccess } from '../utils/toast';
import { validateMobile, validateOTP } from '../utils/validation';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('BUYSELL');
  const [loading, setLoading] = useState(false);

  const roleConfig = {
    BUYSELL: { title: "Buy/Sell Login", color: "primary" },
    TRANSPORTER: { title: "Transporter Login", color: "success" }
  };

  const current = roleConfig[role];

  //  SEND OTP
  const sendOTP = async () => {
    if (!validateMobile(mobile)) {
      console.log("show error")
      return showError("Invalid mobile number");
    }
    console.log("cheksss")
    try {
      setLoading(true);
      await api.post('/auth/send-otp', { mobile, role });
      showSuccess("OTP sent successfully");
      setStep(2);
    } catch (err) {
      showError(err.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  //  VERIFY OTP
  const verifyOTP = async () => {
    if (!validateOTP(otp)) {
      return showError("Invalid OTP");
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/verify-otp', { mobile, otp, role });
      localStorage.setItem('token', res.data.token);
      showSuccess("Login Successful");
      // navigate('/create-load');

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      showError(err.response?.data || "OTP Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          role === 'BUYSELL'
            ? 'linear-gradient(135deg,#667eea,#764ba2)'
            : 'linear-gradient(135deg,#11998e,#38ef7d)'
      }}
    >

      <div className="login-card col-md-4 p-4">

        <h3 className="text-center mb-3">{current.title}</h3>

        {step === 1 && (
          <>
            <label>Select Role</label>
            <select
              className="form-control mb-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="BUYSELL">Buy/Sell</option>
              <option value="TRANSPORTER">Transporter</option>
            </select>

            <input
              className="form-control mb-3"
              placeholder="Enter Mobile Number"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <button
              className={`btn btn-${current.color} w-100`}
              onClick={sendOTP}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="form-control mb-3 text-center"
              placeholder="Enter OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              className={`btn btn-${current.color} w-100 mb-2`}
              onClick={verifyOTP}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              className="btn btn-link w-100"
              onClick={() => setStep(1)}
            >
              Change Number / Role
            </button>
          </>
        )}

      </div>
    </div>
  );
}