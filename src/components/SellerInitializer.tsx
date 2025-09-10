import { type ReactNode, useEffect } from "react";
import { useSeller } from "../contexts/SellerContext";
import { fetchSellerDetails } from "../services/sellerService";
import { useLocation } from "react-router-dom";

interface SellerInitializerProps {
  children: ReactNode;
}

const SellerInitializer = ({ children }: SellerInitializerProps) => {
  const { seller, login, setLoading,loading } = useSeller();
  const location=useLocation()

  useEffect(() => {
    const getSellerDetailsOnLoad = async () => {
      setLoading(true)
      try {
        const sellerDetails = await fetchSellerDetails();
        login(sellerDetails);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!seller && loading && location.pathname!=='/login'&&location.pathname!=='/signup') {
      getSellerDetailsOnLoad();
    }
  }, []);

  return <>{children}</>;
};

export default SellerInitializer;
