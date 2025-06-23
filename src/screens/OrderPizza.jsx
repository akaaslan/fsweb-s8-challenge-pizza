import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import "./OrderPizza.css";

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

  const basePrice = 80;
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
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...formData.extras, value]
      : formData.extras.filter((item) => item !== value);
    setFormData({ ...formData, extras: updated });
  };

  const handleQuantity = (type) => {
    if (type === "increase") {
      setFormData({ ...formData, quantity: formData.quantity + 1 });
    } else if (type === "decrease" && formData.quantity > 1) {
      setFormData({ ...formData, quantity: formData.quantity - 1 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Lütfen formu eksiksiz doldurun!");
      return;
    }

    history.push("/success", { order: formData });
  };

  return (
    <div className="orderpizza-root">
      <div className="orderpizza-bg-pattern"></div>

      {/* Header: only logo, full width */}
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

      <main className="orderpizza-main">
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
          </div>

          {/* Boyut ve Hamur yan yana */}
          <div className="orderpizza-row">
            <div className="orderpizza-form-group-half">
              <h3 className="orderpizza-label">Boyut Seç</h3>
              <div className="orderpizza-options" style={{ position: "relative" }}>
                {/* Animated slider */}
                <div
                  className="pizza-slider"
                  style={{
                    transform:
                      formData.size === "Küçük"
                        ? "translateX(0%)"
                        : formData.size === "Orta"
                        ? "translateX(100%)"
                        : formData.size === "Büyük"
                        ? "translateX(200%)"
                        : "translateX(0%)",
                    background:
                      formData.size === "Küçük"
                        ? "linear-gradient(90deg, #ffb3b3 100%, #ce2829 100%)"
                        : formData.size === "Orta"
                        ? "linear-gradient(90deg, #ff6666 100%, #ce2829 100%)"
                        : formData.size === "Büyük"
                        ? "linear-gradient(90deg, #ce2829 100%, #a11a1a 100%)"
                        : "linear-gradient(90deg, #ffb3b3 100%, #ce2829 100%)",
                  }}
                />
                {["Küçük", "Orta", "Büyük"].map((size, idx) => (
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

          {/* Ek Malzemeler grid */}
          <div className="orderpizza-form-group">
            <h3 className="orderpizza-label">Ek Malzemeler (+5₺)</h3>
            <p className="orderpizza-helper-text">
              Minimum 4, maksimum 10 seçim yapabilirsiniz.
            </p>
            <p className="orderpizza-selection-count">
              {formData.extras.length}/10 seçili
            </p>
            <div className="orderpizza-checkbox-grid">
              {["Sucuk", "Zeytin", "Mantar", "Mozarella", "Biber", "Soğan", "Domates", "Ananas"].map((item) => (
                <label key={item} className="orderpizza-checkbox-label">
                  <input
                    type="checkbox"
                    value={item}
                    checked={formData.extras.includes(item)}
                    onChange={handleCheckbox}
                    disabled={!formData.extras.includes(item) && formData.extras.length >= 10}
                  />
                  {item}
                </label>
              ))}
            </div>
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

        {/* Summary Card */}
        <aside className="orderpizza-summary">
          <div className="orderpizza-summary-card">
            {/* Adet counter stands alone */}
            <div className="orderpizza-quantity-standalone">
              <h3 className="orderpizza-summary-title">Adet</h3>
              <div className="orderpizza-quantity-controls">
                <button
                  type="button"
                  onClick={() => handleQuantity("decrease")}
                  className="orderpizza-quantity-btn"
                >
                  <Minus size={16} className="orderpizza-quantity-minus"/>
                </button>
                <span className="orderpizza-quantity">{formData.quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantity("increase")}
                  className="orderpizza-quantity-btn"
                >
                  <Plus size={16} className="orderpizza-quantity-plus"/>
                </button>
              </div>
            </div>
            {/* Grouped left-aligned section */}
            <div className="orderpizza-summary-actions">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`btn${!isFormValid ? " btn-disabled" : ""}`}
                form="order-form"
                onClick={handleSubmit}
              >
                <ShoppingCart size={20} className="inline mr-2" /> SİPARİŞ VER
              </button>
              <div className="orderpizza-summary-body">
                <p className="orderpizza-total-label">Sipariş Toplamı</p>
                <div className="orderpizza-total-row">
                  <span className="orderpizza-total-text">Seçimler:</span>
                  <span className="orderpizza-total-price">
                    {totalExtras.toFixed(2)}₺
                  </span>
                </div>
                <div className="orderpizza-total-row">
                  <span className="orderpizza-total-bold">Toplam:</span>
                  <span className="orderpizza-total-highlight">
                    {totalPrice.toFixed(2)}₺
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default OrderPizza;
