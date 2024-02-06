import { app } from "./app";


app.get("/", (req, res) => {
    return res.status(200).json({msg: "api funcionando"})
})


app.listen(3000, () => console.log("server running..."))