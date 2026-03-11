import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
import { Tracking } from './pages/Tracking';
import { B2B } from './pages/B2B';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/b2b" element={<B2B />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
