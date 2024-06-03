import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { apiVnpayReturn } from '../../../services/Customer/vnpay';
import { Result } from 'antd';

const PaymentResult = () => {
  const location = useLocation();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const params = {};
    for (let param of query.entries()) {
      params[param[0]] = param[1];
    }


    const verifyPayment = async () => {
      try {
        const response = await apiVnpayReturn(params)
        console.log(response)
        setStatus(response.data.code);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [location.search]);

  return (
    <div className="flex justify-center items-center bg-white  rounded-xl border-2 shadow-md w-[95%] px-4 mb-2">
      <Result
        status={status === '00' ? 'success' : 'error'}
        title={status === '00' ? 'Payment Successful' : 'Payment Failed'}
        subTitle={status === '00' ? 'Your payment has been processed successfully.' : 'Sorry, your payment failed.'}
      />
    </div>
  );
};

export default PaymentResult