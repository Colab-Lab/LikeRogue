import { generate_whole_map } from "./dungeon_gen.js";

import { initialize_player, handle_player_input } from "./player.js";

let map_data = generate_whole_map();

let player = initialize_player(map_data.up_stair_pos);
handle_player_input(player, display_dungeon);

// Display
function display_dungeon() {
    //clear all
    document.getElementById("dungeon").textContent = "";

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
}

display_dungeon();
    
console.log("Dungeon dimensions:", map_data.dungeon.length, map_data.dungeon[0].length);

