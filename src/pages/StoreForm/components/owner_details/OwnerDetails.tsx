import React from 'react';
import { useStoreFormContext } from '../../../../contexts/StoreContext';
import './OwnerDetails.css';

const OwnerDetails: React.FC = () => {
    const { state, dispatch } = useStoreFormContext();

    return (
        <section>
            <header>
                <h2>Owner Details</h2>
            </header>
            <main>
                <div>
                <label>Owner Name <span className="error">*</span></label>
                <input
                    type="text"
                    value={state.ownerName.value}
                    onChange={(e) => dispatch({ type: 'SET_FIELD_VALUE', field: 'ownerName', payload: e.target.value })}
                />
                {state.ownerName.error && <p className="error">{state.ownerName.error}</p>}
            </div>
            <div>
                <label>Contact Email <span className="error">*</span></label>
                <input
                    type="text"
                    value={state.contactEmail.value}
                    onChange={(e) => dispatch({ type: 'SET_FIELD_VALUE', field: 'contactEmail', payload: e.target.value })}
                />
                {state.contactEmail.error && <p className="error">{state.contactEmail.error}</p>}
            </div>
            <div>
                <label>Contact Phone <span className="error">*</span></label>
                <input
                    type="text"
                    value={state.contactPhone.value}
                    onChange={(e) => dispatch({ type: 'SET_FIELD_VALUE', field: 'contactPhone', payload: e.target.value })}
                />
                {state.contactPhone.error && <p className="error">{state.contactPhone.error}</p>}
            </div>
            </main>
        </section>
    );
};

export default OwnerDetails;
