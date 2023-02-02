import React from 'react';
import { Link } from 'react-router-dom';
import { randomColor } from '../../utils/randomColor';
import { HiUserAdd } from 'react-icons/hi'

const CustomerList = ({ customers }) => {
  if (!customers.length) {
    return (
        <section className='flex-column w-75 justify-space-between customer-list-container'>
            <div className='flex-row justify-space-between'>
                <h3>Customers ({customers.length})</h3>
                <button className='addCustomerBtn'><HiUserAdd /></button>
            </div>
            
            <ul>
                <li>
                    No Customers
                </li>
            </ul>
        </section>
    );
  }

  return (
    <div className='customer-list-container'>
      <h3>Customers ({customers.length})</h3>
      <ul>
        {customers &&
          customers.map((customer) => (
            <li>
              <Link
                to={`/customer/${customer._id}`}
                style={{ fontWeight: 700 }}
                className='customer-list-name'
              >
                <div className='initial-icon-background'>
                  <p>{customer.name.charAt(0)}</p>
                </div>

                <p
                  className='initial-icon-letter'
                  style={{ backgroundColor: randomColor }}
                >
                  {customer.name}
                </p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CustomerList;
