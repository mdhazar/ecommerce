// Shared domain models for the ecommerce API.

export interface ProductImage {
	url: string;
}

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	rating: number;
	sell_count: number;
	category_id: number;
	store_id?: number;
	images?: ProductImage[];
}

export interface Category {
	id: number;
	code: string;
	gender: string;
	title: string;
	name?: string;
}

export interface CartItem {
	product: Product;
	count: number;
	checked: boolean;
}

export interface User {
	name?: string;
	email: string;
	role_id?: number;
	token?: string;
	gravatarUrl?: string;
	[key: string]: unknown;
}

export interface Address {
	id?: number;
	title: string;
	name: string;
	surname: string;
	phone: string;
	city: string;
	district: string;
	neighborhood: string;
	address: string;
}

export interface LoginData {
	email: string;
	password: string;
	rememberMe?: boolean;
}
