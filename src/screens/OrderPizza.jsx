import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import "./OrderPizza.css";
import Footer from "../components/Footer";
const OrderPizza = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    size: "",
    dough: "",
    extras: [],
    note: "",
    quantity: 1,
  });

  const [nameError, setNameError] = useState("");
  const [extrasError, setExtrasError] = useState("");

  const basePrice = 85.5;
  const totalExtras = formData.extras.length * 5;
  const totalPrice = (basePrice + totalExtras) * formData.quantity;

  const isFormValid =
    formData.extras.length >= 4 &&
    formData.extras.length <= 10 &&
    formData.size &&
    formData.dough;
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      if (value.length > 0 && value.length < 3) {
        setNameError("İsim en az 3 karakter olmalı.");
      } else {
        setNameError("");
      }
    }
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    let updated;
    if (checked) {
      if (formData.extras.length >= 10) {
        toast.error("10 seçime ulaşıldı!");
        setExtrasError("En fazla 10 malzeme seçebilirsiniz.");
        return;
      }
      updated = [...formData.extras, value];
    } else {
      updated = formData.extras.filter((item) => item !== value);
    }
    setFormData({ ...formData, extras: updated });

    if (checked && updated.length === 10) {
      setExtrasError("En fazla 10 malzeme seçebilirsiniz.");
    } else if (updated.length < 4) {
      setExtrasError("En az 4 malzeme seçmelisiniz.");
    } else {
      setExtrasError("");
    }
  };

  const handleQuantity = (type) => {
    if (type === "increase") {
      setFormData({ ...formData, quantity: formData.quantity + 1 });
    } else if (type === "decrease" && formData.quantity > 1) {
      setFormData({ ...formData, quantity: formData.quantity - 1 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      setNameError("İsim en az 3 karakter olmalı.");
      toast.error("İsim en az 3 karakter olmalı.");
      return;
    }

    if (formData.extras.length < 4 || formData.extras.length > 10) {
      setExtrasError("Ek malzeme seçimi 4 ile 10 arasında olmalı.");
      toast.error("Ek malzeme seçimi 4 ile 10 arasında olmalı.");
      return;
    }

    if (!isFormValid) {
      toast.error("Lütfen formu eksiksiz doldurun!");
      return;
    }

    setNameError("");
    setExtrasError("");
    try {
      await axios.post(
        'https://reqres.in/api/pizza/reqres-free-v1',
        formData,
        {
          headers: {
            'x-api-key': 'reqres-free-v1'
          }
        }
      );
      toast.success("Sipariş başarıyla gönderildi!");
      history.push("/success", { order: formData });
    } catch (error) {
      toast.error("Sipariş gönderilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="orderpizza-root">
      <ToastContainer position="top-center" />
      <div className="orderpizza-bg-pattern"></div>

      {/* header */}
      <header className="orderpizza-header">
        <div className="orderpizza-header-inner">
          <img
            src="/images/iteration-1-images/logo.svg"
            alt="Logo"
            className="orderpizza-logo"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,1))" }}
          />
        </div>
      </header>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <img 
          src="../images/iteration-2-images/pictures/form-banner.png" 
          style={{ width: "50%", height: "auto", borderRadius: "0.5rem", objectFit: "cover" }}
          alt="Form Banner"
        />
      </div>
      {/* breadcrumb */}
      <p className="orderpizza-breadcrumb">Ana Sayfa - Seçenekler - <span className="text-red">Sipariş Oluştur</span></p>

      <main className="orderpizza-main">
        <div className="orderpizza-description" style={{ width: "47%", margin: "0 auto" }}>
          <h1 className="orderpizza-description-header">Position Absolute Acı Pizza</h1>
          <h2 className="orderpizza-description-price">85.50₺</h2>
          <p className="orderpizza-description-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque non dignissimos inventore debitis, ad provident incidunt quae iusto laudantium doloremque mollitia a nihil, consectetur dolor ea explicabo quibusdam tempore deleniti.
          </p>
        </div>
        <div className="orderpizza-form-row">
          <form onSubmit={handleSubmit} className="orderpizza-form">
            <div className="orderpizza-form-group">
              <label className="orderpizza-label">İsminiz</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Adınızı girin (min 3 karakter)"
                className="orderpizza-input"
              />
              {nameError && (
                <span className="orderpizza-error">{nameError}</span>
              )}
            </div>

            {/* boyut hamur */}
            <div className="orderpizza-row">
              <div className="orderpizza-form-group-half">
                <h3 className="orderpizza-label">Boyut Seç <span className="text-red">*</span></h3>
                <div className="orderpizza-options" style={{ position: "relative" }}>
                  {/* bunu valla internetten bulup implement ettim ufak gpt abim de yardim etti */}
                  <div
                    className="pizza-slider"
                    style={{
                      transform:
                        formData.size === "S"
                          ? "translateX(0%)"
                          : formData.size === "M"
                          ? "translateX(100%)"
                          : formData.size === "L"
                          ? "translateX(200%)"
                          : "translateX(0%)",
                      background:
                        formData.size === "S"
                          ? "linear-gradient(90deg, #ffb3b3 100%, #ce2829 100%)"
                          : formData.size === "M"
                          ? "linear-gradient(90deg, #ff6666 100%, #ce2829 100%)"
                          : formData.size === "L"
                          ? "linear-gradient(90deg, #ce2829 100%, #a11a1a 100%)"
                          : "linear-gradient(90deg, #ffb3b3 100%, #ce2829 100%)",
                    }}
                  />
                  {["S", "M", "L"].map((size, idx) => (
                    <label
                      key={size}
                      className={
                        "orderpizza-option" +
                        (formData.size === size ? " selected" : "")
                      }
                      style={{ zIndex: 2 }}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        checked={formData.size === size}
                        onChange={handleChange}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="orderpizza-form-group-half">
                <h3 className="orderpizza-label">
                  Hamur Seçimi <span className="text-red">*</span>
                </h3>
                <select
                  name="dough"
                  value={formData.dough}
                  onChange={handleChange}
                  className="orderpizza-select"
                >
                  <option value="">Hamur Kalınlığı</option>
                  <option value="ince">İnce</option>
                  <option value="kalın">Kalın</option>
                  <option value="dolgulu">Dolgulu</option>
                </select>
              </div>
            </div>

            {/* ek malzemeler */}
            <div className="orderpizza-form-group">
              <h3 className="orderpizza-label">Ek Malzemeler (+5₺)</h3>
              <p className="orderpizza-helper-text">
                Minimum 4, maksimum 10 seçim yapabilirsiniz.
              </p>
              <p className="orderpizza-selection-count">
                {formData.extras.length}/10 seçili
              </p>
              <div className="orderpizza-checkbox-grid">
                {["Sucuk", "Zeytin", "Mantar", "Mozarella", "Biber", "Soğan", "Domates", "Ananas 🤢", "Jambon", "Ekstra 1", "Ekstra 2", "Ekstra 3"].map((item) => (
                  <label key={item} className="orderpizza-checkbox-label">
                    <input
                      type="checkbox"
                      value={item}
                      checked={formData.extras.includes(item)}
                      onChange={handleCheckbox}
                      disabled={!formData.extras.includes(item) && formData.extras.length >= 10}
                      className="animated-checkbox"
                    />
                    <span className="custom-checkbox"></span>
                    {item}
                  </label>
                ))}
              </div>
              {extrasError && (
                <span className="orderpizza-error">{extrasError}</span>
              )}
            </div>

            <div className="orderpizza-form-group">
              <h3 className="orderpizza-label">Sipariş Notu</h3>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows="3"
                placeholder="Eklemek istediğiniz not var mı?"
                className="orderpizza-textarea"
              />
            </div>
          </form>
        </div>
        <hr className="orderpizza-summary-divider" />
        <div className="orderpizza-summary-below">
          <div className="orderpizza-quantity-standalone">
            <h3 className="orderpizza-summary-title">Adet</h3>
            <div className="orderpizza-quantity-controls">
              <button
                type="button"
                onClick={() => handleQuantity("decrease")}
                className="orderpizza-quantity-btn"
              >
                <Minus size={16} className="orderpizza-quantity-minus"
                  style={{
                    position: "relative",
                    right: "0.5rem",
                    bottom: "0.1rem"
                  }} />
              </button>
              <span className="orderpizza-quantity">{formData.quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantity("increase")}
                className="orderpizza-quantity-btn"
              >
                <Plus size={16} className="orderpizza-quantity-plus" style={{
                  position: "relative",
                  right: "0.5rem",
                  bottom: "0.1rem"
                }} />
              </button>
            </div>
          </div>
          <aside className="orderpizza-summary">
            <div className="orderpizza-summary-card">
              <div className="orderpizza-summary-body">
                <p className="orderpizza-total-label">Sipariş Toplamı</p>
                <div className="orderpizza-total-row">
                  <span className="orderpizza-total-text">Seçimler: </span>
                  <span className="orderpizza-total-price">
                    {totalExtras.toFixed(2)}₺
                  </span>
                </div>
                <div className="orderpizza-total-row">
                  <span className="orderpizza-total-bold" style={{ color: "#CE2829" }}>Toplam: </span>
                  <span className="orderpizza-total-highlight" style={{ color: "#CE2829" }}>
                    {totalPrice.toFixed(2)}₺
                  </span>
                </div>
              </div>
              <div className="orderpizza-summary-actions-bottom">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`btn${!isFormValid ? " btn-disabled" : ""}`}
                  form="order-form"
                  onClick={handleSubmit}
                >
                  <ShoppingCart size={20} style={{ marginRight: "0.5rem" }} /> SİPARİŞ VER
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <div className="orderpizza-footer-spacer">
        <Footer style={{ marginTop: "3rem" }} />
      </div>
    </div>
  );
};

export default OrderPizza;
