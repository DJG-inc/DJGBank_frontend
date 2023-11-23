export const Navigation = () => {
  return (
    <div className="app-body-navigation">
      <nav className="navigation">
        <a href="#">
          <i className="ph-browsers"></i>
          <span>Dashboard</span>
        </a>
        <a href="#">
          <i className="ph-check-square"></i>
          <span>Scheduled</span>
        </a>
        <a href="#">
          <i className="ph-swap"></i>
          <span>Transfers</span>
        </a>
        <a href="#">
          <i className="ph-file-text"></i>
          <span>Templates</span>
        </a>
        <a href="#">
          <i className="ph-clipboard-text"></i>
          <span>Exchange</span>
        </a>
      </nav>
    </div>
  );
};
