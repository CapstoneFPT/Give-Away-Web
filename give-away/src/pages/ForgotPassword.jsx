import React from 'react'
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import ConfirmPassword from './ConfirmPassword';


const ForgotPassword = () => {
 
  const styles = {

    inputContainer: {
      width: '80%',
      justifyContent: 'center',
      marginBottom: '40px',
      marginLeft: '80px'
    },
   
    buttonSendModalLayout: {
      textAlign: 'center',
      backgroundColor: '#000000',
      color: 'white',
      width: '20%'

    },
    fogotPasswordTitle: {
      fontSize: '40px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '10px'
    },
    
  };
  return (
    <>


      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <Card bordered={false}


          style={{
            width: 700,
            marginTop: "30px",
            justifyContent: 'center'
          }}>
          <h2 style={styles.fogotPasswordTitle}>Give Away</h2>
          <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#a19696' }}>Forgot password</h3>
          

          <div style={styles.inputContainer}>
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"

            />
          </div>
          

          <div style={{ textAlign: 'center' }} >
            <Link to ="/confirmPassword">
              <Button style={styles.buttonSendModalLayout}>Send</Button>
            </Link>
          </div>



        </Card>
      </div>

    </>
  )
}

export default ForgotPassword