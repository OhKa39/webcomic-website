'use client';
import { ThemeProvider } from "next-themes";
import {NextUIProvider} from "@nextui-org/react";
export default function provider({
    children, 
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider defaultTheme="system" attribute="class">
            <NextUIProvider>
                <div className="text-gray-700 bg-white dark:text-white dark:bg-gray-500 transition-colors duration-200 min-h-screen " >
                    {children}
                </div>
            </NextUIProvider>
        </ThemeProvider>
    )
}