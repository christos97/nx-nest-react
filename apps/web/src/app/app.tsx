import { UiButton } from '@ntua-saas-10/web/ui';
import { env } from '@ntua-saas-10/web/utils';
import { Route, Routes, Link } from 'react-router-dom';
import './app.css';
import Auth from './pages/auth';

export function App() {
  return (
    <div>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth">Login</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/auth"
          element={
            <div>
              <Auth />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
