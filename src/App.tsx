import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import GridOverlay from './components/GridOverlay';
import Nav from './components/Nav';
import RouteScrollManager from './components/RouteScrollManager';
import SignupModal from './components/SignupModal';
import { SignupModalProvider } from './context/SignupModal';
import BuildsPage from './pages/BuildsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <SignupModalProvider>
      <div className="appShell">
        <GridOverlay />
        <div className="appContent">
          <Nav />
          <RouteScrollManager />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builds" element={<BuildsPage />} />
          </Routes>
          <Footer />
        </div>
        <SignupModal />
      </div>
    </SignupModalProvider>
  );
}

export default App;
