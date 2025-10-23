// 씨익 플랫폼 - 공통 JavaScript

// 전역 상태 관리
const AppState = {
  isSidebarOpen: false,
  selectedFilters: [],
  currentSort: 'distance',
  sections: {
    main: { currentPage: 1, itemsPerPage: 10, totalItems: 50 },
    library: { currentPage: 1, itemsPerPage: 10, totalItems: 50 },
    product: { currentPage: 1, itemsPerPage: 10, totalItems: 50 }
  },
  userData: {
    points: 4000000,
    profileImage: null,
    notifications: 3
  }
};

// 헤더 로드 함수
async function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) return;

  try {
    // 현재 페이지의 경로 깊이 확인
    const pathDepth = window.location.pathname.includes('/pages/') ? '../' : './';
    const response = await fetch(`${pathDepth}components/header.html`);
    const html = await response.text();
    headerPlaceholder.innerHTML = html;

    // 링크 경로 수정
    const homeLink = headerPlaceholder.querySelector('[data-home-link]');
    const channelLink = headerPlaceholder.querySelector('[data-channel-link]');
    const settingsLink = headerPlaceholder.querySelector('[data-settings-link]');

    if (homeLink) homeLink.href = pathDepth + 'index.html';
    if (channelLink) channelLink.href = pathDepth + 'pages/channel.html';
    if (settingsLink) settingsLink.href = pathDepth + 'pages/settings.html';
  } catch (error) {
    console.error('헤더 로드 실패:', error);
  }
}

// 사이드바 로드 함수
async function loadSidebar() {
  const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
  if (!sidebarPlaceholder) return;

  try {
    // 현재 페이지의 경로 깊이 확인
    const pathDepth = window.location.pathname.includes('/pages/') ? '../' : './';
    const response = await fetch(`${pathDepth}components/sidebar.html`);
    const html = await response.text();
    sidebarPlaceholder.innerHTML = html;

    // 현재 페이지 확인
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    // 링크 경로 수정 및 active 클래스 설정
    const createLink = sidebarPlaceholder.querySelector('[data-create-link]');
    const mapLink = sidebarPlaceholder.querySelector('[data-map-link]');
    const channelLink = sidebarPlaceholder.querySelector('[data-channel-link]');
    const settingsLink = sidebarPlaceholder.querySelector('[data-settings-link]');

    if (createLink) {
      createLink.href = pathDepth + 'pages/create.html';
      if (currentPage === 'create.html') createLink.classList.add('active');
    }
    if (mapLink) {
      mapLink.href = pathDepth + 'pages/map.html';
      if (currentPage === 'map.html') mapLink.classList.add('active');
    }
    if (channelLink) {
      channelLink.href = pathDepth + 'pages/channel.html';
      if (currentPage === 'channel.html') channelLink.classList.add('active');
    }
    if (settingsLink) {
      settingsLink.href = pathDepth + 'pages/settings.html';
      if (currentPage === 'settings.html') settingsLink.classList.add('active');
    }
  } catch (error) {
    console.error('사이드바 로드 실패:', error);
  }
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([loadHeader(), loadSidebar()]).then(() => {
    initializeApp();
  });
});

// 앱 초기화
function initializeApp() {
  setupMobileMenu();
  setupSearch();
  setupFilters();
  setupLoadMore();
  updateUserInfo();

  // 초기 카드 로드
  initializeCards();
}

// 초기 카드 로드
function initializeCards() {
  // 추천 콘텐츠: 현재 3개 있으므로 7개 추가하여 총 10개
  const mainContainer = document.querySelector('.grid-container');
  if (mainContainer && mainContainer.querySelectorAll('.content-card').length === 3) {
    addDummyCards(7, mainContainer, 'mixed');
  }

  // 3D 라이브러리: 10개 추가
  const libraryContainer = document.getElementById('library-grid');
  if (libraryContainer) {
    addDummyCards(10, libraryContainer, 'library');
  }

  // 상품: 10개 추가
  const productContainer = document.getElementById('product-grid');
  if (productContainer) {
    addDummyCards(10, productContainer, 'product');
  }
}

// 모바일 메뉴 토글
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', () => {
      toggleSidebar();
    });

    overlay.addEventListener('click', () => {
      closeSidebar();
    });
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  AppState.isSidebarOpen = !AppState.isSidebarOpen;

  if (AppState.isSidebarOpen) {
    sidebar.classList.add('mobile-open');
    overlay.classList.add('active');
  } else {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
  }
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  AppState.isSidebarOpen = false;
  sidebar.classList.remove('mobile-open');
  overlay.classList.remove('active');
}

