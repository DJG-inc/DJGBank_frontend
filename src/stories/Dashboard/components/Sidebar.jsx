import { Buttons } from "./Buttons";
import { PaymentCard } from "./PaymentCard";

export const Sidebar = () => {
  return (
    <div className="app-body-sidebar">
      <section className="payment-section">
        <h2>New Payment</h2>
        <div className="payment-section-header">
          <p>Choose a card to transfer money</p>
          <div>
            <Buttons />
          </div>
        </div>
        <div className="payments">
          <PaymentCard color="green" />
          <PaymentCard color="olive" />
          <PaymentCard color="gray" />
        </div>
        <div className="faq">
          <p>Most frequently asked questions</p>
          <div>
            <label>Question</label>
            <input type="text" placeholder="Type here" />
          </div>
        </div>
        <div className="payment-section-footer">
          <button className="save-button">Save</button>
          <button className="settings-button">
            <i className="ph-gear"></i>
            <span>More settings</span>
          </button>
        </div>
      </section>
    </div>
  );
};
