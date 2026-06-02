const {
    buildTokkoUrl,
    DEFAULT_PROPERTIES_URL,
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
            process.env.TOKKO_PROPERTIES_URL || DEFAULT_PROPERTIES_URL,
            {
                lang: "es_ar",
                format: "json",
                limit: req.query.limit,
                offset: req.query.offset,
            }
        );

        return sendJson(res, 200, await requestTokko(url));
    } catch (error) {
        return handleError(res, error);
    }
};
