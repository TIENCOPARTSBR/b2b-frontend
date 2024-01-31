import React, {useState} from "react";

const Submit = () => {
    const [ acceptedTerms, SetAcceptedTerms ] = useState<boolean>(false)

    const handleChangeCheckbox =  (e: React.ChangeEvent<HTMLInputElement>) => {
        SetAcceptedTerms(e.target.value === 'on' ? true : false )
    }

    return (
        <div className="w-fill mt-10 flex flex-wrap md:justify-between items-center">
            <label htmlFor="accepted" className="w-fill md:w-10/12 items-center flex text-12px font-normal font-inter text-black mb-5 md:mb-0 md:pr-5">
                <input
                    type="checkbox"
                    name="accepted"
                    className="mr-2 w-15px h-15px"
                    onChange={handleChangeCheckbox}
                />
                I declare that I am aware of the information provided through this quotation and attest to the accuracy
                of the data, especially with regard to the "Application" and "Observation" columns.
            </label>

            <button className={`w-fill md:w-auto px-15px py-12px rounded-60px bg-grey_seven text-white flex-nowrap text-14px font-medium font-inter ${!acceptedTerms ? 'pointer-events-none opacity-50' : ''}`}>
                Submit
            </button>
        </div>
    )
}

export default Submit;