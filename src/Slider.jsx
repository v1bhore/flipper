import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios via npm or yarn

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import tufbackground from './assets/tufbackground.png'


import { FreeMode, Navigation } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ActiveSlider = () => {
    const navigate = useNavigate();

    const [slides, setSlides] = useState([]);
    const [flippedIndex, setFlippedIndex] = useState(null);
    const [submittedAnswers, setSubmittedAnswers] = useState([]);
    const [score, setScore] = useState(0);

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

    const handleSubmit = (index, userAnswer) => {
        const correctAnswer = slides[index].answer.toLowerCase().trim();
        const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer;

        setSubmittedAnswers((prev) => {
            const newSubmittedAnswers = [...prev];
            newSubmittedAnswers[index] = {
                userAnswer,
                isCorrect,
            };
            return newSubmittedAnswers;
        });

        if (isCorrect) {
            setScore((prevScore) => prevScore + 10);
        }

        setFlippedIndex(index);
    };

    const handleManageSlidesClick = () => {
        navigate('/manage');
    };

    return (
        <div className="relative flex items-center justify-center flex-col h-[100vh] py-8"
            style={{ backgroundImage: `url(${tufbackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
            

            <button
                onClick={handleManageSlidesClick}
                className="absolute top-4 right-4 bg-special-orange text-white py-2 px-4 rounded "
            >
                Manage Slides
            </button>

            <Swiper
                slidesPerView={1}
                centeredSlides={true}
                freeMode={true}
                pagination={false}
                navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                }}
                modules={[FreeMode, Navigation]}
                className="max-w-[90%] lg:max-w-[70%]"
            >
                {slides.map((item, index) => (
                    <SwiperSlide key={index}>
                        <motion.div
                            className="relative shadow-lg rounded-xl"
                            style={{ perspective: 1000 }}
                        >
                            <motion.div
                                className="relative h-[450px] w-[315px] lg:h-[500px] lg:w-[400px] rounded-xl mx-auto"
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: flippedIndex === index || submittedAnswers[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                                    transition: "transform 0.6s",
                                }}
                            >
                                {/* Front Side */}
                                <div
                                    className="absolute inset-0 flex flex-col justify-center items-center gap-4 group text-white rounded-xl px-6 py-8 h-full w-full border-special-orange  "
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(0deg)",
                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                        borderWidth: "4px",
                                        borderColor: "#EE5334", // Replace with your desired orange color
                                        borderStyle: "solid",
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center rounded-xl"
                                    />
                                    <div className="relative flex flex-col gap-3 items-center text-center ">
                                        <p className="lg:text-[20px]">{item.question}</p>
                                        {!submittedAnswers[index] && (
                                            <div className="mt-20 flex flex-col gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Enter your answer"
                                                    className="p-2 rounded bg-white text-black"
                                                    id={`answer-input-${index}`}
                                                />
                                                <button
                                                    className="bg-special-orange text-white py-2 px-4 rounded "
                                                    onClick={() => handleSubmit(index, document.getElementById(`answer-input-${index}`).value)}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>

                                {/* Back Side */}
                                <div
                                    className={`absolute inset-0 flex flex-col justify-center items-center text-center text-lg p-4 rounded-xl h-full w-full ${
                                        submittedAnswers[index]?.isCorrect ? 'bg-black opacity-70 border-green-900 border-4 text-white' : 'bg-black text-white border-special-orange border-4 opacity-70'
                                    }`}
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                    }}
                                >
                                    {submittedAnswers[index] ? (
                                        <>
                                            <h2 className="text-2xl font-bold">
                                                {submittedAnswers[index].isCorrect ? 'Correct Answer' : 'Wrong Answer'}
                                            </h2>
                                            <p>Your answer: {submittedAnswers[index].userAnswer}</p>
                                            <p>Correct answer: {item.answer}</p>
                                        </>
                                    ) : null}
                                </div>
                            </motion.div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="bg-special-orange text-white py-2 px-4 mt-8 rounded shadow-md">
                Score: {score}
            </div>
            <div className="flex justify-between w-full lg:max-w-[70%] px-6 mt-8">
                <button className="swiper-button-prev bg-white text-gray-800 py-8 lg:px-6 p-4 rounded hover:bg-gray-200">
                    <FaArrowLeft size={24} />
                </button>
                <button className="swiper-button-next bg-white text-gray-800 py-8 lg:px-6 p-4 rounded hover:bg-gray-200">
                    <FaArrowRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default ActiveSlider;






