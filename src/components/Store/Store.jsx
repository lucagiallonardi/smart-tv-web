import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './Store.css';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';

const Store = () => {
    const [items, setItems] = useState([]);
    const [showAddedAlert, setShowAddedAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [elements, setElements] = useState([])

const token = localStorage.getItem('token');

useEffect(() => {
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.sub;
const storedElements = JSON.parse(localStorage.getItem(`installedItems_${userId}`)) || [{
    title: "Youtube",
    link: "https://www.youtube.com/",
    image: "https://i.postimg.cc/XZq7jNjh/youtube.jpg",
    installed: true,
  },
  {
    title: "Prime Video",
    link: "https://www.primevideo.com/",
    image: "https://i.postimg.cc/2bq6wkgv/prime.jpg",
    installed: true,
  },
  {
      title: "Netflix", 
      image: "https://i.postimg.cc/Z5Nj4FyV/netflix.jpg", 
      link: "https://www.netflix.com/browse",
      installed: true,
  },
  {
      title: "HBO Max", 
      image: "https://i.postimg.cc/4HVxD8fx/hbo.jpg", 
      link: "https://play.hbomax.com/signIn",
      installed: true,
  },
  {
      title: "Spotify", 
      image: "https://i.postimg.cc/BX5vNw7h/spotify.jpg", 
      link: "https://open.spotify.com/intl-es",
      installed: true,
  },
  {
      title: "Star plus", 
      image: "https://i.postimg.cc/yDV8GXw7/star.jpg", 
      link: "https://www.starplus.com/es-419/select-profile",
      installed: true,
  },
  {
      title: "Pluto TV", 
      image: "https://i.postimg.cc/4n9yH36R/plutotv.jpg", 
      link: "https://pluto.tv/es/live-tv/",
      installed: true,
  },
  {
    title:"Disney plus",
    image: "https://i.postimg.cc/pTRjNKDh/disney.jpg",
    link: "https://www.disneyplus.com/es-419/select-profile",
    installed: false,
},
  {
      title:"Youtube Music",
      image: "https://i.postimg.cc/3R8kfYT2/ytmusic.jpg",
      link: "https://music.youtube.com/",
      installed: false,
  },
  {
      title:"Twich",
      image: "https://i.postimg.cc/jjrwNy3g/twich.jpg",
      link: "https://www.twitch.tv/",
      installed: false,
  },
  {
      title: "Paramount",
      image: "https://i.postimg.cc/3NwDN7f3/paramount.jpg",
      link: "https://www.paramountplus.com/ar/account/signin/",
      installed: false,
  },
  {
      title: "Flow",
      image: "https://i.postimg.cc/TYpDXdW9/flow.jpg",
      link: "https://web.app.flow.com.ar/",
      installed: false,
  },
  {
      title: "AppleTV",
      image: "https://i.postimg.cc/FKtcZMzx/appletv.jpg",
      link: "https://www.apple.com/la/apple-tv-plus/",
      installed: false,
  },
  {
      title: "DirectTv Go",
      image:"https://i.postimg.cc/R0ctbgnx/directv.jpg",
      link:"https://www.directvgo.com/ar/home",
      installed: false,
  }];
setElements(storedElements);
  }, [token]);

    const handleAddItem = async (item) => {
        try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.sub;
        const itemWithUserId = { ...item, userId };
          const response = await fetch('http://localhost:5000/api/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
            body: JSON.stringify(itemWithUserId), // El objeto del elemento con el ID del usuario
          });
    
          if (response.ok) {
            setShowAddedAlert(true);
            const newItem = await response.json();
            setItems([...items, newItem.item]);
      
            // Actualiza el estado 'installed' del elemento a true
            const updatedElements = elements.map((el) =>
              el.title === item.title ? { ...el, installed: true } : el
            );
            setElements(updatedElements);

            localStorage.setItem(`installedItems_${userId}`, JSON.stringify(updatedElements));
          } else {
            const responseData = await response.json();
            if (responseData.message === 'duplicate') {
              console.log("duplicado");
            }
          }
        } catch (error) {
          console.error('Error agregando item:', error);
        }
      };
    
    
      // Genera dinámicamente botones para cada elemento
      const elementButtons = elements.map((item, index) => (
        <div key={index} className='buttonStoreDiv'>
          <img src={item.image} alt={item.title} className='buttonImg'/>
          <div>
          {item.installed ? (
        <button onClick={() => handleDeleteItem(item.title)} className='buttonInstallStore del'><i className="fa-solid fa-trash"></i></button>
      ) : (
        <button onClick={() => handleAddItem(item)} className='buttonInstallStore des'><i className="fa-solid fa-download"></i></button>
      )}
          </div>
        </div>
      ));



            // ALERTA AGREGADO
            useEffect(() => {
                if (showAddedAlert) {
                // Puedes configurar un temporizador para ocultar la alerta después de un tiempo
                const timer = setTimeout(() => {
                    setShowAddedAlert(false);
                }, 2000); // Ocultar la alerta después de 3 segundos
                return () => clearTimeout(timer);
                }
            }, [showAddedAlert]);


        // ALERTA ELIMINADO OK
        useEffect(() => {
            if (showDeleteAlert) {
              // Puedes configurar un temporizador para ocultar la alerta después de un tiempo
              const timer = setTimeout(() => {
                setShowDeleteAlert(false);
              }, 2000); // Ocultar la alerta después de 3 segundos
              return () => clearTimeout(timer);
            }
          }, [showDeleteAlert]);




    //   eliminar item
      const handleDeleteItem = async (itemTitle) => {
        try {
          // Realiza una solicitud DELETE al servidor para eliminar el elemento
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.sub;
          const response = await fetch(`http://localhost:5000/api/items/${itemTitle}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
          });
          if (response.ok) {
            setShowDeleteAlert(true);
      
            // Actualiza el estado 'installed' del elemento a false
            const updatedElements = elements.map((el) =>
              el.title === itemTitle ? { ...el, installed: false } : el
            );
            setElements(updatedElements);

            localStorage.setItem(`installedItems_${userId}`, JSON.stringify(updatedElements));
          } else {
            const responseData = await response.json();
            if (responseData.message === 'inexistent') {
              console.error('no instalado');
            }
          }
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      };

      
    
      return (
        <div className='storeDiv'>
            <NavBar/>
            <h1 className='titleAppStore'>App Store</h1>
            <div className='buttonsStore'>
          {elementButtons}
          </div>


        {/* ALERTA AGREGADO */}
      {showAddedAlert && (
        <div className="alert ok">
          La app fue instalada correctamente.
        </div>
      )}

       {/* ALERTA ELIMINADO */}
       {showDeleteAlert && (
        <div className="alert ok">
          La app fue desinstalada correctamente.
        </div>
      )}

        <Footer/>
        </div>
      );
    }

export default Store;