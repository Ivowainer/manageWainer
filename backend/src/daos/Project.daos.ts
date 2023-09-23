import { DaosReturnProject } from "../types/project.type";

export class ProjectManipulation {
    async createProject(): Promise<DaosReturnProject> {
        return { codeResponse: 200, message: "Project created successfully!", project };
    }
}
