// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Typography, message } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;
const { Title, Text } = Typography;
const Dashboard: React.FC = () => {
const navigate = useNavigate();
const [user, setUser] = useState<{ name: string } | null>(null);

 useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      // If no user data, redirect to login page
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
      message.success(`Login successful! Welcome, ${JSON.parse(userData).name}`);
    }
  }, [navigate]);

  const onMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      sessionStorage.removeItem('user');
      navigate('/login');
    }
    // Handle other menu keys as needed
  };



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" style={{ color: 'white', padding: '16px', textAlign: 'center', fontWeight: 'bold' }}>
          PetSync CRM
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          onClick={onMenuClick}
          items={[
            { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
            { key: 'clients', icon: <UserOutlined />, label: 'Clients' },
            { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
            { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Dashboard
          </Title>
          <Text strong>Welcome, {user?.name || 'User'}</Text>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              background: '#fff',
              minHeight: 360,
              textAlign: 'center',
            }}
          >
            {/* Your dashboard content here */}
            <Title level={2}>Hello, {user?.name || 'User'}!</Title>
            <p>Here is your CRM dashboard. Customize it with charts, tables, and more.</p>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© 2025 PetSync CRM</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

