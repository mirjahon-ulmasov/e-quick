import jwt from '../../http/requests/auth/jwt/index.js'
export default {
  
  loginJWT ({ commit, dispatch }, payload) {

    return new Promise((resolve, reject) => {
      jwt.login(payload.userDetails.username, payload.userDetails.password)
        .then(response => {
          console.log(response)
          if (response) {
            // Decode jwt token
            function parseJwt(token) {
              try {
                // Get Token Header
                const base64HeaderUrl = token.split('.')[0];
                const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
                const headerData = JSON.parse(window.atob(base64Header));
            
                // Get Token payload and date's
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                const dataJWT = JSON.parse(window.atob(base64));
                dataJWT.header = headerData;
            
            // TODO: add expiration at check ...
            
            
                return dataJWT;
              } catch (err) {
                return false;
              }
            }
            //  User Info
            const userInfo = parseJwt(response.data.access_token)
            // Set userId
            localStorage.setItem('Id', userInfo.id)
            // Set userRole in mutations
            commit('UPDATE_USER_INFO', userInfo,  {root: true})
            // Set bearer token in axios
            commit('SET_BEARER', response.data.access_token)
            resolve(response)
          } else {
            reject({message: 'Wrong Email or Password'})
          }
        })
        .catch(error => { reject(error) })
    })
  },
}
