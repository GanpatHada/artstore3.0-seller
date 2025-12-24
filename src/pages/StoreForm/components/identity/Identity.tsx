import React from 'react';
import { useStoreFormContext } from '../../../../contexts/StoreContext';
import { generateTestAadhaarNumber, generateTestPanNumber } from '../../../../utils/storeUtil';
import './Identity.css';

const Identity: React.FC = () => {
    const { state, dispatch } = useStoreFormContext();

    const handleFillWithTestAdhaar = () => {
        dispatch({ type: 'SET_FIELD_VALUE', field: 'aadhaarNumber', payload: generateTestAadhaarNumber() });
       
    };

    const handleFillWithTesPAN=()=>{
         dispatch({ type: 'SET_FIELD_VALUE', field: 'panNumber', payload: generateTestPanNumber() });
    }

    return (
        <section>
            <header>
                 <h2>Identity</h2>
            </header>
            <main>
                <div>
                <label>Aadhaar Number <span className="error">*</span></label>
                <div>
                    <input
                    type="text"
                    value={state.aadhaarNumber.value}
                    onChange={(e) => dispatch({ type: 'SET_FIELD_VALUE', field: 'aadhaarNumber', payload: e.target.value })}
                />
                <button type="button" onClick={handleFillWithTestAdhaar} className="fill-random-button">Fill Random</button>
                </div>
                {state.aadhaarNumber.error && <p className="error">{state.aadhaarNumber.error}</p>}
            </div>
            <div>
                <label>PAN Number <span className="error">*</span></label>
               <div>
                 <input
                    type="text"
                    value={state.panNumber.value}
                    onChange={(e) => dispatch({ type: 'SET_FIELD_VALUE', field: 'panNumber', payload: e.target.value })}
                />
                <button type="button" onClick={handleFillWithTesPAN} className="fill-random-button">Fill Random</button>
               </div>
                {state.panNumber.error && <p className="error">{state.panNumber.error}</p>}
            </div>
           
            </main>
        </section>
    );
};

export default Identity;
