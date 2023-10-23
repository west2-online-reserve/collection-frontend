// 获取页面中Dom出现次数最多的前3个名称
function getMostFrequentDomNames() {
    const doms = Array.from(document.querySelectorAll('*'));
    const domCount = {};

    // 统计每个DOM节点的出现次数
    doms.forEach(dom => {
        const tagName = dom.tagName;
        domCount[tagName] = domCount[tagName] ? domCount[tagName] + 1 : 1;
    });

    // 提取出现次数最多的前3个DOM节点名称
    const mostFrequentDomNames = Object.keys(domCount).sort((a, b) => domCount[b] - domCount[a]).slice(0, 3);

    return mostFrequentDomNames;
}

console.log(getMostFrequentDomNames());