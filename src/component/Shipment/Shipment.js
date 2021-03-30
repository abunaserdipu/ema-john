import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { userContext } from "../../App";
import "./shipment.css";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: data,
      orderTime: new Date(),
    };
    fetch("http://localhost:5000/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("your order place successfully");
        }
      });
  };

  console.log(watch("example"));

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        defaultValue={loggedInUser.name}
        ref={register({ required: true })}
        placeholder="Your Name"
      />
      {errors.exampleRequired && (
        <span className="error">Name is required</span>
      )}

      <input
        name="email"
        defaultValue={loggedInUser.email}
        ref={register({ required: true })}
        placeholder="Your Email"
      />
      {errors.exampleRequired && (
        <span className="error">Email is required</span>
      )}

      <input
        name="address"
        ref={register({ required: true })}
        placeholder="Your Address"
      />
      {errors.exampleRequired && (
        <span className="error">Address is required</span>
      )}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