// 검색 기능
function setupSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }
}

function handleSearch() {
  const searchInput = document.querySelector('.search-input');
  const query = searchInput.value.trim();

  if (query) {
    console.log('검색:', query);
    // 실제 구현 시 검색 API 호출
    searchContent(query);
  }
}

function searchContent(query) {
  // 검색 로직 구현
  console.log('검색 실행:', query);
  // TODO: 검색 결과를 가져와서 화면에 표시
}

// 필터 기능
function setupFilters() {
  const filterTags = document.querySelectorAll('.filter-tag');
  const sortButtons = document.querySelectorAll('.sort-btn');
  const resetBtn = document.querySelector('.filter-reset-btn');

  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      toggleFilter(tag);
    });
  });

  sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      changeSort(btn);
    });
  });

  // 초기화 버튼 이벤트
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetFilters();
    });
  }
}

function toggleFilter(tag) {
  const filterValue = tag.dataset.filter;

  // "전체" 버튼 클릭 시 모든 필터 해제
  if (filterValue === '전체') {
    resetFilters();
    return;
  }

  // 필터 토글 (중복 선택 가능)
  tag.classList.toggle('active');

  if (tag.classList.contains('active')) {
    if (!AppState.selectedFilters.includes(filterValue)) {
      AppState.selectedFilters.push(filterValue);
    }
  } else {
    AppState.selectedFilters = AppState.selectedFilters.filter(f => f !== filterValue);
  }

  console.log('선택된 필터:', AppState.selectedFilters);
  applyFilters();
}

// 필터 초기화 함수
function resetFilters() {
  // 모든 필터 태그의 active 클래스 제거
  const filterTags = document.querySelectorAll('.filter-tag');
  filterTags.forEach(tag => {
    tag.classList.remove('active');
  });

  // 선택된 필터 배열 초기화
  AppState.selectedFilters = [];

  console.log('필터 초기화됨');
  applyFilters();
}

function changeSort(btn) {
  const sortValue = btn.dataset.sort;

  // 모든 정렬 버튼 비활성화
  document.querySelectorAll('.sort-btn').forEach(b => {
    b.classList.remove('active');
  });

  // 선택된 버튼 활성화
  btn.classList.add('active');
  AppState.currentSort = sortValue;

  console.log('정렬 변경:', sortValue);
  applySort();
}

function applyFilters() {
  // 필터 적용 로직
  const cards = document.querySelectorAll('.content-card');

  cards.forEach(card => {
    const cardFilters = card.dataset.filters ? card.dataset.filters.split(',') : [];

    if (AppState.selectedFilters.length === 0) {
      card.style.display = 'flex';
    } else {
      const hasMatch = AppState.selectedFilters.some(filter =>
        cardFilters.includes(filter)
      );
      card.style.display = hasMatch ? 'flex' : 'none';
    }
  });
}

function applySort() {
  // 정렬 적용 로직
  const container = document.querySelector('.grid-container');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll('.content-card'));

  cards.sort((a, b) => {
    switch(AppState.currentSort) {
      case 'distance':
        return parseFloat(a.dataset.distance || 0) - parseFloat(b.dataset.distance || 0);
      case 'latest':
        return new Date(b.dataset.date || 0) - new Date(a.dataset.date || 0);
      case 'popular':
        return parseInt(b.dataset.likes || 0) - parseInt(a.dataset.likes || 0);
      default:
        return 0;
    }
  });

  cards.forEach(card => container.appendChild(card));
}

// 더보기 버튼 설정
function setupLoadMore() {
  // 추천 콘텐츠 더보기 (기존 버튼, ID 없음)
  const mainLoadMoreBtn = document.querySelector('.load-more-btn:not([id])');
  if (mainLoadMoreBtn) {
    mainLoadMoreBtn.addEventListener('click', () => handleLoadMore('main'));
  }

  // 3D 라이브러리 더보기
  const libraryLoadMoreBtn = document.getElementById('library-load-more');
  if (libraryLoadMoreBtn) {
    libraryLoadMoreBtn.addEventListener('click', () => handleLoadMore('library'));
  }

  // 상품 더보기
  const productLoadMoreBtn = document.getElementById('product-load-more');
  if (productLoadMoreBtn) {
    productLoadMoreBtn.addEventListener('click', () => handleLoadMore('product'));
  }
}

