import React from 'react';
import { Link } from 'react-router-dom';

const CustomerList = ({ customers }) => {
  if (!customers.length) {
    return (
      <section className='flex-column w-75 justify-space-between customer-list-container'>
        <ul>
          <li>No Customers</li>
        </ul>
      </section>
    );
  }

  return (
    <section className='flex-column w-100 justify-space-between customer-list-container'>
      <ul className='px-0'>
        {customers &&
          customers.map((customer, index) => (
            <li key={index} className='mb-3'>
              <Link
                to={`/customer/${customer._id}`}
                style={{ fontWeight: 700 }}
              >
                <article className='flex-row justify-space-between customer-card'>
                  <div data-initials={customer.name.charAt(0)}></div>
                  <div className='w-25'>
                    <h4>{customer.name}</h4>
                    <p className='my-0'>{customer.email}</p>
                    <p>{customer.phone}</p>
                  </div>
                  <div className='w-25'>
                    <h4>Address:</h4>
                    <p>{customer.address}</p>
                  </div>
                  <div className='w-25'>
                    <h4>Last Contact On:</h4>
                  </div>
                </article>
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default CustomerList;