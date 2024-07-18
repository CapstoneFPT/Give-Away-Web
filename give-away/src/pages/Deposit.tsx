import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';

const Deposit = () => {
  const { auctionId, itemId } = useParams<{ auctionId: string; itemId: string }>();
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleDeposit = async () => {
    try {
      const response = await axios.post('/api/deposit', {
        auctionId,
        itemId,
        amount,
      });
      if (response.status === 200) {
        message.success('Deposit successful!');
        navigate(`/auction/${auctionId}`);
      }
    } catch (error) {
      message.error('Deposit failed. Please try again.');
      console.error('Error making deposit:', error);
    }
  };

  return (
    <div style={{ width: '50%', margin: '0 auto', paddingTop: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Deposit for Auction Item</h1>
      <Form
        layout="vertical"
        onFinish={handleDeposit}
      >
        <Form.Item label="Auction ID">
          <Input value={auctionId} disabled />
        </Form.Item>
        <Form.Item label="Item ID">
          <Input value={itemId} disabled />
        </Form.Item>
        <Form.Item
          label="Deposit Amount"
          rules={[{ required: true, message: 'Please input the deposit amount!' }]}
        >
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit Deposit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Deposit;
