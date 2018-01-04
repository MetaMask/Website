var ModelViewer = require('metamask-logo')
var detect = require('detect-browser').detect
var isMobile = !!detectMobile()

showCorrectButton()
injectMascot()

function showCorrectButton(){
  const browser = detect()

  // Touch the web3 object to trigger Brave install prompt
  typeof window.web3

  switch (browser.name) {

    case 'firefox':
      var firefoxLink = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
      updateDownloadLinks('Get Firefox Addon', firefoxLink)

      break

    case 'opera':
      var operaLink = 'https://addons.opera.com/en/extensions/details/metamask/'
      updateDownloadLinks('Get Opera Extension', operaLink)
      break

  }
}

function updateDownloadLinks(text, url){
  var navLink = document.querySelector('#nav-install-button')
  navLink.innerText = text
  navLink.href = url
  var mainLink = document.querySelector('#main-install-button')
  mainLink.innerText = text
  mainLink.href = url
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

