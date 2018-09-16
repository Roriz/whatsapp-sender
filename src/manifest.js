
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
    'storage',
    'background',
    'webNavigation'
  ],
  browser_action: {
    default_title: 'title',
    default_popup: 'pages/popup.html'
  },
  background: {
    persistent: false,
    page: 'pages/background.html'
  },
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
}
