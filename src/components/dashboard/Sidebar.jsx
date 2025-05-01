const Sidebar = ({ activeTab, setActiveTab }) => {
    const tabs = [
      { id: 'overview', name: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { id: 'products', name: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
      { id: 'chat', name: 'Chat', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' }
    ];
    
    return (
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="px-6 pt-8 pb-6">
          <h1 className="text-2xl font-bold">ShoeStore</h1>
          <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } group flex items-center px-3 py-3 text-sm font-medium rounded-md w-full`}
              onClick={() => setActiveTab(tab.id)}
            >
              <svg
                className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.name}
            </button>
          ))}
        </nav>
        
        <div className="px-6 py-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                className="h-10 w-10 rounded-full" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User avatar" 
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs font-medium text-gray-400">admin@shoestore.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  