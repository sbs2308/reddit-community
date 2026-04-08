# Reddit Style Anonymous Community - Project Specification

## 1. 개요 (Overview)
본 프로젝트는 레딧(Reddit) 스타일의 익명 커뮤니티 웹사이트를 구축하는 개발 연습용 프로젝트입니다. 별도의 인증 시스템 없이 누구나 자유롭게 카테고리를 생성하고 글을 작성할 수 있는 환경을 목표로 합니다.

## 2. 핵심 요구사항 (Core Requirements)
- **익명성 (Anonymity)**: 로그인이나 회원가입 절차 없이 모든 기능을 이용할 수 있는 완전 익명 시스템.
- **로컬 데이터 저장 (Local Data Storage)**: 외부 데이터베이스(DB) 대신 서버 로컬의 JSON 파일을 데이터 저장소로 사용.
- **카테고리 기반 분류 (Category-based)**: 서브레딧(Subreddit)과 유사한 카테고리 기능을 통해 게시글을 분류.
- **게시글 CRUD (Post CRUD)**: 게시글의 생성(Create), 조회(Read), 수정(Update), 삭제(Delete) 기능 구현.

## 3. 기능 상세 (Functional Requirements)

### A. 카테고리 (Category/Subreddit)
- **목록 조회**: 생성된 모든 카테고리 목록을 확인.
- **카테고리 생성**: 새로운 주제의 카테고리를 자유롭게 생성.
- **필터링**: 특정 카테고리를 선택했을 때 해당 카테고리에 속한 글만 노출.

### B. 게시글 (Post)
- **작성**: 제목, 본문 내용을 입력하여 게시글 작성 (익명).
- **조회**: 게시글 상세 내용 읽기.
- **수정/삭제**: 작성된 글을 수정하거나 삭제 (익명 시스템이므로 비밀번호 기반 또는 완전 개방형 검토 필요).

## 4. 기술 스택 (Technical Stack)
- **Frontend/Backend**: SvelteKit (Svelte 5)
- **Styling**: Tailwind CSS 4
- **Database**: Local JSON File System (`data/posts.json`, `data/categories.json`)
- **Runtime**: Bun

## 5. 데이터 구조 (Data Structure - Draft)

### `categories.json`
```json
[
  {
    "id": "slug-id",
    "name": "카테고리명",
    "description": "설명",
    "createdAt": "ISO-String"
  }
]
```

### `posts.json`
```json
[
  {
    "id": "uuid",
    "categoryId": "slug-id",
    "title": "제목",
    "content": "본문",
    "createdAt": "ISO-String",
    "updatedAt": "ISO-String"
  }
]
```

## 6. 구현 단계 (Implementation Plan)
1. **데이터 저장소 준비**: `data/` 디렉토리 생성 및 초기 JSON 파일 준비.
2. **데이터 접근 로직 구현**: `src/lib/server/storage.ts` 등을 통해 JSON 파일 읽기/쓰기 유틸리티 구현.
3. **카테고리 관리 기능**: 카테고리 목록 조회 및 생성 UI/API 구현.
4. **게시글 CRUD 기능**: 게시글 작성, 상세 페이지, 수정/삭제 로직 구현.
5. **UI/UX 고도화**: 레딧 스타일의 레이아웃 및 디자인 적용.
