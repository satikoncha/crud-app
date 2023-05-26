import './App.css';
import TableComponent from './components/Table';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Rootlayout from './components/Rootlayout';
import AddComponent from './components/AddComponent';
import UpdateComponent from './components/UpdateComponent';

function App() {
  const routes = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Rootlayout />}>
      <Route index element={<TableComponent />}></Route>
      <Route path="add" element={<AddComponent />}></Route>
      <Route path="update/:id" element={<UpdateComponent />}></Route>
    </Route>
  ))
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center">Here you create, update, delete below records</h1>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
