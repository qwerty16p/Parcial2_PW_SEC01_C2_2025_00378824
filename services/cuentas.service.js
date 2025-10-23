const cuentasData = require('../data/accounts');

const parseBalance = (balanceStr) => {
    return parseFloat(balanceStr.replace(/[$,]/g, ''));
};


const getAll = () => {
    return cuentasData;
};

const findById = (id) => {
    return cuentasData.find(c => c._id === id);
};

const search = (queryValue) => {
    const value = queryValue.toLowerCase();
    return cuentasData.filter(c =>
        c._id.toLowerCase() === value ||
        c.Client.toLowerCase().includes(value) ||
        c.gender.toLowerCase() === value
    );
}

const calculateActiveBalance = () => {
    const activeCuentas = cuentasData.filter(c => c.isActive);
    const status = activeCuentas.length > 0;

    let totalBalance = 0;
    if (status) {

        totalBalance = activeCuentas.reduce((sum, cuenta) => {
            return sum + parseBalance(cuenta.balance);
        }, 0);
    }

    return { status, accountBalance: totalBalance.toFixed(2) };
};

module.exports = {
    getAll,
    findById,
    search,
    calculateActiveBalance
};