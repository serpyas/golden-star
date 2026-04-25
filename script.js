// ========== ИНИЦИАЛИЗАЦИЯ ДАННЫХ ==========
function initializeData() {
    // Инициализация номеров
    if (!localStorage.getItem('roomsData')) {
        const defaultRooms = [
            { id: 1, name: "Стандарт", area: "21 м²", beds: "Две односпальные кровати", count: 2, price: 2300, icon: "🛏️", description: "Уютный номер для комфортного отдыха. Идеальный вариант для транзитных путешественников.", images: ["rooms/1m.jpg"], amenities: ["Кондиционер", "Холодильник", "Телевизор", "Душ"] },
            { id: 2, name: "Двухместный с балконом", area: "21 м²", beds: "Двуспальная кровать", count: 1, price: 2800, icon: "🏞️", description: "Романтичный номер с балконом и захватывающим видом на реку", images: ["rooms/1m.jpg"], amenities: ["Кондиционер", "Холодильник", "Телевизор", "Балкон"] },
            { id: 3, name: "Трехместный", area: "23 м²", beds: "Двуспальная + односпальная", count: 1, price: 3200, icon: "👥", description: "Просторный номер для компании из трех человек", images: ["rooms/3m.jpg"], amenities: ["Кондиционер", "Телевизор", "Душ"] },
            { id: 4, name: "Семейный", area: "42 м²", beds: "Две двуспальные кровати", count: 1, price: 4500, icon: "🏠", description: "Идеальный выбор для семейного отдыха. Две изолированные комнаты", images: ["rooms/st.jpg"], amenities: ["2 санузла", "Балкон", "Телевизор"] },
            { id: 5, name: "Премиум с балконом", area: "40 м²", beds: "Большая двуспальная", count: 1, price: 5500, icon: "✨", description: "Номер повышенной комфортности с панорамными окнами", images: ["rooms/str.jpg"], amenities: ["Угловая ванна", "Халаты", "Тапочки"] },
            { id: 6, name: "Премиум с камином", area: "40 m²", beds: "Круглая кровать", count: 1, price: 6000, icon: "🔥", description: "Роскошный номер с электрическим камином", images: ["rooms/prk.jpg"], amenities: ["Электрокамин", "Угловая ванна", "Халаты"] },
            { id: 7, name: "VIP с джакузи", area: "45 m²", beds: "Круглая кровать", count: 1, price: 7500, icon: "🛁", description: "Премиальный номер с собственной джакузи", images: ["rooms/pr.jpg"], amenities: ["Джакузи", "Чайник", "Посуда"] }
        ];
        localStorage.setItem('roomsData', JSON.stringify(defaultRooms));
        console.log('✅ Инициализированы номера');
    }
    
    // Инициализация пользователей (с админом)
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            { id: 1, name: "Администратор", email: "admin@admin.com", phone: "+7 (999) 999-99-99", password: "admin" }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
        console.log('✅ Инициализированы пользователи (admin@admin.com / admin)');
    }
    
    // Инициализация бронирований
    if (!localStorage.getItem('hotelBookings')) {
        localStorage.setItem('hotelBookings', JSON.stringify([]));
        console.log('✅ Инициализированы бронирования');
    }
    
    // Инициализация отзывов с тестовыми данными
    if (!localStorage.getItem('reviews')) {
        const defaultReviews = [
            { id: 1, name: "Екатерина", rating: 5, text: "Отель превзошёл все ожидания! Очень красиво, уютно, чисто и комфортно! Вид из окна шикарный.", status: "approved", date: new Date().toLocaleString() },
            { id: 2, name: "Михаил", rating: 5, text: "Лучшая гостиница в Тимашевске! Останавливались уже 5 раз. Персонал приветливый, кухня вкусная.", status: "approved", date: new Date().toLocaleString() },
            { id: 3, name: "Анна", rating: 4, text: "Прекрасное место для остановки в пути. Чисто, уютно, вкусно кормят.", status: "approved", date: new Date().toLocaleString() }
        ];
        localStorage.setItem('reviews', JSON.stringify(defaultReviews));
        console.log('✅ Инициализированы отзывы');
    }
    
    // Инициализация сообщений
    if (!localStorage.getItem('contactMessages')) {
        localStorage.setItem('contactMessages', JSON.stringify([]));
        console.log('✅ Инициализированы сообщения');
    }
}

// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let roomsData = [];
let currentUser = null;

// Загрузка данных из localStorage
function loadData() {
    roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
    currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    console.log('📦 Данные загружены:', { roomsCount: roomsData.length, user: currentUser?.email });
}

// Сохранение номеров
function saveRooms() {
    localStorage.setItem('roomsData', JSON.stringify(roomsData));
}

// ========== ФУНКЦИИ АВТОРИЗАЦИИ ==========
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('active');
        // Очищаем поля
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('regName').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regPhone').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('regConfirmPassword').value = '';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.classList.remove('active');
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

function register() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirmPassword').value;
    
    if (!name || !email || !phone || !password) {
        alert('Заполните все поля');
        return;
    }
    if (password !== confirm) {
        alert('Пароли не совпадают');
        return;
    }
    if (password.length < 4) {
        alert('Пароль должен быть не менее 4 символов');
        return;
    }
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        alert('Пользователь с таким email уже существует');
        return;
    }
    
    const newUser = { id: Date.now(), name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = { id: newUser.id, name, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Регистрация успешна!');
    closeAuthModal();
    updateAuthUI();
    location.reload();
}

function login() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Админ
    if (email === 'admin@admin.com' && password === 'admin') {
        currentUser = { id: 0, name: 'Администратор', email: 'admin@admin.com', isAdmin: true };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        alert('Добро пожаловать, Администратор!');
        closeAuthModal();
        updateAuthUI();
        window.location.href = 'admin.html';
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('Неверный email или пароль');
        return;
    }
    
    currentUser = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    alert(`Добро пожаловать, ${user.name}!`);
    closeAuthModal();
    updateAuthUI();
    location.reload();
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateAuthUI();
    location.reload();
}

function updateAuthUI() {
    const authContainer = document.querySelector('.auth-link-container');
    const userInfoContainer = document.querySelector('.user-info-container');
    const adminLink = document.getElementById('adminLink');
    
    if (!authContainer || !userInfoContainer) return;
    
    if (currentUser) {
        authContainer.style.display = 'none';
        userInfoContainer.style.display = 'flex';
        const userNameSpan = document.querySelector('.user-name');
        if (userNameSpan) userNameSpan.textContent = currentUser.name;
        
        if (currentUser.email === 'admin@admin.com') {
            if (adminLink) adminLink.style.display = 'block';
        } else {
            if (adminLink) adminLink.style.display = 'none';
        }
    } else {
        authContainer.style.display = 'block';
        userInfoContainer.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
    }
}

// Функция для админа — загрузка логотипа
function uploadLogo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                const logoData = ev.target.result;
                localStorage.setItem('hotelLogo', logoData);
                loadLogo();
                alert('Логотип обновлён!');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Добавить кнопку для загрузки логотипа в админке
function addLogoUploadButton() {
    const adminControls = document.querySelector('.admin-controls .container');
    if (adminControls && !document.getElementById('uploadLogoBtn')) {
        const btn = document.createElement('button');
        btn.id = 'uploadLogoBtn';
        btn.className = 'btn btn-secondary';
        btn.style.marginLeft = '10px';
        btn.innerHTML = '🖼️ Сменить логотип';
        btn.onclick = uploadLogo;
        adminControls.appendChild(btn);
    }
}

