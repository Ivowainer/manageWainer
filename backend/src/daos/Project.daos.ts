import { Types } from "mongoose";

import { DaosReturnProject, IProject } from "../types/project.type";
import Project from "../models/project.model";

export class ProjectManipulation {
    async getProjects(userId: Types.ObjectId): Promise<DaosReturnProject> {
        console.log(userId);
        try {
            const projects = await Project.find({
                $or: [{ collaborators: userId }, { creator: userId }],
            });

            return { codeResponse: 200, projects };
        } catch (error: any) {
            throw { codeResponse: 500, message: error.message };
        }
    }

    async createProject(projectReq: Omit<IProject, "creator" | "collaborators">, creator: Types.ObjectId): Promise<DaosReturnProject> {
        const { name, description, deadline, client } = projectReq;

        if (![name, deadline, client].every(Boolean)) {
            throw { codeResponse: 404, message: "Project data is missing" };
        }

        try {
            const project = new Project({
                creator,
                name,
                description,
                deadline,
                client,
            });

            await project.save();

            return { codeResponse: 200, message: "Project created successfully!", project };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse | 500, message: error.message };
        }
    }
}
