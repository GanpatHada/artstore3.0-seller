import React, { useEffect, useState } from "react";
import "./Settings.css";
import { useSeller } from "../../contexts/SellerContext";
import { fetchUpdateProfile } from "../../services/sellerService";

const Profile = () => {
  const { seller, dispatch, login } = useSeller();
  const [fullName, setFullName] = useState(seller?.fullName || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    seller?.profileImage || null
  );

  const [initialFullName, setInitialFullName] = useState(seller?.fullName || "");
  const [initialProfileImage, setInitialProfileImage] = useState(seller?.profileImage || null);


  const isChanged = fullName !== initialFullName || profileImage !== null || previewUrl !== initialProfileImage;

  useEffect(() => {
    if (seller) {
      setFullName(seller.fullName);
      setPreviewUrl(seller.profileImage);
      setInitialFullName(seller.fullName);
      setInitialProfileImage(seller.profileImage);
    }
  }, [seller]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setPreviewUrl(null);
  };

  const handleUpdate = async () => {
    if (!seller) return;

    const updateData: { fullName?: string; profileImage?: File | null } = {};

    if (fullName !== initialFullName) {
      updateData.fullName = fullName;
    }

    if (previewUrl !== initialProfileImage) {
        updateData.profileImage = profileImage;
    }
    
    if(previewUrl===null && initialProfileImage!==null){
        updateData.profileImage = null;
    }


    if (Object.keys(updateData).length === 0) {
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const updatedSeller = await fetchUpdateProfile(seller, login, updateData);
      
      dispatch({ type: "UPDATE_SELLER", payload: updatedSeller });

      // also update initial state
      if(updatedSeller.fullName) setInitialFullName(updatedSeller.fullName);
      
      if(updatedSeller.profileImage !== undefined) setInitialProfileImage(updatedSeller.profileImage);      
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section id="profile">
      <header>
        <h2>Profile</h2>
      </header>
      <main>
        <div className="profile-field">
          <strong>Profile photo</strong>
          <div className="profile-photo-container">
            <img
              src={previewUrl || "/src/assets/profile-default.svg"}
              alt="Profile"
              className="profile-photo-preview"
            />
            <input type="file" id="profileImage" onChange={handleFileChange} accept="image/*" />
            <div className="photo-actions">
                <label htmlFor="profileImage" className="btn-upload">Change</label>
                {previewUrl && <button onClick={handleRemoveImage} className="btn-remove">Remove</button>}
            </div>
          </div>
        </div>
        <div className="profile-field">
          <strong>Full name</strong>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="profile-field">
          <strong>Email</strong>
          <span>{seller?.email || ""}</span>
        </div>
        <div className="profile-field">
          <strong>Phone</strong>
          <span>{seller?.phone || ""}</span>
        </div>
        <div className="profile-field">
          <strong>Verification status</strong>
          <span>{seller?.isVerified ? "Verified" : "Pending"}</span>
        </div>
        <div className="update-button-container">
            <button
                onClick={handleUpdate}
                disabled={!isChanged || isUpdating}
                className="btn-update"
            >
                {isUpdating ? "Updating..." : "Update Profile"}
            </button>
            {error && <p className="error-message">{error}</p>}
       </div>
      </main>
    </section>
  );
};

const Settings: React.FC = () => {
  return (
    <div id="settings">
      <Profile />
    </div>
  );
};

export default Settings;