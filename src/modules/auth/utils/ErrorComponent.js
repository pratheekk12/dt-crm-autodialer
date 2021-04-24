import React from 'react';

export default function ErrorComponent(props) {
  return (
    <div
      style={{
        background: '#feddd7',
        color: '#666',
        borderRadius: '.125rem',
        border: '1px solid #f8b5b4',
        padding: '10px'
      }}
    >
      <p className="mb-0">
        {!props.message
          ? 'Sorry! Some Error Occured, Please try again.'
          : props.message}
      </p>
    </div>
  );
}
