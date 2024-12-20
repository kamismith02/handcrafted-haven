import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
});

export const config = {
  //matcher: ["/profile", "/products/:path*", "!/api/auth/:path*"], 
};