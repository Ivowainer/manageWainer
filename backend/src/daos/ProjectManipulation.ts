import { Types } from "mongoose";
import { DaosReturnProject, IProject } from "../types/project.type";
import Project from "../models/project.model";
import { validations } from "../helper";

export class ProjectManipulation {
    async getProjects(userId: Types.ObjectId): Promise<DaosReturnProject> {
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

    async updateProject(userId: Types.ObjectId, projectId: string, projectReq: Omit<IProject, "creator" | "collaborators">): Promise<DaosReturnProject> {
        const { client, deadline, description, name } = projectReq;

        try {
            const project = await Project.findById(projectId);

            if (!project) {
                throw { codeResponse: 404, message: "The project doesn't exists" };
            }

            // Verify User Session & Creator Project are the same
            await validations.verifyProjectOwner(project!.creator, userId);

            project!.client = client;
            project!.deadline = deadline;
            project!.description = description;
            project!.name = name;

            const projectUpdated = await project!.save();

            return { codeResponse: 200, project: projectUpdated, message: "The project has updated successfully!" };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse | 500, message: error.message };
        }
    }

    async addCollaborator(userId: Types.ObjectId, projectId: string, userCollId: string): Promise<DaosReturnProject> {
        try {
            const project = await Project.findById(projectId);

            if (!project) {
                throw { codeResponse: 404, message: "The project doesn't exists" };
            }

            // Verify User Session & Creator Project are the same
            await validations.verifyProjectOwner(project!.creator, userId);

            // Verify the project.creator doesn't the same of userCollId
            if (project!.creator == (userCollId as unknown as Types.ObjectId)) {
                throw { codeResponse: 403, message: "You cannot add yourself as a contributor" };
            }

            // Verify the userCollId aren't in the Collaborators arr
            project!.collaborators.map((val) => {
                if (val == userCollId) {
                    throw { codeResponse: 401, message: "The user you are trying to add is already a collaborator" };
                }
            });

            project.collaborators.push(userCollId);

            await project.save();

            return { codeResponse: 200, message: "Collaborator Added!", project };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse | 500, message: error.message };
        }
    }

    async removeCollaborator(userId: Types.ObjectId, projectId: string, userCollId: string) {
        try {
            const project = await Project.findById(projectId);

            if (!project) {
                throw { codeResponse: 404, message: "The project doesn't exists" };
            }

            // Verify User Session & Creator Project are the same
            await validations.verifyProjectOwner(project!.creator, userId);

            project.collaborators = project!.collaborators.filter((val) => val != userCollId);

            await project.save();

            return { codeResponse: 200, message: "Collaborator removed successfully!", project };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse | 500, message: error.message };
        }
    }
}
