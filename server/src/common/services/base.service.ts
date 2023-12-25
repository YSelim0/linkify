import { Model, Query } from "mongoose"

export class BaseService {
  constructor(private readonly model: Model<any>) {}

  findAll() {
    return this.model.find({})
  }

  findById(id: string) {
    return this.model.findById(id)
  }

  findBy(query: any) {
    return this.model.find(query)
  }

  findOneBy(query: any) {
    return this.model.findOne(query)
  }

  create(object: any) {
    return this.model.create(object)
  }

  updateById(id: string, object: any) {
    return this.model.updateOne({ _id: id }, object)
  }

  updateBy(query: any, object: any) {
    return this.model.updateMany(query, object)
  }

  updateOneBy(query: any, object: any) {
    return this.model.updateOne(query, object)
  }

  deleteById(id: string): Query<any, any, {}, any, "deleteOne"> {
    return this.model.deleteOne({ _id: id })
  }

  deleteOne(query: any): Query<any, any, {}, any, "deleteOne"> {
    return this.model.deleteOne(query)
  }

  deleteMany(query: any): Query<any, any, {}, any, "deleteMany"> {
    return this.model.deleteMany(query)
  }
}
