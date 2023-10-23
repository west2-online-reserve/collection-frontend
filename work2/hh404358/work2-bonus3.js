// 创建虚拟DOM节点
function createElement(tag, attrs, children) {
    return {
        tag,
        attrs,
        children
    };
}

// 将虚拟DOM挂载到真实DOM节点
function mount(vdom, target) {
    const { tag, attrs, children } = vdom;

    // 创建真实DOM节点
    const el = document.createElement(tag);

    // 设置节点属性
    for (let attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
    }

    // 递归挂载子节点
    if (children && children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else {
                mount(child, el);
            }
        });
    }

    // 将真实DOM节点挂载到目标节点
    target.appendChild(el);
}

//测试
const vdom = createElement('div', { id: 'container' }, [
    createElement('ul', { id: 'list' }, [
        createElement('li', { className: 'item' }, ['Item 1']),
        createElement('li', { className: 'item' }, ['Item 2']),
        createElement('li', { className: 'item' }, ['Item 3'])
    ])
]);

mount(vdom, document.body);