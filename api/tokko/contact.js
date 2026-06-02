const {
    buildTokkoUrl,
    DEFAULT_CONTACT_URL,
    getApiKey,
    handleError,
    requestTokko,
    sendJson,
} = require("../_lib/tokko");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return sendJson(res, 405, { error: "Metodo no permitido." });
    }

    const { name, email, phone, tags } = req.body || {};

    if (!name || !email || !phone || !tags) {
        return sendJson(res, 400, { error: "Faltan datos de contacto." });
    }

    try {
        const url = buildTokkoUrl(process.env.TOKKO_CONTACT_URL || DEFAULT_CONTACT_URL);
        const data = await requestTokko(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: getApiKey(),
                name,
                email,
                phone,
                tags,
            }),
        });

        return sendJson(res, 200, data);
    } catch (error) {
        return handleError(res, error);
    }
};
