import { SeriveHeader } from "./ServiceHeader";
import { TitleService } from "./TitleService";

export const Services = () => {
  return (
    <section className="service-section">
      <h2>Service</h2>
      <SeriveHeader />
      <div className="mobile-only">
        <button className="flat-button">Toggle search</button>
      </div>
      <div className="tiles">
        <TitleService />
        <TitleService />
        <TitleService />
      </div>
      <div className="service-section-footer">
        <p>
          Services are paid according to the current state of the currency and
          tariff.
        </p>
      </div>
    </section>
  );
};
