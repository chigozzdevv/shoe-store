import { useState } from 'react';
import Sidebar from './Sidebar';
import Overview from './Overview';
import Products from './Products';
import Chat from './Chat';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'products' && <Products />}
        {activeTab === 'chat' && <Chat />}
      </div>
    </div>
  );
};

export default Dashboard;