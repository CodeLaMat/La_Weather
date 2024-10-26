const protocol =
  process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "https" : "http";
const backendIpAddress = process.env.NEXT_PUBLIC_BACKEND_IP_ADDRESS;
const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT;

const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? `${protocol}://${process.env.NEXT_PUBLIC_BACKEND_DEPLOYMENT_URL}`
    : `${protocol}://${backendIpAddress}:${backendPort}`;

export const backendApiRoutes = {
  INDEX: `${BACKEND_URL}`,
  LOGIN: `${BACKEND_URL}/auth/login`, // POST
  REGISTER: `${BACKEND_URL}/auth/register`, // POST
  LOGOUT: `${BACKEND_URL}/auth/logout`, // POST
  CREATE_GOOGLE_USER: `${BACKEND_URL}/auth/create-google-user`, // POST
  USER: `${BACKEND_URL}/auth/user`, // GET
  FAVORITES: `${BACKEND_URL}/api/favorites`, // GET
  ADD_FAVORITE: `${BACKEND_URL}/api/favorites/add`, // POST
  REMOVE_FAVORITE: `${BACKEND_URL}/api/favorites/remove`, // POST
  RESET_PASSWORD: `${BACKEND_URL}/auth/reset-password`, // POST
  REQUEST_PASSWORD_RESET: `${BACKEND_URL}/auth/request-password-reset`, // POST
};
