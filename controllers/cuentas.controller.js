const cuentasService = require('../services/cuentas.service'); 

const searchCuentasLogic = (req, res) => {
    const queryKey = Object.keys(req.query)[0]; 
    const queryValue = req.query[queryKey];     

    const results = cuentasService.search(queryValue);

    const finded = results.length > 0;
    const response = { finded };

    if (results.length === 1) {
        response.account = results[0];
    } else if (results.length > 1) {
        response.data = results;
    } else {
        response.account = {};
    }

    return res.json(response);
};


exports.getAllCuentas = (req, res) => {
    if (Object.keys(req.query).length > 0) {
        return searchCuentasLogic(req, res);
    }
    
    const data = cuentasService.getAll();
    return res.json({
        count: data.length, 
        data: data          
    });
};


exports.getCuentaById = (req, res) => {
    const cuentaId = req.params.id;
    const account = cuentasService.findById(cuentaId); 

    if (account) {
        return res.json({
            finded: true,
            account: account
        });
    } else {
        return res.status(404).json({
            finded: false,
            account: {}
        });
    }
};

exports.getTotalBalance = (req, res) => {
    const balanceResult = cuentasService.calculateActiveBalance(); 
    
    
    return res.json(balanceResult);
};