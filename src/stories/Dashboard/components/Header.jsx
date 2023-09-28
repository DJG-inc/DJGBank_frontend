export const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header-logo">
        <div className="logo">
          <span className="logo-icon">
            <img src="https://assets.codepen.io/285131/almeria-logo.svg" />
          </span>
          <h1 className="logo-title">
            <span>Almeria</span>
            <span>NeoBank</span>
          </h1>
        </div>
      </div>
      <div className="app-header-navigation">
        <div className="tabs">
          <a href="#">Overview</a>
          <a href="#" className="active">
            Payments
          </a>
          <a href="#">Cards</a>
          <a href="#">Account</a>
          <a href="#">System</a>
          <a href="#">Business</a>
        </div>
      </div>
      <div className="app-header-actions">
        <button className="user-profile">
          <span>Matheo Peterson</span>
          <span>
            <img src="https://assets.codepen.io/285131/almeria-avatar.jpeg" />
          </span>
        </button>
        <div className="app-header-actions-buttons">
          <button className="icon-button large">
            <i className="ph-magnifying-glass"></i>
          </button>
          <button className="icon-button large">
            <i className="ph-bell"></i>
          </button>
        </div>
      </div>
      <div className="app-header-mobile">
        <button className="icon-button large">
          <i className="ph-list"></i>
        </button>
      </div>
    </header>
  );
};
