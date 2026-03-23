export const validateMobile = (mobile) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
};

export const validateOTP = (otp) => {
  return otp.length === 6;
};

export const validateLoad = (form) => {

  if (!form.origin?.trim()) return "Origin is required";

  if (!form.destination?.trim()) return "Destination is required";

  if (!form.date) return "Date is required";

  if (!form.material?.trim()) return "Material is required";

  if (!form.weight || isNaN(form.weight) || Number(form.weight) <= 0) {
    return "Valid weight required";
  }

  if (!form.price || isNaN(form.price) || Number(form.price) <= 0) {
    return "Valid price required";
  }

  return null;
};