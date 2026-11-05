import { generate_whole_map } from "./dungeon_gen.js";

import { initialize_player, handle_player_input } from "./player.js";

import { check_adjacency, find_possible_moves } from "./collision.js";

//import { find_possible_moves } from "./collision.js";

let map_data = generate_whole_map();

let player = initialize_player(map_data.up_stair_pos);
handle_player_input(player, map_data.dungeon, display_dungeon);

// Display
function display_dungeon() {

    let dungeon_display = "";

    for (let row = 0; row < map_data.dungeon.length; row++) {

        for (let column = 0; column < map_data.dungeon[row].length; column++) {

            if (row === player.player_row && column === player.player_column) {
                dungeon_display += "@";
            } else if (map_data.dungeon[row][column] === "#") {
                // Handle wall
                if (is_wall_visible(map_data.dungeon, row, column)) {
                    dungeon_display += '<span class="wall">#</span>';
                } else {
                    dungeon_display += " ";
                }
            } else {
                // Handle non-wall tile
                dungeon_display += map_data.dungeon[row][column];
            }
        }

        dungeon_display += "\n";
    }

    document.getElementById("dungeon").innerHTML = dungeon_display;
}

display_dungeon();


    /*
    console.log(
        "Possible moves:",
        JSON.stringify(find_possible_moves(
            map_data.dungeon,
            player.player_row,
            player.player_column,
            player.previous_row,
            player.previous_column
        ))
    );
    console.log(
    "Adjacent traversible tiles:",
    check_adjacency(map_data.dungeon, player.player_row, player.player_column)
); */


function is_wall_visible(dungeon, row, column) {
    for (let row_offset = -1; row_offset <= 1; row_offset++) {
        for (let column_offset = -1; column_offset <= 1; column_offset++) {

            if (row_offset === 0 && column_offset === 0) {
                continue;
            }

            // Examine neighboring cell here
            let adjacent_row = row + row_offset;
            let adjacent_column = column + column_offset;
            if (adjacent_row < 0 || adjacent_row >= dungeon.length ||
                adjacent_column < 0 || adjacent_column >= dungeon[adjacent_row].length) {
                continue;
            }

            if (dungeon[adjacent_row][adjacent_column] === "."
                || dungeon[adjacent_row][adjacent_column] === "<"
                || dungeon[adjacent_row][adjacent_column] === ">") {
                return true;
            } 
            
        }

    }
    return false;
}

display_dungeon();
    
console.log("Dungeon dimensions:", map_data.dungeon.length, map_data.dungeon[0].length);

