import React, { useState, type JSX } from 'react'
import { fetchSellerLogin } from '../services/authService';
import toast from 'react-hot-toast';

const GuestLoginButton: React.FC = (): JSX.Element => {
    const [loading, setLoading] = useState(false);

    const handleGuestLogin = async () => {
        setLoading(true);
        try {
            const result = await fetchSellerLogin();
            console.log("Login response:", result);
            toast.success("Login successful!");
        } catch (err: any) {
            toast.error(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }


    return (
        <button disabled={loading} type='button' onClick={handleGuestLogin} className='secondary-btn'>
        {loading?'Logging in...':'Login as a Guest'}
        </button>
    )
}

export default GuestLoginButton
