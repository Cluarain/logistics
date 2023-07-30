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

$('#summary-sum').text('152 212 руб').css('margin-left', 'auto').css('color', 'black');
$('#summary-count').text('24 шт').css('margin-left', 'auto').css('color', 'black');
$('#summary-weight').text('2 322 кг').css('margin-left', 'auto').css('color', 'black');
$('#summary-footer').text('152 212 руб').css('margin-left', 'auto').css('font-weight', '600');

const alwaysVisibleColumns = ['Номер', 'Действие', 'Наименование единицы', 'Цена', 'Кол-во'];
const hideableColumns = ['Название товара', 'Вес', 'Заложено на доставку', 'Цена доставки, руб', 'Max грузоподъемность, кг', 'Итого'];
const hideColumns = ['Цена доставки, руб', 'Вес', 'Заложено на доставку', 'Max грузоподъемность, кг'];

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
        'Вес': 25,
        'Заложено на доставку': 'Да',
        'Цена доставки, руб': 50,
        'Max грузоподъемность, кг': 15,
        'Итого': 500,
    },
    {
        // 'Номер': 2,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'Мраморный щебень фр. 2-5 мм, 15кг',
        'Цена': 1231,
        'Кол-во': 10,
        'Название товара': 'Мраморный щебень фр. 2-5 мм',
        'Вес': 15,
        'Заложено на доставку': 'Нет',
        'Цена доставки, руб': 0,
        'Max грузоподъемность, кг': 5,
        'Итого': 500,
    },
    {
        // 'Номер': 3,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'Мраморный щебень фр. 3-6 мм, 105кг',
        'Цена': 2500,
        'Кол-во': 20,
        'Название товара': 'Мраморный щебень фр. 3-6 мм',
        'Вес': 105,
        'Заложено на доставку': 'Да',
        'Цена доставки, руб': 30,
        'Max грузоподъемность, кг': 10,
        'Итого': 600,
    },
    {
        // 'Номер': 4,
        // 'Действие': `${deleteBtn}`,
        'Наименование единицы': 'Мраморный щебень фр. 1-2 мм, 12кг',
        'Цена': 5000,
        'Кол-во': 15,
        'Название товара': 'Мраморный щебень фр. 1-2 мм',
        'Вес': 12,
        'Заложено на доставку': 'Нет',
        'Цена доставки, руб': 0,
        'Max грузоподъемность, кг': 20,
        'Итого': 300,
    }
];
const $dataTable = $('#data-table');
const $columnsMenu = $('#columns-menu');
// let colWidth = ['col1', 'col2', 'col3', 'col4', 'col5', 'col6', 'col7', 'co8', 'col9', 'col10'];
let colWidth = ['25px', '12px', '603px', '196px', '147px', '147px', '122px', '147px', '147px', '147px'];

