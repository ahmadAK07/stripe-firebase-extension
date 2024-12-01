// ZillowDealFinder.jsx

const PricingSection = ({
    Price,
    isMonthly,
    handleYearly,
    handleMonthly,
    handleChange
  }) => {
    return (
      <div className="pricing-card">
  <div className="pricing-card-inner">
    <div className="pricing-details">
      <div className="pricing-header">
        <span className="price-text">${Price}</span>
        <div className="toggle-container">
          <button
            type="button"
            onClick={handleMonthly}
            className={`toggle-btn ${isMonthly ? "active" : ""}`}
          >
            <span className={`toggle-text ${isMonthly ? "active" : ""}`}>6 Months</span>
          </button>
          <button
            type="button"
            onClick={handleYearly}
            className={`toggle-btn ${!isMonthly ? "active" : ""}`}
          >
            <span className={`toggle-text ${!isMonthly ? "active" : ""}`}>
              Yearly <span className="discount-text">(14%)</span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div className="pricing-action">
      <button onClick={handleChange} className="choose-plan-btn">
        <span className="choose-plan-text">Choose Plan</span>
      </button>
    </div>
  </div>
</div>

    )
  }
  
  export default PricingSection
  