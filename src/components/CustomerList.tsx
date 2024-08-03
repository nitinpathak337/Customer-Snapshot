import React from 'react';
import { ICustomer } from '../types';
import CustomerCard from './CustomerCard';
import '../App.css';

interface CustomerListProps {
  customers: ICustomer[];
  selectedCustomerId: number | null;
  onSelectCustomer: (id: number) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, selectedCustomerId, onSelectCustomer }) => {
  return (
    <div className="customer-list">
      {customers.map(customer => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          isSelected={customer.id === selectedCustomerId}
          onClick={() => onSelectCustomer(customer.id)}
        />
      ))}
    </div>
  );
};

export default CustomerList;
