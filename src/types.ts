export interface ICustomer {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
  }

  interface IAddress{
    city:string;
    state:string;
    street:string;
    zipcode:string;
  }

export interface PhotoModel{
  alt_description:string;
  urls:{
    small:string;
  }
  //...other fields can also be included as per response
} 