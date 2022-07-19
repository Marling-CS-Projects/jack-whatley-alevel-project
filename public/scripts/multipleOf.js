function multipleOf(multiple, number) {

    number -= multiple;
    //console.log(number)

    if (number === 0) {

        return true;

    } 
    
    if (number < 0) {

        return false;

    }

    multipleOf(multiple, number);

}

export { multipleOf };