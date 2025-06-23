import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import LoadingOverlay from "./LoadingOverlay";

const Home = () => {
  const history = useHistory();
  const handleOrder = () => {
    history.push("/order");
  };
  return (
    <div style={{backgroundColor: "#FAF7F2"}}>
    <div className="home-header">
      <img src="/images/iteration-1-images/logo.svg" alt="Pizza Logo" />
      <h1 className="cool-text">KOD ACIKTIRIR<br /> PİZZA, DOYURUR</h1>
      <button className="btn" onClick={handleOrder}>ACIKTIM</button>
      <div className="cool-div">
      </div>

    </div>

    
    <div className="home-content">
      <div className="home-buttons-flatlist">
        <button type="button" className="button"><img src="/images/iteration-2-images/icons/1.svg"/>YENİ! Kore</button>
      <button type="button" className="button"><img src="/images/iteration-2-images/icons/2.svg"/>Pizza</button>
      <button type="button" className="button"><img src="/images/iteration-2-images/icons/3.svg"/>Börgir</button>
      <button type="button" className="button"><img src="/images/iteration-2-images/icons/4.svg"/>Kızartmalar</button>
      <button type="button" className="button"><img src="/images/iteration-2-images/icons/5.svg"/>Fast Food</button>
      <button type="button" className="button"><img src="/images/iteration-2-images/icons/6.svg"/>Sıvı</button>
      </div>

      <div className="home-special-offers">
      <div className="home-special-offers-big">
        <h2 className="home-special-offers-big-title" 
        style={{fontFamily: "Quattrocento", fontSize: "2.5rem", color: "#fff", fontWeight: 700}}>
          Özel <br />Lezzetus
        </h2>
        <p style = {{position: "absolute", marginTop: "10rem"}}>Position: Absolute Acı Burger</p>
        <button className="btn-special-offer">SİPARİŞ VER</button>
      </div>

      <div className="home-special-offers-small">
        <div className="home-special-offers-small-item home-special-offers-small-image1">
          <h3 className="home-special-offers-small-title" 
          style={{ color: '#fff', fontWeight: 500, fontSize: '1.5rem' }}>
            Hackathlon <br />Burger Menü
          </h3>
          <button className="btn-special-offer">SİPARİŞ VER</button>
        </div>

        <div className="home-special-offers-small-item home-special-offers-small-image2">
          <h3 className="home-special-offers-small-title" >
            <span className="red-text">Çoooook</span> <br />hızlı npm gibi kurye
          </h3>
          <button className="btn-special-offer">SİPARİŞ VER</button>
        </div>
      </div>
    </div>


        <div className="home-content2">
            <h3 className="home-content2-title">en çok paketlenen menüler</h3>
            <h2 className="home-content2-title2">Hızlı ve Lezzetli Seçenekler</h2>
            
            <div className="home-content2-flatlist">
            <button type="button" className="button2"><img src="/images/iteration-2-images/icons/1.svg"/>YENİ! Kore</button>
            <button type="button" className="button2"><img src="/images/iteration-2-images/icons/2.svg"/>Pizza</button>
            <button type="button" className="button2"><img src="/images/iteration-2-images/icons/3.svg"/>Börgir</button>
            <button type="button" className="button2"><img src="/images/iteration-2-images/icons/4.svg"/>Kızartmalar</button>
            <button type="button" className="button2"><img src="/images/iteration-2-images/icons/5.svg"/>Fast Food</button>
            <button type="button" className="button2"><img src="/images/iteration-2-images/icons/6.svg"/>Sıvı</button>
            </div>
        </div>

        <div className="home-content2-foodlist">
            <div className="home-content2-foodlist-item">
                <button type="foodlist-button">
                <img src="/images/iteration-2-images/pictures/food-1.png" alt="Food 1" />
                <h4 className="home-content2-foodlist-item-title">Terminal Pizza</h4>
                <div className="home-content2-foodlist-item-description">
                    <p>4.9</p>
                    <p>{200}</p>
                    <p>60₺</p>
                </div>
                </button>
            </div>
            <div className="home-content2-foodlist-item">
                <button type="foodlist-button">
                <img src="/images/iteration-2-images/pictures/food-2.png" alt="Food 2" />
                <h4 className="home-content2-foodlist-item-title">Position Absolute Acı Pizza</h4>
                <div className="home-content2-foodlist-item-description">
                    <p>4.9</p>
                    <p>{928}</p>
                    <p>85₺</p>
                </div>
                </button>
            </div>
            <div className="home-content2-foodlist-item">
                <button type="foodlist-button">
                <img src="/images/iteration-2-images/pictures/food-3.png" alt="Food 3" />
                <h4 className="home-content2-foodlist-item-title">useEffect Tavuklu Burger</h4>
                <div className="home-content2-foodlist-item-description">
                    <p>4.9</p>
                    <p>{462}</p>
                    <p>75₺</p>
                </div>
                </button>
            </div>
        </div>
    </div>


    <div className="home-footer">
      <footer className="footer">
        <div className="footer-section1" >
          <img src="/images/iteration-2-images/footer/logo-footer.svg" alt="Pizza Logo" />
          <p className="footer-text"><img src="/images/iteration-2-images/footer/icons/icon-1.png"/> Düt Düt Bulvarı, <br/>İstanbul, Türkiye</p>
          <p className="footer-text"><img src="/images/iteration-2-images/footer/icons/icon-2.png"/> aciktim@teknolojikyemekler.com</p>
          <p className="footer-text"><img src="/images/iteration-2-images/footer/icons/icon-3.png"/> +90 123 456 78 90</p>
        </div>
        <div className="footer-section2">
            <h2>Sıccacık Menüler</h2>

            <ul className="footer-menu-list" 
            style= {{listStyleType: "none", padding: 0, textDecoration: "none",color: "#fff"}}>
              <li>
                <a href="/order">Sipariş Ver</a>
                </li>
                <br />
                <li>
                  <a href="/order">useEffect Tavuklu Pizza</a>
                </li>
                <br />
                <li>
                  <a href="/order">Terminal Pizza</a>
                </li>
                <br />
                <li>
                  <a href="/order">Çok üşendim diğer maddeleri yazmaya pardon.</a>
                </li>
            </ul>
        </div>
        <div className="footer-section3">
          <h2>Instagram</h2>

          <div className="footer-instagram-images">
            <img src="/images/iteration-2-images/footer/insta/li-1.png" alt="Instagram 1" />
            <img src="/images/iteration-2-images/footer/insta/li-2.png" alt="Instagram 2" />
            <img src="/images/iteration-2-images/footer/insta/li-3.png" alt="Instagram 3" />
            <img src="/images/iteration-2-images/footer/insta/li-4.png" alt="Instagram 4" />
            <img src="/images/iteration-2-images/footer/insta/li-5.png" alt="Instagram 5" />
            </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Home;
