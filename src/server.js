"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.app.get("/", (req, res) => {
    return res.status(200).json({ msg: "api funcionando" });
});
app_1.app.listen(3000, () => console.log("server running..."));
