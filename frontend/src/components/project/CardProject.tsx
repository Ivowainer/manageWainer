import { Card, CardBody, CardFooter, CardHeader, Divider, Link } from "@nextui-org/react";

interface CardProjectProp {
    name: string;
    description: string;
    website: string;
    deadline: string;
}

const CardProject = ({ name, description, website, deadline }: CardProjectProp) => {
    return (
        <Card className="w-full bg-gray-200 shadow-md">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">{name}</p>
                    <p className="text-small text-default-500">{website}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{description}</p>
            </CardBody>
            <Divider />
            <CardFooter>
                <p>{deadline}</p>
            </CardFooter>
        </Card>
    );
};

export default CardProject;
