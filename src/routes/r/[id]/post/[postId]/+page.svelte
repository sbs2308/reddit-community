<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let isEditing = $state(false);
	let title = $state(data.post.title);
	let content = $state(data.post.content);

	function toggleEdit() {
		isEditing = !isEditing;
		if (!isEditing) {
			title = data.post.title;
			content = data.post.content;
		}
	}
</script>

<svelte:head>
	<title>{data.post.title} - r/{data.category.id}</title>
</svelte:head>

<main class="mx-auto max-w-3xl p-4">
	<nav class="mb-6">
		<a href="/r/{data.category.id}" class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow transition-all group" title="목록으로 돌아가기">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="m15 18-6-6 6-6"/>
			</svg>
		</a>
	</nav>

	<article class="rounded-lg bg-white p-8 shadow-md border border-gray-200">
		{#if isEditing}
			<form method="POST" action="?/updatePost" use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						isEditing = false;
					}
				};
			}} class="space-y-4">
				<div>
					<label for="title" class="block text-sm font-medium text-gray-700">제목</label>
					<input
						type="text"
						id="title"
						name="title"
						bind:value={title}
						required
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
					/>
				</div>
				<div>
					<label for="content" class="block text-sm font-medium text-gray-700">내용</label>
					<textarea
						id="content"
						name="content"
						bind:value={content}
						rows="10"
						required
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
					></textarea>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="작성 시 설정한 비밀번호"
						required
						class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
					/>
				</div>
				{#if form?.message && !form.deleteError}
					<p class="text-sm text-red-600 font-medium">{form.message}</p>
				{/if}
				<div class="flex space-x-2 pt-2">
					<button
						type="submit"
						class="rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none font-bold"
					>
						저장하기
					</button>
					<button
						type="button"
						onclick={toggleEdit}
						class="rounded-md bg-gray-200 py-2 px-4 text-gray-700 hover:bg-gray-300 focus:outline-none"
					>
						취소
					</button>
				</div>
			</form>
		{:else}
			<header class="mb-6">
				<h1 class="text-3xl font-bold text-gray-900">{data.post.title}</h1>
				<div class="mt-2 text-sm text-gray-400">
					작성일: {new Date(data.post.createdAt).toLocaleString()}
					{#if data.post.updatedAt !== data.post.createdAt}
						(수정됨: {new Date(data.post.updatedAt).toLocaleString()})
					{/if}
				</div>
			</header>

			<div class="prose max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
				{data.post.content}
			</div>

			<footer class="mt-12 border-t pt-8">
				<div class="flex flex-col space-y-8">
					<div class="flex">
						<button
							onclick={toggleEdit}
							class="flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
						>
							<span class="mr-1">✎</span> 수정하기
						</button>
					</div>

					<div class="rounded-xl bg-red-50 p-6 border border-red-100 shadow-sm">
						<h3 class="text-sm font-extrabold text-red-800 mb-4 flex items-center">
							<span class="mr-2">⚠️</span> 위험 지역: 게시글 삭제
						</h3>
						<form method="POST" action="?/deletePost" use:enhance class="flex flex-col sm:flex-row gap-3">
							<input
								type="password"
								name="password"
								placeholder="삭제 비밀번호를 입력하세요"
								required
								class="flex-1 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
							/>
							<button
								type="submit"
								class="rounded-lg bg-red-600 py-2.5 px-6 text-sm font-extrabold text-white hover:bg-red-700 focus:outline-none shadow-sm hover:shadow transition-all"
							>
								삭제하기
							</button>
						</form>
						{#if form?.deleteError}
							<p class="mt-3 text-sm text-red-600 font-bold flex items-center">
								<span class="mr-1">✕</span> {form.message}
							</p>
						{/if}
						<p class="mt-4 text-xs text-red-400">
							삭제된 게시글은 복구할 수 없습니다. 작성 시 입력한 비밀번호가 필요합니다.
						</p>
					</div>
				</div>
			</footer>
		{/if}
	</article>
</main>
