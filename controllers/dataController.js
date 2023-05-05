import axios from "axios";
import { publishData } from "../utils/mttqUtils.js";
import { adaRequest } from '../utils/axiosUtils.js';
import { handleReturn } from "../utils/handleResponse.js";
import * as dataUtils from "../utils/dataUtils.js";

export const currentTemperature = async (req, res, next) => {
    adaRequest.get("/feeds/yolo-sensor/data/last")
        .then(({data}) => {
            console.log("data: ", data);
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
        let temperature = parseFloat(value);
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
        let light = parseFloat(value);
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
    console.log(today);
    if (date && dataUtils.isIsoDate(date)) {
        let d = new Date(date);
        if (
            today.getFullYear() == d.getFullYear() &&
            today.getMonth() == d.getMonth() &&
            today.getDate() == d.getDate()
        ) {
            params = {
                hours: 24,
            };
        } else {
            let startD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()-1}`
            );
            let startDString = startD.toISOString();
            let endD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate() + 1}`
            );
            let endDString = endD.toISOString();
            params = {
                start_time: startDString,
                end_time: endDString,
            };
            now = false;
        }
    } else {
        params = {
            hours: 24,
        };
    }
    adaRequest
        .get(`/feeds/yolo-sensor/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            let ld = new Date(values[values.length - 1][0]);
            let newValues = values.filter((e) => {
                const d = new Date(e[0]);
                if (
                    d.getHours() == ld.getHours() &&
                    d.getDate() == ld.getDate() - 1
                ) {
                    return false;
                }
                return true;
            });
            let result = dataUtils.dataCal(newValues, now);
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
    if (date && dataUtils.isIsoDate(date)) {
        let today = new Date();
        let d = new Date(date);
        if (
            today.getFullYear() == d.getFullYear() &&
            today.getMonth() == d.getMonth() &&
            today.getDate() == d.getDate()
        ) {
            params = {
                hours: 24,
            };
        } else {
            let startD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()-1}`
            );
            let startDString = startD.toISOString();
            let endD = new Date(
                `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate() + 1}`
            );
            let endDString = endD.toISOString();
            params = {
                start_time: startDString,
                end_time: endDString,
            };
            now = false;
        }
    } else {
        params = {
            hours: 24,
        };
    }
    adaRequest
        .get(`/feeds/dht20-humid/data/chart`, {
            params: params,
        })
        .then(({ data }) => {
            let values = data["data"];
            let ld = new Date(values[values.length - 1][0]);
            let newValues = values.filter((e) => {
                const d = new Date(e[0]);
                if (
                    d.getHours() == ld.getHours() &&
                    d.getDate() == ld.getDate() - 1
                ) {
                    return false;
                }
                return true;
            });
            let result = dataUtils.dataCal(newValues, now);
            res.status(200).json({ feed_key: "dht20-humid", data: result });
        })
        .catch((error) => {
            res.status(400);
            return next(new Error(error.message));
        });
};

