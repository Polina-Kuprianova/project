// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Литературные места Москвы — загружено');

    function initMap() {
        // Координаты точек маршрута
        const points = [
            { coords: [55.767210, 37.593390], name: 'Большая Садовая улица, 10', desc: 'Музей М.А. Булгакова' },
            { coords: [55.760307, 37.586131], name: 'Садовая-Кудринская улица, 6', desc: 'Мемориальная квартира А.П. Чехова' },
            { coords: [55.754193, 37.590066], name: 'Борисоглебский переулок, 6с1', desc: 'Дом-музей М.И. Цветаевой' }
        ];

        // Создаём карту
        const map = new ymaps.Map('map', {
            center: [55.7605, 37.592],
            zoom: 13,
            controls: ['zoomControl', 'fullscreenControl']
        });

        map.controls.remove('searchControl');
        map.controls.remove('trafficControl');
        map.controls.remove('typeSelector');
        map.controls.remove('rulerControl');

        // Добавляем метки на карту (коричневые)
        points.forEach((point, index) => {
            const placemark = new ymaps.Placemark(point.coords, {
                hintContent: point.name,
                balloonContentHeader: point.name,
                balloonContentBody: point.desc,
                balloonContentFooter: `📍 Точка ${index + 1} из ${points.length}`
            }, {
                preset: 'islands#brownBookIcon',
                iconColor: '#8B5A2B'
            });
            map.geoObjects.add(placemark);
        });

        // Клик по карте для открытия ссылки
        map.events.add('click', (e) => {
            const target = e.get('target');
            if (!(target instanceof ymaps.Placemark)) {
                window.open('https://yandex.ru/maps/213/moscow/?ll=37.589464%2C55.760755&mode=routes&rtext=55.767028%2C37.593927~55.760307%2C37.586131~55.754228%2C37.590078&rtt=pd&ruri=~~&z=15.71', '_blank');
            }
        });
    }

    // Загрузка API
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(initMap);
    } else {
        const checkYmaps = setInterval(() => {
            if (typeof ymaps !== 'undefined') {
                clearInterval(checkYmaps);
                ymaps.ready(initMap);
            }
        }, 100);
    }

    // Анимация появления
    const blocks = document.querySelectorAll('.text-box, .map-wrapper, .icon-row');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    blocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        block.style.transition = 'opacity 0.5s ease, transform 0.4s ease';
        observer.observe(block);
    });
    const allExpandBtns = document.querySelectorAll('.expand-btn');
    
    allExpandBtns.forEach((btn) => {
        // Находим родительский блок .location-card, в котором находится эта кнопка
        const parentCard = btn.closest('.location-card');
        
        // Внутри этого же родительского блока находим контейнер с expanded-info
        const targetInfo = parentCard.querySelector('.expanded-info');
        
        if (targetInfo) {
            // Добавляем обработчик клика для каждой кнопки
            btn.addEventListener('click', () => {
                // Переключаем класс 'show'
                targetInfo.classList.toggle('show');
                
                // Меняем текст кнопки в зависимости от состояния
                if (targetInfo.classList.contains('show')) {
                    btn.textContent = 'свернуть';
                } else {
                    btn.textContent = 'развернуть';
                }
            });
        }
    });
});