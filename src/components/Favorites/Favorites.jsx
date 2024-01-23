import React, { useEffect, useState } from 'react';
import './Favorites.css';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';

const Favorites = () => {

    const token = localStorage.getItem('token');

const [favoriteItems, setFavoriteItems] = useState([]);   
const [title, setTitle] = useState('');
const [image, setImage] = useState('');
const [link, setLink] = useState('');
const [showForm, setShowForm] = useState(false); 

useEffect(() => {
  const addItemFavoritePlaceholder = { title: "Agregar", image: "https://i.postimg.cc/W33cWb9R/simbolo.jpg", 
link: "/" };
    const fetchItemsFromServer = async () => {
        try {
          const response = await fetch('https://gtv-render.onrender.com/home/api/favorite-items', {
            headers: {
              Authorization: token,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setFavoriteItems([addItemFavoritePlaceholder, ...data]);
          } else {
            console.error('Failed to fetch items');
          }
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
    
      
        if (token) {
          fetchItemsFromServer();
        }
      }, [token]);


      // eliminar favoritos
      const handleDeleteItem = async (itemId) => {
        try {
          const response = await fetch(`https://gtv-render.onrender.com/home/api/delete-favorite-item/${itemId}`, {
            method: 'DELETE',
            headers: {
              Authorization: token,
            },
          });
      
          if (response.ok) {
            // Actualiza el estado local `favoriteItems` para eliminar el elemento con el ID correspondiente
            setFavoriteItems(favoriteItems.filter((item) => item._id !== itemId));
          } else {
            console.error('Failed to delete favorite item');
          }
        } catch (error) {
          console.error('Error deleting favorite item:', error);
        }
      };


      // agregar favoritos
      const addFavoriteItem = async (newItem) => {
        try {
          const response = await fetch('https://gtv-render.onrender.com/home/api/add-favorite-item', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify(newItem),
          });
    
          if (response.ok) {
            // obtiene el nuevo elemento del servidor si es necesario
            const newItemFromServer = await response.json();
    
            // Actualiza el estado local `items` para incluir el nuevo elemento
            setFavoriteItems([...favoriteItems, newItemFromServer]);
            window.location.reload();

          } else {
            console.error('Failed to add favorite item');
          }
        } catch (error) {
          console.error('Error adding favorite item:', error);
        }
      };

      // FORMULARIO
      const handleSubmit = async (e) => {
        e.preventDefault();
       
        const newItem = {
          title,
          image,
          link,
        };

        await addFavoriteItem(newItem);
    
        setTitle('');
        setImage('');
        setLink('');
      };

      // Genera dinámicamente botones para cada elemento
      const elementButtons = favoriteItems.map((item, index) => (
        <div key={index} className='favsDivItems'>
            <button onClick={() => handleDeleteItem(item._id)} className={item.title === "Agregar" ? "buttonSimboloMas" : 'buttonDeleteFavs'}><i class="fa-solid fa-trash"></i></button>
          <img src={item.image} alt={item.title} className={item.title==="Agregar"? "simboloMas favImgs" : 'favImgs'} onClick={() => {
                        if (item.title === "Agregar") {
                          setShowForm(true);
                        }
                      }}/>
          <h2>{item.title}</h2>
          <div>
          
        
          </div>
        </div>
      ));


    return (
        <div className='favoritesContainer'>
            <NavBar/>
            <h1 className='titleFavsDiv'>Favorites</h1>
            <div className='favoritesDiv'>
                
            {elementButtons}





            {/* formulario favoritos */}
           {showForm && (<form onSubmit={handleSubmit} className='formFavs formFavsOther'>
           <div className="formFavTitulo"><h2>Agregar Elemento Favorito</h2> <h1 onClick={()=>{setShowForm(false)}}>X</h1></div>
           <div className="form-group">
          <input
            type="text"
            id="title"
            placeholder='Title of favorite'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
          placeholder='Image URL'
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
        <input
          placeholder='Favorite URL'
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>)}

      </div>
      <Footer/>
        </div>
    );
};

export default Favorites;
