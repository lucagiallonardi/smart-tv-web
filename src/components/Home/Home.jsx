import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './Home.css';
import NavBar from '../layouts/NavBar';
import breakingbad from './media/bb.jpg';
import marvel from './media/mcu.jpg';
import got from './media/got.jpeg';
import { Link } from 'react-router-dom';
import Footer from '../layouts/Footer';


const Home = () => {
    const [items, setItems] = useState([]);
    const token = localStorage.getItem('token');
    const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [favoriteItems, setFavoriteItems] = useState([]);   
  const [showForm, setShowForm] = useState(false); 
    
    
    useEffect(()=>{
      const addItemPlaceholder = { title: "Agregar", image: "https://i.postimg.cc/W33cWb9R/simbolo.jpg", link: "/store" };
        const fetchItems = async ()=>{
            try{
                const decodedToken = jwt_decode(token);
                const userId = decodedToken.sub;
                const response = await fetch('https://gtv-render.onrender.com/api/items',{
                    headers:{
                        Authorization: `${token}`,
                        'User-Id': userId,
                    },
                });

                if(response.ok){
                    const data = await response.json();
                    setItems([...data, addItemPlaceholder]);
                    } 
                else {
                    console.error('Failed to fetch items');
                  }
                } catch (error) {
                  console.error('Error fetching items:', error);
                }
              };
            
              if (token) {
                fetchItems();
              }
            }, [token]);
            
              

        // ACA CREAMOS GRUPOS DE 7 ITEMS PARA AGREGAR A LAS APPS
        const itemsPerGroup = 7;
        const groupedItems = [];
        for (let i = 0; i < items.length; i += itemsPerGroup) {
          groupedItems.push(items.slice(i, i + itemsPerGroup));
        }
        




        // FAVORITOS

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

        // agregar favoritos
        const addFavoriteItem = async (newItem) => {
          try {
            const response = await fetch('https://gtv-render.onrender.com/api/add-favorite-item', {
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

        

        // fetch de favoritos
      useEffect(() => {
        const addItemFavoritePlaceholder = { title: "Agregar", image: "https://i.postimg.cc/W33cWb9R/simbolo.jpg", link: "/" };
        const fetchItemsFromServer = async () => {
    try {
      const response = await fetch('https://gtv-render.onrender.com/api/favorite-items', {
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavoriteItems([...data, addItemFavoritePlaceholder]);
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

  const itemsPerGroup2 = 4;
const groupedItems2 = [];
for (let i = 0; i < favoriteItems.length; i += itemsPerGroup2) {
  groupedItems2.push(favoriteItems.slice(i, i + itemsPerGroup2));
}




    
    return (
        <div className='homeDiv'>
      {token ? (
        
        <div>

            <NavBar/>

            {/* COVER */}
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item coverItem active">
              <img src={breakingbad} className="d-block w-100" alt="..."/><Link to={'https://www.netflix.com/title/70143836'} target='_label'><div className='gradient-overlay'><h1 className='coverTitle'>BREAKING BAD</h1><h2 className='coverDesc'>Watch now on Netflix</h2></div></Link>
                </div>
                <div className="carousel-item coverItem">
                <img src={marvel} className="d-block w-100" alt="..."/><Link to={'https://www.disneyplus.com/es-419/brand/marvel'} target='_label'><div className='gradient-overlay'><h1 className='coverTitle'>MCU: Marvel Cinematic Universe</h1><h2 className='coverDesc'>Watch now on Disney+</h2></div></Link>
                </div>
                <div className="carousel-item coverItem">
                <img src={got} className="d-block w-100" alt="..."/><Link to={'https://www.hbomax.com/ad/es/series/urn:hbo:series:GVU2cggagzYNJjhsJATwo'} target='_label'><div className='gradient-overlay'><h1 className='coverTitle'>GAME OF THRONES</h1><h2 className='coverDesc'>Watch now on HBO Max</h2></div></Link>
                </div>
            </div>
            </div>


                {/* APLICACIONES FAVORITAS */}
                <div id="carouselExampleIndicators" className="carousel favapps slide">
                <h1>Favorite Apps</h1>
                <div className="carousel-inner">

                    {groupedItems.map((group, index) => (
                  <div className={`carousel-item favapps-item ${index === 0 ? "active" : ""}`} key={index}>
                    {group.map((item, itemIndex) => (
                      <Link to={item.link} target='_label'><img src={item.image} alt={item.title} key={item._id || itemIndex} 
                      className={item.title === "Agregar" ? "simboloMas favapps-item-img" : "favapps-item-img"}/></Link>
                    ))}
                  </div>
                ))}
                    
                </div>
                <button className="carousel-control-prev botonPrev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next botonNext" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>

        {/* RECOMENDACIONES */}
        <div id="carouselExample" className="carousel recomended-app slide">
                <h1>Popular</h1>
                <div className="carousel-inner">
                    <div className="carousel-item recomended-item active">
                    <Link to={'https://www.netflix.com/title/70143836'} target='_label'><img src="https://i.postimg.cc/pXsbTxMw/breakinbad-Rec.jpg" className='recomended-item-img'alt="Breaking Bad"/></Link>
                    <Link to={'https://www.starplus.com/es-419/series/modern-family/6p2yzz9mh8Kp'} target='_label'><img src="https://i.postimg.cc/g27CVDJ4/modern-Family-Rec.jpg" className='recomended-item-img' alt="Modern Family"/></Link>
                    <Link to={'https://www.netflix.com/es/title/70264888'} target='_label'><img src="https://i.postimg.cc/FR5wqH0L/blackmirror-Rec.png" className='recomended-item-img' alt="Black Mirror"/></Link>
                    <Link to={'https://www.disneyplus.com/es-419/series/the-mandalorian/3jLIGMDYINqD'} target='_label'><img src="https://i.postimg.cc/15C2SHpP/mandalorian-Rec.jpg" className='recomended-item-img' alt="Mandalorian"/></Link>
                    </div>
                    <div className="carousel-item recomended-item">
                    <Link to={'https://www.netflix.com/es/title/80057281'} target='_label'><img src="https://i.postimg.cc/DzbtBX4h/strangerthings-Rec.jpg" className='recomended-item-img' alt="Stranger Things"/></Link>
                    <Link to={'https://www.starplus.com/es-419/series/los-simpson/3ZoBZ52QHb4x'} target='_label'><img src="https://i.postimg.cc/rFMMsQ0r/simpsons-Rec.jpg" className='recomended-item-img' alt="The Simpsons"/></Link>
                    <Link to={'https://www.netflix.com/title/80189685'} target='_label'><img src="https://i.postimg.cc/NjZn9jJz/witcher-Rec.jpg" className='recomended-item-img' alt="The Witcher"/></Link>
                    <Link to={'https://www.netflix.com/title/70136120'} target='_label'><img src="https://i.postimg.cc/L8hdg7Hn/theoffice-Rec.jpg" className='recomended-item-img' alt="The Office"/></Link>
                    </div>
                    <div className="carousel-item recomended-item">
                    <Link to={'https://www.hbomax.com/ad/es/series/urn:hbo:series:GVU2cggagzYNJjhsJATwo'} target='_label'><img src="https://i.postimg.cc/Cx6gv0vG/gotRec.jpg" className='recomended-item-img'alt="Game of Thrones"/></Link>
                    <Link to={'https://www.hbomax.com/ad/es/series/urn:hbo:series:GXKN_xQX5csPDwwEAAABj'} target='_label'><img src="https://i.postimg.cc/W14V6z7p/euphoria-Rec.jpg" className='recomended-item-img'alt="Euphoria"/></Link>
                    <Link to={'https://www.hbomax.com/ar/es/series/urn:hbo:series:GXkRjxwjR68PDwwEAABKJ?countryRedirect=1'} target='_label'><img src="https://i.postimg.cc/hGfSgvJZ/rickandmorty-Rec.webp" className='recomended-item-img'alt="Rick and Morty"/></Link>
                    <Link to={'https://www.hbomax.com/ar/es/series/urn:hbo:series:GYyofRQHeuJ6fiQEAAAEy'} target='_label'><img src="https://i.postimg.cc/tCkyxWWm/lastofus-Rec.jpg" className='recomended-item-img'alt="The Last of Us"/></Link>
                    </div>
                </div>
                <button className="carousel-control-prev botonPrev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next botonNext" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>


                {/* AGREGAR FAVORITOS */}
                <div id="carouselExample2" className="carousel fav recomended-app slide">
                <h1>Favorites</h1>
                <div className="carousel-inner">
                {groupedItems2.map((group, index) => (
                  <div className={`carousel-item recomended-item ${index === 0 ? "active" : ""}`} key={index}>
                    {group.map((item, itemIndex) => (
                      <Link to={item.link}><img src={item.image} alt={item.title} key={item._id || itemIndex} 
                      className={item.title === "Agregar" ? "simboloMas recomended-item-img" : "recomended-item-img"} onClick={() => {
                        if (item.title === "Agregar") {
                          setShowForm(true);
                        }
                      }}/></Link>
                    ))}
                  </div>
                ))}
                </div>
                <button className="carousel-control-prev botonPrev" type="button" data-bs-target="#carouselExample2" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next botonNext" type="button" data-bs-target="#carouselExample2" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>

                {/* RECOMENDACIONES */}
        <div id="carouselExample3" className="carousel recomended-app slide">
                <h1>Movies</h1>
                <div className="carousel-inner">
                    <div className="carousel-item recomended-item active">
                    <Link to={'https://www.hbomax.com/ar/es/feature/urn:hbo:feature:GYGOrjQfhvKCWowEAAAAE?countryRedirect=1'} target='_label'><img src="https://i.postimg.cc/cJb5y4Ym/p15791706-v-h8-ai.jpg" className='recomended-item-img' alt="..."/></Link>
                    <Link to={'https://www.netflix.com/ar/title/70230640'} target='_label'><img src="https://i.postimg.cc/PxYqydDG/cowboy-django-unchained-western-wallpaper-preview.jpg" className='recomended-item-img' alt="..."/></Link>
                    <Link to={'https://www.netflix.com/title/80238910'} target='_label'><img src="https://i.postimg.cc/XNmxgY6K/168433.jpg" className='recomended-item-img' alt="..."/></Link>
                    <Link to={'https://www.netflix.com/ar/title/80175798'} target='_label'><img src="https://i.postimg.cc/4xqhDmww/3040279.jpg" className='recomended-item-img' alt="..."/></Link>
                    </div>
                    <div className="carousel-item recomended-item">
                    <Link to={'https://www.netflix.com/ar/title/70295172'} target='_label'><img src="https://i.postimg.cc/7hYVZ9Js/The-Imitation-Game-Quad-poster-Benedict-Cumberbatch1.jpg" className='recomended-item-img' alt="..."/></Link>
                    <Link to={'https://www.netflix.com/us-es/title/81260280'} target='_label'><img src="https://savethecat.com/wp-content/uploads/2023/03/title-home-page.jpg" className='recomended-item-img' alt="..."/></Link>
                    <Link to={'https://www.starplus.com/es-419/movies/el-club-de-la-pelea/38HCX4uW3BlA'} target='_label'><img src="https://i.postimg.cc/YSjfK51f/fightclub.jpg" className='recomended-item-img' alt="..."/></Link>
                    <Link to={'https://www.netflix.com/ar/title/60024942'} target='_label'><img src="https://i.postimg.cc/vcrh1fZ7/catchmeifyoucan.jpg" className='recomended-item-img' alt="..."/></Link>
                    </div>
                    <div className="carousel-item recomended-item">
                    <Link to={'https://www.netflix.com/ar/title/70095139'} target='_label'><img src="https://i.postimg.cc/fLfbHLJH/1279479.jpg" className='recomended-item-img' alt="..."/></Link>
                    <Link to={'https://www.starplus.com/es-419/movies/bastardos-sin-gloria/22tx5AuYJ2Tm'} target='_label'><img src="https://i.postimg.cc/ncDh50jj/desktop-wallpaper-inglourious-basterds-movie-inglorious-basterds.jpg" className='recomended-item-img' alt="..."/></Link>
                    <Link to={'https://i.postimg.cc/nh1j2DRZ/dont-look-up-blazing-meteor-ql3uo2ic3q2u3crr.jpg'} target='_label'><img src="https://wallpapers.com/images/hd/dont-look-up-blazing-meteor-ql3uo2ic3q2u3crr.jpg" className='recomended-item-img' alt="..."/></Link>
                    <Link to={'https://www.netflix.com/us-es/title/80218455'} target='_label'><img src="https://i.postimg.cc/W1LjFZNQ/2.png" className='recomended-item-img' alt="..."/></Link>
                    </div>
                </div>
                <button className="carousel-control-prev botonPrev" type="button" data-bs-target="#carouselExample3" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next botonNext" type="button" data-bs-target="#carouselExample3" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>



           {/* formulario favoritos */}
           {showForm && (<form onSubmit={handleSubmit} className='formFavs'>
           <div className="formFavTitulo"><h2>Agregar Elemento Favorito</h2> <h1 onClick={()=>{setShowForm(false)}}>X</h1></div>
        <div className="form-group">
          <input
            type="text"
            id="title"
            placeholder='Title '
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


        <Footer/>
        </div>        

      ) : (
        <p>Please login to see your items.</p>
      )}
        </div>
    );
};

export default Home;