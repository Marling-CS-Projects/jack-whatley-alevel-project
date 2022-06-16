function transition(sSpeed, eSpeed) {

    setTimeout(() => {for (let i = sSpeed; i <= eSpeed; i - 0.001) {

        return i;

    }}, 1000);

}

export { transition };