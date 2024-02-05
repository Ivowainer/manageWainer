import { useContext, useEffect, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { ProjectContext, useProjectContext } from "@/context/projectContext";
import { useTaskContext } from "@/context/taskContext";

interface ModalTaskProp {
    isOpen: boolean;
    onClose: () => void;
}

const ModalTask = ({ isOpen, onClose }: ModalTaskProp) => {
    const { createTask } = useTaskContext()!;
    const { project } = useProjectContext()!;

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("")
    
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-gray-700">Create new Project</ModalHeader>
                        <ModalBody>
                            <Input className="text-gray-600" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <Input className="text-gray-600" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <Select className="text-gray-600" placeholder="Priority" label="priority"  value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <SelectItem key={"low"} value={"low"}>Low</SelectItem>
                                <SelectItem key={"medium"} value={"medium"}>Medium</SelectItem> 
                                <SelectItem key={"high"} value={"high"}>High</SelectItem>
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={onClose} className="text-white">
                                Cancel
                            </Button>
                            <Button color="success" onPress={() => createTask({ title, description, priority, projectId: project?._id! })} className="text-white">
                                Create
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalTask;
