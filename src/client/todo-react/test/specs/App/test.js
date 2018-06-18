const expect = require('chai').expect;

describe('My React Test', function () {
  beforeEach(function() {
    browser.url('./');
  })

  it('should open page', function () {
    let pageHeading = browser.getText('.App-title');
    expect(pageHeading).to.equal('My Todo List');
  })
})