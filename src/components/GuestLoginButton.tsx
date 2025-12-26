import React, { useState, type JSX } from 'react'
import { fetchSellerLogin } from '../services/authService';
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import { useSeller } from '../contexts/SellerContext';
import type { Seller } from '../types/seller.types';

const GuestLoginButton: React.FC = (): JSX.Element => {
    const {login}=useSeller()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleGuestLogin = async () => {
        setLoading(true);
        try {
            const result = await fetchSellerLogin();
            const seller: Seller = {
                    ...result.seller,
                    accessToken: result.accessToken,
                  };
                  login(seller)
            login(seller)
            navigate("/")
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
