import mqtt from "mqtt";

const realtimeUpdate = (io) => {
    const username = `${process.env.ADAFRUIT_IO_USERNAME}`;
    const key = `${process.env.ADAFRUIT_KEY}`;
    const host = "mqtt://io.adafruit.com";
    const client = mqtt.connect(host, {
        username: username,
        password: key,
    });

    client.on("connect", () => {
        console.log("Connected to adafruit");
        // Subscribe to the temperature feed
        client.subscribe(`${username}/feeds/yolo-sensor`);
        // console.log("Subscribe temperature feed");

        // Subscribe to the humidity feed
        client.subscribe(`${username}/feeds/dht20-humid`);
        // console.log("Subscribe humidity feed");

        // Subscribe to the fan feed
        client.subscribe(`${username}/feeds/yolo-fan`);
        // console.log("Subscribe fan feed");


        // Subscribe to the light feed
        client.subscribe(`${username}/feeds/yolo-led`);
        // console.log("Subscribe light feed"); 

        // // Subscribe to the crops status feed
        // client.subscribe(`${username}/feeds/person`);
        // // console.log("Subscribe crops status feed");
    });

    client.on("message", (topic, message) => {
        let data = message;

        if (topic.endsWith("yolo-sensor")) {
            // Emit a "temperatureUpdate" event with the new temperature data
            io.emit("temperatureUpdate", { temperature: parseInt(data) });
            console.log(parseInt(data));
            console.log(`Temperature: ${data}°C`);
        } else if (topic.endsWith("dht20-humid")) {
            // Emit a "humidityUpdate" event with the new humidity data
            io.emit("humidityUpdate", { humidity: parseInt(data) });
            console.log(parseInt(data));
            console.log(`Humidity: ${data}%`);
        } else if (topic.endsWith("yolo-fan")) {
            // Emit a "fanUpdate" event with the new fan data
            io.emit("fanUpdate", { fan: parseInt(data) });
            console.log(`Fan: ${data}`);
        
        } else if (topic.endsWith("yolo-led")) {
            // Emit a "lightUpdate" event with the new light data
            io.emit("ledUpdate", { led: parseInt(data) });
            console.log(`Light fron gate-way: ${data}`);
        }
    });
};

export default realtimeUpdate;