let isLoading = false;

function handleLoadMore(section) {
  if (isLoading) return;

  // 섹션별 설정
  const config = {
    main: {
      btnSelector: '.load-more-btn:not([id])',
      containerSelector: '.grid-container',
      type: 'mixed'
    },
    library: {
      btnSelector: '#library-load-more',
      containerSelector: '#library-grid',
      type: 'library'
    },
    product: {
      btnSelector: '#product-load-more',
      containerSelector: '#product-grid',
      type: 'product'
    }
  };

  const sectionConfig = config[section];
  const loadMoreBtn = document.querySelector(sectionConfig.btnSelector);
  const container = document.querySelector(sectionConfig.containerSelector);

  if (!container || !loadMoreBtn) return;

  // 로딩 상태 표시
  isLoading = true;
  loadMoreBtn.classList.add('loading');
  loadMoreBtn.innerHTML = `
    <div class="loader-spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>
    <span>로딩중...</span>
  `;

  // 실제 구현 시 API 호출
  setTimeout(() => {
    // 더미 카드 추가 (10개씩)
    addDummyCards(10, container, sectionConfig.type);
    AppState.sections[section].currentPage++;

    const sectionData = AppState.sections[section];

    // 로딩 상태 해제
    isLoading = false;
    loadMoreBtn.classList.remove('loading');
    loadMoreBtn.innerHTML = `
      <svg class="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
      <span>더보기 (${sectionData.currentPage * sectionData.itemsPerPage}/${sectionData.totalItems})</span>
    `;

    // 모든 아이템을 불러왔으면 버튼 숨기기
    if (sectionData.currentPage * sectionData.itemsPerPage >= sectionData.totalItems) {
      loadMoreBtn.style.display = 'none';
    }
  }, 800);
}

function addDummyCards(count, container, type = 'mixed') {
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const card = createDummyCard(type);
    container.appendChild(card);
  }
}

// 사용자 정보 업데이트
function updateUserInfo() {
  const pointsDisplay = document.querySelector('.points-display');
  const notificationBadge = document.querySelector('.notification-badge');

  if (pointsDisplay) {
    const pointsValue = pointsDisplay.querySelector('.points-value');
    if (pointsValue) {
      pointsValue.textContent = formatNumber(AppState.userData.points);
    }
  }

  if (notificationBadge && AppState.userData.notifications === 0) {
    notificationBadge.style.display = 'none';
  }
}

// 숫자 포맷팅 (1,000,000 형식)
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 카드 좋아요 토글
function toggleLike(element, cardId) {
  element.classList.toggle('liked');
  const likeCount = element.querySelector('.like-count');

  if (element.classList.contains('liked')) {
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
    console.log('좋아요:', cardId);
  } else {
    likeCount.textContent = parseInt(likeCount.textContent) - 1;
    console.log('좋아요 취소:', cardId);
  }
}

// 공유 기능
function shareContent(cardId, title) {
  if (navigator.share) {
    navigator.share({
      title: title,
      text: `씨익에서 공유: ${title}`,
      url: window.location.href
    }).then(() => {
      console.log('공유 완료');
    }).catch((error) => {
      console.log('공유 취소', error);
    });
  } else {
    // 폴백: 클립보드 복사
    copyToClipboard(window.location.href);
    showToast('링크가 복사되었습니다');
  }
}

// 클립보드 복사
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// 토스트 메시지
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.95);
    color: #0f0f0f;
    padding: 12px 24px;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    animation: toast-in 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-out 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, duration);
}

// 페이지 이동
function navigateTo(path) {
  window.location.href = path;
}

// 색상 조정 함수 (그라데이션용)
function adjustColor(color, amount) {
  const clamp = (num) => Math.min(Math.max(num, 0), 255);

  // #RRGGBB 형식에서 RGB 추출
  const num = parseInt(color.replace('#', ''), 16);
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0x00FF) + amount);
  const b = clamp((num & 0x0000FF) + amount);

  return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}

