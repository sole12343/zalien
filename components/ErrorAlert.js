import { useState, useEffect } from "react";

const ErrorAlert = ({ message }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAlertClick = () => {
    setShowAlert(false);
  };

  return (
    showAlert && (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        onClick={handleAlertClick}
      >
        <div className="bg-red-500 text-white px-6 py-4 rounded-md shadow-lg">
          <p>{message}</p>
        </div>
      </div>
    )
  );
};

export default ErrorAlert;
