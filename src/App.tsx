import { AuthGate } from './components/AuthGate';
import { MainApp } from './MainApp';
import './App.css';

function App() {
  return (
    <AuthGate>
      <MainApp />
    </AuthGate>
  );
}

export default App;
