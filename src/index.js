import app from "./app";

const main = () => {
    app.get('/',(req,res)=> res.json({"api":"api node js cambios"}))
    app.listen( process.env.PORT || 9090);

};

main();
