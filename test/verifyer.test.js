var assert = require('assert');
var verifyer = require('../lib/verifyer');

describe('verifyer', function() {

    verifyer.registerDomain('www.test.com');
    verifyer.registerDomain('www.foo.com');

    context('when a domain is ok', function() {
 
        it('should return true', function() {
            assert(verifyer.verify('www.foo.com'));
        });
    });

    context('when a domain is not ok', function() {
 
        it('should return false', function() {
            assert(!verifyer.verify('www.fo.com'));
        });
    });

    it('should return all registered domains', function() {

        var domains = verifyer.listAll();
        assert(domains.indexOf('www.test.com') !== -1);
        assert(domains.indexOf('www.foo.com') !== -1);  
    });

});