import { getCategories, saveCategory, type Category } from '$lib/server/storage';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await getCategories();
	return {
		categories
	};
};

export const actions: Actions = {
	createCategory: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const password = data.get('password') as string;

		if (!name || name.length < 2) {
			return fail(400, { message: '카테고리 이름이 너무 짧습니다.' });
		}

		if (!password) {
			return fail(400, { message: '비밀번호를 입력해주세요.' });
		}

		// Improved slugify for the ID (supports non-English characters better)
		let id = name
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9가-힣-]/g, ''); // Allow Korean characters in slug

		// Fallback for cases where slugification results in an empty or invalid string
		if (!id || id === '-') {
			id = crypto.randomUUID().slice(0, 8);
		}

		const existing = await getCategories();
		if (existing.find(c => c.id === id)) {
			return fail(400, { message: '이미 존재하는 카테고리 이름입니다.' });
		}

		const newCategory: Category = {
			id,
			name,
			description: description || '',
			password,
			createdAt: new Date().toISOString()
		};

		await saveCategory(newCategory);

		return { success: true };
	}
};
