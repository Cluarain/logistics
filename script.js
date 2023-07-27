const alwaysVisibleColumns = ['Номер', 'Действие', 'Наименование единицы', 'Цена', 'Кол-во', 'Итого'];
const hideableColumns = ['Название товара', 'Вес', 'Заложено на доставку', 'Цена доставки, руб', 'Max грузоподъемность, кг'];
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
const tableData = [
    {
        // 'Номер': 1,
        'Действие': `${deleteBtn}`,
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
        'Действие': `${deleteBtn}`,
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
        'Действие': `${deleteBtn}`,
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
        'Действие': `${deleteBtn}`,
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

$(document).ready(function () {
    const $dataTable = $('#data-table');
    const $columnsMenu = $('#columns-menu');
    const originalTableData = [...tableData];
    // Функция для отображения таблицы с данными
    function renderTable(data) {
        // Очищаем таблицу перед отрисовкой
        $dataTable.empty();

        // Создаем заголовок таблицы
        let headerRow = '<tr class="header-row">';
        tableColumns.forEach((column) => {
            if (alwaysVisibleColumns.includes(column) || hideableColumns.includes(column)) {
                headerRow += `<th>${column}</th>`;
            }
        });
        headerRow += '</tr>';
        $dataTable.append(headerRow);

        // Добавляем строки с данными
        data.forEach((row, index) => {
            let rowHTML = '<tr>';
            rowHTML += `<td>${index + 1}</td>`; // Add sequential numbers
            tableColumns.forEach((column) => {
                if (column !== 'Номер' && (alwaysVisibleColumns.includes(column) || hideableColumns.includes(column))) {
                    rowHTML += `<td data-column="${column}">${row[column]}</td>`;
                }
            });
            rowHTML += '</tr>';
            $dataTable.append(rowHTML);
        });
    }
    // Функция для обновления списка столбцов в меню
    function renderColumnsMenu() {
        $columnsMenu.empty();
        hideableColumns.forEach((column) => {
            const $checkbox = $(`<input type="checkbox" name="${column}" checked>`);
            const $label = $(`<label>${column}</label>`);
            const $menuItem = $('<div class="menu-item"></div>');
            $menuItem.append($checkbox, $label);
            $columnsMenu.append($menuItem);
        });
    }
    function updateRowNumbers() {
        $dataTable.find('tr:not(:first-child)').each(function (index) {
            $(this).find('td:first-child').text(index + 1);
        });
    }
    function deleteRow(row) {
        const rowIndex = $(row).index();
        tableData.splice(rowIndex - 1, 1);
        renderTable(tableData);
        updateRowNumbers(); // Update row numbers after deletion
    }
    // Инициализация таблицы
    renderTable(tableData);
    renderColumnsMenu();

    // Перетаскивание столбцов
    // $dataTable.find('tr.header-row th').draggable({
    //     axis: 'x',
    //     cursor: 'move',
    //     helper: 'clone',
    //     start: function (event, ui) {
    //         //   ui.helper.width($(this).width());

    //         const $currentCol = $(ui.item);
    //         ui.helper.width($currentCol.width());
    //         // ui.placeholder.width($currentCol.width());
    //     },
    //     stop: function (event, ui) {
    //         const columnIndex = $(this).index();
    //         const newIndex = ui.helper.index();
    //         if (columnIndex !== newIndex) {
    //             // Reorder the columns in the table data
    //             const movedColumn = tableColumns.splice(columnIndex - 1, 1);
    //             tableColumns.splice(newIndex - 1, 0, movedColumn);

    //             // Reorder the data in each row based on the new column order
    //             tableData.forEach((row) => {
    //                 const keys = Object.keys(row);
    //                 const newRow = {};
    //                 keys.forEach((key, index) => {
    //                     newRow[tableColumns[index]] = row[key];
    //                 });
    //                 Object.assign(row, newRow);
    //             });
    //             // updateColumnOrder();
    //             renderTable(tableData);
    //             // renderColumnsMenu();
    //         }
    //     }
    // });


    let draggedColumn = null;
    // function onDragStart(e) {
    //     draggedColumn = $(e.target).closest('th')[0];
    // }
    // function onDragEnd(e) {
    //     if (draggedColumn) {
    //         const droppedColumn = $(e.target).closest('th')[0];
    //         if (draggedColumn !== droppedColumn) {
    //             // Изменить порядок столбцов в DOM
    //             const table = $(draggedColumn).closest('table');
    //             const cols = table.find('tr').children();
    //             const draggedIndex = $(draggedColumn).index();
    //             const droppedIndex = $(droppedColumn).index();

    //             table.find('tr').each(function () {
    //                 const cells = $(this).children();
    //                 if (draggedIndex < droppedIndex) {
    //                     $(cells[droppedIndex]).after(cells[draggedIndex]);
    //                 } else {
    //                     $(cells[droppedIndex]).before(cells[draggedIndex]);
    //                 }
    //             });
    //         }
    //         draggedColumn = null;
    //     }
    // }
    // $('.header-row th').attr('draggable', true);
    // $('.header-row th').on('dragstart', onDragStart);
    // $('.header-row th').on('dragover', function (e) {
    //     e.preventDefault();
    // });
    // $('.header-row th').on('drop', onDragEnd);

    $dataTable.find('.header-row th').draggable({
        items: '.header-row th',
        helper: 'clone',
        axis: 'x',
        start: function (event, ui) {
            draggedColumn = $(event.target).closest('th')[0];
        },
        stop: function (event, ui) {
            if (draggedColumn) {
                const droppedColumn = $(event.target).closest('th')[0];
                const droppedIndex = ui.helper.index();
                console.log("Dropped at index: " + droppedIndex);
                // console.log(droppedColumn);
                if (draggedColumn !== droppedColumn) {
                    // Изменить порядок столбцов в DOM
                    const table = $(draggedColumn).closest('table');
                    // console.log(table);
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
    });
    // $dataTable.droppable({
    //     drop: function(event, ui) {
    //       if (draggedColumn) {
    //         const droppedIndex = ui.helper.index();
    //         console.log("Dropped at index: " + droppedIndex);
    //         // Здесь вы можете использовать droppedIndex в своих дальнейших действиях
    //       }
    //     }
    //   });

    // Изменение размера столбцов
    $dataTable.find('th').resizable({
        handles: 'e',
        minWidth: 5,
        stop: function (event, ui) {
            const columnIndex = $(this).index();
            const newWidth = ui.size.width;
            $dataTable.find(`tr td:nth-child(${columnIndex + 1})`).width(newWidth);
        }
    });

    // Перестановка строк
    $dataTable.sortable({
        items: 'tr:not(.header-row)',
        helper: 'clone',
        axis: 'y',
        start: function (event, ui) {
            const $currentRow = $(ui.item);
            ui.helper.height($currentRow.height());
            ui.placeholder.height($currentRow.height());
        },
        stop: function (event, ui) {
            const oldIndex = ui.item.data('index');
            const newIndex = ui.item.index();
            tableData.splice(newIndex, 0, originalTableData.splice(oldIndex, 1)[0]);
            updateRowNumbers();
        }
    }).disableSelection();


    // Показать/скрыть столбцы по выбору пользователя
    $columnsMenu.on('change', 'input[type="checkbox"]', function () {
        const columnName = $(this).attr('name');
        if ($(this).is(':checked')) {
            $dataTable.find(`th:contains(${columnName})`).show();
            $dataTable.find(`td[data-column="${columnName}"]`).show();
        } else {
            $dataTable.find(`th:contains(${columnName})`).hide();
            $dataTable.find(`td[data-column="${columnName}"]`).hide();
        }
    });



    $dataTable.find('.delete-button').on('click', function () {
        const $row = $(this).closest('tr');
        deleteRow($row);
    });
});
