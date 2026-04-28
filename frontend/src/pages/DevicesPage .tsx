import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";
import DeviceList from "@components/Devices/DeviceList.tsx";
import {useAppSelector} from "@store/store.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

// Заглушка для изображения, если не загрузится


export const DevicesPage: React.FC = () => {

    const navigate = useNavigate();
    const {isAuthenticated} = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return <></>
    }

    return (
        <>
            <Header/>
            <Main>
                <DeviceList/>
            </Main>
        </>
    );
};