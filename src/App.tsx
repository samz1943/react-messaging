import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes></AppRoutes>
      </BrowserRouter>
    </div>
  );
}

export default App;
