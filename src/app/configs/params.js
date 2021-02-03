import {
    apiPort
} from  "../helpers/config";

const params = {
    development: {
        apiPort
    },
    production: {
        apiPort,
    }
};

export default params["development"];
