'use client';
import { ThemeProvider } from "next-themes";

export default function provider({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider defaultTheme="system" attribute="class">
            <div className="text-gray-700 bg-white dark:text-white dark:bg-gray-500 transition-colors duration-200 min-h-screen " >
                {children}
            </div>
        </ThemeProvider>
    )
}