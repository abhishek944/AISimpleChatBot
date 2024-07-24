'use client'

import React, { useEffect, useState } from 'react';
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function LabelsPage() {
    const [labels, setLabels] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [labelData, setLabelData] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLabels = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://123e-49-207-208-65.ngrok-free.app/labels', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true', // Add this line
                    },
                });
                const data = await response.json();
                setLabels(data);
            } catch (error) {
                console.error('Failed to fetch labels:', error);
            }
            setIsLoading(false);
        };

        fetchLabels();
    }, []);

    const handleLabelChange = async (e: any) => {
        const label = e
        setSelectedLabel(label);
        setIsLoading(true);
        try {
            const response = await fetch(`https://123e-49-207-208-65.ngrok-free.app/label/${label}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true', // Add this line
                },
            });
            const data = await response.json();
            setLabelData(data);
        } catch (error) {
            console.error('Failed to fetch label data:', error);
        }
        setIsLoading(false);
    };

    return (
        <div>
            {isLoading ? <p>Loading...</p> : (
                <>
                    <div className="mb-4">
                        <Select value={selectedLabel} onValueChange={handleLabelChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Label"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {labels.map((label, index) => (
                                        <SelectItem key={index} value={label}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Textarea
                        id="big-text"
                        rows="15"
                        value={labelData}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        readOnly={true}
                    />
                </>
            )}
        </div>
    );
}
