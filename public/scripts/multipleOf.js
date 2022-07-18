function multipleOf(multiple, number) {

    number = number - multiple;
    console.log(number)

    if (number === 0) {

        return true;

    } else if (number < 0) {

        return false;

    }

    multipleOf(multiple, number);

}

export { multipleOf };