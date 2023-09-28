export const SeriveHeader = () => {
  return (
    <div className="service-section-header">
      <div className="search-field">
        <i className="ph-magnifying-glass"></i>
        <input type="text" placeholder="Account number" />
      </div>
      <div className="dropdown-field">
        <select>
          <option>Home</option>
          <option>Work</option>
        </select>
        <i className="ph-caret-down"></i>
      </div>
      <button className="flat-button">Search</button>
    </div>
  );
};
