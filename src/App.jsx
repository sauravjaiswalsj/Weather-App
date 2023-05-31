import './App.css';
import Weather from './Component/weather';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Weather />
      </QueryClientProvider>
    </>
  )
}

export default App
