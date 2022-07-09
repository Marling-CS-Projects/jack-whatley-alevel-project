function multipleOf(multiple, number) {

    while (number > 0) {
        number -= multiple;

    }

    if (number === 0) {

        return true;

    }

    return false;

}

export { multipleOf };