// 더미 카드 생성 (테스트용)
function createDummyCard(filterType = 'mixed') {
  const cardData = {
    project: [
      { type: 'project', title: '모던 아파트 인테리어', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop', author: '디자인 스튜디오', logo: 'D', logoColor: '#F56342', filters: 'interior,design' },
      { type: 'project', title: '미니멀 주택 설계', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop', author: '건축 사무소', logo: 'A', logoColor: '#00AEEF', filters: 'architecture,design' },
      { type: 'project', title: '모던 카페 인테리어', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop', author: '인테리어 플러스', logo: 'I', logoColor: '#9b59b6', filters: 'interior,design' },
      { type: 'project', title: '정원 조경 디자인', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', author: '조경 디자인', logo: 'L', logoColor: '#27ae60', filters: 'landscape,design' }
    ],
    library: [
      { type: 'library', title: '현대적인 소파 3D 모델', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop', author: '3D Studio', logo: '3D', logoColor: '#e74c3c', filters: 'furniture,design' },
      { type: 'library', title: '인테리어 체어 모델', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop', author: 'Model Lab', logo: 'ML', logoColor: '#f39c12', filters: 'furniture' },
      { type: 'library', title: '조명 3D 컬렉션', image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop', author: 'Light Studio', logo: 'LS', logoColor: '#f1c40f', filters: 'lighting' },
      { type: 'library', title: '가구 3D 세트', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&h=300&fit=crop', author: '3D Furniture', logo: '3F', logoColor: '#16a085', filters: 'furniture' }
    ],
    product: [
      { type: 'product', title: '디자이너 펜던트 조명', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop', author: '조명 갤러리', logo: 'LG', logoColor: '#e67e22', filters: 'lighting,design' },
      { type: 'product', title: '북유럽 스타일 테이블', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop', author: '가구 매장', logo: 'FM', logoColor: '#3498db', filters: 'furniture' },
      { type: 'product', title: '럭셔리 소파', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop', author: '리빙 스토어', logo: 'LS', logoColor: '#2ecc71', filters: 'furniture' },
      { type: 'product', title: '디자인 체어', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop', author: '가구 스토어', logo: 'FS', logoColor: '#8e44ad', filters: 'furniture' }
    ]
  };

  // 타입별 카드 데이터 선택
  let dataArray;
  if (filterType === 'mixed') {
    // 혼합: 모든 타입에서 랜덤 선택
    const allData = [...cardData.project, ...cardData.library, ...cardData.product];
    dataArray = allData;
  } else {
    // 특정 타입만 선택
    dataArray = cardData[filterType] || cardData.project;
  }

  const data = dataArray[Math.floor(Math.random() * dataArray.length)];
  const type = data.type;

  const card = document.createElement('div');
  card.className = 'content-card';
  card.dataset.type = type;
  card.dataset.filters = data.filters;
  card.dataset.distance = (Math.random() * 10).toFixed(1);
  card.dataset.date = new Date().toISOString();
  card.dataset.likes = Math.floor(Math.random() * 100);

  card.innerHTML = `
    <div class="card-thumbnail-container">
      <img class="card-thumbnail" src="${data.image}" alt="${data.title}">
      <div class="card-badge ${type}">${type === 'project' ? '프로젝트' : type === 'library' ? '3D' : '상품'}</div>
    </div>
    <div class="card-info">
      <h3 class="card-title">${data.title}</h3>
      <div class="card-author">
        <div class="card-author-avatar" style="background: linear-gradient(135deg, ${data.logoColor}, ${adjustColor(data.logoColor, -20)}); color: white; font-weight: 700; font-size: 12px;">
          ${data.logo}
        </div>
        <span>${data.author}</span>
      </div>
      <div class="card-meta">
        <span class="card-distance">
          <svg class="icon-sm" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
          </svg>
          ${card.dataset.distance}km
        </span>
        <span class="card-dot"></span>
        <span>${Math.floor(Math.random() * 7) + 1}일 전</span>
      </div>
    </div>
    <div class="card-actions">
      <div class="card-stats">
        <div class="card-stat" onclick="toggleLike(this, '${Math.random()}')">
          <svg class="card-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
          </svg>
          <span class="like-count">${card.dataset.likes}</span>
        </div>
      </div>
      <button class="card-share-btn" onclick="shareContent('${Math.random()}', '${data.title}')">
        <svg class="card-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
        </svg>
      </button>
    </div>
  `;

  return card;
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
  @keyframes toast-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes toast-out {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }
`;
document.head.appendChild(style);
