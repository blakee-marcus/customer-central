import React from 'react';
import { Link } from 'react-router-dom';

const CustomerNoteList = (props) => {
  if (!props.notes.length) {
    return (
      <section className='flex-column w-75 justify-space-between customer-list-container'>
        <ul>
          <li className='text-secondary'>No Notes</li>
        </ul>
      </section>
    );
  }
  if (props.displayMode === 'Customer') {
    return (
      <section className='flex-column w-100 justify-space-between customer-list-container'>
        <ul className='px-0'>
          {props.notes &&
            props.notes.map((note, index) => (
              <li key={index} className='mb-3'>
                <article className='flex-row justify-space-between customer-card  text-primary'>
                  <div className='w-25'>
                    <div data-initials={note.author.charAt(0)}></div>
                    <h4>Created By:</h4>
                    <p className='mb-0'>{note.author}</p>
                    <p className='text-secondary'>{note.createdAt}</p>
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
  }
  if (props.displayMode === 'User') {
    return (
      <section className='flex-column w-100 justify-space-between customer-list-container'>
        <ul className='px-0'>
          {props.notes &&
            props.notes.map((note, index) => (
              <li key={index} className='mb-3'>
                <a href={`/customer/${note.writtenFor._id}`} className='flex-row justify-space-between customer-card  text-primary'>
                  <div className='w-25'>
                    <div data-initials={note.author.charAt(0)}></div>
                    <h4>Note For:</h4>
                    <p className='mb-0 text-primary'>{note.writtenFor.name}</p>
                    <p className='text-secondary'>{note.createdAt}</p>
                  </div>
                  <div className='w-75'>
                    <h4>Note:</h4>
                    <p className='text-primary'>{note.noteBody}</p>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </section>
    );
  }
};

export default CustomerNoteList;
