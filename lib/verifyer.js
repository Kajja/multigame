/**
 * Module that expose and object used to verify
 * if clients that want to connect to the mulitgame server
 * are from an ok url.
 */

/**
 * Module that returns a constructor function
 * for ConnectionVerifyer objects.
 */
var Verifyer = (function() {

    // Accepted domains
    var domains = []

    /**
     * Constructor function
     */
    function ConnectionVerifyer() {
    };

    /**
     * Method to register a domain that shall be regarded
     * as an ok domain.
     *
     * @param {String} domain - domain name that shall be registred.
     */
    ConnectionVerifyer.prototype.registerDomain = function(domain) {
        domains.push(domain);
    };

    /**
     * Method to verify if a domain is ok.
     *
     * @param {String} domain - domain that shall be verified
     * @return {Boolean} bool - true/false if the domain are among the ok domains or not
     */
    ConnectionVerifyer.prototype.verify = function(domain) {
        return domains.indexOf(domain) > -1;
    };

    /**
     * Method to list all ok domains.
     *
     * @return {Array} domains - an array of all ok domains
     */
    ConnectionVerifyer.prototype.listAll = function() {
        return domains;
    };

    return ConnectionVerifyer;
})();


module.exports = new Verifyer();