import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { QUERY_CUSTOMER } from '../utils/queries';

const Customer = () => {
  const { customerId: customerParam } = useParams();

  console.log(customerParam);
  const { loading, data } = useQuery(QUERY_CUSTOMER, {
    variables: { id: customerParam },
  });

  

  if (loading) {
    return (
      <div className='container'>
        <div>Loading...</div>
        <div className='loadingio-spinner-rolling-5y2qfcr8fy'>
          <div className='ldio-lfz02bk665j'>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
  
  console.log(data);
};

export default Customer;
