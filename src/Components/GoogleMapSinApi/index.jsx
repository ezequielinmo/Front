import React from "react";

const GoogleMapSinApi = () => {
    return (
        <div style={{ width: "100%", textAlign: "center", padding: "1rem" }}>
            <iframe
                title="Google Reviews - Ezequiel José Estudio Inmobiliario"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.6241721102983!2d-57.5431721248978!3d-38.018195671925085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dd99a4ca59a3%3A0x98080f5a25ff32ee!2sEzequiel%20Jos%C3%A9%20Estudio%20Inmobiliario%20Reg%203918!5e1!3m2!1ses-419!2sar!4v1760960422580!5m2!1ses-419!2sar"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};

export default GoogleMapSinApi;
