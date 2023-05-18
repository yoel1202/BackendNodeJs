import { methods as database } from "../database/database";

const getName = async (req, res) => {
    try {
        if (req.query.id !== undefined) {
            let id = req.query.id
            const result = await database.sqlSentences("call `Clients.getByName`"+`('${id}')`);
            res.json({ value: result[0] });
        } else {
            res.status(404);
            res.send("Por Favor enviar el parametro correspondiente");
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const insertClient = async (req, res) => {

    const { name} = req.body;

    if (name === undefined ) {
        res.status(400).json({ message: "Bad Request. el body no tiene la estrutura correcta." });
    } else {
        let response = null;
        try {

            const result = await database.sqlSentences("call `Clients.insertClient`"+`('${name}')`);
            res.json({ value: result[0] });
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    

    }
}
export const methods = {
    getName,
    insertClient
};
