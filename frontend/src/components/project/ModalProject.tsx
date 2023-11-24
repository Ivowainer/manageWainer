import { useContext, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { ProjectContext } from "@/context/projectContext";

interface ModelProjectProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalProject = ({ isOpen, onClose }: ModelProjectProps) => {
    const { createProject } = useContext(ProjectContext)!;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [deadline, setDeadline] = useState("");
    const [client, setClient] = useState("");

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-gray-700">Create new Project</ModalHeader>
                        <ModalBody>
                            <Input className="text-gray-600" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <Input className="text-gray-600" placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <Input
                                type="url"
                                className="text-gray-900 w-full"
                                label="Website (optional)"
                                placeholder="ivancamposwainer.com"
                                labelPlacement="inside"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">https://</span>
                                    </div>
                                }
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                            <Input className="text-gray-600" placeholder="Client" value={client} onChange={(e) => setClient(e.target.value)} />
                            <Input type="date" label="Deadline" labelPlacement="inside" className="text-gray-600" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={onClose} className="text-white">
                                Cancel
                            </Button>
                            <Button color="success" onPress={() => createProject({ name, deadline, client, description })} className="text-white">
                                Create
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalProject;
