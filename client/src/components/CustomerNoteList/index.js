import React from 'react';

const CustomerNoteList = ({ notes }) => {
  if (!notes.length) {
    return (
      <section className='flex-column w-75 justify-space-between customer-list-container'>
        <ul>
          <li>No Notes</li>
        </ul>
      </section>
    );
  }

  return (
    <section className='flex-column w-100 justify-space-between customer-list-container'>
      <ul className='px-0'>
        {notes &&
          notes.map((note, index) => (
            <li key={index} className='mb-3'>
              <article className='flex-row justify-space-between customer-card'>
                <div className='w-25'>
                  <div data-initials={note.author.charAt(0)}></div>
                  <h4>Created By:</h4>
                  <p className='mb-0'>{note.author}</p>
                  <p>{note.createdAt}</p>
                </div>
                <div className='w-75'>
                  <h4>Note:</h4>
                  <p>{note.noteBody}</p>
                </div>
              </article>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default CustomerNoteList;
