import { getCategories, getPosts, savePost, deleteCategory, type Post } from '$lib/server/storage';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const categories = await getCategories();
	const category = categories.find((c) => c.id === id);

	if (!category) {
		throw error(404, 'Category not found');
	}

	const posts = await getPosts(id);

	return {
		category,
		posts
	};
};

export const actions: Actions = {
	createPost: async ({ request, params }) => {
		const { id: categoryId } = params;
		const data = await request.formData();
		const title = data.get('title') as string;
		const content = data.get('content') as string;
		const password = data.get('password') as string;

		if (!title || title.length < 2) {
			return fail(400, { message: '제목이 너무 짧습니다.' });
		}

		if (!content || content.length < 5) {
			return fail(400, { message: '내용이 너무 짧습니다.' });
		}

		if (!password) {
			return fail(400, { message: '비밀번호를 입력해주세요.' });
		}

		const newPost: Post = {
			id: crypto.randomUUID(),
			categoryId: categoryId!,
			title,
			content,
			password,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		};

		await savePost(newPost);

		return { success: true };
	},

	deleteCategory: async ({ request, params }) => {
		const { id } = params;
		const data = await request.formData();
		const password = data.get('password') as string;

		const categories = await getCategories();
		const category = categories.find((c) => c.id === id);

		if (!category) {
			throw error(404, 'Category not found');
		}

		if (category.password !== password) {
			return fail(403, { message: '비밀번호가 일치하지 않습니다.', categoryError: true });
		}

		await deleteCategory(id!);
		throw redirect(303, '/');
	}
};
