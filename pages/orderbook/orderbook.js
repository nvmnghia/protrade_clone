let dayOrderTable = null;
let selectDayOrderTable = null;

let conditionalOrderTable = null;
let selectConditionalOrderTable = null;

/**
 *  Base class to control table.
 */
 class Table {

    /**
     * Instantiate the table with a <table> element.
     * @param tableElement
     */
    constructor(tableElement) {
        this.table = tableElement;
        this.tableBody = tableElement.querySelector('tbody');
        this.rowTemplate = tableElement.querySelector('template');

        // The table is rendered once, at the first time it is shown.
        this.rendered = false;
        if (this.visible()) {
            this.render();
        }
    }

    /**
     * Check if the table is shown.
     */
    visible() {
        return this.table.style.display !== 'none';
    }

    /**
     * Toggle table.
     */
    toggle() {
        if (this.visible()) {
            this.table.style.display = 'none';
        } else {
            this.table.style.display = 'table';
        }

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

function toggleTable() {
    selectDayOrderTable.classList.toggle('table-selected');
    dayOrderTable.toggle();

    selectConditionalOrderTable.classList.toggle('table-selected');
    conditionalOrderTable.toggle();
}

window.onload = () => {
    dayOrderTable = new Table(document.getElementById('day-order-table'));
    selectDayOrderTable = document.getElementById('day-order');
    selectDayOrderTable.onclick = toggleTable;

    conditionalOrderTable = new Table(document.getElementById('conditional-order-table'));
    selectConditionalOrderTable = document.getElementById('conditional-order');
    selectConditionalOrderTable.onclick = toggleTable;
}
