const obj = {
    a: {
        b: 1,
        c: 2
    },
    b: 2,
    c: [1, 2]
}

// console.log(Object.entries(obj))

function flatten(obj, key = "", res = {}, isArray = false) {
    for (let [k, v] of Object.entries(obj)) {
        if (Array.isArray(v)) {
            let tmpRes = isArray ? key + "[" + k + "]" : key + k
            flatten(v, tmpRes, res, true)
        } else if (typeof v === 'object') {
            let tmpRes = isArray ? key + "[" + k + "]" : key + k + '.'
            flatten(v, tmpRes, res)
        } else {
            let tmpRes = isArray ? key + "[" + k + "]" : key + k
            res[tmpRes] = v
        }
    }
    return res
}

console.log(
    flatten(obj)
)