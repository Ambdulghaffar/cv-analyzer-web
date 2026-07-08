export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  onboardingRole: "/onboarding/role",
  dashboard: {
    candidate: "/dashboard/candidate",
    recruiter: "/dashboard/recruiter",
  },
} as const
