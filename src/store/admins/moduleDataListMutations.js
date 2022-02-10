export default {
  ADD_User(state, item) {
    state.admins.unshift(item);
  },
  SET_User(state, admins) {
    state.admins = admins;
  },
  UserReviews(state, reviews){
    state.reviews = reviews.reverse()
  },
  SET_Roles(state, roles) {
    state.roles = roles;
  },
  SET_UserById(state, detail) {
    state.detail = detail;
  },
  SET_Notisfy(state, notisfy) {
      state.notisfy = notisfy
  },
  SET_notseen(state, notisfy) {
      state.not_seen = notisfy
  },
  SET_COMPANIES1(state, companies) {
    state.parent_companies = companies;
  },
  SET_COMPANIES(state, companies) {
    state.companies = companies;
  },
  SET_COMPANIES_ID(state, company_id) {
    state.company_id = company_id;
  },
  SET_COMPANIES_dealer(state, dealer_company) {
    state.dealer_company = dealer_company;
  },
  SET_Products(state, products) {
    state.products = products;
  },
  SET_ProductsID(state, product_detail) {
    state.product_detail = product_detail;
  },
  SET_Category(state, category){
    state.category = category
  }
};
