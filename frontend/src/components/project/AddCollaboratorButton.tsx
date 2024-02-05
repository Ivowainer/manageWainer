import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";
import ModalColl from "./ModalColl";

const AddCollaboratorButton = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <ModalColl isOpen={isOpen} onClose={onClose} />
            <Button onClick={onOpen} className="">
                Add Collaborator
            </Button>
        </>
    );
};

export default AddCollaboratorButton;
