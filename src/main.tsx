import { createRoot } from 'react-dom/client';

import '@/i18n';

import { Root } from './Root.tsx';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<Root />);
