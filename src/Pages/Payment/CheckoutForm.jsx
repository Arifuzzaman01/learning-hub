import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";

import "./common.css";
import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth";

const CheckoutForm = ({ session }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const {user}= useAuth()
  // console.log(session);
  // Create payment intent on mount
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { fee: 100 }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure]);

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
        toast.success("💰 Payment Successful!");
        // book now
        const bookingInfo = {
          studentEmail: user.email,
          sessionId: session._id,
          sessionTitle: session.title,
          tutorEmail: session.tutorEmail,
        };

        try {
          const res = await axiosSecure.post("/bookings", bookingInfo);
          if (res?.data?.insertedId) {
            toast.success("🎉 Session booked successfully!");
            localStorage.setItem(`booked-${session._id}`, "true");
            // setIsBooking(true);
            //   TODO: Navigate payment pages
          } else {
            toast.error("Booking failed.");
          }
        } catch (err) {
          toast.error("Something went wrong.");
        }
      }
    }
  };

  return (
    <div className="  w-5/6 sm:w-3/4 md:w-2/5 mx-auto min-h-[40vh] md:min-h-[60vh] mt-5 sm:mt-10  md:mt-20">
      <form
        onSubmit={handleSubmit}
        className="border-2 rounded-md border-gray-400"
      >
        <CardElement />
        <button
          className="btn btn-primary mt-4 w-full"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          $ {session?.fee} Pay Now
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
