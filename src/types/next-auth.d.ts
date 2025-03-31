import { Role } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    role: Role
    id: string
  }

  interface Session {
    user: User & {
      role: Role
      id: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
    id: string
  }
}
