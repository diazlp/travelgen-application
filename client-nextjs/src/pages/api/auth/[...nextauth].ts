import NextAuth, {
  CookiesOptions,
  NextAuthOptions,
  Session,
  User
} from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: 'next-auth.session-token',
    options: {
      httpOnly: true,
      sameSite: 'none',
      path: '/',
      domain: process.env.NEXTAUTH_URL,
      secure: false
    }
  },
  callbackUrl: {
    name: 'next-auth.callback-url',
    options: {}
  },
  csrfToken: {
    name: 'next-auth.csrf-token',
    options: {}
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET
    // })
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const res = await fetch('http://localhost:4009/v1.0/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })
        const user = await res.json()

        if (!user.token) {
          throw new Error(user.message)
        }

        return user
      }
    })
  ],
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      return { ...token, ...user }
    },
    async session({
      session,
      token
    }: {
      session: Session
      token: JWT
    }): Promise<Session> {
      session.user = token
      return session
    }
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60 // 7 days
  }
}

export default NextAuth(authOptions)
