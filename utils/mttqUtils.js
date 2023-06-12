import mqtt from "mqtt";

function publishData(feedName, data, callback) {
    const broker = "mqtt://io.adafruit.com";
    const port = 1883;
    const username = `${process.env.ADAFRUIT_IO_USERNAME}`;
    const password = `${process.env.ADAFRUIT_KEY}`;
    const client = mqtt.connect(broker, {
        port: port,
        username: username,
        password: password,
    });
    const jsonData = JSON.stringify({
        value: data,
    });
    client.on("connect", function () {
        console.log("Successfully connected to adafruit");
        client.publish(`${username}/feeds/${feedName}`, jsonData, (error) => {
            if (error !== undefined) {
                callback(false);
            } else {
                callback(true);
            }
            client.end();
        });
    });
}

export { publishData };
