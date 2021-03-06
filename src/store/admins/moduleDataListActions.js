import axios from "@/axios.js";

// Admin Create updates others users

export default {
  addItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/users", item)
        .then((response) => {
          commit("ADD_User", Object.assign(item, { id: response.data.id }));
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // FETCH USERs USER

  fetchDataListItems({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/users")
        .then((response) => {
          commit("SET_User", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // UPDATE USER

  updateItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/v1/users/${item.id}`, item)
        .then((response) => {
          commit("SET_UserById", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // REMOVE USER

  removeItem({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/v1/users/${itemId}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // FETCH ALL ROLES

  fetchRoles({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/allowed_roles")
        .then((response) => {
          commit("SET_Roles", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // FETCH USER BY ID

  fetchUserById({ commit }, id) {
    if (id >= 0) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/v1/users/${id}`)
          .then((response) => {
            commit("SET_UserById", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
  // FETCH ALL COMPANIES

  fetchCompany({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/companies`)
        .then((response) => {
          commit("SET_COMPANIES", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //  FETCH COMPANY GROUP FILTER

  fetchCompanyGroupFilter({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/company_group/filter/category/${id}`)
        .then((response) => {
          commit("SET_COMPANIES_GROUP_FILTER", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // FETCH COMPANIES BY ID

  fetchCompanyID({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/companies/${id}`)
        .then((response) => {
          commit("SET_COMPANIES_ID", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // FETCH ALL DEALER COMPANIES BY DEALER ID

  fetchCompanyDealerID({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/company_group/dealer_company/${id}`)
        .then((response) => {
          commit("SET_COMPANIES_dealer", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // FETCH ALL PRODUCTS LIST

  fetchProducts({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/products/page/${id}`)
        .then((response) => {
          commit("SET_Products", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // FETCH PRODUCTS BY ID

  fetchProductID({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/products/${id}`)
        .then((response) => {
          commit("SET_ProductsID", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  
  // FETCH SEARCH PRODUCTS 

  fetchProductSearch({ commit }, obj) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/products/search/${obj.page}`,
        { params: { name: obj.name } }
        )
        .then((response) => {
          commit("SET_Products", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
    // Get product by category id
    GetProduct ({ commit }, obj) {
        return new Promise((resolve, reject) => {
          axios.get(`api/v1/subcategory/products/filter/${obj.page}/${obj.id}`,
          // { params: { page: obj.page  } }
          )
            .then((response) => {
              commit("SET_FilteredProducts", response.data);
              resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    },
        // GET ALL CATEGORIES
        GetCategory ({ commit }, obj) {
          return new Promise((resolve, reject) => {
            axios.get('api/v1/category'
            )
              .then((response) => {
                commit("SET_Category", response.data);
                resolve(response)
              })
              .catch((error) => { reject(error) })
          })
      },
  // GET COMPANY PARENTS

  fetchDataCompanies({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/companies_parents")
        .then((response) => {
          commit("SET_COMPANIES1", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // ADDING COMPANY FOR USER

  AddUserCompanies({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/company_group/dealer", payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  
    // COMPANY DEALER DELETE

    DeleteDealerCompany({ commit }, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/v1/dealer_company/delete",
          { data: 
            payload 
          }
          )
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  NotisfyGet({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/v1/notifications/${localStorage.getItem("Id")}`)
        .then((response) => {
          if (response.data.headers !== null && response.data.length !== 0) {
            commit("SET_Notisfy", response.data.filter((x) => x.status  === "SEEN"));
            commit("SET_notseen", response.data.filter((x) => x.status  !== "SEEN"));
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  NotisfyPut({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/v1/notifications/seen/${id}`)
        .then((response) => {
          commit("SET_Notisfy", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  NotisfySeenAll({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/v1/notifications/seen/all/${localStorage.getItem("Id")}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  NotisfyDelete({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/v1/notifications/delete/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  UserReviews({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`/api/v1/users/review`, payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  UserFeedbacks({commit}){
    return new Promise((resolve, reject) => {
      axios.get('/api/v1/review/users')
      .then((response) => {
        console.log(response);
        commit('UserReviews', response.data)
        resolve(response)
      })
      .catch((error) => {
        reject(error);
      });
    })
  },

  // GET TOTAL number of USERS
  postUserCounts({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/users/count", payload)
        .then((res) => res.data)
        .then(({ count }) => {
          resolve(count);
        })
        .catch((err) => reject(err));
    });
  },
};
