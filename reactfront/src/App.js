import logo from './logo.svg';
import './App.css';
import CompShowBlogs from './blog/ShowBlogs.js';
import CompCreateBlog from './blog/CreateBlog.js';
import CompEditBlog from './blog/EditBlog.js';
import CompRegister from './blog/loggin.js';
import CompLogin from './blog/Acceso.js';
import CompMainPage from './blog/MainPage.js';
import ProtectedRoute from './blog/ProtectedRouter.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/acceso' element={<CompLogin />} />
          <Route path='/loggin' element={<CompRegister />} />
          <Route path='/' element={<CompMainPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/blogs' element={<CompShowBlogs />} />
            <Route path='/create' element={<CompCreateBlog />} />
            <Route path='/edit/:id' element={<CompEditBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
