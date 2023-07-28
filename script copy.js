const settingsSvg = document.getElementById('id_settings-svg');
const settingsPopup = document.querySelector('.settings-popup');

settingsSvg.addEventListener('click', (event) => {
    if (settingsPopup.style.display === 'none' || settingsPopup.style.display === '') {
        settingsPopup.style.display = 'block';
    } else {
        settingsPopup.style.display = 'none';
    }
    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    if (!settingsSvg.contains(event.target) && !settingsPopup.contains(event.target)) {
        settingsPopup.style.display = 'none';
        columnsMenu.style.display = 'none';
    }
});

const settingsPopupBtn = document.querySelector('.settings-popup-btn');
const columnsMenu = document.getElementById('columns-menu');

settingsPopupBtn.addEventListener('click', () => {
    if (columnsMenu.style.display === 'none' || columnsMenu.style.display === '') {
        columnsMenu.style.display = 'block';
    } else {
        columnsMenu.style.display = 'none';
    }
});


const alwaysVisibleColumns = ['Номер', 'Действие', 'Наименование единицы', 'Цена', 'Кол-во', 'Итого'];
const hideableColumns = ['Название товара', 'Вес', 'Заложено на доставку', 'Цена доставки, руб', 'Max грузоподъемность, кг'];
const hideColumns = ['Цена доставки, руб', 'Max грузоподъемность, кг'];

const tableColumns = [...alwaysVisibleColumns, ...hideableColumns];
const deleteBtn =
    `<div class="delete-dots d-flex">
    <div class="delete-svg">
        <img src="SVG/3dot.svg" alt="Удалить">
    </div>
    <div class="delete-popup">
        <button href="#" class="btn delete-btn">Удалить</button>
    </div>
</div>`
const dragndropSVG = `<img class="dragndrop-svg" src="SVG/menu.svg" alt="*"></img>`;

const tableData = [
    {
        // 'Номер': 1,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'Шт',
        'Цена': 100,
        'Кол-во': 5,
        'Название товара': 'Телефон',
        'Итого': 500,
        'Вес': 0.2,
        'Заложено на доставку': 'Да',
        'Цена доставки, руб': 50,
        'Max грузоподъемность, кг': 15
    },
    {
        // 'Номер': 2,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'кг',
        'Цена': 50,
        'Кол-во': 10,
        'Название товара': 'Кофе',
        'Итого': 500,
        'Вес': 0.5,
        'Заложено на доставку': 'Нет',
        'Цена доставки, руб': 0,
        'Max грузоподъемность, кг': 5
    },
    {
        // 'Номер': 3,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'шт',
        'Цена': 30,
        'Кол-во': 20,
        'Название товара': 'Карандаши',
        'Итого': 600,
        'Вес': 0.1,
        'Заложено на доставку': 'Да',
        'Цена доставки, руб': 30,
        'Max грузоподъемность, кг': 10
    },
    {
        // 'Номер': 4,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'кг',
        'Цена': 20,
        'Кол-во': 15,
        'Название товара': 'Яблоки',
        'Итого': 300,
        'Вес': 0.2,
        'Заложено на доставку': 'Нет',
        'Цена доставки, руб': 0,
        'Max грузоподъемность, кг': 20
    }
];
const $dataTable = $('#data-table');

function createTableHeader() {
    // const headerRow = document.createElement('tr');
    // tableColumns.forEach(column => {
    //     const th = document.createElement('th');
    //     th.textContent = column;
    //     headerRow.appendChild(th);
    // });
    // $dataTable.append(`<thead>${headerRow}</thead>`);

    const headerHtml = alwaysVisibleColumns.map(column => `<th data-column="${column}">${column}</th>`);
    const hidebleHeaderHtml = hideableColumns
        // .filter(column => !hideColumns.includes(column))
        .map(column => `<th data-column="${column}" class="optional-column">${column}</th>`);

    const headerRow = `<tr>${headerHtml.join('')}${hidebleHeaderHtml.join('')}</tr>`;

    $dataTable.append(`<thead>${headerRow}</thead>`);
}
function createTableBody() {
    const tableBodyHtml = tableData.map((rowData, rowIndex) => {
        const numberCell = `<td>${dragndropSVG} ${rowIndex + 1}</td>`;
        const actionCell = `<td>${deleteBtn}</td>`;
        const cells = alwaysVisibleColumns.slice(2).map(column => `<td data-column="${column}"><input type="text" value='${rowData[column]}'></td>`);
        const hidebleCells = hideableColumns.map(column => `<td data-column="${column}" class="optional-column"><input type="text" value='${rowData[column]}'></td>`);
        return `<tr>${numberCell}${actionCell}${cells.join('')}${hidebleCells.join('')}</tr>`;
    }).join('');

    $dataTable.append(`<tbody>${tableBodyHtml}</tbody>`);
}

function createColumnsMenu() {
    const columnsMenu = document.getElementById('columns-menu');
    hideableColumns.forEach(column => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = column;
        checkbox.checked = !hideColumns.includes(column);


        checkbox.addEventListener('change', () => {
            const columnName = checkbox.name;
            const isVisible = checkbox.checked;
            console.log(columnName);
            if (isVisible) {
                $dataTable.find(`th:contains(${columnName})`).show();
                $dataTable.find(`td[data-column="${columnName}"]`).show();
            } else {
                $dataTable.find(`th:contains(${columnName})`).hide();
                $dataTable.find(`td[data-column="${columnName}"]`).hide();
            }
        });
        label.appendChild(checkbox);
        label.append(column);
        columnsMenu.appendChild(label);
    });
}
$dataTable.empty();
createTableHeader();
createTableBody();
createColumnsMenu();