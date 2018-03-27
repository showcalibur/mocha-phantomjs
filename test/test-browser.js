'use strict';

var should = require('should');

var phantomjs = require('phantomjs-prebuilt');
var webdriverio = require('webdriverio');
var options = { waitforTimeout: 1000, desiredCapabilities: { browserName: 'phantomjs' } };
var process = phantomjs.run('--webdriver=4444');

describe('Mozilla Website', function() {
  describe('Browse index page', function() {
    it('should has title "MDN Web Docs"', function() {
      this.timeout(5000);
      return process.then(program => {
        return webdriverio.remote(options).init()
          .url('https://developer.mozilla.org/en-US/')
          .saveScreenshot('./test/screenshots/it-should-has-title.png')
          .getTitle().then(title => {
            console.log(title);
            title.should.be.equals('MDN Web Docs');
            program.kill();
          });
      });
    });
  });
});
