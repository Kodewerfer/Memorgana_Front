import IEntry_Related from "./IEntry_Related";

export default interface IMemo {
  _id: string
  keyword: string
  entries_related: [IEntry_Related]
  description: string
  isDeleted: Boolean
  meta: {
    count_visited: Number
    count_moded: Number
    date_create: Date
    date_last_moded: Date
  }
}