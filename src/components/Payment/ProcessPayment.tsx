import { notification } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProcessPayment = () => {
const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get('paymentstatus');
    const message = params.get('message');

if (paymentStatus == 'success') {
    notification.success({
        message: 'Payment successful',
        description: message,
        duration: 3000
    })
} else if (paymentStatus == 'failed') {
    notification.error({
        message: 'Payment failed',
        description: message,
        duration: 3000
    })
}

 setTimeout(() => navigate("/"), 2000);
}, [location, navigate]);

    return (
        <div>
            <h1>Process Payment</h1>
        </div>
    )
}

export default ProcessPayment;