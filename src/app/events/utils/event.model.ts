export interface IEventsRequest {
  data: IEvent
}

export interface IEventsResponse {
  data: IEvent[]
  meta: Meta
}

export interface IEvent {
  title: string
  description?: string
  date?: string
  location?: string
  state?: EventStatus

  id?: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  locale?: any
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export enum EventStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}
