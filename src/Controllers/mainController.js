let db = require('../database/models');

const mainController ={ 
    index:  (req, res) => {
        res.render ('index')
    }
};

module.exports = mainController;