// ========== ЛИЧНЫЙ КАБИНЕТ ==========
function openProfile() {
    if (!currentUser) return;
    
    const profileContent = document.getElementById('profileContent');
    if (!profileContent) return;
    
    let bookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    bookings = bookings.filter(b => b.userId === currentUser.id);
    
    profileContent.innerHTML = `
        <h3>${currentUser.name}</h3>
        <p>Email: ${currentUser.email}</p>
        <h4 style="margin-top:20px">Мои бронирования (${bookings.length}):</h4>
    `;
    
    if (bookings.length === 0) {
        profileContent.innerHTML += '<p>Нет бронирований</p>';
    } else {
        bookings.forEach(b => {
            profileContent.innerHTML += `
                <div class="booking-item" id="booking-${b.id}" style="margin-bottom:15px; padding:15px; background:#f5f5f5; border-radius:10px">
                    <div><strong>${b.roomName}</strong><br>📅 ${b.checkIn} — ${b.checkOut}<br>👥 ${b.guests} гостей | 💳 ${b.price} ₽/ночь</div>
                    <div class="booking-actions" style="margin-top:10px">
                        <button class="edit-booking-btn" onclick="editBooking(${b.id})">✏️ Редактировать</button>
                        <button class="cancel-booking-btn" onclick="cancelBooking(${b.id})">❌ Отменить</button>
                    </div>
                </div>
            `;
        });
    }
    
    document.getElementById('profileModal').classList.add('active');
}

function editBooking(bookingId) {
    let bookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    const booking = bookings.find(b => b.id == bookingId);
    if (!booking) return;
    
    const newCheckIn = prompt('Новая дата заезда (ГГГГ-ММ-ДД):', booking.checkIn);
    if (!newCheckIn) return;
    const newCheckOut = prompt('Новая дата выезда (ГГГГ-ММ-ДД):', booking.checkOut);
    if (!newCheckOut) return;
    const newGuests = prompt('Количество гостей:', booking.guests);
    if (!newGuests) return;
    
    if (isRoomAvailable(booking.roomId, newCheckIn, newCheckOut, bookingId)) {
        booking.checkIn = newCheckIn;
        booking.checkOut = newCheckOut;
        booking.guests = newGuests;
        localStorage.setItem('hotelBookings', JSON.stringify(bookings));
        alert('Бронирование обновлено!');
        openProfile();
    } else {
        alert('Номер недоступен на выбранные даты');
    }
}

function cancelBooking(bookingId) {
    if (confirm('Отменить бронирование?')) {
        let bookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
        bookings = bookings.filter(b => b.id != bookingId);
        localStorage.setItem('hotelBookings', JSON.stringify(bookings));
        alert('Бронирование отменено');
        openProfile();
    }
}

// ========== ПРОВЕРКА ДОСТУПНОСТИ ==========
function isRoomAvailable(roomId, checkIn, checkOut, excludeBookingId = null) {
    const bookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    const room = roomsData.find(r => r.id == roomId);
    if (!room) return false;
    
    const bookedCount = bookings.filter(b => {
        if (b.roomId != roomId) return false;
        if (excludeBookingId && b.id == excludeBookingId) return false;
        const bIn = new Date(b.checkIn);
        const bOut = new Date(b.checkOut);
        const cIn = new Date(checkIn);
        const cOut = new Date(checkOut);
        return (cIn < bOut && cOut > bIn);
    }).length;
    
    return bookedCount < room.count;
}

// ========== ЛОГОТИП ==========
function loadLogo() {
    const savedLogo = localStorage.getItem('hotelLogo');
    const logoDisplay = document.getElementById('logoDisplay');
    if (!logoDisplay) return;
    
    if (savedLogo) {
        logoDisplay.innerHTML = `<img src="${savedLogo}" alt="Логотип Голден Стар" class="logo-img" style="max-height: 50px; width: auto;">`;
    }
}

// ========== НОМЕРА ==========
function initRoomsPage() {
    const grid = document.getElementById('roomsGrid');
    if (!grid) return;
    
    grid.innerHTML = roomsData.map(room => `
        <div class="room-card">
            <div class="room-image" style="background-image: url('${room.images[0]}'); background-size: cover; background-position: center; height: 220px; border-radius: 15px 15px 0 0;"></div>
            <div class="room-info">
                <h3>${room.name} <span class="room-count">${room.count} ном.</span></h3>
                <div class="room-details"><span>📐 ${room.area}</span><span>${room.beds}</span></div>
                <div class="room-price">${room.price} ₽ / ночь</div>
                <button class="room-btn" onclick="showRoomDetails(${room.id})">Подробнее</button>
            </div>
        </div>
    `).join('');
}

