exports.getApiKeyData = (arduino,key) => {
    return new Promise((resolve,reject) => {
        arduino.findOne({where: {apiKey: key}})
            .then(data => {
                if (data){
                    resolve(data)
                } else {
                    reject(false)
                }
            });
    });
};