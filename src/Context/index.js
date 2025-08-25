import React, { createContext, useState, useEffect } from 'react';
import { userData } from '../localStorage';

export const InmobiliariaContext = createContext();

const API_KEY = process.env.REACT_APP_GOOGLE_TRASLATION; // Reemplázalo con tu API Key

const InmobiliariaProvider = ({ children }) => {
    const [idioma, setIdioma] = useState("es");
    //estado data usuario logeado, por eso null es un objeto
    const [userLog, setUserLog] = useState(null);
    //estado para login
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    //estado nombre admin logeado
    const [nombreUser, setNombreUser] = useState('');
    //estado para menú hamburguesa
    const [ isOpenModalVideo, setisOpenModalVideo ] = useState(false);
    
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
      setIsAuthenticated(false);
  };
  const handleIsOpen = () => {
      setisOpenModalVideo(true);
  }
  const handleIsClose = () => {
      setisOpenModalVideo(false);
  }
    // Función para traducir **toda la web**
    const traducirPagina = async (nuevoIdioma) => {
        try {
          setIdioma(nuevoIdioma);
      
          const elementos = document.querySelectorAll("[data-translate]");
          const textosOriginales = Array.from(elementos).map((el) => el.innerText);
      
          const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                q: textosOriginales,
                target: nuevoIdioma,
                format: "text", // Asegura que la API devuelva solo texto
              }),
            }
          );
      
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
      
          const data = await response.json();
      
          if (!data.data || !data.data.translations) {
            throw new Error("Estructura de respuesta inesperada");
          }
      
          const traducciones = data.data.translations.map((t) => t.translatedText);
      
          // Aplicamos la traducción a cada elemento en la web
          elementos.forEach((el, index) => {
            el.innerText = traducciones[index];
          });
      
        } catch (error) {
          console.error("Error al traducir:", error);
        }
    };

    //efecto para el login
    useEffect(()=>{
      const userLogin = userData(); 
      if(userLogin){
          setUserLog(userLogin);
          setIsAuthenticated(true);
          setNombreUser(userLogin.user);
      }
    }, []);

    return (
      <InmobiliariaContext.Provider
        value={{
          idioma,
          setIdioma,
          traducirPagina,
          userLog,
          setUserLog,
          isAuthenticated,
          nombreUser,
          login,
          logout,
          isOpenModalVideo,
          handleIsOpen,
          handleIsClose,
        }}>
        {children}
      </InmobiliariaContext.Provider>
    );
};

export default InmobiliariaProvider;
