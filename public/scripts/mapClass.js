class Map {
    constructor(characters, enemy, rooms) {
        this.characters = characters;
        this.enemy = enemy;
        this.rooms = rooms;

    }

    createScene(scene) {
        this.rooms.forEach(element => {
            element.add(scene);

        });

    }

}

export { Map }