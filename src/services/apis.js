const BASE_URL = import.meta.env.VITE_BASE_URL;


export const categories = {

  
  CATEGORIES_API: `${BASE_URL}/api/v1/course/showAllCategories`,
};


export const loginapi = {

  
  LOGIN_API: `${BASE_URL}/api/v1/auth/login`,
};


export const signupapi = {
  SIGNUP_API: `${BASE_URL}/api/v1/auth/signup`
}


export const otpapi = {
  OTP_API: `${BASE_URL}/api/v1/auth/sendotp`
}

export const verifyotpapi = {
  OTP_API: `${BASE_URL}/api/v1/auth/verifyotp`
}

export const resetpasswordtokenapi = {
RESETPASSWORDTOKEN_API : `${BASE_URL}/api/v1/auth/resetPasswordToken`
}


export const resetPasswordapi = {
  RESETPASSWORD_API : `${BASE_URL}/api/v1/auth/reset-password`
}

export const contactUsapi = {
  CONTACT_US_API : `${BASE_URL}/api/v1/auth/contact-us`
}

export const settingsapi = {
  UPDATE_PROFILE_API: `${BASE_URL}/api/v1/profile/updateProfile`,
  UPDATE_PROFILE_PICTURE_API: `${BASE_URL}/api/v1/profile/profilePicUpdate`,
  DELETE_PROFILE_API: `${BASE_URL}/api/v1/profile/deleteProfile`,
};

export const getcoursesapi = 
{
  GET_COURSES_API : `${BASE_URL}/api/v1/auth/Profile/getEnrolledCourses`
}
export const profileEndpoints = {
  GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/api/v1/profile/getEnrolledCourses`,
};
