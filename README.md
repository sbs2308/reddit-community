# 🚀 NL 익명 커뮤니티 (Anonymous Community)

**SvelteKit**과 **Tailwind CSS 4**로 구현한 레딧(Reddit) 스타일의 완전 익명 커뮤니티 프로젝트입니다. 별도의 회원가입 없이 누구나 자유롭게 카테고리를 만들고 익명으로 글을 남길 수 있습니다.

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

## ✨ 주요 기능 (Key Features)

### 📂 카테고리(Subreddit) 관리
- **자유로운 생성**: 누구나 원하는 주제의 카테고리를 만들 수 있습니다.
- **한글 슬러그 지원**: 카테고리 이름에 맞춰 URL(`r/카테고리명`)이 자동으로 생성됩니다.
- **비밀번호 보호**: 생성 시 설정한 비밀번호로 카테고리 전체를 삭제할 수 있습니다.

### 📝 게시글(Post) CRUD
- **익명 작성**: 로그인 없이 제목과 본문만으로 글을 게시합니다.
- **비밀번호 기반 수정/삭제**: 글 작성 시 입력한 비밀번호가 일치해야만 수정하거나 삭제할 수 있어 최소한의 관리 기능을 제공합니다.
- **상세 보기**: 게시글의 전체 내용을 확인하고 수정/삭제를 제안할 수 있는 직관적인 UI를 제공합니다.

### 🎨 디자인 및 UX
- **레딧 스타일**: 친숙한 게시판 형태의 레이아웃과 카드 UI를 적용했습니다.
- **반응형 디자인**: 데스크톱과 모바일 환경 모두에서 쾌적하게 이용할 수 있습니다.
- **아이콘 내비게이션**: 텍스트 대신 직관적인 화살표 아이콘으로 페이지를 이동합니다.

### 💾 데이터 시스템
- **로컬 스토리지**: 외부 DB 없이 서버 내 `data/` 디렉토리의 JSON 파일을 데이터베이스로 사용합니다. (개발 실습용)

## 🛠 기술 스택 (Tech Stack)

- **Frontend/Backend**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5 Runes)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Runtime**: [Bun](https://bun.sh/)
- **Database**: Local JSON File System

## 🚀 시작하기 (Getting Started)

### 사전 준비
이 프로젝트를 실행하기 위해 [Bun](https://bun.sh/)이 설치되어 있어야 합니다.

### 설치 및 실행
```bash
# 저장소 복제
git clone https://github.com/sbs2308/reddit-community.git

# 의존성 설치
bun install

# 개발 서버 실행
bun run dev
```
기본적으로 `http://localhost:5173` 주소에서 확인하실 수 있습니다.

## 📅 향후 계획 (Future Plans)
- [ ] 댓글 및 대댓글 시스템 구현
- [ ] 게시글 추천/비추천 (투표) 기능
- [ ] 제목 및 내용 키워드 검색 기능
- [ ] Supabase(PostgreSQL) 연동을 통한 실제 서비스 배포 준비

---
*이 프로젝트는 개발 연습 및 아이디어 공유를 목적으로 제작되었습니다.*
