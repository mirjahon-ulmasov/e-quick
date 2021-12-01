
import themeConfig, { colors } from '@/../themeConfig.js'

const userDefaults = {
  userRole    : 'admin'
}

// function stringify (x) {
//   console.log(Object.prototype.toString.call(x), 'ok' );
// }

const userInfoLocalStorage = localStorage.getItem('UserInfo') || {}
const getUserInfo = () => {
  const userInfo = {}
  Object.keys(userDefaults).forEach((key) => {
    // If property is defined in localStorage => Use that
    userInfo[key] = userInfoLocalStorage[key] ?  userInfoLocalStorage[key] : userDefaults[key]
  })
  // Include properties from localStorage
  Object.keys(userInfoLocalStorage).forEach((key) => {
    if (userInfo[key] === undefined && userInfoLocalStorage[key] !== null) userInfo[key] = userInfoLocalStorage[key]
  })
  return userInfo
}


// Check if device is touch device
// This is used to remove perfect scrollbar from touch devices
// Using Dynamic components
const is_touch_device = () => {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  const mq = function (query) {
    return window.matchMedia(query).matches
  }

  if ('ontouchstart' in window || window.DocumentTouch) {
    return true
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}


// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
  AppActiveUser           : getUserInfo(),
  bodyOverlay             : false,
  isVerticalNavMenuActive : true,
  is_touch_device         : is_touch_device(),
  mainLayoutType          : themeConfig.mainLayoutType || 'vertical',
  reduceButton            : themeConfig.sidebarCollapsed,
  verticalNavMenuWidth    : 'default',
  verticalNavMenuItemsMin : false,
  scrollY                 : 0,
  theme                   : themeConfig.theme || 'light',
  themePrimaryColor       : colors.primary,
  windowWidth: null
}

export default state
