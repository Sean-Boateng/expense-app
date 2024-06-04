import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

interface CreateProjectProps {
  fetch: () => Promise<void>;
}

const CreateProject: React.FC<CreateProjectProps> = ({ fetch }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateEnvelope = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found.');
            }

            const response = await axios.post('http://127.0.0.1:8000/api/envelope/', {
                name,
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include the access token in the Authorization header
                }
            });

            // Optionally, you can update the envelopes state with the newly created envelope
            fetch()
            setName('');
            setAmount('');
            // fetchEnvelopes()
        } catch (error) {
            console.error('Error creating envelope:', error);
        }
    };


    const modalRef = useRef<HTMLDialogElement>(null); 

    function openM() {
        modalRef.current?.showModal();
      }

      const hideModal = () => {
        if (modalRef.current) {
          modalRef.current.close();
        }
      };

    return(
      <div>
        <dialog ref={modalRef} className=" modal p-2" style={{fontFamily: 'Pt Sans, sans-serif'}}>
        <div className="modal-box ">
          <h3 className="font-bold text-lg ">Create New Project</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <form method="dialog" onSubmit={handleCreateEnvelope} noValidate>
              
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Create Envelope</button>
            
              <button className="btn bg-green modal-button" onClick={hideModal}>
                Close
              </button>
            </form>
          </div>
        </div>
        </dialog>

        {/* <button >Modal</button> */}
        <button className="btn btn-primary" onClick={openM}>Create Envelope</button>
      </div>
    )
}
export default CreateProject;