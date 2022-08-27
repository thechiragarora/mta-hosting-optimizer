import mongoose, { PipelineStage } from "mongoose";

export default class BaseService<T extends mongoose.Document> {
    constructor(model) {
        this.model = model;
    }
    private model: mongoose.Model<mongoose.Document>;

    aggregate(pipeline: PipelineStage[]) {
        return this.model.aggregate(pipeline);
    }

    create(item: T) {
        return this.model.create(item);
    }

    createAll(items: T[], options = {}) {
        return this.model.insertMany(items, options);
    }

    updateById(id: string, item: any, options?: object) {
        return this.model.findByIdAndUpdate(id, item, { new: true, ...options }).lean();
    }

    updateFirst(query: object, item: any, options?: object) {
        return this.model.findOneAndUpdate(query, item, { new: true, ...options }).lean();
    }

    delete(query: object) {
        return this.model.deleteMany(query);
    }

    deleteById(id: string) {
        return this.model.deleteMany({ _id: id });
    }

    count(query: object) {
        return this.model.count(query);
    }

    list(query: Record<string, unknown>) {
        const { ...rest } = query;
        return this.model.find(rest);
    }

    findById(id: string) {
        return this.model.findById(id).lean();
    }

}