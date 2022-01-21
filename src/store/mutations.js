
const mutations = {
  // Vertical NavMenu

  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE (state, value) {
    state.isVerticalNavMenuActive = value
  },
  TOGGLE_REDUCE_BUTTON (state, val) {
    state.reduceButton = val
  },
  UPDATE_MAIN_LAYOUT_TYPE (state, val) {
    state.mainLayoutType = val
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN (state, val) {
    state.verticalNavMenuItemsMin = val
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH (state, width) {
    state.verticalNavMenuWidth = width
  },


  // ////////////////////////////////////////////
  // UI
  // ////////////////////////////////////////////

  TOGGLE_CONTENT_OVERLAY (state, val) { state.bodyOverlay       = val   },
  UPDATE_PRIMARY_COLOR (state, val)   { state.themePrimaryColor = val   },
  UPDATE_THEME (state, val)           { state.theme             = val   },
  UPDATE_WINDOW_WIDTH (state, width)  { state.windowWidth       = width },
  UPDATE_WINDOW_SCROLL_Y (state, val) { state.scrollY           = val   },


  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  // Updates user info in state and localstorage
  UPDATE_USER_INFO (state, payload) {            // Decode jwt token
    function parseJwt (token) {
      try {
        // Get Token Header
        const base64HeaderUrl = token.split('.')[0]
        const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/')
        const headerData = JSON.parse(window.atob(base64Header))
    
        // Get Token payload and date's
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        const dataJWT = JSON.parse(window.atob(base64))
        dataJWT.header = headerData
    
        // TODO: add expiration at check ...
    
    
        return dataJWT
      } catch (err) {
        return false
      }
    }
    const userInfo = parseJwt(payload)
    localStorage.setItem('Id', userInfo.id)
   state.userType = userInfo.user_type
  }
}

export default mutations

