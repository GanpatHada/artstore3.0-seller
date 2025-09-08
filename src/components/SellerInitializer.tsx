import { type ReactNode, useEffect } from "react";
import { useSeller } from "../contexts/SellerContext";
import { fetchSellerDetails } from "../services/sellerService";

interface SellerInitializerProps {
  children: ReactNode;
}

const SellerInitializer = ({ children }: SellerInitializerProps) => {
  const { seller, login, setLoading } = useSeller();

  useEffect(() => {
    const getSellerDetailsOnLoad = async () => {
      try {
        const sellerDetails = await fetchSellerDetails();
        login(sellerDetails);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (!seller) {
      getSellerDetailsOnLoad();
    } else {
      setLoading(false);
    }
  }, []);

  return <>{children}</>;
};

export default SellerInitializer;
