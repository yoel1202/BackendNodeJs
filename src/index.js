import app from "./app";

const main = () => {
    app.get('/',(req,res)=> res.json({"api":"BIENVENIDOS A LA API v2:)"}))
    app.listen( process.env.PORT || 9090);

};

main();
