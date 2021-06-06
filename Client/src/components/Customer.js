import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

export default function Customer() {
  const [customer, setCustomer] = useState([]);
  async function getCustomers() {
    const getCustomersRes = await axios.get("http://localhost:5000/customer/");
    setCustomer(getCustomersRes.data);
  }

  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <div>
      <CustomerForm getCustomers={getCustomers} />
      <CustomerList customer={customer} />
    </div>
  );
}
