import NextAuth, {
  Account,
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
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BASE_API_URL}/v1.0/auth/login`, {
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
    async signIn({ account, profile }): Promise<boolean> {
      if (account?.provider === 'google') {
        await fetch(`${process.env.BASE_API_URL}/v1.0/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName: profile?.name,
            email: profile?.email,
            password: 'travelgen'
          })
        })
        return true
      }
      return true
    },
    async jwt({
      account,
      token,
      user
    }: {
      account: Account | null
      token: JWT
      user?: User
    }): Promise<JWT> {
      if (account?.provider === 'google') {
        const res = await fetch(`${process.env.BASE_API_URL}/v1.0/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: token?.email,
            password: 'travelgen'
          })
        })
        const userToken = await res.json()
        return { ...token, ...user, ...userToken }
      }
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
