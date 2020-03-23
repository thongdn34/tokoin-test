// Refer to responsive breakpoints
const RESPONSIVE_BREAKPOINTS = {
  desktop: 1024
}

function calculateScrollWidth () {
  let tempDiv = document.createElement('div')

  tempDiv.style.position = 'absolute'
  tempDiv.style.top = '0px'
  tempDiv.style.left = '0px'
  tempDiv.style.width = '100%'
  tempDiv.style.height = '50px'
  tempDiv.style.overflowY = 'scroll'

  document.body.appendChild(tempDiv)

  let fullWidth = tempDiv.offsetWidth
  let limitWidth = tempDiv.clientWidth

  document.body.removeChild(tempDiv)

  return fullWidth - limitWidth
}

export default {
  scrollWidth: calculateScrollWidth(),
  breakpoints: RESPONSIVE_BREAKPOINTS,

  get screenWidth () {
    return window.innerWidth
  },

  get width () {
    return document.documentElement.offsetWidth
  },

  get height () {
    return window.innerHeight
  },

  get isDesktop () {
    return this.screenWidth >= RESPONSIVE_BREAKPOINTS.desktop
  },

  get isMobile () {
    return !this.isDesktop
  }
}
