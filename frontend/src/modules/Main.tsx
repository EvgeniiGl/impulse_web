import SideLeft from "@modules/SideLeft.tsx";
import React from "react";

type MainProps = {
    children?: React.ReactNode;
};

export default function Main({children}: MainProps) {
    return (
        <main className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-1">
                <aside className="lg:flex-[1] space-y-6">
                    <div className="min-h-screen rounded-lg">
                        <SideLeft/>
                    </div>
                </aside>
                <section className="lg:flex-[4] space-y-6">
                    {children}
                </section>
            </div>
        </main>
    )
}