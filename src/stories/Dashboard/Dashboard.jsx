import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Services } from "./components/Services";
import { Sidebar } from "./components/Sidebar";
import { Transfer } from "./components/Transfer";
import { useDash } from "../../Context/DashContext";
import "./dashboard.css";

export const Dashboard = () => {
  const { userData } = useDash();

  console.log(userData);

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
