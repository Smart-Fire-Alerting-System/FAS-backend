import axios from "axios";
import { publishData } from "../utils/mttqUtils.js";
import { adaRequest } from '../utils/axiosUtils.js';
import { handleReturn } from "../utils/handleResponse.js";
import * as dataUtils from "../utils/dataUtils.js";

export const currentTemperature = async (req, res, next) => {
    adaRequest.get("/feeds/yolo-sensor/data/last")
        .then(({data}) => {
            res.status(200).json({
                ...data, 
                feed_key: "yolo-sensor",
                message: "successful"
            });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
}

export const currentHumid = async (req, res, next) => {
    adaRequest
        .get("/feeds/dht20-humid/data/last")
        .then(({ data }) => {
            res.status(200).json({
                ...data,
                feed_key: "dht20-humid",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const lastFan = async (req, res, next) => {
    adaRequest
        .get("/feeds/yolo-fan/data/last")
        .then(({ data }) => {
            res.status(200).json({
                ...data,
                feed_key: "yolo-fan",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const lastLed = async (req, res, next) => {
    adaRequest
        .get("/feeds/yolo-led/data/last")
        .then(({ data }) => {
            res.status(200).json({
                ...data,
                feed_key: "yolo-led",
                message: "successful",
            });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};




// set value to adafruit
export const setFan = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        return next(new Error("Value is not sent!"));
    } else {
        let temperature = parseInt(value);
        if (temperature >= 0 && temperature <= 100) {
            publishData("yolo-fan", temperature, (result) =>
                handleReturn(result, res, next)
            );
        } else {
            res.status(400);
            return next(new Error("Value is invalid"));
        }
    }
};


export const toggleLed = async (req, res, next) => {
    const { value } = req.body;
    if (!value) {
        res.status(400);
        return next(new Error("Value is not sent!"));
    } else {
        let light = parseInt(value);
        if (light >= 0 && light <= 1) {
            publishData("yolo-led", light, (result) =>
                handleReturn(result, res, next)
            );
        } else {
            res.status(400);
            return next(new Error("Value is invalid"));
        }
    }
};



// get data history from adafruit

// today data
export const getDayTemperatures = async (req, res, next) => {
    // console.log(req);
    let date = req.query["date"] ? req.query["date"] : null;
    let params;
    let now = true;
    let today = new Date();

    let startD =  new Date(
        `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()-7}`
    );;
    let endD  = new Date(
        `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()}`
    );
    
    let startDString = startD.toISOString().substring(0, 10) + "T17:00:00Z";
    
    let endDString = endD.toISOString().substring(0, 10) + "T17:00:00Z";

    params = {
        start_time: startDString,
        end_time: endDString,
    };
    now = false;

    adaRequest
        .get(`/feeds/yolo-sensor/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            let result = dataUtils.dataCal(values, now);
            res.status(200).json({ feed_key: "yolo-sensor", data: result });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};


export const getDayHumidities = async (req, res, next) => {
    let date = req.query["date"] ? req.query["date"] : null;
    let params;
    let now = true;
    let today = new Date();
    
    let startD;
    let endD;
    
    startD = new Date(
        `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()-7}`
    );
    endD = new Date(
        `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()}`
    );

    let startDString = startD.toISOString().substring(0, 10) + "T17:00:00Z";
    
    let endDString = endD.toISOString().substring(0, 10) + "T17:00:00Z";

    params = {
        start_time: startDString,
        end_time: endDString,
    };
    now = false;

    adaRequest
        .get(`/feeds/dht20-humid/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            let result = dataUtils.dataCal(values, now);
            res.status(200).json({ feed_key: "dht20-humid", data: result });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

export const getDayTempAndHumid = async (req, res, next) => {
    let params;
    let now = true;
    let today = new Date();
    
    let startD;
    let endD;
    
    startD = new Date(
        `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()-7}`
    );
    endD = new Date(
        `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()}`
    );

    let startDString = startD.toISOString().substring(0, 10) + "T17:00:00Z";
    
    let endDString = endD.toISOString().substring(0, 10) + "T17:00:00Z";

    params = {
        start_time: startDString,
        end_time: endDString,
    };
    now = false;

    let humidData = await adaRequest
        .get(`/feeds/dht20-humid/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            return dataUtils.dataCal(values, now);
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });


    let tempData = await adaRequest.get(`/feeds/yolo-sensor/data/chart`, {
        params: params,
    })
    .then(({ data }) => {
        let values = data["data"];
        return dataUtils.dataCal(values, now);
    })
    .catch((error) => {
        res.status(400);
        return next(new Error(error.message));
    });


    let result = [];
    for (let i = 0; i < tempData.length; i++) {
        result.push({
            dow: tempData[i].dow,
            temp: tempData[i].value,
            humid: humidData[i].value,
        });
    }

    res.status(200).json(result);
    
};


export const getWarningsInDay = async (req, res, next) => {
    // let date = req.query["date"] ? req.query["date"] : null;
    let params;
    let today = new Date();


    let endDString;
    let startDString;
    if (today.getHours() < 7) {
        startDString = today.toISOString().substring(0, 10) + "T17:00:00Z";
    }
    else {
        let startD = new Date(
            `${today.getFullYear()} ${today.getMonth() + 1} ${today.getDate()-1}`
        );
        startDString = startD.toDateString().substring(0, 10) + "T17:00:00Z";
    }
    // today.setHours();
    endDString = today.toISOString();
    params = {
        start_time: startDString,
        end_time: endDString,
    };

    adaRequest
        .get(`/feeds/yolo-sensor/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            let result = dataUtils.retrieveNumberOfHighTemp(values);
            res.status(200).json({ warning_times: result });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
}