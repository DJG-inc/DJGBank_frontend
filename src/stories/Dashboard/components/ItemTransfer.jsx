/* eslint-disable react/prop-types */

export const ItemTransfer = ({ image }) => {
  return (
    <div className="transfer">
      <div className="transfer-logo">
        <img src={image} />
      </div>
      <dl className="transfer-details">
        <div>
          <dt>Apple Inc.</dt>
          <dd>Apple ID Payment</dd>
        </div>
        <div>
          <dt>4012</dt>
          <dd>Last four digits</dd>
        </div>
        <div>
          <dt>28 Oct. 21</dt>
          <dd>Date payment</dd>
        </div>
      </dl>
      <div className="transfer-number">- $ 550</div>
    </div>
  );
};
