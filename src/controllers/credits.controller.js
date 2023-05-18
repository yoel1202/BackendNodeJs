import { methods as database } from "./../database/database";


const listToCredits = async (req, res) => {
    try {
        const result = await database.sqlSentences("call `Credits.listToCredits`()");
        res.json({ value: result[0] });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const searchCredits = async (req, res) => {
    try {
        if (req.query.data !== undefined) {
            let data = req.query.data
            const result = await database.sqlSentences("call `Credits.searchCredits`"+`('${data}')`);
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
const calculateAmountByReceipt = async (req, res) => {
    try {
        if (req.query.serie !== undefined) {
            let serie = req.query.serie
            const result = await database.sqlSentences("call `Credits.calculateAmountByReceipt`"+`('${serie}',@total)`);
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


const calculateLastInvoice = async (req, res) => {
    try {
        if (req.query.codeContract !== undefined) {
            let codeContract = req.query.codeContract
            const result = await database.sqlSentences("call `Credits.calculateLastInvoice`"+`('${codeContract}')`);
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
const lastPeriod = async (req, res) => {
    try {
        if (req.query.codeContract !== undefined) {
            let codeContract = req.query.codeContract
            const result = await database.sqlSentences("call `Credits.lastPeriod`"+`('${codeContract}')`);
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

const historyPayment = async (req, res) => {
    try {
        if (req.query.codeContract !== undefined) {
            let codeContract = req.query.codeContract
            const result = await database.sqlSentences("call `Credits.historyPayment`"+`('${codeContract}')`);
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

const validatePeriodExist = async (req, res) => {
    try {
        if (req.query.codeContract !== undefined && req.query.period !== undefined) {
            let codeContract = req.query.codeContract
            let period= req.query.period
            const result = await database.sqlSentences("call `Credits.validatePeriodExist`"+`('${codeContract},'${period}'')`);
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
const updatePeriod = async (req, res) => {

    const { codeContracts, period} = req.body;

    if (codeContracts === undefined || period === undefined ) {
        res.status(400).json({ message: "Bad Request. el body no tiene la estrutura correcta." });
    } else {
        let response = null;
        try {

            const result = await database.sqlSentences("call `Credits.updatePeriod`"+`('${codeContracts}','${period}', @Mensaje)`);
            response = result
            console.log(response,"resultadosssssssss")
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
        if (response.affectedRows > 0) {
            res.json({ response: "Se ejecuto la consulta correctamente" });

        } else {
            res.status(500);
            res.json({ error: "El registro no es posile editarlo. Por favor entelo nuevamente" });
        }

    }
}
export const methods = {
    listToCredits,
    searchCredits,
    calculateAmountByReceipt,
    calculateLastInvoice,
    lastPeriod,
    historyPayment,
    updatePeriod
};
