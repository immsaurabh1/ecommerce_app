const convict = require("convict");

// Schema Configuration
let config = convict({
    environment: {
        doc: "The application environment.",
        format: ["production", "development"],
        default: "development",
        env: "NODE_ENV",
        arg: "environment"
    },
    region: {
        doc: "The region in which the application is being run.",
        format: "String",
        default: "in",
        env: "REGION",
        arg: "region"
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3333,
        arg: "port"
    },
    db: {
        uri: {
            doc: 'Database host name/IP',
            format: '*',
            default: 'mongodb://localhost/test'
        },
        options: {
            doc: 'Database options',
            format: "Object",
            default: { dbName: 'ecommerce_db', useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
        }
    },
    sessionStoreSecret: {
        doc: "Session store secret.",
        format: "String",
        default: "khebcDv9hsJGEyzEQ4TvZdDdihkaHDjf",
        arg: "sessionStoreSecret"
    },
});

// Loading region-environment dependent configuration
config.loadFile([
    `${__dirname}/${config.get("region")}/${config.get("environment")}.json`
]);

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;