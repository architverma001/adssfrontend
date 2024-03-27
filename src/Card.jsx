import React, { useState } from 'react';
import './App.css';

function Card({ data, setcardoption, setItem }) {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const handlcardoption = (option, item) => {
        console.log(option)
        setcardoption(option);
        setItem(item);
    }
    const handleToggle = (itemId, index, item) => {
        setOpenDropdownId(prevId => (prevId === itemId ? null : itemId));


        const card = document.getElementById(`card-${index}`);
        if (card) {
            const cardRect = card.getBoundingClientRect();
            setDropdownPosition({ top: cardRect.top + card.offsetHeight / 10, left: cardRect.left + card.offsetWidth / 1.15 });
        }
    };

    return (
        <div className='card-container'>
            <div className='flex flex-col'>
                {data.map((item, index) => (
                    <div key={item._id} id={`card-${index}`} className='card rounded-md flex flex-col justify-center' onClick={() => handleToggle(item._id, index, item)} style={{ backgroundColor: item.sos_type === 1 ? '#880808' : '#CC5500' }}>
                        <div className='card_id'>ID: {item._id}</div>
                        <div className='card_add' style={{ maxHeight: '3.6em', minHeight: '2.3em', overflowY: 'hidden', paddingTop: '2px', paddingBottom: '2px', marginTop: '2px', marginBottom: '2px' }}>
                            <div style={{ overflowY: 'scroll' }}>Address: {item.current_address}</div>
                        </div>
                        <div className='card_time'> {item.time}</div>
                        {openDropdownId === item._id && (
                            <div className='dropdown2 border flex flex-col' style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                                <div className='card-row' onClick={() => { handlcardoption("Details", item) }}>Details</div>
                                <div className='card-row' onClick={() => { handlcardoption("SOS location", item) }}>SOS location</div>
                                <div className='card-row' onClick={() => { handlcardoption("Vehicle", item) }}>Vehicle</div>
                                <div className='card-row' onClick={() => { handlcardoption("Drone", item) }}>Drone</div>
                                <div className='card-row' onClick={() => { handlcardoption("Audio Response", item) }}>Audio Response</div>
                                <div className='card-row' onClick={() => { handlcardoption("Drone Frame", item) }}>Drone Frame</div>
                                <div className='card-row' onClick={() => { handlcardoption("Cloud Frame", item) }}>Cloud Frame</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Card;
