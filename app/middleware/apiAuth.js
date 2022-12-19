const db = require('../models');
const arduino = db.arduinos;
const utils = require('../utils/apiKeyService')

exports.clientAPI = async (req, res, next) => {
    let clientApiKey = req.get('x-api-key')
    if (!clientApiKey) {
        return res.status(400).send({
            status: false,
            response: "Missing Api Key"
        });
    }
    ;
    try {
        let clientDetails = await utils.getApiKeyData(arduino, clientApiKey);
        if (clientDetails) {
            next();
        }
    } catch (e) {
//         console.log('%%%%%%%% error :', e);
        return res.status(400).send({
            status: false,
            response: "Invalid Api Key"
        });
    }

}
