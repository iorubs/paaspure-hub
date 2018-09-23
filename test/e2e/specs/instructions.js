// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer + '/#/instructions')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#content')
      .assert.containsText('h1', 'Welcome')
      .assert.elementCount('img', 1)
      .end()
  }
}
