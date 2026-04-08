<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>NL 익명 커뮤니티</title>
</svelte:head>

<main class="mx-auto max-w-6xl p-4">
	<header class="mb-12 py-16 text-center bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-2xl border border-indigo-100 shadow-sm">
		<h1 class="text-5xl font-extrabold text-gray-900 tracking-tight">
			<span class="text-indigo-600">NL</span> 익명 커뮤니티
		</h1>
		<div class="mt-4 mx-auto w-24 h-1 bg-indigo-500 rounded-full"></div>
		<p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
			누구나 자유롭게 카테고리를 만들고 <br class="hidden sm:block" /> 익명으로 새로운 이야기를 시작해보세요.
		</p>
	</header>

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-4">
		<!-- Category Creation Form -->
		<section class="lg:col-span-1">
			<div class="rounded-lg bg-white p-6 shadow-md border border-gray-200">
				<h2 class="mb-4 text-xl font-semibold text-gray-800">새 카테고리 만들기</h2>
				<form method="POST" action="?/createCategory" use:enhance class="space-y-4">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">이름</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="예: Svelte 개발자"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
						/>
					</div>
					<div>
						<label for="description" class="block text-sm font-medium text-gray-700">설명</label>
						<textarea
							id="description"
							name="description"
							placeholder="이 카테고리에 대해 알려주세요."
							rows="3"
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
						></textarea>
					</div>
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700">비밀번호 (삭제용)</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="삭제를 위해 필요합니다"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
						/>
					</div>
					{#if form?.message}
						<p class="text-sm text-red-600 font-medium">{form.message}</p>
					{/if}
					<button
						type="submit"
						class="w-full rounded-md bg-indigo-600 py-2.5 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none shadow-sm hover:shadow transition-all"
					>
						카테고리 생성
					</button>
				</form>
			</div>
		</section>

		<!-- Category List -->
		<section class="lg:col-span-3">
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-2xl font-bold text-gray-800 tracking-tight">전체 카테고리</h2>
				<span class="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full">
					{data.categories.length}개
				</span>
			</div>
			{#if data.categories.length === 0}
				<div class="rounded-lg bg-gray-50 p-12 text-center text-gray-500 border border-dashed border-gray-300">
					아직 카테고리가 없습니다. 첫 번째 카테고리를 만들어보세요!
				</div>
			{:else}
				<div class="grid gap-4">
					{#each data.categories as category}
						<a
							href="/r/{category.id}"
							class="block rounded-lg bg-white p-6 shadow-md border border-gray-200 hover:border-indigo-300 transition-colors"
						>
							<h3 class="text-lg font-bold text-indigo-600 underline-offset-4 hover:underline">r/{category.id}</h3>
							<p class="mt-1 text-xl font-semibold text-gray-800">{category.name}</p>
							<p class="mt-2 text-gray-600">{category.description}</p>
							<div class="mt-4 text-xs text-gray-400">
								생성일: {new Date(category.createdAt).toLocaleDateString()}
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</main>
