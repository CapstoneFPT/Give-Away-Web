import {useNavigate} from "react-router-dom";

const useNavigateToListProducts = () => {
    const navigate = useNavigate();
    const goToListProducts = (masterItemCode: string) => {
        console.log("Navigating to ListItem with master item code:", masterItemCode);
        navigate(`/listItems/${masterItemCode}`);
    };
    return {
        goToListProducts
    }
}

export default useNavigateToListProducts;