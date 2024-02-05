import { useContext, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { ProjectContext, useProjectContext } from "@/context/projectContext";

interface ModalCollProp {
    isOpen: boolean;
    onClose: () => void;
}

const ModalColl = ({ isOpen, onClose }: ModalCollProp) => {
    const { addCollaborator, project, deleteCollaborator } = useProjectContext()!;

    const [username, setUsername] = useState("");

    const handleAddColl = () => {
        addCollaborator(project?._id!, username)
        onClose()
        setUsername("")
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-gray-700">Add Collaborator</ModalHeader>
                        <ModalBody>
                            <Input className="text-gray-600" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={onClose} className="text-white">
                                Cancel
                            </Button>
                            <Button color="success" onPress={handleAddColl} className="text-white">
                                Add Collaborator
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalColl;
