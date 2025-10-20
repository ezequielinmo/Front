import React, { createContext, useState, useEffect } from 'react';
import { userData } from '../localStorage';

export const InmobiliariaContext = createContext();

const InmobiliariaProvider = ({ children }) => {
  const [userLog, setUserLog] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nombreUser, setNombreUser] = useState('');
  const [isOpenModalVideo, setisOpenModalVideo] = useState(false);

  // ✅ Inicializa favoritos leyendo directamente de localStorage una sola vez
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const favsGuardados = localStorage.getItem("favorites");
      return favsGuardados ? JSON.parse(favsGuardados) : [];
    } catch (error) {
      console.error("Error al leer favoritos del localStorage:", error);
      return [];
    }
  });

  // 🧠 Login / Logout
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  // 🎬 Modal video
  const handleIsOpen = () => setisOpenModalVideo(true);
  const handleIsClose = () => setisOpenModalVideo(false);

  // 🧍‍♂️ Cargar usuario si hay uno guardado
  useEffect(() => {
    const userLogin = userData();
    if (userLogin) {
      setUserLog(userLogin);
      setIsAuthenticated(true);
      setNombreUser(userLogin.user);
    }
  }, []);

  // 💾 Guardar favoritos en localStorage cada vez que cambian
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favoritos));
    } catch (error) {
      console.error("Error al guardar favoritos en localStorage:", error);
    }
  }, [favoritos]);

  // ❤️ Agregar o quitar favoritos
  const toggleFavorito = (prop) => {
    setFavoritos((prev) => {
      const existe = prev.find((f) => f.id === prop.id);
      if (existe) {
        return prev.filter((f) => f.id !== prop.id);
      } else {
        return [...prev, prop];
      }
    });
  };

  return (
    <InmobiliariaContext.Provider
      value={{
        userLog, setUserLog,
        isAuthenticated,
        nombreUser,
        login, logout,
        isOpenModalVideo,
        handleIsOpen, handleIsClose,
        favoritos,
        setFavoritos,
        toggleFavorito,
      }}
    >
      {children}
    </InmobiliariaContext.Provider>
  );
};

export default InmobiliariaProvider;
