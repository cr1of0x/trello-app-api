const errorValidation = ( status, key, message, res) => {
    return res.status(status).json({error: {details:[
        {
            "message": `${message}`,              
            "context": {
                "key": `${key}`
            }
        }
    ]}})
}

module.exports = errorValidation