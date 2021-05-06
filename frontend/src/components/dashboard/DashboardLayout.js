import React from 'react';
import SideBar from './DashbaordLayout/SideBar';

const DashboardLayout = ({ children }) => {
  return (
    <div class='wrapper'>
      <SideBar />
      <div id='content'>{children}</div>
    </div>
  );
};

export default DashboardLayout;
