export const userDetailTemplate = {
  email: "email",
  isApproved: false,
  isEmailVerified: true,
  isVerified: false,
  role: "",
  VerifiedBy: "",
  _id: "id",
  name: "name",
  isProfile: false,
  profileImage:
    "https://massengeruserprofileimage.s3.ap-south-1.amazonaws.com/general-contact-icon.jpg",
};

export const userProfileTemplate = {
  firstName: "",
  lastName: "",
  personalDetails: {
    mobileNo: "",
    employeeId: "",
    aadharNumber: 0,
    panNumber: "",
    dateOfBirth: "",
  },
  bankDetails: {
    accNumber: 0,
    bankName: "",
    branch: "",
    IFSC_code: "",
  },
  designation: "",
  address: {
    city: "",
    state: "",
    country: "",
    zip: "",
  },
  experience: 0,
  joiningDate: "",
};
export const systemVariablesTemplate = {
  ROLES: {
    ADMIN: "admin",
    CANTEEN_USER: "canteen_user",
    NORMAL_USER: "normal_user",
  },
  UNITS: {
    NOS: "nos",
    KG: "kg",
    LITRE: "litre",
  },
};
