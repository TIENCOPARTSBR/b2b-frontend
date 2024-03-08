import { useNotifications } from "@/src/hooks/dealer/notifications";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useAuthDealer } from "@/src/hooks/dealer/auth";

const Notifications = () => {
    const { user } = useAuthDealer("");
    const [visible, setVisible] = useState<boolean>(false);
    const [clickedIndex, setClickedIndex] = useState<any>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    const handleVisible = () => {
        setVisible(!visible);
    };

    const { notifications, setHideNotification, setHideAllNotification } = useNotifications();

    const handleHideNotification = (id: number, index: any) => {
        setHideNotification(id);
        setClickedIndex(index);
    };

    const handleHideAllNotification = (id: number | undefined) => {
        setHideAllNotification(id);
        setClickedIndex(1964);
    };

    return (
        <>
            <button
                className={`w-45px h-45px mr-3 rounded-8px relative flex items-center justify-center hover:bg-grey_nine transition-all ease-in-out duration-300 `}
                onClick={handleVisible}
            >
                <Image
                    src="/icon/icon-notification.svg"
                    alt="Icon profile"
                    width="24"
                    height="24"
                />
                <span className="bg-grey_six w-20px h-20px flex items-center justify-center rounded-60px text-grey_for text-10px font-bold absolute top-0.5 left-5">
                    {notifications?.length ?? 0}
                </span>
            </button>

            {visible && (
                <div
                    ref={modalRef}
                    className="w-420px p-30px bg-white border-1 border-grey_one shadow-card_notifications absolute top-80px right-80px right-120px rounded-8px  z-50"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="w-100% text-black_three font-inter font-semibold">
                            Notifications
                        </h2>
                        <button
                            onClick={() =>
                                handleHideAllNotification(
                                    user?.dealer_id
                                )
                            }
                            className="text-13px font-inter text-yellow_two whitespace-nowrap">
                            Clear all
                        </button>
                    </div>

                    {notifications && notifications[0] ? (
                        <ul className="flex flex-wrap overflow-y-scroll max-h-400px scroll-smooth overflow-x-hidden pr-2">
                            {notifications &&
                                notifications.map((row, index) => (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            handleHideNotification(
                                                row.id,
                                                index
                                            )
                                        }
                                        className={`border-1 border-grey_eleven mb-15px last:mb-0 px-4 py-4 rounded-8px flex-row flex items-center hover:bg-yellow_three hover:border-yellow_two transition-colors delay-100 cursor-pointer ${
                                            clickedIndex === index || clickedIndex === 1964
                                                ? 'animate-explode'
                                                : ''
                                        }`}
                                    >
                                        <div className="px-3 py-3 rounded-60px bg-yellow_one mr-4">
                                            <Image
                                                src="/icon/icon-quotation.svg"
                                                alt="Icon user"
                                                width="30"
                                                height="30"
                                            />
                                        </div>
                                        <div className="flex-row flex">
                                            <span className="text-13px font-inter font-normal text-black_two">
                                                <span className="font-inter font-semibold text-12px">
                                                    Quotations
                                                </span>
                                                <br />
                                                {row.message}
                                            </span>
                                            <span className="text-12px text-black whitespace-nowrap">
                                                {row.hour}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <div className="w-100% h-2rem flex items-end text-left text-13px font-normal font-inter text-grey_for">
                            There are no notifications at the moment.
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Notifications;