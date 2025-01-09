import { useEffect } from "react";
import "./ContactPage.css";

function ContactPage() {
  useEffect(() => {
    // Dynamically load Bootstrap CSS
    const bootstrapLink = document.createElement("link");
    bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css";
    bootstrapLink.rel = "stylesheet";
    document.head.appendChild(bootstrapLink);

    const leafletCSSLink = document.createElement("link");
    leafletCSSLink.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    leafletCSSLink.rel = "stylesheet";
    document.head.appendChild(leafletCSSLink);

    const leafletScript = document.createElement("script");
    leafletScript.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
    document.head.appendChild(leafletScript);

    const mapScript = document.createElement("script");
    mapScript.src = "/src/utils/mapScript.js";
    mapScript.async = true;
    mapScript.onload = () => {
      console.log("Map script loaded successfully.");
    };
    mapScript.onerror = () => {
      console.error("Error loading map script.");
    };
    document.body.appendChild(mapScript);

    return () => {
      // Clean up: Remove the dynamically loaded Bootstrap CSS and Map Script
      document.head.removeChild(bootstrapLink);
      document.head.removeChild(leafletCSSLink);
      document.head.removeChild(leafletScript);
      document.body.removeChild(mapScript);
    };
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <section className="py-5 overflow-x-hidden">
      <div className="container-fluid p-lg-0">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6">
            <div className="col-lg-8 mx-auto">
              <span className="text">Let's Talk</span>
              <h2 className="display-5 fw-bold">Contact Us</h2>
              <p className="lead">
                We'd love to hear from you! Please fill out the form below, and
                we'll get back to you as soon as possible.
              </p>
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <input
                        className="form-control bg-light"
                        placeholder="Your name"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <input
                        className="form-control bg-light"
                        placeholder="Your email"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <textarea
                        className="form-control bg-light"
                        placeholder="Your message"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="d-grid">
                      <button className="btn btn-primary" type="submit">
                        Send message
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div id="map" style={{ height: "500px" }}></div> {/* Map container */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
