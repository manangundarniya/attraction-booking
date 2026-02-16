import React from 'react';

const TimeSlotSelector = ({ slots, selectedSlot, onSelect }) => {
    if (!slots || slots.length === 0) {
        return <div className="text-gray-500 italic">No time slots available for this date.</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {slots.map((slot, index) => {
                const isSelected = selectedSlot && selectedSlot.entry_time === slot.entry_time;
                const isDisabled = slot.capacity === 0;

                return (
                    <button
                        key={index}
                        onClick={() => !isDisabled && onSelect(slot)}
                        disabled={isDisabled}
                        className={`
                            p-3 rounded-lg border text-sm font-medium transition-all
                            ${isDisabled 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                                : isSelected
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                            }
                        `}
                    >
                        <div className="flex flex-col items-center">
                            <span>{slot.entry_time} - {slot.exit_time}</span>
                            {slot.capacity !== undefined && slot.capacity < 10 && slot.capacity > 0 && (
                                <span className="text-xs text-orange-500 mt-1">Only {slot.capacity} left!</span>
                            )}
                            {isDisabled && <span className="text-xs mt-1">Sold Out</span>}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default TimeSlotSelector;