function showRoomDetails(roomId) {
    const room = roomsData.find(r => r.id === roomId);
    if (!room) return;
    
    const modal = document.getElementById('roomModal');
    const content = document.getElementById('roomModalContent');
    
    content.innerHTML = `
        <span class="room-modal-close" onclick="closeRoomModal()">&times;</span>
        <div class="room-modal-inner">
            <h2>${room.name}</h2>
            <img class="main-image" src="${room.images[0]}" style="width:100%; border-radius:15px; max-height:300px; object-fit:cover">
            <p><strong>📐 Площадь:</strong> ${room.area}</p>
            <p><strong>🛏️ Кровати:</strong> ${room.beds}</p>
            <p><strong>💰 Цена:</strong> ${room.price} ₽ / ночь</p>
            <p><strong>📝 Описание:</strong> ${room.description}</p>
            <div class="amenities-list">${room.amenities.map(a => `<span class="amenity-badge">${a}</span>`).join('')}</div>
            <button class="btn btn-primary" style="width:100%; margin-top:20px" onclick="bookRoomFromModal(${room.id}, '${room.name}', ${room.price})">Забронировать</button>
        </div>
    `;
    modal.classList.add('active');
}

function closeRoomModal() {
    const modal = document.getElementById('roomModal');
    if (modal) modal.classList.remove('active');
}

function bookRoomFromModal(roomId, roomName, price) {
    if (!currentUser) {
        alert('Для бронирования необходимо войти в аккаунт');
        closeRoomModal();
        openAuthModal();
        return;
    }
    
    const temp = JSON.parse(localStorage.getItem('tempBooking') || '{}');
    const checkIn = temp.checkIn || prompt('Дата заезда (ГГГГ-ММ-ДД):');
    const checkOut = temp.checkOut || prompt('Дата выезда (ГГГГ-ММ-ДД):');
    const guests = temp.guests || prompt('Количество гостей:', '2');
    
    if (!checkIn || !checkOut) return alert('Введите даты');
    
    if (!isRoomAvailable(roomId, checkIn, checkOut)) {
        alert('Номер недоступен на выбранные даты');
        return;
    }
    
    const bookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    bookings.push({
        id: Date.now(),
        roomId, roomName, price,
        userId: currentUser.id,
        userName: currentUser.name,
        checkIn, checkOut, guests,
        status: 'активно',
        date: new Date().toLocaleString()
    });
    localStorage.setItem('hotelBookings', JSON.stringify(bookings));
    localStorage.removeItem('tempBooking');
    alert('Бронирование создано!');
    closeRoomModal();
}

function initQuickBookingForm() {
    const form = document.getElementById('quickBookingForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Для бронирования необходимо войти в аккаунт');
            openAuthModal();
            return;
        }
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const guests = document.getElementById('guests').value;
        if (!checkIn || !checkOut) return alert('Выберите даты');
        localStorage.setItem('tempBooking', JSON.stringify({ checkIn, checkOut, guests }));
        window.location.href = 'rooms.html';
    });
}

// ========== ОТЗЫВЫ ==========
function initReviews() {
    const container = document.getElementById('reviewsSlider');
    if (!container) return;
    
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const approved = reviews.filter(r => r.status === 'approved');
    
    if (approved.length === 0) {
        container.innerHTML = '<div class="review-card"><div class="review-text">Пока нет отзывов. Будьте первым!</div></div>';
    } else {
        container.innerHTML = approved.map(r => `
            <div class="review-card">
                <div class="review-text">"${r.text}"</div>
                <div class="review-author">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} — ${r.name}</div>
            </div>
        `).join('');
    }
    
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reviewName').value;
            const rating = document.querySelector('input[name="rating"]:checked')?.value;
            const text = document.getElementById('reviewText').value;
            
            if (!name || !rating || !text) {
                alert('Заполните все поля и выберите оценку');
                return;
            }
            
            const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
            reviews.push({
                id: Date.now(),
                name, rating: parseInt(rating), text,
                status: 'pending',
                date: new Date().toLocaleString()
            });
            localStorage.setItem('reviews', JSON.stringify(reviews));
            alert('Спасибо за отзыв! Он будет опубликован после проверки администратором.');
            reviewForm.reset();
            document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
        });
    }
}

