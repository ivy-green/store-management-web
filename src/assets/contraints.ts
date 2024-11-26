export const API_URL_BASE = "http://localhost:8081/api"
export const API_URL_BASE_DEV = "https://localhost:8081/api"

// application
export const URL_HOME = "/customer"
export const URL_CART = "/customer/cart"
export const URL_PROFILE = "/customer/profile"
export const URL_LOGIN = "/auth"
export const URL_REGISTER = "/auth/register"

export const URL_ADMIN = "/admin"
export const URL_PRODUCT = "/admin/products"
export const URL_BILL = "/admin/bills"
export const URL_ADMIN_PROFILE = "/admin/profile"
export const URL_STATISTIC = "/admin/statistic"
export const URL_PRODUCT_TYPE = "/admin/producttypes"
export const URL_USER = "/admin/users"

// api
export const API_AUTH_LOGIN = "/auth/login"
export const API_AUTH_REFRESH_TOKEN = "/auth/refreshToken"
export const API_AUTH_LOGOUT = "/auth/logout"
export const API_AUTH_REGISTER = "/auth/register"

export const API_STATISTIC_REVENUE = "/statistic/revenue"
export const API_STATISTIC_REVENUE_BY_DAYS = "/statistic/revenue/days"
export const API_STATISTIC_GENERAL = "/statistic/general"

export const API_PRODUCT = "/product"
export const API_PRODUCT_GETLIST = API_PRODUCT
export const API_PRODUCT_CUSTOMER_GETLIST = API_PRODUCT + "/market"
export const API_PRODUCT_ADD = API_PRODUCT
export const API_PRODUCT_REMOVE = API_PRODUCT
export const API_PRODUCT_UPDATE = API_PRODUCT
export const API_PRODUCT_UPDATE_ON_SALE = API_PRODUCT + "/sale"
export const API_PRODUCT_GETBYID = API_PRODUCT + "/:id"

export const API_PRODUCT_TYPE = "/producttype"
export const API_PRODUCT_TYPE_GETLIST = API_PRODUCT_TYPE
export const API_PRODUCT_TYPE_ADD = API_PRODUCT_TYPE
export const API_PRODUCT_TYPE_REMOVE = API_PRODUCT_TYPE
export const API_PRODUCT_TYPE_UPDATE = API_PRODUCT_TYPE
export const API_PRODUCT_TYPE_GETBYID = API_PRODUCT_TYPE + "/:id"

export const API_BRANCH = "/branch"
export const API_BRANCH_GETLIST = API_BRANCH
export const API_BRANCH_ADD = API_BRANCH
export const API_BRANCH_REMOVE = API_BRANCH
export const API_BRANCH_UPDATE = API_BRANCH
export const API_BRANCH_GETBYID = API_BRANCH + "/:id"

export const API_USER = "/user"
export const API_USER_GETLIST = API_USER
export const API_USER_PROFILE = API_USER + "/profile"
export const API_USER_ADD = API_USER
export const API_USER_UPLOAD = API_USER + "/upload"
export const API_USER_UPDATE = API_USER + "/profile/update"
export const API_USER_REMOVE = API_USER
export const API_USER_SEARCH = API_USER + "/search"
export const API_USER_GETBYID = API_USER + ":id"

export const API_BILL = "/bill"
export const API_BILL_GETLIST = API_BILL
export const API_BILL_ADD = API_BILL
export const API_BILL_UPDATE = API_BILL
export const API_BILL_GETBYID = API_BILL + ":id"

