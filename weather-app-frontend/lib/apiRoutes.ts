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
  LOGOUT: `${BACKEND_URL}/auth/logout`, // POST
  REGISTER: `${BACKEND_URL}/auth/register`, // POST
  USER: `${BACKEND_URL}/auth/user`, // GET
};
