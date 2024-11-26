const httpMessage: Record<string, string> = {
    Forbidden: "You don't have permission",
    NOT_CONFIRM_EMAIL: "Please check your mail box to confirm the letter before log in",
    NOT_FOUND_USER: "User not found",
    EXIST_USERNAME: "This username has been taken",
    EXIST_EMAIL: "This mail has been used. Please try another",
    INVALID_USERNAME: "Incorrect Username or Password. Please try again",
    INCORRECT_PASSWORD: "Incorrect Username or Password. Please try again",
    PASSWORD_TOKEN_EMAIL_INCORRECT: "OTP code is not match. Please try later",
    USER_BLOCKED: "Your account has been blocked. Please contact 089-822-8317",
    USER_ALREADY_HAS_STRIPE: "User already has a Stripe account.",
    ORDER_NOT_FOUND: "Order not found. Please try later",
    NOT_FOUND_USER_STRIPE: "Stripe user information not found.",
    COURSE_ALREADY_IN_CART: "This course is already in your cart.",
    CART_ITEM_NOT_FOUND: "The item you selected is no longer available in your cart",
};

export default httpMessage;
