// import React from 'react'
// import { useState } from 'react';
// import { Button, Modal} from 'antd';
// import { UserOutlined, EyeOutlined, EyeInvisibleOutlined   } from '@ant-design/icons';
// import { Input } from 'antd';


// const Login = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };
//   const styles ={
//     buttonLogin: {
//       backgroundColor: '#d3d3d3',
//       color: 'black', 
//       border: '2px solid black',
//       padding: '10px 20px',
//       fontSize: '16px', 
//       width: '120px', 
//       height: '40px', 
//       border: '20px',
//       fontFamily: 'Arial, sans-serif'
//     },
//     modalLogin: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     inputContainer: {
//       width: '100%',
//       textAlign: 'center',
//       marginBottom: '10px'
//     }
//   }
//   return (
//     <>
//     <Button style={styles.buttonLogin} type="primary" onClick={showModal}>
//         Login
//       </Button>
//       <Modal style={styles.modalLogin} title="Login" open={isModalOpen}  onOk={handleOk} onCancel={handleCancel}>
//       <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
//         <br />
//         <br />
//         <Input
//           type={isPasswordVisible ? 'text' : 'password'}
//           size="large"
//           placeholder="Password"
//           prefix={isPasswordVisible ? <EyeInvisibleOutlined onClick={togglePasswordVisibility} /> : <EyeOutlined onClick={togglePasswordVisibility} />}
//         />
//         <br />
//         <br />

//       </Modal>
//     </>
//   );

// }

// export default Login

import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { UserOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Link } from 'antd';

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const styles = {
    buttonLogin: {
      backgroundColor: '#000000',
      color: 'white',
      border: '2px solid black',
      padding: '10px 20px',
      fontSize: '16px',
      width: '120px',
      height: '40px',
      fontFamily: 'Arial, sans-serif'
     
      
    },
    modalLogin: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputContainer: {
      width: '90%',
      textAlign: 'center',
      marginBottom: '40px',
      marginLeft:'25px'
    },
    loginTitle: {
      fontSize: '40px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '10px'
    },
    buttonLoginModalLayout:{
      textAlign: 'center',
      color: '#434040'
      
    },
    buttonLoginModal:{
      color: '#434040'
    }
    
   

  };

  return (
    <>
      <Button style={styles.buttonLogin} type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal
        title=""
        centered
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600} 
        
        
      >
        <div style={{height:"500px"}}>
        <h2 style={styles.loginTitle}>Give Away</h2>
        <h3 style={{textAlign:'center', marginBottom:'30px'}}>Login with your email & password</h3>
        <div style={styles.inputContainer}>
          <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
        </div>
        <div style={styles.inputContainer}>
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            size="large"
            placeholder="Password"
            prefix={isPasswordVisible ? <EyeInvisibleOutlined onClick={togglePasswordVisibility} /> : <EyeOutlined onClick={togglePasswordVisibility} />}
          />
        </div>
        <div style={styles.buttonLoginModalLayout}>
            <Button style={{color:'434040'}} > Login </Button>
        </div>
        <div>Do you have accont?
           <div>
              ------Register now------
            </div> 
           </div>
        </div>
      </Modal>
    </>
  );
}

export default Login;
