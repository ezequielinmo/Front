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

    try {
        const url = buildTokkoUrl(
            process.env.TOKKO_DEVELOPMENTS_URL || DEFAULT_DEVELOPMENTS_URL,
            {
                lang: "es_ar",
                format: "json",
                limit: 10,
                offset: 0,
            }
        );

        return sendJson(res, 200, await requestTokko(url));
    } catch (error) {
        return handleError(res, error);
    }
};
