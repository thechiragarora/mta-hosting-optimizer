import mongoose, { PipelineStage } from "mongoose";

export default class BaseService<T extends mongoose.Document> {
    constructor(model) {
        this.model = model;
    }
    private model: mongoose.Model<mongoose.Document>;

    aggregate(pipeline: PipelineStage[]): any {
        return this.model.aggregate(pipeline);
    }

    createAll(items: T[], options = {}) {
        return this.model.insertMany(items, options);
    }

}