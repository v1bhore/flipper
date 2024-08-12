import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import SpaceCity from "./assets/SpaceCity.jpg";
import axios from 'axios'; // Make sure to install axios via npm or yarn
import tufbackground from './assets/tufbackground.png'
import { useNavigate } from 'react-router-dom';


const ManageSlidesPage = () => {
    const [slides, setSlides] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const response = await axios.get('https://flipper-backend-krwg.onrender.com/questions');
            setSlides(response.data);
        } catch (error) {
            console.error('Error fetching slides:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://flipper-backend-krwg.onrender.com/delete/${id}`);
            fetchSlides(); // Refresh the slide list
        } catch (error) {
            console.error('Error deleting slide:', error);
        }
    };

    const handleAdd = async () => {
        try {
            await axios.post('https://flipper-backend-krwg.onrender.com/add', { question, answer });
            setQuestion('');
            setAnswer('');
            fetchSlides(); // Refresh the slide list
        } catch (error) {
            console.error('Error adding slide:', error);
        }
    };
    const navigate = useNavigate();
   
    return (
        <div className="flex flex-col lg:flex-row h-screen p-4"
            style={{ backgroundImage: `url(${tufbackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            
            {/* Delete Section */}
            <div className="w-full lg:w-[30%] h-[80vh] scroll-y-auto absolute bottom-4 left-4 shadow-md rounded p-4 mb-4 mx-6 lg:mb-0 ">
                <h2 className="text-3xl font-bold mb-4 text-white">Uploaded Slides</h2>
                <div className="overflow-y-auto h-[55%] space-y-2">
                    {slides.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-gray-200 rounded border border-4 border-special-orange">
                            <div>
                                <h3 className="font-medium">{item.question}</h3>
                                <p className="text-sm text-gray-600">{item.answer}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Section */}
            <div className="w-full lg:w-[50%] h-[90vh] absolute top-5 right-4 rounded p-4 flex flex-col justify-between bg-transparent">
                <div>
                    <h2 className="text-3xl font-bold mb-4 text-white">Add New Slide</h2>
                    <div className="mb-4">
                        <label htmlFor="question" className="block text-sm font-medium text-special-orange">Question</label>
                        <textarea
                            id="question"
                            rows="2"
                            className="w-full p-2 mt-1 border rounded border-4 border-special-orange focus:border-special-orange focus:ring-special-orange focus:outline-none "
                            placeholder="Enter the question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="answer" className="block text-sm font-medium text-special-orange">Answer</label>
                        <textarea
                            id="answer"
                            rows="6"
                            className="w-full p-2 mt-1 border rounded-lg border-4 border-special-orange focus:border-special-orange focus:ring-special-orange focus:outline-none"
                            placeholder="Enter the answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 ">
                <button
                        onClick={() => {
                            navigate('/');  
                            // This will navigate back to the previous route in history
                            console.log("Running")}}
                        className="bg-special-orange text-white py-2 px-4 rounded flex items-center gap-2 "
                    >
                        Back
                </button>
                    <button
                        onClick={handleAdd}
                        className="bg-special-orange text-white py-2 px-4 rounded flex items-center gap-2 "
                    >
                        <FaPlus />
                        Add Slide
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageSlidesPage;