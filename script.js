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
const dragndropSVG = `<img class="dragndrop-svg" src="SVG/menu.svg" alt="*"></img>`;

const tableData = [
    {
        // 'Номер': 1,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'Мраморный щебень фр. 2-5 мм, 25кг',
        'Цена': 1000,
        'Кол-во': 12,
        'Название товара': 'Мраморный щебень фр. 2-5 мм',
        'Итого': 500,
        'Вес': 25,
        'Заложено на доставку': 'Да',
        'Цена доставки, руб': 50,
        'Max грузоподъемность, кг': 15
    },
    {
        // 'Номер': 2,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'Мраморный щебень фр. 2-5 мм, 15кг',
        'Цена': 1231,
        'Кол-во': 10,
        'Название товара': 'Мраморный щебень фр. 2-5 мм',
        'Итого': 500,
        'Вес': 15,
        'Заложено на доставку': 'Нет',
        'Цена доставки, руб': 0,
        'Max грузоподъемность, кг': 5
    },
    {
        // 'Номер': 3,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'Мраморный щебень фр. 3-6 мм, 105кг',
        'Цена': 2500,
        'Кол-во': 20,
        'Название товара': 'Мраморный щебень фр. 3-6 мм',
        'Итого': 600,
        'Вес': 105,
        'Заложено на доставку': 'Да',
        'Цена доставки, руб': 30,
        'Max грузоподъемность, кг': 10
    },
    {
        // 'Номер': 4,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'Мраморный щебень фр. 1-2 мм, 12кг',
        'Цена': 5000,
        'Кол-во': 15,
        'Название товара': 'Мраморный щебень фр. 1-2 мм',
        'Итого': 300,
        'Вес': 12,
        'Заложено на доставку': 'Нет',
        'Цена доставки, руб': 0,
        'Max грузоподъемность, кг': 20
    }
];

