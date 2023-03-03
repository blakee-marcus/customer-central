import React from 'react';

const CustomerCommunicationList = (props) => {
  if (!props.communications.length) {
    return (
      <section className='flex-column w-75 justify-space-between customer-list-container'>
        <ul>
          <li className='text-secondary'>No Communication History</li>
        </ul>
      </section>
    );
  }
  if (props.displayMode === 'Customer') {
    return (
      <section className='flex-column w-100 justify-space-between customer-list-container'>
        <ul className='px-0'>
          {props.communications &&
            props.communications.map((communication, index) => (
              <li key={index} className='mb-3'>
                <article className='flex-row justify-space-between customer-card text-primary'>
                  <div className='w-25'>
                    <div
                      data-initials={communication.participants.charAt(0)}
                    ></div>
                    <h4>Contacted By:</h4>
                    <p className='mb-0'>{communication.participants}</p>
                    <p className='text-secondary'>{communication.date}</p>
                  </div>
                  <div className='w-75'>
                    <h4>{communication.subject}:</h4>
                    <p>{communication.notes}</p>
                  </div>
                </article>
              </li>
            ))}
        </ul>
      </section>
    );
  }

  if (props.displayMode === 'User') {
    return (
      <section className='flex-column w-100 justify-space-between customer-list-container'>
        <ul className='px-0'>
          {props.communications &&
            props.communications.map((communication, index) => (
              <li key={index} className='mb-3'>
                <a href={`/customer/${communication.writtenFor._id}`}className='flex-row justify-space-between customer-card text-primary'>
                  <div className='w-25'>
                    <div
                      data-initials={communication.participants.charAt(0)}
                    ></div>
                    <h4>Customer Contacted:</h4>
                    <p className='mb-0 text-primary'>{communication.writtenFor.name}</p>
                    <p className='text-secondary'>{communication.date}</p>
                  </div>
                  <div className='w-75'>
                    <h4>{communication.subject}:</h4>
                    <p className='text-primary'>{communication.notes}</p>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </section>
    );
  }
};

export default CustomerCommunicationList;
