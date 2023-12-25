function get(obj, path, defaultValue) {
    const keys = path.split('.');
    let result = obj;

    for (let key of keys) {
        //未被赋值输出默认值
        if (result[key] === undefined) return defaultValue;
        result = result[key];
    }

    return result;
}

const obj = { a: { b: { c: 1 } } };
console.log(get(obj, 'a.b.c', 2)); // 输出 1
console.log(get(obj, 'a.b.d', 2)); // 输出 2
console.log(get(obj, 'a.b.d.e.f.g', 2)); // 输出 2