import React, { useState } from 'react';
import { Card, Checkbox, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined, PhoneOutlined, FacebookOutlined, TwitterOutlined, InstagramFilled } from '@ant-design/icons';

const RuleConsign = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showConditionGuide = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card
       headStyle={{ backgroundColor: 'black', color: 'white' }}
       title='Consignment Policy'
      style={{
        border: "1px solid #aeacac",
      }}>
        <h1></h1>
        <div>
          <h3>Terms and Conditions:</h3>
          <Button
          type="link"
          onClick={showConditionGuide}
          style={{ marginLeft: '255px', color: 'black', textDecoration: 'underline' }}
        >
          <strong>Condition Guide</strong>
        </Button>
          <ul>
            <li>The items must be in good, wearable condition, clean, and free of damage.</li>
            <li>Only authentic brands are accepted. Counterfeit items will be rejected.</li>
            <li>The consignment period is 60 days. Items unsold after this period will be returned.</li>
            <li>Prices will be determined based on the item's condition, brand, and market demand.</li>
            <li>The consignor will receive 80% of the final sale price once the item is sold.</li>
            <li>Items must be dropped off at our designated locations during business hours.</li>
            <li>We reserve the right to reject items that do not meet our quality standards.</li>
            <li>All sales are final. No returns or exchanges once the item is sold.</li>
          </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Contact Us:</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li><MailOutlined style={{ marginRight: '8px' }} /> Email: info@giveaway.com</li>
            <li><PhoneOutlined style={{ marginRight: '8px' }} /> Phone: +123-456-7890</li>
            <li><FacebookOutlined style={{ marginRight: '8px' }} /> Facebook: facebook.com/consign</li>
            <li><TwitterOutlined style={{ marginRight: '8px' }} /> Twitter: https://www.twitter/consign</li>
            <li><InstagramFilled style={{ marginRight: '8px' }} /> Instagram: https://www.instagram/consign</li>
            {/* Add TikTok and other social media icons as needed */}
          </ul>
        </div>
        
      </Card>
      <Modal
        title=""
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
       
      >
        
        <h2 style={{textAlign:'center'}}>Condition Guide</h2>
        <p><strong>Never worn, with tag</strong> - A never-worn item with tag is an item which has never been worn and still has the original purchase hangtags on it (include a photo of the tag).</p> <br/>
        <p><strong>Never worn</strong> - A never-worn item without a tag is an item which has never been worn and shows no defects or alterations.</p> <br/>
        <p><strong>Very good</strong> - An item in very good condition is a second-hand item which has been only lightly used and extremely well maintained, which can show slight defects from usage. These must be mentioned in the description and visible on the photos.</p> <br/>
        <p><strong>Good</strong> - An item in good condition is a second-hand item which has been worn and well maintained. If the item has defects, they must be mentioned in the description and visible in the photos.</p> <br/>
        <p><strong>Fair</strong> - An item in fair condition is a second-hand item which has been worn frequently and shows defects (these are mentioned in the description and visible in photos).</p>
        
       
      </Modal>
    </div>
  );
};

export default RuleConsign;
