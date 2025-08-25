import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import InmobiliariaProvider  from './Context';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import WhatsAppButton from './Components/Botones/BotonWhastApp';
import PropsVenta from './Pages/PropsVenta';
import PropsAlquiler from './Pages/PropsAlquiler';
import Emprendimientos from './Pages/Emprendimientos';
import Contactanos from './Pages/Contactanos';
import FavoritosPage from './Pages/Favoritos';
import Footer from './Components/Footer';
import LaEmpresaPage from './Pages/LaEmpresa';
import DetalleProp from './Pages/DetallePropiedad';
import DetalleEmp from './Pages/DetalleEmprendimiento';
/* 
import NosotrosPage from './Pages/Nosotros';
import PropsInternacionales from './Pages/PropsInternacionales';

import MapaPAge from './Pages/MapaPage'; */
import './App.css';
import Tasaciones from './Components/Tasaciones';


function App() {

  const passGoogle = process.env.REACT_APP_API_GOOGLE_MAP;

  return (
    <LoadScript googleMapsApiKey={passGoogle}> {/* cambié aca por el string */}
      <InmobiliariaProvider>
        <div className="App">
          <header className="App-header">
            <Navbar/>
          </header>

          <main className='cont-main'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/ventas' element={<PropsVenta />} />
              <Route path='/alquiler' element={<PropsAlquiler />} />
              <Route path='/emprendimientos' element={<Emprendimientos />} />
              <Route path='/tasaciones' element={<Tasaciones />} />
              <Route path='/nosotros' element={<LaEmpresaPage />} />
              <Route path='/contacto' element={<Contactanos />} />
              <Route path='/detalle/:id' element={<DetalleProp />} />
              <Route path='/detalleEmp/:id' element={<DetalleEmp />} />
              <Route path='/favoritos' element={<FavoritosPage />} />
              {/* <Route path='/mapa' element={< MapaPAge/>}/> */} 
              <Route path='*' element={<Home />} />
            </Routes>
            {/* btn whatsapp */}
            {/* <WhatsAppButton /> */}
          </main>

          <footer>
            <Footer />
          </footer>

        </div>
      </InmobiliariaProvider>
    </LoadScript>
  );
}

export default App;
