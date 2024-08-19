import {useCallback, useState} from "react";

export const useModal = (initialState = false) => {
   const [isOpen, setIsOpen] = useState(initialState);

   const showModal = useCallback(() => {
      setIsOpen(true);
   },[])

   const hideModal = useCallback(() => {
      setIsOpen(false);
   },[])

   return {isOpen, showModal, hideModal};
}