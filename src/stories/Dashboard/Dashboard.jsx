import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Services } from "./components/Services";
import { Sidebar } from "./components/Sidebar";
import { Transfer } from "./components/Transfer";
import "./dashboard.css";

export const Dashboard = () => {
  return (
    <>
      <div className="body-content">
        <div className="app">
          <Header />
          <div className="app-body">
            <Navigation />
            <div className="app-body-main-content">
              <Services />
              <Transfer />
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};