// ========== УСЛУГИ ==========
function initServicesPage() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    const services = [
        { name: "Бесплатный Wi-Fi", icon: "📶", desc: "Высокоскоростной интернет на всей территории" },
        { name: "Бесплатная парковка", icon: "🚗", desc: "Охраняемая парковка на территории отеля" },
        { name: "Размещение с животными", icon: "🐾", desc: "Без дополнительной платы" },
        { name: "Круглосуточная стойка", icon: "🕒", desc: "Заезд в любое время" },
        { name: "Трансфер", icon: "🚕", desc: "До аэропорта и вокзала (за доп. плату)" },
        { name: "Прачечная", icon: "👕", desc: "Услуги прачечной и глажки" }
    ];
    
    grid.innerHTML = services.map(s => `
        <div class="service-card">
            <div class="service-icon">${s.icon}</div>
            <h4>${s.name}</h4>
            <p>${s.desc}</p>
        </div>
    `).join('');
}

// ========== КОНТАКТЫ ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value || 'Гость';
        const email = document.getElementById('contactEmail')?.value || '';
        const message = document.getElementById('contactMessage')?.value || '';
        
        if (!email || !message) {
            alert('Заполните email и сообщение');
            return;
        }
        
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({
            id: Date.now(), name, email, message,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        alert('Спасибо! Ваше сообщение отправлено.');
        form.reset();
    });
}

// ========== БРОНИРОВАНИЯ (СТРАНИЦА) ==========
function initBookingPage() {
    const container = document.getElementById('bookingsContainer');
    if (!container) return;
    
    let bookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    if (currentUser && currentUser.email !== 'admin@admin.com') {
        bookings = bookings.filter(b => b.userId === currentUser.id);
    }
    
    if (bookings.length === 0) {
        container.innerHTML = '<p class="no-bookings">У вас пока нет бронирований. <a href="rooms.html">Выберите номер</a> для бронирования.</p>';
    } else {
        container.innerHTML = bookings.map(b => `
            <div class="booking-item">
                <div class="booking-info">
                    <h4>${b.roomName}</h4>
                    <p>📅 ${b.checkIn} — ${b.checkOut}</p>
                    <p>👥 Гостей: ${b.guests} | 💳 ${b.price} ₽/ночь</p>
                    <p>👤 ${b.userName}</p>
                    <p>📅 Забронировано: ${b.date}</p>
                </div>
                <div class="booking-status">${b.status}</div>
            </div>
        `).join('');
    }
}

// ========== АДМИНКА ==========
function initAdminPage() {
    const grid = document.getElementById('adminRoomsGrid');
    if (!grid) return;
    if (!currentUser || currentUser.email !== 'admin@admin.com') return;
    
    document.getElementById('adminName').textContent = currentUser.name;
    renderAdminRooms();
}

