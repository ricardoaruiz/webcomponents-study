import React from 'react';
import { Link } from 'react-router-dom';

import { RarSideDrawer, RarStockFinder, RarStockPrice } from 'react-rar-webcomponents'

import './App.css'

const UsingStencilByReactWrapper = () => {
const [isOpen, setIsOpen] = React.useState(false)
const [selectedSymbol, setSelectedSymbol] = React.useState('')

  return (
      <div>
        <Link to="/">Back</Link>
        <h1>Using WebComponents by React Wrapper</h1>

        <button 
            type="button"
            onClick={() => setIsOpen(true)}
        >
            Open Side Drawer
        </button>

        {/* Side Drawer */}
        <RarSideDrawer 
            title="Main Using by React Wrapper"
            opened={isOpen} 
            onCloseDrawer={() => setIsOpen(false)}
        >
            <div slot="navigation">
                <ul>
                    <li>Home</li>
                    <li>Items</li>
                    <li>About</li>
                </ul>
            </div>
            <div slot="contact">
                <h2>Contact Us</h2>
                <p>Please call us...</p>
            </div>
        </RarSideDrawer>

        <p>Selected symbol: {selectedSymbol}</p>
        <RarStockFinder onSymbolSelected={(event) => setSelectedSymbol(event.detail)}/>

        <br />

        <RarStockPrice/>
    </div>);
};

export default UsingStencilByReactWrapper;
