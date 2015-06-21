//***** ConnectionVerifyer module *****//

var Verifyer = (function() {

    var domains = []

    function ConnectionVerifyer() {
    };

    ConnectionVerifyer.prototype.registerDomain = function(domain) {
        domains.push(domain);
    };

    ConnectionVerifyer.prototype.verify = function(domain) {
        return domains.indexOf(domain) > -1;
    };

    ConnectionVerifyer.prototype.listAll = function() {
        return domains;
    };

    return ConnectionVerifyer;
})();


module.exports = new Verifyer();