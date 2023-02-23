import React from 'react';

const CustomerCommunicationList = ({ communications }) => {
    console.log(communications);
    if (!communications.length) {
        return (
            <section className='flex-column w-75 justify-space-between customer-list-container'>
              <ul>
                <li>No Communication History</li>
              </ul>
            </section>
          );
    }

    return (
        <section className='flex-column w-100 justify-space-between customer-list-container'>
      <ul className='px-0'>
        {communications &&
          communications.map((communication, index) => (
            <li key={index} className='mb-3'>
              <article className='flex-row justify-space-between customer-card'>
                <div className='w-25'>
                  <div data-initials={communication.participants.charAt(0)}></div>
                  <h4>Contacted By:</h4>
                  <p className='mb-0'>{communication.participants}</p>
                  <p>{communication.date}</p>
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
};

export default CustomerCommunicationList;