$(document).ready(function () {
    function renderTable(data) {
        $dataTable.empty();

        let headerRow = '<thead><tr class="header-row">';

        tableColumns.forEach((column) => {
            if (alwaysVisibleColumns.includes(column) || hideableColumns.includes(column)) {
                headerRow += `<th>${column}</th>`;
            }

        });
        headerRow += '</tr></thead>';
        $dataTable.append(headerRow);
        $dataTable.append('<tbody>');


        data.forEach((row, index) => {
            let rowHTML = '<tr>';
            rowHTML += `<td style="width: ${colWidth[0]}" class="column-nomer-dragndrop">${dragndropSVG}${index + 1}</td>`; // Столбец "номер"
            rowHTML += `<td style="width: ${colWidth[1]}">
            <div class="delete-dots d-flex">
                <div class="delete-svg" id="${index}">
                    <img src="SVG/3dot.svg" alt="Удалить">
                </div>
                <div class="delete-popup" id="${index}">
                    <button class="btn delete-btn">Удалить</button>
                </div>
            </div></td>`; // Столбец "действие"
            let i = 0;
            tableColumns.forEach((column) => {
                if (column !== 'Номер' && column !== 'Действие' && (alwaysVisibleColumns.includes(column) || hideableColumns.includes(column))) {
                    rowHTML += `<td data-column="${column}" style="width: ${colWidth[i]}"><input type="text" class="data-column-input" value="${row[column]}"></td>`;
                }
                i++;
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
        // localStorage.clear();
        // loadTableState();
        $(function () {
            $("#data-table tbody").sortable({
                axis: 'y',
                handle: '.dragndrop-svg',
                placeholder: 'sortable-placeholder',
                start: function (event, ui) {
                    const $currentRow = $(ui.item);
                    // console.log($currentRow);
                    ui.helper.height($currentRow.height() - 4);
                    ui.placeholder.height($currentRow.height() - 4);
                },
                stop: function (event, ui) {
                    updateRowNumbers();
                    // saveTableState();
                    // localStorage.clear();
                }
            });
        });
        $(function () {
            $("th").resizable({
                // animate: true,
                handles: "e",
                maxWidth: 1300,
                minWidth: 1,
                resize: function (event, ui) {
                    // console.log(ui.size.width);
                    var thIndex = ui.helper.index();
                    var table = $("#data-table");
                    var cells = table.find("tr td:nth-child(" + (thIndex + 1) + ")");
                    cells.css("width", ui.size.width);
                    cells.css("max-width", ui.size.width);
                    // saveTableState();
                }
            });
        });
    }

    // localStorage.clear();
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
        loadEnabledColumns();
    }

    function updateRowNumbers() {
        $dataTable.find('td:first-child').each(function (index) {
            $(this).html(`${dragndropSVG}${index + 1}`);
        });
    }



    $(function () {
        $('thead tr').sortable({
            //containment: "parent",
            placeholder: "placeholder",
            opacity: 0.5,
            helper: "clone",
            axis: 'x',
            start: function (e, ui) {
                var ind_th = ui.item.index();
                $('tbody tr').each(function (ind, el) {
                    $('td', el).eq(ind_th).addClass('drg').css('color', 'red');
                });
            },
            stop: function (e, ui) {
                var itInd = ui.item.index();
                console.log("Col: " + itInd);
                $("tbody tr").each(function (ind, el) {
                    var cell = $(".drg", el).detach();
                    console.log("Row Len: " + $("td", el).length);
                    if (itInd >= $("td", el).length) {
                        cell.appendTo($(el));
                    } else {
                        cell.insertBefore($("td", el).eq(itInd));
                    }
                    cell.removeClass("drg").css("color", "black");
                });
                // saveTableState();
            }
        });
        $('thead tr').disableSelection();
    });

    $(document).on('click', '.delete-svg', function (event) {
        const rowIndex = $(this).next('div').attr('id');
        // console.log(rowIndex);
        $('.delete-popup').hide();
        $(`#${rowIndex}.delete-popup`).show();
        event.stopPropagation();
    });

    $(document).on("click", function (event) {
        if (!$(event.target).hasClass("delete-btn")) {
            $(".delete-popup").hide();
        }
    });

    $(document).on("click", ".delete-btn", function () {
        var row = $(this).closest("tr");
        var datablock = $(this).closest(".data-block");
        row.remove();
        datablock.remove();
        updateRowNumbers();
    });

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
        const newRowData = {
            'Наименование единицы': '',
            'Цена': 0,
            'Кол-во': 0,
            'Название товара': '',
            'Вес': 0,
            'Заложено на доставку': '',
            'Цена доставки, руб': 0,
            'Max грузоподъемность, кг': 0,
            'Итого': 0,
        };
        tableData.push(newRowData);
        updaeteAllData();
    });
    updaeteAllData();
    function updaeteAllData() {
        renderColumnsMenu();
        renderTable(tableData);
        hideColumnsBasedOnCheckboxState();
        updateRowNumbers();
    }

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
    saveEnabledColumns();
}


function saveEnabledColumns() {
    const enabledColumns = [];
    $columnsMenu.find('input[type="checkbox"]:checked').each(function () {
        enabledColumns.push($(this).attr('name'));
    });
    //////////////////////////////////////////////////////////
    localStorage.setItem('enabledColumns', JSON.stringify(enabledColumns));
}
function loadEnabledColumns() {
    const enabledColumns = JSON.parse(localStorage.getItem('enabledColumns'));
    if (enabledColumns) {
        $columnsMenu.find('input[type="checkbox"]').each(function () {
            const columnName = $(this).attr('name');
            $(this).prop('checked', enabledColumns.includes(columnName));
        });
    }
}

// function saveTableState() {
//     const tableState = {
//         columns: [],
//         rows: [],
//         columnOrder: [],
//         rowOrder: []
//     };

//     $("#data-table th").each(function () {
//         const column = {
//             index: $(this).index(),
//             width: $(this).width()
//         };
//         tableState.columns.push(column);
//         tableState.columnOrder.push(column.index); // Сохраняем порядок столбцов
//     });

//     // Сохраняем положение, порядок и строк
//     $("#data-table tbody tr").each(function () {
//         const row = {
//             index: $(this).index(),
//             top: $(this).position().top
//         };
//         tableState.rows.push(row);
//         tableState.rowOrder.push(row.index); // Сохраняем порядок строк
//     });

//     // Сохраняем данные в LocalStorage
//     localStorage.setItem("tableState", JSON.stringify(tableState));
// }


// Загрузка сохраненного состояния столбцов
// function loadTableState() {
//     const tableStateString = localStorage.getItem("tableState");
//     console.log(tableStateString);
//     if (tableStateString) {
//         const tableState = JSON.parse(tableStateString);

//         // Восстанавливаем порядок столбцов
//         tableState.columnOrder.forEach(function (columnIndex, order) {
//             const th = $("#data-table th").eq(columnIndex);
//             th.css("order", order);
//         });

//         // Восстанавливаем положение и ширину столбцов
//         tableState.columns.forEach(function (column) {
//             const th = $("#data-table th").eq(column.index);
//             th.width(column.width);
//         });

//         // Восстанавливаем порядок строк
//         tableState.rowOrder.forEach(function (rowIndex, order) {
//             const tr = $("#data-table tbody tr").eq(rowIndex);
//             tr.css("order", order);
//         });

//         // Восстанавливаем положение строк
//         tableState.rows.forEach(function (row) {
//             const tr = $("#data-table tbody tr").eq(row.index);
//             tr.css("top", row.top);
//         });
//     }
// }