import React from 'react';
import { Link } from 'react-router-dom';

import './App.css'

function UsingStencilDirectly() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedSymbol, setSelectedSymbol] = React.useState('')

  const sideDrawerRef = React.useRef<HTMLElement>()
  const stockFinderRef = React.useRef<HTMLElement>()

  const closeDrawer = React.useCallback(() => {
    console.log('pure listener')
    setIsOpen(false)
  }, [])

  const showSelectedSymbol = React.useCallback((selectedSymbol: string) => {
    console.log(selectedSymbol)
    setSelectedSymbol(selectedSymbol)
  }, [])

  React.useEffect(() => {
    const onSymbolSelected = (event: Event) => showSelectedSymbol((event as CustomEvent).detail)

    sideDrawerRef.current?.addEventListener('closeDrawer', closeDrawer)
    stockFinderRef.current?.addEventListener('symbolSelected', onSymbolSelected)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sideDrawerRef.current?.removeEventListener('closeDrawer', closeDrawer)    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      stockFinderRef.current?.removeEventListener('symbolSelected', onSymbolSelected)
    }
  }, [closeDrawer, showSelectedSymbol])

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>Using WebComponents directly</h1>

      <button 
        type="button"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open Side Drawer
      </button>

      <rar-side-drawer 
        ref={sideDrawerRef}
        title="Menu Directly using"
        opened={isOpen}
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
      </rar-side-drawer>

      <p>Selected symbol: {selectedSymbol}</p>
      <rar-stock-finder 
        ref={stockFinderRef}
      ></rar-stock-finder>

      <br />

      <rar-stock-price></rar-stock-price>
    </div>
  );
}

export default UsingStencilDirectly;
