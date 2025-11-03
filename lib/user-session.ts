import { SessionOptions } from "iron-session";

export interface UserSessionData {
  userId: string;
  email: string;
  isLoggedIn: boolean;
}

export const userSessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "vcm_user_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  },
};
