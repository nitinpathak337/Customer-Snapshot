import React, { useEffect, useState } from 'react';
import { ICustomer, PhotoModel } from '../types';
import "../App.css";

interface CustomerDetailsProps {
  customer: ICustomer | null;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<PhotoModel[]>([]);
  const [pageNo,setPageNo]=useState<number>(1);

   //fetching the images initially for one time 
   useEffect(()=>{
    fetchNewPhotos().then(newPhotos => {
        setPhotos(newPhotos);
        setPageNo(prevPage => prevPage + 1);
      });
  },[])

  //fetching the images after every 10 seconds
  useEffect(() => {
    if (customer) {

      const interval = setInterval(() => {
        fetchNewPhotos().then(newPhotos => {setPhotos(newPhotos); 
          setPageNo((prev)=>prev+1);
        })
      }, 10000);

     
      return () => clearInterval(interval);//clearing interval if customer changes and restarting the timer 
    }
  }, [customer,pageNo]);

 

  const fetchNewPhotos = async () => {
    try{
    const response = await fetch(`https://api.unsplash.com/photos/?per_page=9&page=${pageNo}`,{
      headers: {Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`}
    })

    if(response.status === 403){
      alert("Rate limit exceeds, try after one hour") // special case to handle rate limit exceed error as unsplash allows 50 requests per hour
    }
    const images = await response.json();
    
    return images
  }catch(e){
    alert(e); // can be replaced with a snackbar error alert
  }
  };

  if(!customer){
    return <p>Customer not found , try reloading the app</p>
  }


  const getFullAddress=():string=>{
    return `${customer.address.street}, ${customer.address.city}, ${customer.address.state} ${customer.address.zipcode}`
  }

  return (
    <div className="customer-details">
      <h2>{customer.name}</h2>
      <p>Email: {customer.email}</p>
      <p>Username: {customer.username}</p>
      <p>Address: {getFullAddress()}</p>
      {/*dummy title*/}
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <div className="photo-grid">
        {photos && photos.map((photo:PhotoModel, index:number) => (
          <img key={index} src={photo?.urls.small} alt={photo.alt_description} />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
