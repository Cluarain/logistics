const alwaysVisibleColumns = ['Номер', 'Действие', 'Наименование единицы', 'Цена', 'Кол-во', 'Итого'];
const hideableColumns = ['Название товара', 'Вес', 'Заложено на доставку', 'Цена доставки, руб', 'Max грузоподъемность, кг'];
const tableColumns = [...alwaysVisibleColumns, ...hideableColumns];
const tableData = [
    {
        'Номер': 1,
        'Действие': 'SVG/3dot.svg',
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
        'Номер': 2,
        'Действие': 'SVG/3dot.svg',
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
        'Номер': 3,
        'Действие': 'SVG/3dot.svg',
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
        'Номер': 4,
        'Действие': 'SVG/3dot.svg',
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
    // const dataTable = new DataTable('#dataTable', {
    //     ajax: ''
    // });

    tableColumns.push('Удалить');
    tableData.forEach(item => {
        item['Действие'] = '<button class="delete-btn">Удалить</button>';
    });

    const dataTable = $('#dynamicTable').DataTable({
        data: tableData,
        columns: tableColumns.map(column => ({ data: column, title: column })),
        scrollX: true,
        fixedColumns: {
            leftColumns: alwaysVisibleColumns.length
        }
    });

    // Функция для обновления номерации строк
    function updateRowNumbers() {
        dataTable.rows().every(function (rowIdx) {
            this.data()[0] = rowIdx + 1;
        });
        dataTable.draw(false);
    }

    // Инициализация перетаскивания столбцов
    new $.fn.dataTable.ColReorder(dataTable);

    // Инициализация изменения размера столбцов
    new $.fn.dataTable.Responsive(dataTable);

    // Инициализация перетаскивания строк
    dataTable.on('mousedown', 'td', function () {
        if ($(this).index() === 0 && !$(this).hasClass('dataTables_empty')) {
            const startIdx = dataTable.row(this).index();

            $(document).on('mousemove', function (e) {
                const endIdx = dataTable.row($('td:hover')[0]).index();
                if (endIdx >= 0) {
                    dataTable.row(startIdx).remove();
                    dataTable.row.add(tableData[startIdx]).draw();
                    if (endIdx > startIdx) {
                        dataTable.row(endIdx).remove();
                        dataTable.row.add(tableData[endIdx - 1]).draw();
                    }
                }
            });

            $(document).on('mouseup', function () {
                updateRowNumbers();
                $(document).off('mousemove mouseup');
            });
        }
    });

    // Обработчик нажатия на кнопку удаления
    dataTable.on('click', '.delete-btn', function () {
        const row = dataTable.row($(this).parents('tr'));
        row.remove().draw();
        updateRowNumbers();
    });

    // Меню выбора отображаемых столбцов
    $('#columnToggle').on('click', function () {
        dataTable.columns().visible(true); // Включаем все столбцы
        dataTable.columns(hideableColumns.map(col => `:${col}`)).visible(false); // Выключаем скрываемые столбцы
    });
});