function renderAdminRooms() {
    const grid = document.getElementById('adminRoomsGrid');
    if (!grid) return;
    
    grid.innerHTML = roomsData.map(room => `
        <div class="room-card">
            <div class="room-image">${room.icon}</div>
            <div class="room-info">
                <h3>${room.name} <span class="room-count">${room.count} ном.</span></h3>
                <div class="room-details"><span>📐 ${room.area}</span><span>${room.beds}</span></div>
                <div class="room-price">${room.price} ₽ / ночь</div>
                <div class="admin-actions">
                    <button class="admin-edit-btn" onclick="openEditRoomModal(${room.id})">✏️ Редактировать</button>
                    <button class="admin-delete-btn" onclick="deleteRoom(${room.id})">🗑️ Удалить</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openAddRoomModal() {
    document.getElementById('roomEditTitle').textContent = 'Добавить номер';
    document.getElementById('editRoomId').value = '';
    document.getElementById('editRoomName').value = '';
    document.getElementById('editRoomArea').value = '';
    document.getElementById('editRoomBeds').value = '';
    document.getElementById('editRoomCount').value = '';
    document.getElementById('editRoomPrice').value = '';
    document.getElementById('editRoomDescription').value = '';
    document.getElementById('editRoomAmenities').value = '';
    document.getElementById('editRoomImages').value = '';
    document.getElementById('roomEditModal').classList.add('active');
}

function openEditRoomModal(id) {
    const room = roomsData.find(r => r.id === id);
    if (!room) return;
    
    document.getElementById('roomEditTitle').textContent = 'Редактировать номер';
    document.getElementById('editRoomId').value = room.id;
    document.getElementById('editRoomName').value = room.name;
    document.getElementById('editRoomArea').value = room.area;
    document.getElementById('editRoomBeds').value = room.beds;
    document.getElementById('editRoomCount').value = room.count;
    document.getElementById('editRoomPrice').value = room.price;
    document.getElementById('editRoomDescription').value = room.description;
    document.getElementById('editRoomAmenities').value = room.amenities.join(', ');
    document.getElementById('editRoomImages').value = room.images.join(', ');
    document.getElementById('roomEditModal').classList.add('active');
}

function closeRoomEditModal() {
    document.getElementById('roomEditModal').classList.remove('active');
}

const roomEditForm = document.getElementById('roomEditForm');
if (roomEditForm) {
    roomEditForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('editRoomId').value);
        const name = document.getElementById('editRoomName').value;
        const area = document.getElementById('editRoomArea').value;
        const beds = document.getElementById('editRoomBeds').value;
        const count = parseInt(document.getElementById('editRoomCount').value);
        const price = parseInt(document.getElementById('editRoomPrice').value);
        const description = document.getElementById('editRoomDescription').value;
        const amenities = document.getElementById('editRoomAmenities').value.split(',').map(a => a.trim());
        const images = document.getElementById('editRoomImages').value.split(',').map(i => i.trim());
        const icon = ['🛏️', '🏞️', '👥', '🏠', '✨', '🔥', '🛁'][Math.floor(Math.random() * 7)];
        
        if (id) {
            const index = roomsData.findIndex(r => r.id === id);
            if (index !== -1) {
                roomsData[index] = { ...roomsData[index], name, area, beds, count, price, description, amenities, images };
            }
        } else {
            const newId = Math.max(...roomsData.map(r => r.id), 0) + 1;
            roomsData.push({ id: newId, name, area, beds, count, price, description, amenities, images, icon });
        }
        
        saveRooms();
        closeRoomEditModal();
        renderAdminRooms();
        initRoomsPage();
        alert('Сохранено!');
    });
}

function deleteRoom(id) {
    if (confirm('Удалить номер?')) {
        roomsData = roomsData.filter(r => r.id !== id);
        saveRooms();
        renderAdminRooms();
        initRoomsPage();
        alert('Номер удален');
    }
}

// ========== МОДЕРАЦИЯ ==========
function initReviewsModeration() {
    if (!currentUser || currentUser.email !== 'admin@admin.com') return;
    
    const pendingDiv = document.getElementById('pendingList');
    const approvedDiv = document.getElementById('approvedList');
    const rejectedDiv = document.getElementById('rejectedList');
    
    if (!pendingDiv) return;
    
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    const pending = reviews.filter(r => r.status === 'pending');
    const approved = reviews.filter(r => r.status === 'approved');
    const rejected = reviews.filter(r => r.status === 'rejected');
    
    pendingDiv.innerHTML = pending.map(r => `
        <div class="review-moderation-item">
            <strong>${r.name}</strong> ⭐ ${r.rating}/5
            <p>${r.text}</p>
            <small>${r.date}</small>
            <div class="review-moderation-actions">
                <button class="approve-btn" onclick="moderateReview(${r.id}, 'approve')">✅ Одобрить</button>
                <button class="reject-btn" onclick="moderateReview(${r.id}, 'reject')">❌ Отклонить</button>
                <button class="delete-btn" onclick="moderateReview(${r.id}, 'delete')">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
    
    approvedDiv.innerHTML = approved.map(r => `
        <div class="review-moderation-item">
            <strong>${r.name}</strong> ⭐ ${r.rating}/5
            <p>${r.text}</p>
            <small>${r.date}</small>
            <div class="review-moderation-actions">
                <button class="delete-btn" onclick="moderateReview(${r.id}, 'delete')">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
    
    rejectedDiv.innerHTML = rejected.map(r => `
        <div class="review-moderation-item">
            <strong>${r.name}</strong> ⭐ ${r.rating}/5
            <p>${r.text}</p>
            <small>${r.date}</small>
            <div class="review-moderation-actions">
                <button class="delete-btn" onclick="moderateReview(${r.id}, 'delete')">🗑️ Удалить</button>
            </div>
        </div>
    `).join('');
}

function moderateReview(id, action) {
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const index = reviews.findIndex(r => r.id == id);
    if (index === -1) return;
    
    if (action === 'approve') {
        reviews[index].status = 'approved';
    } else if (action === 'reject') {
        reviews[index].status = 'rejected';
    } else if (action === 'delete') {
        reviews = reviews.filter(r => r.id != id);
    }
    
    localStorage.setItem('reviews', JSON.stringify(reviews));
    initReviewsModeration();
    initReviews();
}

function initMessagesModeration() {
    if (!currentUser || currentUser.email !== 'admin@admin.com') return;
    
    const container = document.getElementById('messagesList');
    if (!container) return;
    
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    if (messages.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:40px;">Нет сообщений</p>';
    } else {
        container.innerHTML = messages.map(msg => `
            <div class="message-item">
                <div class="message-header">
                    <span><strong>${msg.name}</strong> (${msg.email})</span>
                    <span>${msg.date}</span>
                </div>
                <p>${msg.message}</p>
                <button class="delete-message-btn" onclick="deleteMessage(${msg.id})">🗑️ Удалить</button>
            </div>
        `).join('');
    }
}

function deleteMessage(id) {
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages = messages.filter(m => m.id != id);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    initMessagesModeration();
}

// ========== МОБИЛЬНОЕ МЕНЮ ==========
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (btn && nav) {
        btn.addEventListener('click', () => nav.classList.toggle('show'));
    }
}

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализируем данные
    initializeData();
    
    // 2. Загружаем данные
    loadData();
    
    // 3. Обновляем интерфейс авторизации
    updateAuthUI();
    
    // 4. Инициализируем компоненты
    initMobileMenu();
    initQuickBookingForm();
    initRoomsPage();
    initServicesPage();
    initBookingPage();
    initContactForm();
    initReviews();
    initAdminPage();
    
    // 5. Для страниц админки
    if (window.location.pathname.includes('admin-reviews.html')) {
        initReviewsModeration();
    }
    if (window.location.pathname.includes('admin-messages.html')) {
        initMessagesModeration();
    }
    
    console.log('✅ Сайт загружен, localStorage содержит:', {
        roomsData: localStorage.getItem('roomsData') ? '✅ есть' : '❌ нет',
        users: localStorage.getItem('users') ? '✅ есть' : '❌ нет',
        hotelBookings: localStorage.getItem('hotelBookings') ? '✅ есть' : '❌ нет',
        reviews: localStorage.getItem('reviews') ? '✅ есть' : '❌ нет',
        contactMessages: localStorage.getItem('contactMessages') ? '✅ есть' : '❌ нет'
    });
});

loadLogo();
    
    if (window.location.pathname.includes('admin.html')) {
        addLogoUploadButton();
    }

// Экспортируем глобальные функции для HTML
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.register = register;
window.login = login;
window.logout = logout;
window.openProfile = openProfile;
window.closeProfileModal = closeProfileModal;
window.editBooking = editBooking;
window.cancelBooking = cancelBooking;
window.showRoomDetails = showRoomDetails;
window.closeRoomModal = closeRoomModal;
window.bookRoomFromModal = bookRoomFromModal;
window.openAddRoomModal = openAddRoomModal;
window.openEditRoomModal = openEditRoomModal;
window.closeRoomEditModal = closeRoomEditModal;
window.deleteRoom = deleteRoom;
window.moderateReview = moderateReview;
window.deleteMessage = deleteMessage;