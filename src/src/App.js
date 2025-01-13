import {Routes, Route} from 'react-router-dom'
import './App.scss';
import Nav from './componenets/Nav';
import Footer from './componenets/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AccessTokenProvider } from './componenets/AccessTokenContext'; 
import QuickButton from './componenets/QuickButton';
import UploadPage from './componenets/UploadPage';
import { createContext, useState } from 'react';
import data from './data/datafresh';

import ProductPage from './componenets/ProductPage';



const DataContext=createContext();

function App() {

  let [petData]=useState(data);
  console.log(petData)
  return (
    <AccessTokenProvider>
      <DataContext.Provider value={{petData}}>
        <div className="App">
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about/:id" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/uploadpage" element={<UploadPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
            </Routes>
            <Footer />
            <QuickButton />
        </div>
      </DataContext.Provider>
    </AccessTokenProvider>
  );
}

export default App;
export {DataContext}
