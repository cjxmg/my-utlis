/**
 * 导出csv表格文件
 * 
 * @example 
 *     exportCsvTable(['名字', '性别', '年龄'], [
 *          ['张三', '男', '20'],
            ['李四', '女', '18'],
            ['王五', '女', '19']
 *     ]);
 * 
 * @param {Array} thead 表头数据
 * @param {Array} tbody 表格主体数据
 * @param {string} fileName 文件名
 */
function exportCsvTable(thead = [], tbody = [], fileName) {
    const textType = 'text/csv';
    const aLink = document.createElement('a');
    const tabelDataStr = (() => {
        let dataMain = [];
        tbody.forEach(tr => dataMain.push(tr.join('\t,')));
        return thead.join(',') + '\r\n' + dataMain.join('\r\n');
    })();

    aLink.download = `${fileName}.csv`;
    aLink.href = `data:${textType};charset=utf-8,\ufeff${encodeURIComponent(tabelDataStr)}`;
    aLink.click();
}