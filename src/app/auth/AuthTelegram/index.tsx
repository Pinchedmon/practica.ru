"use client";

import { LoginButton } from "@telegram-auth/react";
import { Button } from "@/components/ui/button";

import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInButton({ botUsername }: { botUsername: string }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return 'reload'
    }

    if (status === "authenticated") {
        return (
            <Button onClick={() => signOut()}> Выйти</Button>
        );
    }

    return (
        <>

            <LoginButton
                botUsername={'Practica_ru_bot'}
                onAuthCallback={(data: any) => {
                    signIn("telegram-login", { callbackUrl: "/" }, data as any);
                }}
            />
        </>
    );
}