const yaml = require('js-yaml');
const path = require('path');
const fs   = require('fs');

const BankService = require('../../Services/BankService');
const yaml_dir = '/../../yaml/examples';

module.exports = {
  handleManageExpenses: function(options, cb) {
    BankService.getTransactionsByCategory(options.userId, function(result) {
      console.log("Expense Result:", result);

      if(result[0].error) {
        try {
            const va = yaml.safeLoad(fs.readFileSync(path.join(__dirname + yaml_dir) + '/connection_error.yml', 'utf8'));
            cb(yaml.safeDump(va));
          } catch (e) {
          console.log(e);
        }
      } else {
        // generating YAML response
        try {
            const doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname + yaml_dir) + '/expense_report.yml', 'utf8'));

            for(const key of doc){
              if(key.component == "chat_widget") {
                key.properties.type = "expenses";
                key.properties.data.rent = result.rent;
                key.properties.data.creditCard = result.creditCard;
                key.properties.data.food = result.food;
                key.properties.data.transportation = result.transportation;
                key.properties.data.utilities = result.utilities;
                key.properties.data.discretionary = result.discretionary;
              }
            }

            console.log(yaml.safeDump(doc));

            cb(yaml.safeDump(doc));
          } catch (e) {
            console.log(e);
        }
      }
    });
  }
};
