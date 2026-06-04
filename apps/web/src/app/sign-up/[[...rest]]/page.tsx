"use client";
import { SignUp } from "@clerk/nextjs";
import { clerkAppearanceLight, clerkAppearanceDark } from "@/lib/clerk-appearance";
import { useTheme } from "next-themes";

export default function Page() {
    const { resolvedTheme  } = useTheme();
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <SignUp
                appearance={resolvedTheme === "dark" ? clerkAppearanceDark : clerkAppearanceLight}
            />
        </div>
    );
}