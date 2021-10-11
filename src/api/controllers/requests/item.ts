export interface ItemRequest {
    quantity: number, expiry: number
}

export interface ItemResponse {
    quantity: number, validTill: number
}

export interface SellRequest {
    quantity: number
}