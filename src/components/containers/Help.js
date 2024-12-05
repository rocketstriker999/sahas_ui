import React, { useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Navbar from '../common/Navbar';

const Help = () => {
    const [selectedHelpOption, setSelectedHelpOption] = useState(null);
    const [description, setDescription] = useState('');

    // Dropdown options
    const helpOptions = [
        { label: 'Raise a Ticket', value: 'raise-ticket' },
        { label: 'General Help', value: 'general-help' },
        { label: 'App not Working', value: 'raise-ticket' },
        { label: 'Raise a Ticket', value: 'raise-ticket' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedHelpOption && description) {
            console.log('Help Option:', selectedHelpOption);
            console.log('Description:', description);
            alert('Your request has been submitted successfully.');
        } else {
            alert('Please select an option and provide a description.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-column justify-content-center align-items-center min-h-screen bg-gray-100 p-4">
                <div className="flex flex-wrap surface-card shadow-3 border-round w-11 md:w-10 overflow-hidden">
                    {/* Left Panel */}
                    <div className="w-full lg:w-5 bg-indigo-800 p-5 lg:p-6 flex flex-column text-white gap-3 md:gap-4">
                        <div className="m-0">
                            <h2 className="font-bold text-base md:text-lg my-3 m-0">Need Help?</h2>
                            <p className="my-2 text-xs md:text-sm text-gray-300">
                                Select an option below to let us know how we can assist you. Our team is here to help!
                            </p>
                        </div>
                        <div className="m-0">
                            <h4 className="font-semibold text-base md:text-lg m-0 my-3">Support</h4>
                            <p className="my-2 text-xs md:text-sm mb-1 text-gray-300">For quick assistance or to raise a query, choose from the options below.</p>
                            <p className="my-2 font-bold text-sm md:text-base">support@sahasintitute.com</p>
                        </div>
                        <div className="m-0">
                            <h4 className="font-semibold text-base md:text-lg m-0 my-3">Phone</h4>
                            <p className="my-2 text-sm md:text-base text-gray-300">Mon-Fri, 8am - 5pm</p>
                            <p className="my-2 font-semibold text-sm md:text-base">+91 84962 41111</p>
                        </div>
                        <div className="flex justify-content-start gap-3 mt-2">
                            <i className="pi pi-facebook text-white cursor-pointer hover:text-gray-300 text-lg"></i>
                            <i className="pi pi-instagram text-white cursor-pointer hover:text-gray-300 text-lg"></i>
                            <i className="pi pi-linkedin text-white cursor-pointer hover:text-gray-300 text-lg"></i>
                        </div>
                    </div>
                    {/* Right Panel */}
                    <div className="w-full lg:w-7 p-5 lg:p-6">
                        <h2 className="mb-2 font-bold text-lg md:text-2xl">How Can We Help You?</h2>
                        <p className="text-gray-700 mb-5 text-sm md:text-base">
                            Please select the type of help you need and provide a brief description. Our team will get back to you shortly.
                        </p>
                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="mb-4">
                                <label htmlFor="help-option" className="block text-600 mb-2 font-semibold text-sm md:text-base">
                                    Select Help Option
                                </label>
                                <Dropdown
                                    id="help-option"
                                    value={selectedHelpOption}
                                    onChange={(e) => setSelectedHelpOption(e.value)}
                                    options={helpOptions}
                                    placeholder="Choose an Option"
                                    className="w-full text-xs md:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-600 mb-2 font-semibold text-sm md:text-base">
                                    Describe Your Issue
                                </label>
                                <InputTextarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full text-xs md:text-sm"
                                    rows={5}
                                    placeholder="Please provide a brief description of your issue..."
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                label="Send Request"
                                className="w-full bg-indigo-700 text-white font-semibold text-sm md:text-base hover:bg-indigo-800"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Help;