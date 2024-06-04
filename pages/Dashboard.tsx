import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateProject from './components/CreateProject';

export default function Dashboard() {

    const [envelopes, setEnvelopes] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        fetchEnvelopes();
    }, []); 

    const fetchEnvelopes = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/'
                throw new Error('Access token not found.');
            }

            const response = await axios.get('http://127.0.0.1:8000/api/envelope/', {
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include the access token in the Authorization header
                }
            });
            setEnvelopes(response.data); // Assuming response.data is an array of envelopes
            
        } catch (error) {
            console.error('Error fetching envelopes:', error);
        }
    };

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
            setName('');
            setAmount('');
            fetchEnvelopes()
        } catch (error) {
            console.error('Error creating envelope:', error);
        }
    };


    console.log("Hello",envelopes)
    return (
        <div className='bg-grey'>
            <h1>Dashboard</h1>
            {/* <form onSubmit={handleCreateEnvelope}>
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
            </form> */}
            <CreateProject fetch = {fetchEnvelopes} />
            <h2>Envelopes:</h2>
            
            <div className="flex flex-wrap gap-4">
                {envelopes.map((item:any, index:any) => (
                <div className="card w-96 bg-primary text-primary-content ">
                    <div className="card-body " key={index} >
                        <h2 className="card-title">{item.name}</h2>
                        <p>Budget: {item.amount}</p>
                        <div className="card-actions justify-end">
                        <button className="btn">Balance: {item.balance}</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            



        </div>
    );
};

