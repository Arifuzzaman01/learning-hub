import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import LoadingSpinner from "../../common/LoadingSpinner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  console.log(id);
  const { data: session ={}, isLoading } = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/session/${id}`);
      return data.session;
    },
  });
  // console.log(session);
  if (isLoading) return <LoadingSpinner />;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm session={session} />
    </Elements>
  );
};

export default Payment;
