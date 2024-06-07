import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import AuthService from './api/AuthService';
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
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 401) {
                    window.location.href = '/'
                } 
            } else {
                console.error('Non-Axios error:', error);
            }
        }
    };

    const handleCreateEnvelope = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                window.location.href = '/'
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
        <div className='bg-grey m-7'>
            <h1>Dashboard</h1>

            <CreateProject fetch = {fetchEnvelopes} />
            <h2>Envelopes:</h2>
            <div className="flex flex-wrap gap-4">
                {envelopes.slice(-4).map((item:any, index) => (
                    <div className="card w-72 h-fit bg-primary text-primary-content" key={index}>
                        <div className="card-body flex justify-between ">
                            <div className=' flex flex-row justify-between'>
                                <h2 className="card-title">{item.name}</h2>
                                <h2 className="card-title">${item.amount}</h2>
                            </div>
                            <p className=' flex justify-end'>Balance: {item.balance}</p>
                            <div className="card-actions">
                                <button className="btn">Manage Expenses</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
