const rand = Math.random;
const round = Math.round;

function formatRelative(actual, reference) {
    const relative = actual * 100 / reference;
    return `${relative.toFixed(2)}%`;
}

/**
 *  Base class to control table.
 */
 class Table {

    /**
     * Instantiate the table with a <table> element.
     * TODO: merge this with Table from history.js.
     * This is basically a non-toggler version of that table.
     */
    constructor(tableElement) {
        this.table = tableElement;
        this.tableBody = tableElement.querySelector('tbody');
        this.rowTemplate = tableElement.querySelector('template');
        this.render();
    }

    /**
     * Generate data for the whole table.
     */
    generateData() {
        return [];
    }

    /**
     * Render a single row using the embedded template.
     *
     * @param rowData Data of a single row.
     */
    renderRow(rowData) {}

    /**
     * Render the whole table body.
     * Guaranteed to be idempotent (run once).
     */
    render() {
        if (this.rendered) {
            return;
        }

        this.generateData().forEach(this.renderRow, this);

        this.rendered = true;
    }
}

class WatchListTable extends Table {
    constructor(tableElement) {
        super(tableElement);
        this.relativeDiff = false;
    }

    generateData() {
        const generateCell = () => [
            'VN30F2201', rand() * 2000, rand() * 10 - 5, rand() * 10 - 5, round(rand() * 1000)
        ]

        return Array.from({ length: rand() * 5 + 3 }, generateCell);
    }

    formatData(rowData) {
        rowData = [...rowData];

        rowData[1] = rowData[1].toFixed(1);
        rowData[2] = this.relativeDiff ?
            window.formatRelative(rowData[2], rowData[1]) : rowData[2].toFixed(1);
        rowData[3] = rowData[3].toFixed(1);

        return rowData;
    }

    renderRow(rowData) {
        const row = this.rowTemplate.content.cloneNode(true);
        const actualDiff = rowData[2];
        rowData = this.formatData(rowData);

        for (let i = 0; i < rowData.length; i++) {
            const cell = row.querySelector(`td:nth-child(${i + 1})`);
            cell.textContent = rowData[i];

            // Save actual diff to data-, so that subsequent changes in display style
            // can use this correct value, instead of the rounded display value.
            if (i == 2) {
                cell.dataset.actualDiff = actualDiff;
            }
        }

        this.tableBody.appendChild(row);
    }

    toggleRelativeDiff() {
        this.relativeDiff = !this.relativeDiff;

        // Change the header
        const diffHead = this.table.querySelector('th:nth-child(3) > span');
        diffHead.textContent = this.relativeDiff ? '%' : '+/-';

        const rows = this.table.querySelectorAll('tbody > tr');
        rows.forEach(row => {
            let price = row.querySelector('td:nth-child(2)');
            price = parseFloat(price.textContent);
            const val = row.querySelector('td:nth-child(3)');

            if (this.relativeDiff) {
                val.textContent = window.formatRelative(parseFloat(val.textContent), price)
            } else {
                val.textContent = parseFloat(val.dataset.actualDiff).toFixed(1);
            }
        }, this);
    }
}

window.onload = () => {
    const watchListTable = new WatchListTable(document.getElementById('watchlist-table'));

    const toggleRelativeDiff = watchListTable.toggleRelativeDiff.bind(watchListTable);
    document.querySelector('i.fa-caret-left').onclick  = toggleRelativeDiff;
    document.querySelector('i.fa-caret-right').onclick = toggleRelativeDiff;
}
