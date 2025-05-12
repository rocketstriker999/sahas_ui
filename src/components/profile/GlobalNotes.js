import React from 'react';
import { Card } from 'primereact/card';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';

const GlobalNotes = () => {
    const dummyNotes = [
        {
            note: 'Remember to review Chapter 3 before the test.',
            added_by: 'Heet Desai',
            date: '2025-05-01',
        },
        {
            note: 'Please pay remaining Installment by End of Month',
            added_by: 'Akash Patel',
            date: '2025-05-03',
        },
        {
            note: 'Check updates in the Economics syllabus.',
            added_by: 'Raj Gandhi',
            date: '2025-05-06',
        }
    ];

    return (
        <div className="p-4">
            <h2 className="text-xl md:text-2xl font-bold border-bottom-1 surface-border pb-2 m-0">Student Notes</h2>
            {dummyNotes.map((noteObj, index) => (
                <Card className="shadow-2 border-round-xl mb-4" pt={{
                    content:classNames('p-0')
                }}>
                <div className="mb-3">
                    <label className="font-medium block mb-1">Note</label>
                    <InputTextarea value={noteObj.note} readOnly autoResize className="w-full text-xs sm:text-sm" rows={3} />
                </div>
                <div className="text-xs sm:text-sm mb-1">
                    <span className="font-semibold">Added By:</span> {noteObj.added_by}
                </div>
                <div className="text-xs sm:text-sm">
                    <span className="font-semibold">Date:</span> {noteObj.date}
                </div>
            </Card>
            ))}
        </div>
    );
};

export default GlobalNotes;
