import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDatabase, ref, set } from "firebase/database";
import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";

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
const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "telegram-login",
			name: "Telegram Login",
			credentials: {},
			async authorize(credentials, req) {
				const validator = new AuthDataValidator({
					botToken: `${process.env.BOT_TOKEN}`,
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
        
                        const db = getDatabase();
                        set(ref(db, 'users/' + returned.id), {
                            username: returned.name,
                            email: returned.email,
                            profile_picture : returned.image
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
	],
	callbacks: {
		async session({ session, user, token }) {
			session.user.id = session.user.email;
			return session;
		},
	},
	pages: {
		signIn: "/auth",
		error: "/auth",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };