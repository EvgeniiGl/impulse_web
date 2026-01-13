import Menu from "@modules/Menu.tsx";

export default function Header() {

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <div className="flex items-center space-x-4">
                <div className="h-10 w-32 bg-gray-200 rounded"></div>
                <Menu/>
            </div>
            <div className="flex items-center space-x-4">
                <div className="h-10 w-24 bg-gray-200 rounded"></div>
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            </div>
        </header>
    )
}