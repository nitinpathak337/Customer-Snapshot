import React from 'react';
import { ICustomer } from '../types';

interface CustomerCardProps {
  customer: ICustomer;
  isSelected: boolean;
  onClick: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, isSelected, onClick }) => {
  return (
    <div
      className={`customer-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <h4>{customer.name}</h4>
      {/* dummy title*/}
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of...</p>
      
    </div>
  );
};

export default CustomerCard;