$(document).ready(function () {
    const $dataTable = $('#data-table');
    const $columnsMenu = $('#columns-menu');
    const originalTableData = [...tableData];

    function renderTable(data) {
        $dataTable.empty();

        let headerRow = '<thead><tr class="header-row">';
        tableColumns.forEach((column) => {
            if (alwaysVisibleColumns.includes(column) || hideableColumns.includes(column)) {
                headerRow += `<th>${column}<span class="resize-handle"></th>`;
            }
        });
        headerRow += '</tr></thead>';
        $dataTable.append(headerRow);
        $dataTable.append('<tbody>');
        data.forEach((row, index) => {
            let rowHTML = '<tr>';
            rowHTML += `<td class="column-nomer-dragndrop">${dragndropSVG}${index + 1}</td>`; // Столбец "номер"
            rowHTML += `<td>
            <div class="delete-dots d-flex">
                <div class="delete-svg" id="${index}">
                    <img src="SVG/3dot.svg" alt="Удалить">
                </div>
                <div class="delete-popup" id="${index}">
                    <button class="btn delete-btn">Удалить</button>
                </div>
            </div></td>`; // Столбец "действие"

            tableColumns.forEach((column) => {
                if (column !== 'Номер' && column !== 'Действие' && (alwaysVisibleColumns.includes(column) || hideableColumns.includes(column))) {
                    rowHTML += `<td data-column="${column}"><input type="text" class="data-column-input" value="${row[column]}"></td>`;
                }
            });
            rowHTML += '</tr>';
            $dataTable.append(rowHTML);
            $dataTable.append('</tbody>');

            /////////////// Cоздание втрой таблицы для смартфонов
            let mobileTableBlock = "";
            mobileTableBlock += `<div class="data-block">`;
            // mobileTableBlock += `<div class="block-header">Номер</div>`;
            // mobileTableBlock += `<div class="data-cell">${dragndropSVG}${index + 1}</div>`;

            mobileTableBlock += `<div class="block-header">Действие</div>`;
            mobileTableBlock += `<div class="data-cell">
      <div class="delete-dots d-flex">
          <div class="delete-svg" id="${index}">
              <img src="SVG/3dot.svg" alt="Удалить">
          </div>
          <div class="delete-popup" id="${index}">
              <button class="btn delete-btn">Удалить</button>
          </div>
      </div>
  </div>`;
            tableColumns.forEach((column) => {
                if (column !== 'Номер' && column !== 'Действие' && (alwaysVisibleColumns.includes(column) || hideableColumns.includes(column))) {
                    mobileTableBlock += `<div class="block-header">${column}</div>`;
                    mobileTableBlock += `<div class="data-cell"><input type="text" class="data-column-input" value="${row[column]}"></div>`;
                }
            });

            mobileTableBlock += `</div>`;
            $('#mobile-table').append(mobileTableBlock);

        });



    }


    // Функция для обновления списка столбцов в меню
    function renderColumnsMenu() {
        $columnsMenu.empty();
        hideableColumns.forEach((column) => {
            let checked = "checked";
            if (hideColumns.includes(column)) {
                checked = "";
            }
            const $checkbox = $(`<input id="${column}" class="column-checkbox" type="checkbox" name="${column}" ${checked}>`);
            const $label = $(`<label class="column-label" for="${column}">${column}</label>`);
            const $menuItem = $('<div class="menu-item"></div>');
            $menuItem.append($checkbox, $label);
            $columnsMenu.append($menuItem);
        });
    }

    function updateRowNumbers() {
        $dataTable.find('td:first-child').each(function (index) {
            $(this).html(`${dragndropSVG}${index + 1}`);
        });
    }

    function deleteRow(row) {

        tableData.splice(row - 1, 1);
        updaeteAllData();
    }
    // $dataTable.on('click', '.delete-btn', function () {
    //     const $row = $(this).closest('tr');
    //     deleteRow($row);
    // });

    $dataTable.on('click', '.delete-btn', function () {
        const $row = $(this).closest('tr').index();
        // console.log($row);
        deleteRow($row);
    });

    $dataTable.on('click', '.delete-svg', function (event) {
        const rowIndex = $(this).next('div').attr('id');
        console.log(rowIndex);
        $('.delete-popup').hide();
        $(`#${rowIndex}.delete-popup`).show();
        event.stopPropagation();
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.delete-popup').length) {
            $('.delete-popup').hide();
            // columnsMenu.style.display = 'none';
        }
    });

    let draggedColumn = null;
    function onDragStart(e) {
        draggedColumn = $(e.target).closest('th')[0];
    }
    function onDragEnd(e) {
        if (draggedColumn) {
            const droppedColumn = $(e.target).closest('th')[0];
            if (draggedColumn !== droppedColumn) {
                // Изменить порядок столбцов в DOM
                const table = $(draggedColumn).closest('table');
                const cols = table.find('tr').children();
                const draggedIndex = $(draggedColumn).index();
                const droppedIndex = $(droppedColumn).index();

                table.find('tr').each(function () {
                    const cells = $(this).children();
                    if (draggedIndex < droppedIndex) {
                        $(cells[droppedIndex]).after(cells[draggedIndex]);
                    } else {
                        $(cells[droppedIndex]).before(cells[draggedIndex]);
                    }
                });
            }
            draggedColumn = null;
        }
    }
    $('.header-row th').attr('draggable', true);
    $('.header-row th').on('dragstart', onDragStart);
    $('.header-row th').on('dragover', function (e) {
        e.preventDefault();
    });
    $('.header-row th').on('drop', onDragEnd);

    // Перестановка строк
    $dataTable.sortable({
        items: 'tr:not(.header-row)',
        helper: 'clone',
        axis: 'y',
        handle: '.dragndrop-svg',
        placeholder: 'sortable-placeholder',
        start: function (event, ui) {
            const $currentRow = $(ui.item);
            ui.helper.height($currentRow.height() * 0.9);
            ui.placeholder.height($currentRow.height() * 0.9);
        },
        stop: function (event, ui) {
            const oldIndex = ui.item.data('index');
            const newIndex = ui.item.index();
            tableData.splice(newIndex, 0, originalTableData.splice(oldIndex, 1)[0]);
            updateRowNumbers();
        }
    }).disableSelection();


    ////////////////////////////////////////////////////////////////////////////////////
    // Изменение размера столбцов
    // $('#data-table th').resizable({
    //     handles: 'e',
    //     // minWidth: 0,
    //     stop: function (event, ui) {
    //         const columnIndex = $(this).index();
    //         const newWidth = ui.size.width;
    //         $dataTable.find(`tr td:nth-child(${columnIndex + 1})`).width(newWidth);
    //     }
    // });
    ////////////////////////////////////////////////////////////////////////////////////


    // Показать/скрыть столбцы по выбору пользователя
    $columnsMenu.on('change', 'input[type="checkbox"]', function () {
        const columnName = $(this).attr('name');
        const isVisible = $(this).is(':checked');
        if (isVisible) {
            $dataTable.find(`th:contains(${columnName})`).show();
            $dataTable.find(`td[data-column="${columnName}"]`).show();

        } else {
            $dataTable.find(`th:contains(${columnName})`).hide();
            $dataTable.find(`td[data-column="${columnName}"]`).hide();
        }
        hideColumnsBasedOnCheckboxState();
    });


    $('.btn-add-row').on('click', function () {
        addNewRow();
    });
    function addNewRow() {
        const newRowData = {
            'Наименование единицы': '',
            'Цена': 0,
            'Кол-во': 0,
            'Название товара': '',
            'Итого': 0,
            'Вес': 0,
            'Заложено на доставку': '',
            'Цена доставки, руб': 0,
            'Max грузоподъемность, кг': 0
        };
        tableData.push(newRowData);
        updaeteAllData();
    }
    function updaeteAllData() {
        renderColumnsMenu();
        renderTable(tableData);
        hideColumnsBasedOnCheckboxState();
        updateRowNumbers();
    }
    updaeteAllData();
});

function hideColumnsBasedOnCheckboxState() {
    const $columnsMenu = $('#columns-menu');
    $columnsMenu.find('input[type="checkbox"]').each(function () {
        const columnName = $(this).attr('name');
        const isVisible = $(this).is(':checked');

        if (!isVisible) {
            const $dataTable = $('#data-table');
            $dataTable.find(`th:contains(${columnName})`).hide();
            $dataTable.find(`td[data-column="${columnName}"]`).hide();
        }
    });
}


