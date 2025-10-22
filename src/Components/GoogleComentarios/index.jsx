import React, { useEffect } from "react";

const GoogleReviewsWidget = () => {
    useEffect(() => {
        // Evita insertar el script más de una vez
        if (!document.getElementById("elfsight-platform-script")) {
            const script = document.createElement("script");
            script.id = "elfsight-platform-script";
            script.src = "https://apps.elfsight.com/p/platform.js";
            script.defer = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div
            className="elfsight-app-55489439-01ab-4966-b524-feefb06b93f3"
            style={{ width: "100%", maxWidth: "800px", margin: "40px auto" }}
        ></div>
    );
};

export default GoogleReviewsWidget;
