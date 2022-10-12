import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss';
import Dashboard from './Dashboard';
import Table from './Table';
import Profile from './Profile';
import { TableContextProvider } from '../context/TableContext/TableContext';
import Shifts from './Shifts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard'>
          <Route index element={<Dashboard />} />
          <Route path=':id' element={<Profile />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/tables'>
          <Route index element={
            <TableContextProvider>
              <Table />
            </TableContextProvider>
          } />
        </Route>
        <Route path='/shifts'>
          <Route index element={<Shifts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
