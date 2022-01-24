
const mutations = {
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
    console.log(userInfo);
    localStorage.setItem('Id', userInfo.id)
   state.userType = userInfo.user_type
  }
}

export default mutations

