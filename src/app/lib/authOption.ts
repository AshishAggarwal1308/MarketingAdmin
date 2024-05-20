import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your UserName" },
        password: { label: "Password", type: "password", placeholder: "Enter your Password" }
      },
      async authorize(credentials) {
        // Validate username and password securely
        try {
          const isValidUsername = credentials?.username === process.env.NEXTAUTH_USERNAME;  // Use NEXTAUTH_USERNAME for clarity
          const isValidPassword = await validatePassword(credentials?.password); // Secure password validation

          if (isValidUsername && isValidPassword) {
            return { username: credentials?.username };
          } else {
            throw new Error('Invalid username or password'); // Handle errors gracefully
          }
        } catch (error) {
          console.error('Authentication error:', error); // Log error for debugging
          return null; // Indicate failed authentication
        }
      }
    })
  ],
  // pages:{signIn:"/authentication/login"},
  secret: process.env.JWT_SECRET || "secret", // Use a strong, random secret for JWT signing in production
  session: {
    jwt: true, // Enable JWT-based sessions for authentication
    maxAge: 24 * 60 * 60, // Set session expiration to 24 hours (adjust as needed)
  },
  callbacks: {
    async session({ token, session }:{token:any,session:any}) {
      session.user.id = token.sub;
      return session;
    }
  }
};

// Function for secure password validation (replace with your implementation)
async function validatePassword(password:any) {
  // Hash the provided password and compare it to a securely stored hash
  // (e.g., using bcrypt or a similar library)
  const isValid = password===process.env.NEXTAUTH_PASSWORD
  return isValid;
}
