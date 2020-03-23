import Vue from 'vue'
import axios from 'axios'
import smoothscroll from 'smoothscroll-polyfill'

import layout from '../utils/layout'
import DEFAULT_IMG from '../assets/images/default-img.png'

smoothscroll.polyfill()

let resizeTimeout
let LWW = layout.width // Last window width
let LWH = layout.height // Last window height
let isLastBreakpointDesktop = layout.isDesktop

const EventBus = new Vue()

function onWindowResize () {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    let CWW = layout.width // Current window width
    let CWH = layout.width // Current window height

    if (CWW === LWW && CWH === LWH) {
      return
    }

    if (CWW !== LWW) {
      LWW = CWW
      EventBus.$emit('window:x-resized', CWW)

      let isCurrentBreakpointDesktop = layout.isDesktop

      if (isCurrentBreakpointDesktop !== isLastBreakpointDesktop) {
        isLastBreakpointDesktop = isCurrentBreakpointDesktop
        EventBus.$emit('window:breakpoint', CWW)
      }
    }

    if (CWH !== LWH) {
      LWH = CWH
      EventBus.$emit('window:y-resized', CWH)
    }

    EventBus.$emit('window:resized', CWW, CWH)
  }, 250)
}

function onDocumentKeyUp ({ keyCode }) {
  if (keyCode === 27) {
    EventBus.$emit('esc')
  }
}

window.addEventListener('resize', onWindowResize)
document.addEventListener('keyup', onDocumentKeyUp)

Vue.use({
  install (vm) {
    vm.prototype.$http = axios
    vm.prototype.$bus = EventBus

    vm.filter('space-price', value => ('' + value)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '))

    vm.filter('specialCharacter', value => ('' + value)
      .replace(/[`~!@#/$%^&*(),.?":{}|\\<>]/g, ''))

    vm.filter('onlyNumber', value => ('' + value)
      .replace(/[^\d]+/g, ''))

    vm.filter('onlyPhone', value => ('' + value)
      .replace(/[^+-.\d]+/g, ''))

    vm.directive('bg-img', {
      bind ({ style }, { value }) {
        let img = new Image()

        img.onload = img.onerror = ({ type }) => {
          style.backgroundImage = `url("${type === 'load' ? value : DEFAULT_IMG}")`
        }

        img.src = value
      }
    })
  }
})
