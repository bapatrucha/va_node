const yaml = require('js-yaml');
const path = require('path');
const fs   = require('fs');
const json2yaml = require('json2yaml');

const BankService = require('../../Services/BankService');
const yaml_dir = '/../../yaml/examples';

module.exports = {

  handleManageSubscriptions(options, cb) {
    BankService.getSubscriptions(options.userId, function(result) {
      console.log("Subscriptions result", result);
      // check for server issue
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
            const va = yaml.safeLoad(fs.readFileSync(path.join(__dirname + yaml_dir) + '/manage_subscriptions.yml', 'utf8'));
            for(const key of va){
              console.log("component: " + key.component);
              if(key.component == 'chat_widget') {
                const subscriptions = json2yaml.stringify(result);
                console.log("subscriptions: "+subscriptions);
                key.properties.data.pop();

                /*key.properties.type = "subscriptions";
                key.properties.data.pop();
                for (var i=0; i<result.length; i++){
                  var eachSubscription = {
                    "amount": result[i].AMOUNT,
                    "subscription": result[i].SUBSCRIPTION,
                    "subscriptionId": result[i].SUBSCRIPTION_ID,
                    "category": result[i].CATEGORY,
                    "imgPath": result[i].IMGPATH
                  }
                  key.properties.data.push(eachSubscription);
                }*/
                subscriptions.replace
                key.properties.data.push(subscriptions);
              }
            }
            //console.log(yaml.safeDump(va));
            cb(yaml.safeDump(va));
          } catch (e) {
          console.log(e);
          }
        }
      });

  }
}
