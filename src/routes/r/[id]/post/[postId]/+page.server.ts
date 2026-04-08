import { getPost, updatePost, deletePost, getCategories } from '$lib/server/storage';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id, postId } = params;
	const post = await getPost(postId);
	const categories = await getCategories();
	const category = categories.find(c => c.id === id);

	if (!post || !category || post.categoryId !== id) {
		throw error(404, 'Post or Category not found');
	}

	return {
		post,
		category
	};
};

export const actions: Actions = {
	updatePost: async ({ request, params }) => {
		const { id, postId } = params;
		const data = await request.formData();
		const title = data.get('title') as string;
		const content = data.get('content') as string;
		const password = data.get('password') as string;

		const post = await getPost(postId!);
		if (!post) throw error(404, 'Post not found');

		if (post.password !== password) {
			return fail(403, { message: '비밀번호가 일치하지 않습니다.' });
		}

		if (!title || title.length < 2) {
			return fail(400, { message: '제목이 너무 짧습니다.' });
		}

		if (!content || content.length < 5) {
			return fail(400, { message: '내용이 너무 짧습니다.' });
		}

		await updatePost(postId!, { title, content });

		return { success: true };
	},

	deletePost: async ({ request, params }) => {
		const { id, postId } = params;
		const data = await request.formData();
		const password = data.get('password') as string;

		const post = await getPost(postId!);
		if (!post) throw error(404, 'Post not found');

		if (post.password !== password) {
			return fail(403, { message: '비밀번호가 일치하지 않습니다.', deleteError: true });
		}

		await deletePost(postId!);
		throw redirect(303, `/r/${id}`);
	}
};
