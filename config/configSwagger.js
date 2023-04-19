const Path = 'doc/Doc.yml'

const configSwagger = {
    definition:{
        openapi: '3.0.0',
        info:{
            title :'',
            version:'',
            description:
                '',
        },
        servers: [
            {
                url: 'http://127.0.0.1:3000',
            },
        ],
    },
    apis: [Path]
};

module.exports = {configSwagger}