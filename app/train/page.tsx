'use client'

import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {SetStateAction, useState} from "react";

export default function Train() {
    const [labelName, setLabelName] = useState('');
    const [labelText, setLabelText] = useState('');

    const handleLabelNameChange = (e: { target: { value: SetStateAction<string>; }; }) => setLabelName(e.target.value);
    const handleLabelTextChange = (e: { target: { value: SetStateAction<string>; }; }) => setLabelText(e.target.value);

    const handleSubmit = async () => {
        const payload = {
            label: labelName,
            data: labelText,
        };
        try {
            const response = await fetch('https://123e-49-207-208-65.ngrok-free.app/train', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true', // Add this line
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error('Network response was not ok.');
            // Handle success response
            console.log('Submission successful', await response.json());
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <div className="w-full space-y-6">
                <div className="max-w-md">
                    <label htmlFor="small-text" className="block text-sm font-medium text-gray-700">
                        Label Name
                    </label>
                    <Input
                        id="small-text"
                        placeholder="Your label Name"
                        value={labelName}
                        onChange={handleLabelNameChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="big-text" className="block text-sm font-medium text-gray-700">
                        Label Text
                    </label>
                    <Textarea
                        id="big-text"
                        rows="15"
                        placeholder="Your Label text"
                        value={labelText}
                        onChange={handleLabelTextChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
