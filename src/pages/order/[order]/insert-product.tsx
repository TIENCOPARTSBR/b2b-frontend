import React, {useState} from "react"
import { useRouter } from "next/router";
import { getApiDealer } from "@/src/api/dealer/axios"
import { useMessageSuccess } from "@/src/hooks/message/success"
import Row from "@/src/components/Dealer/Row"
import Label from "@/src/components/Label"
import AlertError from "@/src/components/AlertError";
import Processing from "@/src/components/Processing";
import Excel from "@/src/pages/quotation/[edit]/excel";

interface Props {
    onUpdateListing: () => void
}

const InsertProduct = ({ onUpdateListing } : Props) => {
    const router = useRouter()

    const [displayExcel, setDisplayExcel] = useState<boolean>(false)

    const { showMessage: showMessageSuccess } = useMessageSuccess()
    const [ alertError, setAlertError ] = useState<string|null>(null)
    const [ processing, setProcessing ] = useState<boolean>(false)

    const [productData, setProductData] = useState({
        part_number: undefined,
        locations: [""],
        price_br: undefined,
        price_eua: undefined,
        moq: undefined,
        quantity: 1,
        location: undefined,
        price: undefined,
        observation: undefined,
        application: "CAT",
        lead_time_br: undefined,
        lead_time_usa: undefined,
        lead_time: undefined,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProductData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target

        setProductData((prevData) => ({ ...prevData, [name]: value }))

        if (value === "USA") {
            setProductData((prevData) => ({ ...prevData, ["price"]: productData.price_eua }))
            setProductData((prevData) => ({ ...prevData, ["lead_time"]: productData.lead_time_usa }))
        }

        if (value === "BR") {
            setProductData((prevData) => ({ ...prevData, ["price"]: productData.price_br }))
            setProductData((prevData) => ({ ...prevData, ["lead_time"]: productData.lead_time_br }))
        }
    }

    const clearSearchProduct = () => {
        setProductData((prevData) => ({
            ...prevData,
            locations: [""],
            part_number: undefined,
            moq: undefined,
            quantity: 1,
            location: undefined,
            price: undefined,
            observation: undefined,
            application: "CAT",
            lead_time: undefined,
        }))
    }

    const handleSearchProduct = async () => {
        if (productData.part_number === undefined)
            return false;

        setProcessing(true)

        setProductData((prevData) => ({
            ...prevData,
            locations: [""],
            moq: undefined,
            quantity: 1,
            location: undefined,
            price: undefined,
            price_br: undefined,
            price_eua: undefined,
            observation: undefined,
            application: "CAT",
            lead_time: undefined,
        }))

        const api = getApiDealer("")
        await api.post("/quotation/product/unique/", {
            part_number: productData.part_number
        })
            .then((response) => {
                setProductData((prevData) => ({
                    ...prevData,
                    locations: response?.data?.data?.locations ||  [""],
                    location: response?.data?.data?.locations[0] || undefined,
                    price_br: response?.data?.data?.price_br || undefined,
                    price_eua: response?.data?.data?.price_usa || undefined,
                    moq: response?.data?.data?.moq || 0,
                    quantity: response?.data?.data?.moq || 1,
                    lead_time: (response?.data?.data?.locations[0] == "USA" ? response?.data?.data?.lead_time_usa : response?.data?.data?.lead_time_br) ?? 0,
                    lead_time_br: response?.data?.data?.lead_time_br || undefined,
                    lead_time_usa: response?.data?.data?.lead_time_usa || undefined,
                }))
            })
            .catch((e: any) => {
            })
            .finally(() => {
                setProcessing(false)
                setProductData((prevData) => ({ ...prevData, ["price"] : prevData.price_br || prevData.price_eua }))
            })

        return false;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setProcessing(true)

        const api = getApiDealer("")
        await api.post("/quotation/item/create", {
            id_quotation: router?.query?.edit,
            part_number: productData?.part_number,
            quantity: productData?.quantity,
            application: productData?.application,
            observation: productData?.observation,
            location: productData?.location,
            lead_time: productData?.lead_time,
            unit_price: productData?.price,
        })
            .then((response) => {
                clearSearchProduct()
                showMessageSuccess(response?.data?.message)
                onUpdateListing()
            })
            .catch((e) => {
                let errorString = ""

                Object.keys(e?.response?.data?.errors).forEach((key) => {
                    e?.response?.data?.errors[key].forEach((errorMessage: any) => {
                        errorString += `${errorMessage}<br>`
                    })
                })

                setAlertError(errorString)
            })
            .finally(() => {
                setProcessing(false)
                setTimeout(() => {
                    setAlertError(null)
                }, 10000)
            })
    }

    const handleDisplayExcel = () => {
        setDisplayExcel(!displayExcel);
    }

    return (
        <Row>
            {alertError && <AlertError text={alertError}/>}

            <button className="px-15px py-12px rounded-60px bg-yellow_two mb-25px text-white flex-nowrap text-14px font-medium font-inter"
                    onClick={handleDisplayExcel}>
                Upload Excel
            </button>

            { displayExcel &&
                <Excel
                    onUpdateListing={onUpdateListing}
                    handleOnVisible={() => setDisplayExcel(false)}
                />
            }

            <form className="w-screen" onSubmit={handleSubmit}>
                <div className="w-full flex p-35px rounded-8px border-1 border-grey_six items-end flex-wrap">
                    <div className="w-full md:w-1/4 md:pr-5 relative mb-5">
                        <Label>Part Number</Label>

                        <div className="relative">
                            <input type="text"
                                   name="part_number"
                                   placeholder="Search by part number"
                                   className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px font-inter font-normal outline-yellow_two text-black placeholder:text-grey_seven"
                                   value={productData.part_number != undefined ? productData.part_number : ''}
                                   onChange={(e) => {
                                       handleInputChange(e);
                                   }}
                                   onBlur={handleSearchProduct}
                                   required={true}
                            />
                            <span className="absolute top-3 right-3">
                                {processing && <Processing color="border-black"/>}
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/4 md:pr-5 mb-5">
                        <Label>Location</Label>
                        <select
                            className="w-100% border-1 border-grey_six rounded-8px py-9px px-12px text-14px text-black placeholder:text-grey_seven font-inter font-normal outline-yellow_two"
                            name="location"
                            onChange={handleSelectChange}
                        >
                            {productData.locations != undefined && productData.locations.includes("USA") &&
                                <option value="USA" selected={productData.location === 'USA'}
                                        className="bg-usa">USA</option>
                            }

                            {productData.locations != undefined && productData.locations.includes("BR") &&
                                <option value="BR" selected={productData.location === 'BR'}
                                        className="bg-usa">BR</option>
                            }
                        </select>
                    </div>

                    <div className="w-full md:w-1/4 md:pr-5 mb-5">
                        <Label>Unit Price</Label>

                        <input type="text"
                               name="price"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px font-inter font-normal outline-yellow_two text-black placeholder:text-grey_seven disabled:bg-grey_nine"
                               value={productData.price != undefined ? productData.price : ''}
                               disabled={true}
                               onChange={handleInputChange}
                        />
                    </div>

                    <div className="w-full md:w-1/4 md:pr-5 mb-5">
                        <Label>Availability</Label>

                        <input type="text"
                               name="availability"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px font-inter font-normal outline-yellow_two text-black placeholder:text-grey_seven disabled:bg-grey_nine"
                               value={productData.lead_time != undefined ? productData.lead_time : ''}
                               disabled={true}
                               onChange={handleInputChange}
                        />
                    </div>

                    <div className="w-full md:w-1/4 md:pr-5 mb-5">
                        <Label>MOQ</Label>

                        <input type="text"
                               name="moq"
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px font-inter font-normal outline-yellow_two text-black placeholder:text-grey_seven disabled:bg-grey_nine"
                               value={productData.moq != undefined ? productData.moq : ''}
                               onChange={handleInputChange}
                               disabled={true}
                        />
                    </div>

                    <div className="w-full md:w-1/4 md:pr-5 mb-5">
                        <Label>Quantity</Label>

                        <input type="number"
                               name="quantity"
                               min={productData.moq != 1 ? productData.moq : 1}
                               className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px font-inter font-normal outline-yellow_two text-black placeholder:text-grey_seven"
                               value={productData.quantity}
                               onChange={handleInputChange}
                               required={true}
                        />
                    </div>

                    <div className="w-full md:w-1/4 md:pr-5 mb-5">
                        <Label>Application</Label>
                        <select
                            className="w-100% border-1 border-grey_six rounded-8px py-9px px-12px text-14px text-black placeholder:text-grey_seven font-inter font-normal outline-yellow_two"
                            name="application"
                            required={true}
                            value={productData.application}
                            onChange={handleSelectChange}
                        >
                            <option value="CAT">CAT</option>
                            <option value="OTHERS">OTHERS</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/4 md:pr-5 mb-5">
                        <Label>Observation</Label>

                        <div className="relative">
                            <input type="text"
                                   name="observation"
                                   placeholder=""
                                   className="w-100% border-1 border-grey_six rounded-8px py-8px px-12px text-14px font-inter font-normal outline-yellow_two text-black placeholder:text-grey_seven"
                                   value={productData.observation != undefined ? productData.observation : ''}
                                   onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button
                        className="px-15px py-12px rounded-60px bg-grey_seven text-white flex-nowrap text-14px font-medium font-inter">
                        Insert Product
                    </button>
                </div>
            </form>
        </Row>
    )
}

export default InsertProduct