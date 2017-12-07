const yaml = require('js-yaml');
const path = require('path');
const fs   = require('fs');

const BankService = require('../../Services/BankService');
const yaml_dir = '/../../yaml/examples';

module.exports = {
  handleCreditCardOffers: function(options, cb) {
    BankService.getCreditCardOffers(options.userId, function(result) {
      if(result[0].error) {
        try {
            const va = yaml.safeLoad(fs.readFileSync(path.join(__dirname + yaml_dir) + '/connection_error.yml', 'utf8'));
            cb(yaml.safeDump(va));
          } catch (e) {
          console.log(e);
        }
      } else {
       try {
         //credit_card_offer
           const va = yaml.safeLoad(fs.readFileSync(path.join(__dirname + yaml_dir) + '/credit_card_offers.yml', 'utf8'));
           console.log(va);
           for(const key of va){
             console.log("component: "+key.component);
             if(key.component == 'chat_widget') {
               key.properties.type = "credit_card_offer";
               key.properties.data.pop();
               for (var i=0; i<result.length; i++){
                 var eachOffer = {
                   "apr": result[i].apr,
                   "creditLimit": result[i].creditLimit,
                   "imgPath": result[i].imgPath,
                   "cardProductId": result[i].cardProductId
                 }
                 key.properties.data.push(eachOffer);
               }
             }
           }
           console.log("\n\n\n\n"+yaml.safeDump(va));
           const test = yaml.safeDump(va);
           cb(test);
         } catch (e) {
         console.log(e);
        }
      }
    });
  }
};
