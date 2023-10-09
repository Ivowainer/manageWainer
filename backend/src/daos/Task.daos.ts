import { DaosReturnTask, ITask } from "../types/task.type";
import { validations } from "../helper";

import { Project } from "../models";

import { Types } from "mongoose";

import Task from "../models/task.model";

export class TaskManipulation {
    async createTask(userId: Types.ObjectId, projectId: string, taskInfo: Omit<ITask, "_id" | "project">): Promise<DaosReturnTask> {
        const { description, priority, title } = taskInfo;

        if (![description, priority, title].every(Boolean)) {
            throw { codeResponse: 404, message: "Task data is missing" };
        }

        try {
            // Verify the project exitst
            const project = await validations.checkDocumentExists(Project, projectId);

            // Verify User Session & Creator Project are the same
            await validations.verifyProjectOwner(project!.creator, userId);

            const task = new Task({
                description,
                priority,
                title,
                project: projectId,
            });

            await task.save();

            project.tasks.push(task._id);
            await project.save();

            return { codeResponse: 200, message: "The task has created successfully!", task };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse | 500, message: error.message };
        }
    }

    async updateTask(userId: Types.ObjectId, taskId: string, taskInfo: Omit<ITask, "_id" | "project">): Promise<DaosReturnTask> {
        const { description, priority, title } = taskInfo;

        try {
            // Verify the Task exitst
            const task = await validations.checkDocumentExists(Task, taskId);

            // Verify User Session & Creator Project are the same
            const project = await Project.findById(task.project);
            await validations.verifyProjectOwner(project!.creator, userId);

            task.title = title;
            task.description = description;
            task.priority = priority;

            await task.save();

            return { codeResponse: 200, message: "The task has updated successfully!", task };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse | 500, message: error.message };
        }
    }

    async deleteTask(userId: Types.ObjectId, taskId: string): Promise<DaosReturnTask> {
        try {
            // Verify the Task exitst
            const task = await validations.checkDocumentExists(Task, taskId);

            // Verify User Session & Creator Project are the same
            const project = await Project.findById(task.project);
            await validations.verifyProjectOwner(project!.creator, userId);

            project!.tasks = project!.tasks.filter((val) => val.toString() != taskId);
            await project!.save();

            await task.deleteOne();

            return { codeResponse: 200, message: "The task has been deleted", taskId: task._id };
        } catch (error: any) {
            throw { codeResponse: error.codeResponse | 500, message: error.message };
        }
    }
}
