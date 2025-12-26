import React, { useEffect, useState } from 'react';
import './Settings.css';
import { useSeller } from '../../contexts/SellerContext';
import { fetchUpdateProfile } from '../../services/sellerService';
import toast, { Toaster } from 'react-hot-toast';
import { AuthError } from '../../services/tokenService';
import { logout as logoutSeller } from '../../services/sellerService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { seller, dispatch, login, logout } = useSeller();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(seller?.fullName || '');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    seller?.profileImage || null
  );

  const [initialFullName, setInitialFullName] = useState(
    seller?.fullName || ''
  );
  const [initialProfileImage, setInitialProfileImage] = useState(
    seller?.profileImage || null
  );

  const isChanged =
    fullName.trim() !== initialFullName.trim() ||
    profileImage !== null ||
    previewUrl !== initialProfileImage;

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

    if (previewUrl === null && initialProfileImage !== null) {
      updateData.profileImage = null;
    }

    if (Object.keys(updateData).length === 0) {
      return;
    }

    setIsUpdating(true);

    try {
      const updatedSeller = await fetchUpdateProfile(seller, login, updateData);

      dispatch({ type: 'UPDATE_SELLER', payload: updatedSeller });
      toast.success('Profile updated successfully!');
      if (updatedSeller.fullName) setInitialFullName(updatedSeller.fullName);

      if (updatedSeller.profileImage !== undefined)
        setInitialProfileImage(updatedSeller.profileImage);
    } catch (err: any) {
      if (err instanceof AuthError) {
        toast.error('Session expired. Please login again.');
        navigate('/login', { replace: true });
        return;
      }
      toast.error(
        err.message || 'An error occurred while updating the profile.'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    if (!seller) return;
    try {
      await logoutSeller(seller, login);
      logout();
      navigate('/login');
    } catch (error: any) {
      if (error instanceof AuthError) {
        toast.error('Session expired. Please login again.');
        navigate('/login', { replace: true });
        return;
      }
      console.error(error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <section id="profile">
      <header>
        <h2>Profile</h2>
      </header>
      <main className="profile-main">
        <div className="profile-section">
          <div className="profile-field">
            <strong>Profile photo</strong>
            <div className="profile-photo-container">
              <img
                src={previewUrl || '/src/assets/profile-default.svg'}
                alt="Profile"
                className="profile-photo-preview"
              />
              <input
                type="file"
                id="profileImage"
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className="photo-actions">
                <label htmlFor="profileImage" className="btn-upload">
                  Change
                </label>
                {previewUrl && (
                  <button onClick={handleRemoveImage} className="btn-remove">
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-section">
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
            <span>{seller?.email || ''}</span>
          </div>
          <div className="profile-field">
            <strong>Phone</strong>
            <span>{seller?.phone || ''}</span>
          </div>
          <div className="profile-field">
            <strong>Verification status</strong>
            <span>{seller?.isVerified ? 'Verified' : 'Pending'}</span>
          </div>
          <button id="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </main>
      <div className="update-button-container">
        <button
          style={{ visibility: isChanged ? 'visible' : 'hidden' }}
          onClick={handleUpdate}
          disabled={isUpdating}
          className="btn-update"
        >
          {isUpdating ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </section>
  );
};

const Settings: React.FC = () => {
  return (
    <div id="settings">
      <Toaster position="bottom-right" />
      <Profile />
    </div>
  );
};

export default Settings;
