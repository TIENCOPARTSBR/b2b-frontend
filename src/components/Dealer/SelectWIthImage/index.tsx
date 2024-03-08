import React from 'react';
import Image from 'next/image';

interface FlagSelectProps {
    locations: [];
    value: string;
    onChange: (value: string) => void;
}

const flagImages = {
    USA: "/icon/icon-usa-flag.svg",
    BR: "/icon/icon-br-flag.svg",
};

const SelectWithImage: React.FC<FlagSelectProps> = ({ value, onChange }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <label htmlFor="countrySelect">Location</label>
            <select
                id="countrySelect"
                value={value}
                onChange={handleSelectChange}
                className="w-100% border-1 border-grey_six rounded-8px py-9px px-12px text-13px text-black placeholder:text-grey_seven font-inter font-normal outline-yellow_two"
                name="location"
                required={true}
            >
                <option value="" disabled>
                </option>

                <option value="USA">
                    Estados Unidos
                    <Image src={flagImages.USA} alt="Bandeira dos Estados Unidos" width="30" height="30" />
                </option>

                <option value="BR">
                    Brasil
                    <Image src={flagImages.BR} alt="Bandeira do Brasil" width="30" height="30" />
                </option>
            </select>
        </div>
    );
};

export default SelectWithImage;
