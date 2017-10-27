var ModelViewer = require('metamask-logo')
var detect = require('detect-browser').detect
var isMobile = !!detectMobile()

showCorrectButton()
injectMascot()

function showCorrectButton(){
  const browser = detect()

  typeof window.web3 // Touching the web3 object to trigger Brave prompting to install.

  console.log('browser', browser)
  switch (browser.name) {
    case 'firefox':
      var link = document.querySelector('#install-button')
      var firefoxLink = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
      link.innerText = 'Get Firefox Addon'
      link.href = firefoxLink
      break
    case 'opera':
      var link = document.querySelector('#install-button')
      var operaLink = 'https://addons.opera.com/en/extensions/details/metamask/'
      link.innerText = 'Get Opera Extension'
      link.href = operaLink
      break

  }
}

function injectMascot(){
  // get container from DOM
  var container = document.getElementById('logo-container')

  if (!container) return

  // To render with fixed dimensions:
  var viewer = ModelViewer({

    // Dictates whether width & height are px or multiplied
    pxNotRatio: false,
    width: 0.10,
    height: 0.10,
    minWidth: 200,

    followMouse: !isMobile,
    slowDrift: isMobile,
  })

  // add viewer to DOM
  container.appendChild(viewer.container)

}

function detectMobile() {
  return (
      navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
  )
}

