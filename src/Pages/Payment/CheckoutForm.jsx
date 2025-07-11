import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";


import './common.css';

const CheckoutForm = ({ session }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
// console.log(session);
  // Create payment intent on mount
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent",{fee:100})
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [ axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: session.tutorName,
            email: session.tutorEmail,
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        // ✅ Save payment info in your DB here
        console.log("💰 Payment Successful!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        className="btn btn-primary mt-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay Now
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
