import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Home';
import UsingStencilByReactWrapper from './UsingStencilByReactWrapper';
import UsingStencilDirectly from './UsingStencilDirectly';

const AppRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="directly" element={<UsingStencilDirectly />} />
            <Route path="byWrapper" element={<UsingStencilByReactWrapper />} />
        </Routes>
      </BrowserRouter>
  );
};

export default AppRoutes;
