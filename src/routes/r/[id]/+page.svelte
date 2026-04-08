<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showDeleteConfirm = $state(false);
</script>

<svelte:head>
	<title>r/{data.category.id} - {data.category.name}</title>
</svelte:head>

<main class="mx-auto max-w-4xl p-4">
	<nav class="mb-6 flex items-center justify-between">
		<a href="/" class="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:shadow transition-all group" title="홈으로 돌아가기">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="m15 18-6-6 6-6"/>
			</svg>
		</a>
		
		<button 
			onclick={() => showDeleteConfirm = !showDeleteConfirm}
			class="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
		>
			{showDeleteConfirm ? '삭제 취소' : '카테고리 삭제'}
		</button>
	</nav>

	{#if showDeleteConfirm}
		<div class="mb-8 rounded-lg bg-red-50 p-6 border border-red-200 shadow-sm animate-in fade-in slide-in-from-top-4">
			<h3 class="text-lg font-bold text-red-800 mb-2">카테고리 삭제 확인</h3>
			<p class="text-sm text-red-600 mb-4">정말로 이 카테고리를 삭제하시겠습니까? 속한 모든 게시글이 함께 삭제되며 복구할 수 없습니다.</p>
			<form method="POST" action="?/deleteCategory" use:enhance class="flex flex-col sm:flex-row gap-3">
				<input
					type="password"
					name="password"
					placeholder="카테고리 생성 시 설정한 비밀번호"
					required
					class="flex-1 rounded-md border border-red-200 px-4 py-2 text-sm focus:border-red-500 focus:outline-none"
				/>
				<button
					type="submit"
					class="rounded-md bg-red-600 py-2 px-6 text-sm font-bold text-white hover:bg-red-700 transition-colors"
				>
					영구 삭제
				</button>
			</form>
			{#if form?.categoryError}
				<p class="mt-2 text-xs text-red-600 font-bold">{form.message}</p>
			{/if}
		</div>
	{/if}

	<header class="mb-8 rounded-lg bg-white p-8 shadow-md border border-gray-200">
		<h1 class="text-sm font-bold text-gray-500 uppercase tracking-wider">r/{data.category.id}</h1>
		<h2 class="mt-1 text-3xl font-bold text-gray-900">{data.category.name}</h2>
		<p class="mt-4 text-gray-600">{data.category.description}</p>
	</header>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
		<!-- Post Creation Form -->
		<section class="md:col-span-1">
			<div class="rounded-lg bg-white p-6 shadow-md border border-gray-200 sticky top-4">
				<h3 class="mb-4 text-xl font-semibold">새 글 작성하기</h3>
				<form method="POST" action="?/createPost" use:enhance class="space-y-4">
					<div>
						<label for="title" class="block text-sm font-medium text-gray-700">제목</label>
						<input
							type="text"
							id="title"
							name="title"
							placeholder="글 제목을 입력하세요"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
						/>
					</div>
					<div>
						<label for="content" class="block text-sm font-medium text-gray-700">내용</label>
						<textarea
							id="content"
							name="content"
							placeholder="무슨 생각을 하고 계신가요?"
							rows="5"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
						></textarea>
					</div>
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700">비밀번호 (삭제용)</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="비밀번호를 입력하세요"
							required
							class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
						/>
					</div>
					{#if form?.message && !form.categoryError}
						<p class="text-sm text-red-600">{form.message}</p>
					{/if}
					<button
						type="submit"
						class="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none"
					>
						게시하기
					</button>
				</form>
			</div>
		</section>

		<!-- Posts List -->
		<section class="md:col-span-2">
			<h3 class="mb-4 text-xl font-semibold">게시글 ({data.posts.length})</h3>
			{#if data.posts.length === 0}
				<div class="rounded-lg bg-gray-50 p-12 text-center text-gray-500 border border-dashed border-gray-300">
					아직 게시글이 없습니다. 첫 번째 글을 남겨보세요!
				</div>
			{:else}
				<div class="grid gap-4">
					{#each data.posts as post}
						<article class="rounded-lg bg-white p-6 shadow-md border border-gray-200">
							<h4 class="text-xl font-bold text-gray-900">{post.title}</h4>
							<p class="mt-4 whitespace-pre-wrap text-gray-800">{post.content}</p>
							<div class="mt-6 flex items-center justify-between text-xs text-gray-400">
								<span>작성일: {new Date(post.createdAt).toLocaleString()}</span>
								<div class="space-x-2">
									<a href="/r/{data.category.id}/post/{post.id}" class="text-indigo-600 hover:underline">자세히 보기</a>
								</div>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</main>
