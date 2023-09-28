import { ItemTransfer } from "./ItemTransfer";

export const Transfer = () => {
  return (
    <section className="transfer-section">
      <div className="transfer-section-header">
        <h2>Latest transfers</h2>
        <div className="filter-options">
          <p>Filter selected: more than 100 $</p>
          <button className="icon-button">
            <i className="ph-funnel"></i>
          </button>
          <button className="icon-button">
            <i className="ph-plus"></i>
          </button>
        </div>
      </div>
      <div className="transfers">
        <ItemTransfer image="https://assets.codepen.io/285131/apple.svg" />
        <ItemTransfer image="https://assets.codepen.io/285131/pinterest.svg" />
        <ItemTransfer image="https://assets.codepen.io/285131/warner-bros.svg" />
      </div>
    </section>
  );
};
