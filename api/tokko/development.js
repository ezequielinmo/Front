const {
    buildTokkoUrl,
    DEFAULT_DEVELOPMENTS_URL,
    handleError,
    requestTokko,
    sendJson,
} = require("../_lib/tokko");

module.exports = async (req, res) => {
    if (req.method !== "GET") {
        return sendJson(res, 405, { error: "Metodo no permitido." });
    }

    if (!req.query.id) {
        return sendJson(res, 400, { error: "Falta indicar el emprendimiento." });
    }

    try {
        const baseUrl = process.env.TOKKO_DEVELOPMENTS_URL || DEFAULT_DEVELOPMENTS_URL;
        const id = encodeURIComponent(String(req.query.id));
        const url = buildTokkoUrl(`${baseUrl.replace(/\/$/, "")}/${id}/`, {
            lang: "es_ar",
            format: "json",
        });

        return sendJson(res, 200, await requestTokko(url));
    } catch (error) {
        return handleError(res, error);
    }
};
