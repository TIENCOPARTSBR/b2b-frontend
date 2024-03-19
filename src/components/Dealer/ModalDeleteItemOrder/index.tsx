import Image from "next/image";
import { useState } from "react";
import { getApiDealer } from "@/src/api/dealer/axios";
import { useMessageSuccess } from "@/src/hooks/message/success";
import { useMessageError } from "@/src/hooks/message/error";
import Processing from "@/src/components/Processing";
import ErrorProcess from "@/src/utils/function/error";

interface ModalProps {
   data: {};
   handleApiDelete: string;
   handleOnVisible: () => void;
   handleUpdateListing: () => void;
}

const ModalDeleteItemOrder = ({ data, handleOnVisible, handleApiDelete, handleUpdateListing }: ModalProps) => {
   const api = getApiDealer('');
   const [ processing, setProcessing] = useState<boolean>(false);
   const { showMessage } = useMessageSuccess();
   const { setMessageError } = useMessageError();

   // Função para excluir
   const handleDelete = (e: any) => {
      e.preventDefault();
      // Ativa o loading no botão de envio.
      setProcessing(true);
      // Vai enviar a remoção por API no Sisrev.
      api.post(handleApiDelete, data)
         .then((response) => {
            showMessage(response?.data?.message);
            handleOnVisible();
            handleUpdateListing();
         })
         .catch((e) => {
            console.error(e);
            setMessageError(ErrorProcess(e));
         }).finally(() => {
            setProcessing(false);
         })
   }

   return (
      <>
         <div className="w-100% h-100% top-0 left-0 fixed z-10 flex items-center justify-center animate-opacity-in">
            <div className="w-screen h-screen absolute top-0 left-0 bg-black opacity-60 z-20"></div>
               <div className="w-auto h-auto p-25px z-30 bg-white flex flex-wrap items-start animate-show-in">
                  <Image
                     width="24"
                     height="24"
                     src="/icon/icon-alert-modal.svg"
                     alt="Icon alert modal"
                     className="mr-3"
                  />
               <div>

                  <h2 className="w-100% md:w-350px text-black text-13px font-semibold mb-2">Modal delete</h2>

                  <p className="w-100% text-black_two text-13px font-normal">Are you sure you want to delete?</p>

                  <div className="flex items-center justify-end mt-5">
                     <button
                        className="px-15px py-9px rounded-60px border-1 border-grey_seven text-black_two text-13px font-medium mr-2"
                        onClick={handleOnVisible}>
                        Cancel
                     </button>

                     <button
                        className="px-15px py-9px rounded-60px bg-yellow_one text-black text-13px font-semibold shadow-shadow_btn_small flex items-center"
                        onClick={handleDelete}>
                        Confirm
                        { processing && <Processing/> }
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default ModalDeleteItemOrder;