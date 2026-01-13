import Menu from "@modules/Menu.tsx";
import React from "react";

type MainProps = {
    children?: React.ReactNode;
};

export default function Main({children}: MainProps) {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <aside className="lg:col-span-1 space-y-6">
                    <div className="h-64 bg-gray-100 rounded-lg"></div>
                    <div className="h-48 bg-gray-100 rounded-lg"></div>
                </aside>

                <section className="lg:col-span-2 space-y-6">
                    {children}
                </section>
            </div>
        </main>
    )
}