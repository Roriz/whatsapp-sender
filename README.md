# Whatsapp Sender
This project has as object make automatize send a message without WhatsApp business. To make this possible, this project uses https://api.whatsapp.com and https://web.whatsapp.com public endpoints.
This project doesn't use any reverse engineering to auth, send or manipulate original WhatsApp data, if you need massive send or send without restrictions, please use https://www.whatsapp.com/business.

# Chrome extension
Unfortunate this project fragilize chrome store rule and we can't send to in chrome store :(.

# Install

1. Download or clone this repository
2. Open chrome://extensions
3. Click on the top-right toggle to developer mode
4. Click on "Load unpacked"
5. Select the `build` folder inside of a repository downloaded/cloned.
6. Use as you wish :).

# How works

1. Create group of whatsapp phones
2. Write a message
3. Click to "send!"
4. vue app send mgs via `chrome.runtime.sendMessage`
5. `chrome.runtime.sendMessage` lister and trigger `sender.js`
6. `sender.js` open new tab with `web.whatsapp.com/send` endpoint
7. `background.js` inject `click-to-send.js` based on `url`
8. `click-to-send` await for click on send button or message with "invalid phone"
9. `click-to-send` send mgs via `chrome.runtime.sendMessage` for report
10. `sender.js` trigger next phone, go to step 6.
11. After all phones has done, `event-orchestrator.js` save the report via `chrome.storage.sync`.
