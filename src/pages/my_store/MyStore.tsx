import React, { useEffect, useState } from "react";
import type { StoreType } from "../../types/store.types";
import { useSeller } from "../../contexts/SellerContext";
import { getStoreDetails } from "../../services/storeService";
import toast from "react-hot-toast";
import "./MyStore.css";
import defaultLogo from "../../assets/logoPlaceholder.png";
import { useNavigate } from "react-router-dom";
import { AuthError } from "../../services/tokenService";

export const StoreNotFound: React.FC = () => {
  const navigate=useNavigate()
  return (
    <div id="store-not-found">
      <h1>Store not found</h1>
      <p>You have not created any store yet</p>
      <button onClick={()=>navigate("/store-form")} className="primary-btn">Create Store</button>
    </div>
  );
};

const Field: React.FC<{ label: string; value: string | null | undefined }> = ({
  label,
  value,
}) => (
  <div className="my-store-field">
    <label><h4>{label}</h4></label>
    <p>{value || "N/A"}</p>
  </div>
);

const MyStore: React.FC = () => {
  const [store, setStore] = useState<StoreType | null>(null);
  const [loading, setLoading] = useState(true);
  const { seller, login } = useSeller();
  const navigate = useNavigate();

  useEffect(() => {
    const loadStore = async () => {
      if (seller) {
        try {
          const data = await getStoreDetails(seller, login);
          setStore(data);
        } catch (err: any) {
          if (err instanceof AuthError) {
            toast.error("Session expired. Please login again.");
            navigate("/login", { replace: true });
            return;
          }
          console.error(err);
          toast.error(err?.message || "Failed to load store");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadStore();
  }, [seller, login, navigate]);


  if (loading) return <div>Loading...</div>;
  if (!loading && !store) return <StoreNotFound />;

  return (
    <div id="my-store">
      <header>
        <h1>Store Details</h1>
        <button
          className="primary-btn"
          onClick={() => navigate("/store-form")}
        >
          Edit Details
        </button>
      </header>

      <section>
        <header>
          <span>Business Details</span>
        </header>
        <main>
          <div className="my-store-field">
            <label>Business Logo</label>
            <img
              id="business-logo"
              src={store?.businessLogo || defaultLogo}
              alt="Business Logo"
            />
          </div>
          <Field label="Business Name" value={store?.businessName} />
          <Field label="Business Type" value={store?.businessType} />
          <Field label="GSTIN" value={store?.gstin} />
        </main>
      </section>

      <section>
        <header>
          <span>Owner Details</span>

        </header>
        <main>
          <Field label="Owner Name" value={store?.ownerName} />
          <Field label="Contact Email" value={store?.contactEmail} />
          <Field label="Contact Phone" value={store?.contactPhone} />
        </main>
      </section>

      <section>
        <header>
          <span>Address</span>

        </header>
        <main>
          <Field label="Street" value={store?.address.street} />
          <Field label="City" value={store?.address.city} />
          <Field label="State" value={store?.address.state} />
          <Field label="Postal Code" value={store?.address.postalCode} />
          <Field label="Country" value={store?.address.country} />
        </main>
      </section>

      <section>
        <header>
          <span>Bank Details</span>

        </header>
        <main>
          <Field
            label="Account Holder Name"
            value={store?.bankDetails.accountHolderName}
          />
          <Field
            label="Account Number"
            value={store?.bankDetails.accountNumber}
          />
          <Field label="IFSC Code" value={store?.bankDetails.ifscCode} />
        </main>
      </section>

      <section>
        <header>
          <span>Identity</span>

        </header>
        <main>
          <Field label="Aadhaar Number" value={store?.aadhaarNumber} />
          <Field label="PAN Number" value={store?.panNumber} />
        </main>
      </section>
    </div>
  );
};

export default MyStore;
