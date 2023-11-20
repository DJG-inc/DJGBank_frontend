import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Services } from "./components/Services";
import { Sidebar } from "./components/Sidebar";
import { Transfer } from "./components/Transfer";
import { Loans } from "./components/Loans";
import { useDash } from "../../Context/DashContext";
import "./dashboard.css";

export const Dashboard = () => {
  const { userData } = useDash();

  console.log(userData);

  if (userData === null) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="body-content">
        <div className="app">
          <Header userName={userData.first_name + " " + userData.last_name} />
          <div className="app-body">
            <Navigation />
            <div className="app-body-main-content">
              {/* <Services /> */}
              <Transfer
                userData={userData}
              />
              <Loans
                userData={userData}
              />
            </div>
            <Sidebar
              userData={userData}
            />
          </div>
        </div>
      </div>
    </>
  );
};
