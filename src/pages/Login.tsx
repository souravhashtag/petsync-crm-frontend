import React , { useState } from 'react';
import { Layout, Card, Divider, Form, Input, Button, Checkbox,message, Alert } from 'antd';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const { Header, Footer, Content } = Layout; 
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const onFinish = async (values: any) => {

    //console.log('Login success:', values);
   setErrorMsg(''); // clear previous errors
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: values.username,
        password: values.password,
      });

      console.log('Login :',response.data.success); 

      if (response.data.success) {
        message.success('Login successful!');
        // Save user data in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setErrorMsg(response.data.error || 'Login failed!');
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.error || 'Login error!');
    }
  };
  
    
 
  const handleGoogleLogin = () => {
    console.log('Redirect to Google OAuth...');
    // You can integrate Google Sign-In here
  };

  return (
    <Layout className="login-layout">
      <Header className="login-header">
        <div className="logo">🐾 PetSync</div>
      </Header>

      <Content className="login-content">
        <Card title="Login" className="login-card" bordered={false}>

        <Button
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
          className="google-login-button"
          block
        >
          Sign in with Google
        </Button>

        <Divider plain>or</Divider>

        {/* Show error alert above form */}
      {errorMsg && (
        <Alert
          style={{ marginBottom: 16 }}
          message={errorMsg}
          type="error"
          showIcon
          closable
          onClose={() => setErrorMsg('')}
        />
      )}
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>

      <Footer className="login-footer">
        © 2025 PetSync. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default Login;
