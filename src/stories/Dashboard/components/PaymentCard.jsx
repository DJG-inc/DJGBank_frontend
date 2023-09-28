/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

export const PaymentCard = ({ color }) => {
  return (
    <div className="payment">
      <div className={`card ${color}`}>
        <span>01/22</span>
        <span>•••• 4012</span>
      </div>
      <div className="payment-details">
        <h3>Internet</h3>
        <div>
          <span>$ 2,110</span>
          <button className="icon-button">
            <i className="ph-caret-right-bold"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
