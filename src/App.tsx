import React, { useEffect, useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import { ICustomer } from './types';
import './App.css';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]); 
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId) || null;

  useEffect(()=>{
    fetchUsers();
  },[])

  const fetchUsers=async ()=>{
    try{
    const response = await fetch("https://dummyapi.online/api/users");//api call for fetching customers
    const data:ICustomer[] = await response.json();
      setCustomers(data)
      setSelectedCustomerId(data[0]?.id);//initially selecting the zeroth index customer
    }catch(e){
      alert(e); // can be replaced with a snackbar error alert
    } 

  }

  return (
    <div className="app-container">
      {customers.length === 0
        || !customers
      ?(<h1>Loading...</h1>)//Can be replaced with a loader 
      :
     (<> 
      <CustomerList
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        onSelectCustomer={setSelectedCustomerId}
      />
      <CustomerDetails customer={selectedCustomer} />
      </>)}
    </div>
  );
};

export default App;
