import { ObjectId, Types } from "mongoose";

import { DaosReturnProject, IProject } from "../types/project.type";
import Project from "../models/project.model";

import { validations } from "../helper";
import { User } from "../models";
import { IUser } from "../types/user.type";

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

    async getProject(userId: Types.ObjectId, projectId: string): Promise<DaosReturnProject> {
        try {
            const project = await validations.checkDocumentExists(Project, projectId);

            if (!project.collaborators.includes(userId.toString()) && project.creator.toString() != userId.toString()) {
                throw { codeResponse: 401, message: "Unauthorized" };
            }

            return { codeResponse: 200, project };
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
            throw { codeResponse: error.codeResponse || 500, message: error.message };
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
            throw { codeResponse: error.codeResponse || 500, message: error.message };
        }
    }

    async deleteProject(userId: Types.ObjectId, projectId: string): Promise<DaosReturnProject> {
        try {
            const project = await Project.findById(projectId).select("-__v -updatedAt");

            if (!project) {
                throw { codeResponse: 404, message: "The project doesn't exists" };
            }

            // Verify User Session & Creator Project are the same
            await validations.verifyProjectOwner(project!.creator, userId);

            await project.deleteOne();

            return { codeResponse: 200, project, message: "The project has deleted successfully!" };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse || 500, message: error.message };
        }
    }

    /* COLLABORATORS */
    async getCollaborators(userId: Types.ObjectId, projectId: string): Promise<DaosReturnProject> {
        try {
            const project = await validations.checkDocumentExists(Project, projectId);
            await project.populate("collaborators");

            await validations.verifyProjectOwner(project.creator._id, userId);

            return { codeResponse: 200, collaborators: project.collaborators as unknown as IUser[] };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse || 500, message: error.message };
        }
    }

    async addCollaborator(userId: Types.ObjectId, projectId: string, username: string): Promise<DaosReturnProject> {
        try {
            const project = await validations.checkDocumentExists(Project, projectId);
            await project?.populate("creator");

            const userToAdd = await User.find({ username });

            if (userToAdd.length == 0) throw { codeResponse: 404, message: "The user doesn't exists" };

            // Verify User Session & Creator Project are the same
            await validations.verifyProjectOwner(project.creator._id, userId);

            // Verify the project.creator doesn't the same of userCollId}
            if (project.creator._id.toString() == userToAdd[0]._id.toString()) {
                throw { codeResponse: 403, message: "You cannot add yourself as a contributor" };
            }

            // Verify the userCollId aren't in the Collaborators arr
            project.collaborators.map((val) => {
                if (val == userToAdd[0]._id.toString()) {
                    throw { codeResponse: 401, message: "The user you are trying to add is already a collaborator" };
                }
            });

            project.collaborators.push(userToAdd[0]._id.toString());

            await project.save();

            return { codeResponse: 200, message: "Collaborator Added!", collaborator: userToAdd[0] };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse || 500, message: error.message };
        }
    }

    async removeCollaborator(userId: Types.ObjectId, projectId: string, userCollId: string): Promise<DaosReturnProject> {
        try {
            const project = await validations.checkDocumentExists(Project, projectId);
            const user = await User.findById(userCollId);

            if (!user) {
                throw { codeResponse: 404, message: "The project doesn't exists" };
            }

            // Verify User Session & Creator Project are the same
            await validations.verifyProjectOwner(project!.creator, userId);

            if (!project.collaborators.includes(userCollId)) throw { codeResponse: 404, message: "The user doesn't exists in the Collaborators arr" };

            project.collaborators = project!.collaborators.filter((val) => val != userCollId);

            await project.save();

            return { codeResponse: 200, message: "Collaborator removed successfully!", collaborator: user };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse || 500, message: error.message };
        }
    }
}
