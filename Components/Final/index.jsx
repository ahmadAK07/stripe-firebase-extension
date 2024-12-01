import React from 'react';

const Index = ({ user }) => {
  // Function to cancel subscription


  return (
    <div>
      <h1>Hey! {user && user.displayName}, you have subscribed</h1>
    </div>
  );
};

export default Index;
