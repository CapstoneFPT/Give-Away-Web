import { notification, Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProcessPayment = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(true);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const paymentStatus = params.get('paymentstatus');
		const message = params.get('message');

		if (paymentStatus === 'success') {
			notification.success({
				message: 'Payment successful',
				description: message,
				duration: 3000
			});
		} else if (paymentStatus === 'error') {
			notification.error({
				message: 'Payment failed',
				description: message,
				duration: 3000
			});
		}

		const timer = setTimeout(() => {
			setIsProcessing(false);
			navigate("/");
		}, 3000);

		return () => clearTimeout(timer);
	}, [location, navigate]);

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
			backgroundColor: '#f0f2f5',
		}}>
			<h1>Processing Payment</h1>
			<Spin size="large" />
			<p style={{ marginTop: '20px' }}>
				{isProcessing ? "Please wait while we process your payment..." : "Redirecting to homepage..."}
			</p>
		</div>
	);
};

export default ProcessPayment;