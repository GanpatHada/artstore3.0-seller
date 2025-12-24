import React from 'react';
import { useStoreFormContext } from '../../../../contexts/StoreContext';
import { generateTestAccountNumber, generateTestIfsc } from '../../../../utils/storeUtil';
import './AccountDetails.css';

const AccountDetails: React.FC = () => {
    const { state, dispatch } = useStoreFormContext();

    const handleFillAccountNumber = () => {
        dispatch({ type: 'SET_FIELD_VALUE', field: 'accountNumber', payload: generateTestAccountNumber() });
    };

    const handleFillIfscCode = () => {
        dispatch({ type: 'SET_FIELD_VALUE', field: 'ifscCode', payload: generateTestIfsc() });
    };

    return (
        <section>
            <header>
                <h2>Account Details</h2>
            </header>
            <main>
                <div>
                    <label>Account Holder Name <span className="error">*</span></label>
                    <div>
                        <input
                            type="text"
                            value={state.accountHolderName.value}
                            onChange={(e) => dispatch({ type: 'SET_FIELD_VALUE', field: 'accountHolderName', payload: e.target.value })}
                        />
                    </div>
                    {state.accountHolderName.error && <p className="error">{state.accountHolderName.error}</p>}
                </div>
                <div>
                    <label>Account Number <span className="error">*</span></label>
                    <div>
                        <input
                            type="text"
                            value={state.accountNumber.value}
                            onChange={(e) => dispatch({ type: 'SET_FIELD_VALUE', field: 'accountNumber', payload: e.target.value })}
                        />
                        <button type="button" onClick={handleFillAccountNumber} className="fill-random-button">Fill Random</button>
                    </div>
                    {state.accountNumber.error && <p className="error">{state.accountNumber.error}</p>}
                </div>
                <div>
                    <label>IFSC Code <span className="error">*</span></label>
                    <div>
                        <input
                            type="text"
                            value={state.ifscCode.value}
                            onChange={(e) => dispatch({ type: 'SET_FIELD_VALUE', field: 'ifscCode', payload: e.target.value })}
                        />
                        <button type="button" onClick={handleFillIfscCode} className="fill-random-button">Fill Random</button>
                    </div>
                    {state.ifscCode.error && <p className="error">{state.ifscCode.error}</p>}
                </div>
            </main>
        </section>
    );
};

export default AccountDetails;
