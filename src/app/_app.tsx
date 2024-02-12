
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </ThemeProvider >
    );
}

export default MyApp;