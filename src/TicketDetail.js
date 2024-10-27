import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketDetail = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [responseText, setResponseText] = useState('');

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/emails/${id}`);
                
                if (response.data.status === 'success') {
                    setTicket(response.data.data); // Accede a `data` dentro de la respuesta
                }
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };

        fetchTicket();
    }, [id]);

    const handleDraft = () => {
        setResponseText("Gracias por su mensaje. Estamos revisando su caso y le responderemos pronto.");
    };

    const handleSend = () => {
        console.log("Enviando respuesta:", responseText);
    };

    if (!ticket) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded shadow-md">
            {/* Asunto del ticket */}
            <h2 className="text-2xl font-bold mb-4">{ticket.subject}</h2>
            
            {/* Información del remitente y fecha */}
            <div className="flex justify-between items-center text-gray-500 mb-4">
                <span><strong>From:</strong> {ticket.from}</span>
                <span><strong>Date:</strong> {new Date(ticket.date).toLocaleString()}</span>
            </div>
            
            {/* Resumen (snippet) */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700">Summary:</h3>
                <p className="text-gray-700">{ticket.snippet}</p>
            </div>

            {/* Cuerpo completo del mensaje */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700">Message Body:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{ticket.body}</p>
            </div>
            
            {/* Área de respuesta */}
            <div className="border p-4 bg-white rounded mb-4">
                <label className="block text-gray-700 mb-2">Type your response here:</label>
                <textarea
                    className="w-full p-2 border rounded"
                    rows="4"
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                />
            </div>

            {/* Botones para generar borrador y enviar */}
            <div className="flex gap-4">
                <button onClick={handleDraft} className="bg-yellow-500 px-4 py-2 rounded text-white">Generate Draft</button>
                <button onClick={handleSend} className="bg-red-500 px-4 py-2 rounded text-white">Send</button>
            </div>
        </div>
    );
};

export default TicketDetail;
