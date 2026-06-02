const DEFAULT_PROPERTIES_URL = "https://www.tokkobroker.com/api/v1/property/";
const DEFAULT_DEVELOPMENTS_URL = "https://www.tokkobroker.com/api/v1/development/";
const DEFAULT_CONTACT_URL = "https://tokkobroker.com/api/v1/webcontact/";

const getApiKey = () => {
    const apiKey = process.env.TOKKO_API_KEY;

    if (!apiKey) {
        throw new Error("Falta configurar TOKKO_API_KEY.");
    }

    return apiKey;
};

const buildTokkoUrl = (baseUrl, params = {}) => {
    const url = new URL(baseUrl);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, String(value));
        }
    });

    url.searchParams.set("key", getApiKey());
    return url;
};

const sendJson = (res, status, body) => {
    res.status(status).json(body);
};

const requestTokko = async (url, options = {}) => {
    const response = await fetch(url, options);
    const text = await response.text();
    let data = {};

    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = { message: text };
        }
    }

    if (!response.ok) {
        const error = new Error("Tokko respondio con un error.");
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
};

const handleError = (res, error) => {
    console.error("Error al consultar Tokko:", error);

    if (error.status) {
        return sendJson(res, error.status, {
            error: "Tokko no pudo procesar la solicitud.",
        });
    }

    return sendJson(res, 500, {
        error: "No se pudo completar la solicitud.",
    });
};

module.exports = {
    buildTokkoUrl,
    DEFAULT_CONTACT_URL,
    DEFAULT_DEVELOPMENTS_URL,
    DEFAULT_PROPERTIES_URL,
    getApiKey,
    handleError,
    requestTokko,
    sendJson,
};
