import Menu from "@modules/Menu.tsx";
import React from "react";

type MainProps = {
    children?: React.ReactNode;
};

export default function Main({children}: MainProps) {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-1">
                <aside className="lg:flex-[1] space-y-6">
                    <div className="h-64 bg-gray-100 rounded-lg">
                        <Menu/>
                    </div>
                </aside>

                <section className="lg:flex-[4] space-y-6">
                    {children}
                </section>
            </div>
        </main>
    )
}