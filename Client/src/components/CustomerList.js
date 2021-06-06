import React from "react";

export default function CustomerList({ customer }) {
  function renderCustomers() {
    return customer.map((c, i) => {
      return <li key={i}>{c.name}</li>;
    });
  }
  return (
    <div className='d-flex justify-content-center mt-4'>
      <ul>{renderCustomers()}</ul>
    </div>
  );
}
