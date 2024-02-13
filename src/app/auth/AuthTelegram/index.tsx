"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div>
                        {/* <Avatar>
                            <AvatarImage
                                src={session.user?.image ?? "/default.webp"}
                                alt="@shadcn"
                            />
                            <AvatarFallback>
                                {session.user?.name}
                            </AvatarFallback>
                        </Avatar> */}
                        eqwewq
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Test 1</DropdownMenuItem>
                    <DropdownMenuItem disabled>Test 2</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
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