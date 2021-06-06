import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
export default function CustomerForm({ getCustomers }) {
  const [customerName, setCustomerName] = useState("");
  async function saveCutomers(e) {
    e.preventDefault();

    const customerData = {
      name: customerName,
    };
    try {
      await axios.post("http://localhost:5000/customer/", customerData);
      getCustomers();
      setCustomerName("");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='d-flex justify-content-center mt-4'>
      <form onSubmit={saveCutomers}>
        <input
          type='text'
          placeholder='Customer name'
          onChange={(e) => {
            setCustomerName(e.target.value);
          }}
          value={customerName}></input>
        <Button
          type='submit'
          variant='outline-primary'
          size='sm'
          className='p-2 m-3'>
          Save new Customer
        </Button>
      </form>
    </div>
  );
}
