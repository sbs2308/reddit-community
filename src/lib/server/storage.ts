import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = path.resolve('data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

export interface Category {
	id: string; // URL slug
	name: string;
	description: string;
	password: string; // Added for deletion authorization
	createdAt: string;
}

export interface Post {
	id: string;
	categoryId: string;
	title: string;
	content: string;
	password: string; // Added for deletion authorization
	createdAt: string;
	updatedAt: string;
}

// Helper to ensure data directory and files exist
async function ensureDataFiles() {
	try {
		await fs.access(DATA_DIR);
	} catch {
		await fs.mkdir(DATA_DIR, { recursive: true });
	}

	for (const file of [CATEGORIES_FILE, POSTS_FILE]) {
		try {
			await fs.access(file);
		} catch {
			await fs.writeFile(file, JSON.stringify([]));
		}
	}
}

// Categories
export async function getCategories(): Promise<Category[]> {
	await ensureDataFiles();
	const data = await fs.readFile(CATEGORIES_FILE, 'utf-8');
	return JSON.parse(data);
}

export async function saveCategory(category: Category): Promise<void> {
	const categories = await getCategories();
	categories.push(category);
	await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
}

export async function deleteCategory(id: string): Promise<void> {
	// Delete category
	const categories = await getCategories();
	const filteredCategories = categories.filter(c => c.id !== id);
	await fs.writeFile(CATEGORIES_FILE, JSON.stringify(filteredCategories, null, 2));

	// Delete all posts in this category
	const posts = await fs.readFile(POSTS_FILE, 'utf-8');
	const allPosts: Post[] = JSON.parse(posts);
	const filteredPosts = allPosts.filter(p => p.categoryId !== id);
	await fs.writeFile(POSTS_FILE, JSON.stringify(filteredPosts, null, 2));
}

// Posts
export async function getPosts(categoryId?: string): Promise<Post[]> {
	await ensureDataFiles();
	const data = await fs.readFile(POSTS_FILE, 'utf-8');
	let posts: Post[] = JSON.parse(data);
	
	if (categoryId) {
		posts = posts.filter(p => p.categoryId === categoryId);
	}
	
	// Sort by newest first
	return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPost(id: string): Promise<Post | undefined> {
	const posts = await getPosts();
	return posts.find(p => p.id === id);
}

export async function savePost(post: Post): Promise<void> {
	const posts = await getPosts();
	posts.push(post);
	await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post | undefined> {
	const posts = await getPosts();
	const index = posts.findIndex(p => p.id === id);
	if (index === -1) return undefined;

	posts[index] = { 
		...posts[index], 
		...updates, 
		updatedAt: new Date().toISOString() 
	};
	
	await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2));
	return posts[index];
}

export async function deletePost(id: string): Promise<boolean> {
	const posts = await getPosts();
	const filtered = posts.filter(p => p.id !== id);
	if (posts.length === filtered.length) return false;

	await fs.writeFile(POSTS_FILE, JSON.stringify(filtered, null, 2));
	return true;
}
