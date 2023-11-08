function delte(index) {
    let data = [1, 2, 3, 4, 5, 6, 7, 9];
    delete data[index];
    data.sort((a, b) => a - b);
    data.pop();
    return data;
}

console.log(delte(3));



