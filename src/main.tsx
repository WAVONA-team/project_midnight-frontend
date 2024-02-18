import ReactDOM from 'react-dom/client';

import { Root } from './Root.tsx';
import { AuthProvider } from './components/AuthProvider/AuthProvider.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Root />
  </AuthProvider>,
);
