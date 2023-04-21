import { UiButton } from '@ntua-saas-10/web/ui';
import { env } from '@ntua-saas-10/web/utils';
import { Route, Routes, Link } from 'react-router-dom';
import './app.css';

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
          path="/"
          element={
            <div>
              <Link to="/auth">Click here for auth.</Link>
            </div>
          }
        />
        <Route
          path="/auth"
          element={
            <div>
              <UiButton text="UiBUtton" color="primary"/>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
