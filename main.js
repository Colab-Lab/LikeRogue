import { generate_whole_map } from "./dungeon_gen.js";

import { initialize_player } from "./player.js";

let map_data = generate_whole_map();

let player = initialize_player(map_data.up_stair_pos);

// Display
for (let row = 0; row < map_data.dungeon.length; row++) {

    for (let column = 0; column < map_data.dungeon[row].length; column++) {

        if (row === player.player_row && column === player.player_column) {
            document.getElementById("dungeon").textContent += "@";
        } else {
            document.getElementById("dungeon").textContent += map_data.dungeon[row][column];
        }

    }

    document.getElementById("dungeon").textContent += "\n";
}
    
console.log("Dungeon dimensions:", map_data.dungeon.length, map_data.dungeon[0].length);

