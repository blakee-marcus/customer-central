import React from 'react';
import { Link } from 'react-router-dom';
import { randomColor } from '../../utils/randomColor';

const CustomerList = ({ customers }) => {
  if (!customers.length) {
    return <h3>No Customers Yet</h3>;
  }

  return (
    <div className='customer-list-container'>
      <p>Customers ({customers.length})</p>
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
