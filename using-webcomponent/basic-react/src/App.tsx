import React from 'react';

import { RarSideDrawer, RarStockFinder, RarStockPrice } from 'react-rar-webcomponents'

import './App.css';

function App() {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false)

  return (
    <div>
      <button type="button" onClick={() => setIsOpenMenu(true)}>Open Side Drawer</button>
      <RarSideDrawer 
        title="Main Menu" 
        opened={isOpenMenu} 
        onCloseDrawer={() => setIsOpenMenu(false)} 
      >
        <div slot="navigation">
          Navigation
        </div>
        <div slot="contact">
          Contact
        </div>
      </RarSideDrawer>
      
      <RarStockFinder />
      <RarStockPrice />
    </div>
  );
}

export default App;
