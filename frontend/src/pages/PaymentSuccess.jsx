import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    const confirmPayment = async () => {
      try {
        await axios.post(
          `/orders/create-after-payment`,
          { sessionId },
          { withCredentials: true }
        );

        navigate("/orders");
      } catch (error) {
        console.error("Order creation error:", error);
        navigate("/orders");
      }
    };

    confirmPayment();
  }, [sessionId, navigate]);

  return <h2>Payment Successful! Creating your order...</h2>;
};

export default PaymentSuccess;