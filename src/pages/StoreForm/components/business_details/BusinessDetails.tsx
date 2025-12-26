import React, { useRef } from 'react';
import { useStoreFormContext } from '../../../../contexts/StoreContext';
import { generateTestGstNumber } from '../../../../utils/storeUtil';
import './BusinessDetails.css';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

interface BusinessDetailsProps {}

const BusinessDetails: React.FC<BusinessDetailsProps> = () => {
  const { state, dispatch } = useStoreFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFillRandomGSTIN = () => {
    dispatch({
      type: 'SET_FIELD_VALUE',
      field: 'gstin',
      payload: generateTestGstNumber(),
    });
  };

  const toggleHaveGSTIN = () => {
    const newHaveGSTIN = !state.haveGSTIN.value;
    dispatch({
      type: 'SET_FIELD_VALUE',
      field: 'haveGSTIN',
      payload: newHaveGSTIN,
    });
    if (!newHaveGSTIN) {
      dispatch({ type: 'SET_FIELD_VALUE', field: 'gstin', payload: null });
    } else {
      dispatch({ type: 'SET_FIELD_VALUE', field: 'gstin', payload: '' });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    dispatch({ type: 'SET_FIELD_VALUE', field: 'businessLogo', payload: file });
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    dispatch({ type: 'SET_FIELD_VALUE', field: 'businessLogo', payload: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  let displayUrl = null;
  if (state.businessLogo.value) {
    if (typeof state.businessLogo.value === 'string') {
      displayUrl = state.businessLogo.value;
    } else {
      displayUrl = URL.createObjectURL(state.businessLogo.value);
    }
  }

  return (
    <section id="business-details">
      <header>
        <h2>Business Details</h2>
      </header>
      <main>
        <div>
          <label>
            Business Name <span className="error">*</span>
          </label>
          <input
            type="text"
            value={state.businessName.value}
            onChange={(e) =>
              dispatch({
                type: 'SET_FIELD_VALUE',
                field: 'businessName',
                payload: e.target.value,
              })
            }
          />
          {state.businessName.error && (
            <p className="error">{state.businessName.error}</p>
          )}
        </div>
        <div>
          <label>
            Business Type <span className="error">*</span>
          </label>
          <div id="business-type-radio-group">
            {(
              [
                'Individual',
                'Proprietorship',
                'Partnership',
                'LLP',
                'Private Limited',
              ] as const
            ).map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  name="businessType"
                  value={type}
                  checked={state.businessType.value === type}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_FIELD_VALUE',
                      field: 'businessType',
                      payload: e.target.value,
                    })
                  }
                />
                {type}
              </label>
            ))}
          </div>
          {state.businessType.error && (
            <p className="error">{state.businessType.error}</p>
          )}
        </div>
        <div>
          <label>
            <input
              checked={state.haveGSTIN.value}
              onChange={toggleHaveGSTIN}
              type="checkbox"
            />{' '}
            Do you have GSTIN
          </label>
        </div>
        {state.haveGSTIN.value && (
          <div>
            <label>Enter your GSTIN</label>
            <div>
              <input
                type="text"
                value={state.gstin.value || ''}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_FIELD_VALUE',
                    field: 'gstin',
                    payload: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={handleFillRandomGSTIN}
                className="fill-random-button"
              >
                Fill Random
              </button>
            </div>
            {state.gstin.error && <p className="error">{state.gstin.error}</p>}
          </div>
        )}
        <div>
          <label>Business Logo</label>
          <input
            style={{ display: 'none' }}
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
          />
          {state.businessLogo.error && (
            <p className="error">{state.businessLogo.error}</p>
          )}
          <section id="logo">
            {!displayUrl && (
              <div id="logo-input" onClick={handleLogoClick}>
                <IoCloudUploadOutline size={30} />
              </div>
            )}
            {displayUrl && (
              <div id="logo-preview">
                <img src={displayUrl} alt="Logo Preview" />
                <button
                  type="button"
                  className="delete-logo-button"
                  onClick={handleDeleteImage}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </section>
  );
};

export default BusinessDetails;
