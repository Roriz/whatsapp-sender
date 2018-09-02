
module.exports = {
  name: 'whatsapp-sender',
  version: '0.0.1',
  description: 'Send message for any whatsapp-user',
  author: 'Radamés Roriz <radamesroriz@gmail.com>',
  manifest_version: 2,
  icons: { '16': 'icons/16.png', '128': 'icons/128.png' },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'background',
    'webNavigation'
  ],
  browser_action: {
    name: 'Open sender'
  },
  background: {
    persistent: false,
    page: 'pages/background.html'
  },
  options_page: 'pages/options.html',
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: [ 'panel.html', 'js/content.js' ]
}
