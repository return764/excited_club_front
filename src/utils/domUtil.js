export function hasClass(el, className) {
    const reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }

    const newClass = el.className.split(/\s+/)
    newClass.push(className)
    el.className = newClass.join(' ')
}

export function removeClass(el,className){
    if (hasClass(el, className)) {
        const newClass = el.className.split(/\s+/).filter(name => name !== className);
        el.className = newClass.join(' ');
    }
}