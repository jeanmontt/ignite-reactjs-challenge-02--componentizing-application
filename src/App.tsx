import { NavigationContextProvider } from './contexts/NavigationContext';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <NavigationContextProvider>
        <SideBar />
        <Content />
      </NavigationContextProvider>
    </div>
  )
}