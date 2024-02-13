import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";
import { db } from "../../../../../firebase";
import { doc, setDoc, collection, getDoc} from "firebase/firestore";
declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name: string;
			image: string;
			email: string;
		};
	}
}
interface User {
	id: string;
	name: string;
	password: string;
	
  }
  const users: Record<string, User> = {
	admin: {
	  id: "1",
	  name: "admin",
	  password: "admin",

	},
  };

const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			id: "telegram-login",
			name: "Telegram Login",
			credentials: {},
			async authorize(credentials, req) {
				const validator = new AuthDataValidator({
					botToken: `6720322535:AAGlaAhZ4r4LbellSslyC7mZMUVKUN_h9GE`,
				});

				const data = objectToAuthDataMap(req.query || {});
				const user = await validator.validate(data);
				
				if (user.id && user.first_name) {
					const returned = {
						id: user.id.toString(),
						email: user.id.toString(),
						name: [user.first_name, user.last_name || ""].join(" "),
						image: user.photo_url,
					};
					try {
						const studentsRef = doc(db, "students", returned.id);
						const docSnap = await getDoc(studentsRef);
							await setDoc(studentsRef, {
								id: returned.id,
								name: returned.name,
								email: returned.email,
								image: returned.image,
								accepted: false,
							  });
						  

					} catch {
						console.log(
							"Something went wrong while creating the user."
						);
					}

					return returned;
				}
				return null;
			},
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				name: { label: "login", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
                if (!credentials?.name || !credentials?.password){
                    return null;
                }
			const user = users[credentials.name];
			if (!user || user.password !== credentials.password) {
			return null;
			}
			return new Promise((resolve) => resolve(user));
      },
		}),
	],
	session: {
		strategy: "jwt",
	  },
	callbacks: {
		async jwt({ token, user }) {
            if (user){
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
            return token
          },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    email: token.email
                }
            }
          },
	},
	pages: {
		signIn: "/auth" && "/admin",
		error: "/auth",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



   
