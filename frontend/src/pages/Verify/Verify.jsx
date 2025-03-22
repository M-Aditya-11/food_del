import React, { useEffect, useContext } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const verify = () => {

  const [searchParams,setSearchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const {url} = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () =>{
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId });
      console.log('Response:', response);
  
      if (response.data.success) { // Staart here
        navigate('/myorders'); 
      } else {
        navigate('/');
        console.log('Verification failed:', response.data.message);
      }
    } catch (error) {
      navigate('/');
      console.error('Error verifying payment:', error);
    }
  }

  useEffect(()=>{
    verifyPayment();
  },[])

  return (
    <div className='verify'>
      <div className="spinner">
        
      </div>
    </div>
  )
}

export default verify