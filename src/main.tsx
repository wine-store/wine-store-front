import { createRoot } from 'react-dom/client';
import { Root } from './module/Root/Root';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <Root />
    </MantineProvider>
);
