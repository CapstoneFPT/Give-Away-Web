import React from 'react';
import { Card, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';

const RuleConsign = () => {
  const onChange = (e: any) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const styles = {
    layoutRule: {
      margin: '50px',
    },
    cardContent: {
      marginLeft: '30px',
    },
    header: {
      margin: '20px',
      textAlign: 'center' as const,
    },
    checkbox: {
      textAlign: 'center' as const,
      display: 'flex',
      justifyContent: 'center',
      margin: '40px',
    },
    button: {
      display: 'block',
      margin: '0 auto',
    },
  };

  return (
    <div style={styles.layoutRule}>
      <h1 style={styles.header}>Consignment Rules</h1>
      <Card style={styles.cardContent}>
        <div>
          <h3>Terms and Conditions:</h3>
          <ul>
            <li>The items must be in good, wearable condition, clean, and free of damage.</li>
            <li>Only authentic brands are accepted. Counterfeit items will be rejected.</li>
            <li>The consignment period is 60 days. Items unsold after this period will be returned.</li>
            <li>Prices will be determined based on the item's condition, brand, and market demand.</li>
            <li>The seller will receive 60% of the final sale price once the item is sold.</li>
            <li>Items must be dropped off at our designated locations during business hours.</li>
            <li>We reserve the right to reject items that do not meet our quality standards.</li>
            <li>All sales are final. No returns or exchanges once the item is sold.</li>
          </ul>
        </div>
        <Checkbox style={styles.checkbox} onChange={onChange}>
          I agree to the consignment terms and conditions
        </Checkbox>

        <Link to={'/purchasePoints'}>
          <Button style={styles.button} type="primary" disabled={!onChange}>
            Continue to Deposit
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default RuleConsign;
