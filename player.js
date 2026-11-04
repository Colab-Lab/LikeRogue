import { check_collision, find_orthogonal_moves, find_forward_tiles } from "./collision.js";

export function initialize_player(up_stair_pos) {
    let player_row = up_stair_pos[0];
    let player_column = up_stair_pos[1];
    return {
        player_row: player_row,
        player_column: player_column,
        previous_row: player_row,
        previous_column: player_column
    };
}

export function handle_player_input(player, dungeon, display_dungeon) {
    console.log("Input handler initialized");
    
    document.addEventListener("keydown", function(event) {
        if (event.repeat) {
            return;
        }
        switch (event.code) {
            case "Numpad8": {
                let proposed_row = player.player_row - 1;
                let proposed_column = player.player_column;
                
                if (event.shiftKey) {
                    automove(player, dungeon, proposed_row, proposed_column, display_dungeon);
                } else {
                    move_player(player, dungeon, proposed_row, proposed_column, display_dungeon);
                }
                break;
            }

            case "Numpad2": {
                // Move down
                let proposed_row = player.player_row + 1;
                let proposed_column = player.player_column;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (event.shiftKey) {
                    automove(player, dungeon, proposed_row, proposed_column, display_dungeon);
                } else {
                    move_player(player, dungeon, proposed_row, proposed_column, display_dungeon);
                }
                break;
            }

            case "Numpad4": {
                // Move left
                let proposed_row = player.player_row;
                let proposed_column = player.player_column - 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (event.shiftKey) {
                    automove(player, dungeon, proposed_row, proposed_column, display_dungeon);
                } else {
                    move_player(player, dungeon, proposed_row, proposed_column, display_dungeon);
                }
                break;
            }

            case "Numpad6": {
                // Move right
                let proposed_row = player.player_row;
                let proposed_column = player.player_column + 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (event.shiftKey) {
                    automove(player, dungeon, proposed_row, proposed_column, display_dungeon);
                } else {
                    move_player(player, dungeon, proposed_row, proposed_column, display_dungeon);
                }
                break;
            }

            case "Numpad7": {
                // Move up and left
                let proposed_row = player.player_row - 1;
                let proposed_column = player.player_column - 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (event.shiftKey) {
                    automove(player, dungeon, proposed_row, proposed_column, display_dungeon);
                } else {
                    move_player(player, dungeon, proposed_row, proposed_column, display_dungeon);
                }
                break;
            }

            case "Numpad9": {
                // Move up and right
                let proposed_row = player.player_row - 1;
                let proposed_column = player.player_column + 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (event.shiftKey) {
                    automove(player, dungeon, proposed_row, proposed_column, display_dungeon);
                } else {
                    move_player(player, dungeon, proposed_row, proposed_column, display_dungeon);
                }
                break;
            }

            case "Numpad1": {
                // Move down and left
                let proposed_row = player.player_row + 1;
                let proposed_column = player.player_column - 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (event.shiftKey) {
                    automove(player, dungeon, proposed_row, proposed_column, display_dungeon);
                } else {
                    move_player(player, dungeon, proposed_row, proposed_column, display_dungeon);
                }
                break;
            }

            case "Numpad3": {
                // Move down and right
                let proposed_row = player.player_row + 1;
                let proposed_column = player.player_column + 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (event.shiftKey) {
                    automove(player, dungeon, proposed_row, proposed_column, display_dungeon);
                } else {
                    move_player(player, dungeon, proposed_row, proposed_column, display_dungeon);
                }
                break;
}

            case "Numpad5":
                // Wait
                break;
        }
      
    });

}

function move_player(player, dungeon, proposed_row, proposed_column, display_dungeon) {
    let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

    if (valid_destination) {
        player.previous_row = player.player_row;
        player.previous_column = player.player_column;

        player.player_row = proposed_row;
        player.player_column = proposed_column;

        display_dungeon();
        return true;
    }
    return false;
}

function automove(player, dungeon, proposed_row, proposed_column, display_dungeon) {
    let direction_row = proposed_row - player.player_row;
    let direction_column = proposed_column - player.player_column;

    let forward_tiles = find_forward_tiles(
        player.player_row,
        player.player_column,
        direction_row,
        direction_column
    );

    let traversible_forward_tiles = 0;

    for (let i = 0; i < forward_tiles.length; i++) {
        if (check_collision(dungeon, forward_tiles[i][0], forward_tiles[i][1])) {
            traversible_forward_tiles++;
        }
    }

    let initial_forward_count = traversible_forward_tiles;

    let previous_forward_count = initial_forward_count;

    if (!move_player(player, dungeon, proposed_row, proposed_column, display_dungeon)) {
        return;
    }

    function continue_automove() {
        let forward_tiles = find_forward_tiles(
            player.player_row,
            player.player_column,
            direction_row,
            direction_column
        );

        let traversible_forward_tiles = 0;

        for (let i = 0; i < forward_tiles.length; i++) {
            if (check_collision(dungeon, forward_tiles[i][0], forward_tiles[i][1])) {
                traversible_forward_tiles++;
            }
        }

        // Automove began in an open area.
        if (initial_forward_count === 3) {
            if (traversible_forward_tiles !== 3) {
                return;
            }

            let next_row = player.player_row + direction_row;
            let next_column = player.player_column + direction_column;

            if (move_player(player, dungeon, next_row, next_column, display_dungeon)) {
                setTimeout(continue_automove, 25);
            }

            return;
        }

        let forward_center_row = player.player_row + direction_row;
        let forward_center_column = player.player_column + direction_column;

        let forward_center_open = check_collision(
            dungeon,
            forward_center_row,
            forward_center_column
        );

        let traversible_forward_diagonals = 0;

        for (let i = 0; i < forward_tiles.length; i++) {
            if (forward_tiles[i][0] === forward_center_row &&
                forward_tiles[i][1] === forward_center_column) {
                continue;
            }

            if (check_collision(dungeon, forward_tiles[i][0], forward_tiles[i][1])) {
                traversible_forward_diagonals++;
            }
        }

        // Stop if the forward center is blocked and both forward diagonals are open.
        if (!forward_center_open && traversible_forward_diagonals === 2) {
            return;
        }

        console.log("Current forward count:", traversible_forward_tiles);

        console.log(
            "Tile directly ahead:",
            check_collision(
                dungeon,
                player.player_row + direction_row,
                player.player_column + direction_column
            )
        );

            // Check the geometry when the forward count increases from one to two.
        if (previous_forward_count !== 2 &&
            traversible_forward_tiles === 2 &&
            forward_center_open) {

            let second_forward_center_row = player.player_row + direction_row * 2;
            let second_forward_center_column = player.player_column + direction_column * 2;

            // Stop if the second forward-center tile is open.
            if (check_collision(
                dungeon,
                second_forward_center_row,
                second_forward_center_column
            )) {
                return;
            }

            // Enter the corner and continue automoving.
            if (move_player(
                player,
                dungeon,
                forward_center_row,
                forward_center_column,
                display_dungeon
            )) {
                setTimeout(continue_automove, 25);
            }

            return;
        } 

        console.log("Previous forward count:", previous_forward_count);

        // Stop if single-wall automovement loses either open forward tile.
        if (previous_forward_count === 2 &&
            traversible_forward_tiles < 2 &&
            check_collision(
                dungeon,
                player.player_row + direction_row,
                player.player_column + direction_column
            )) {
            return;
        }

        previous_forward_count = traversible_forward_tiles;

        // Automove began in a corridor.   
        if (traversible_forward_tiles === 3) {
            return;
        }

        let next_row = player.player_row + direction_row;
        let next_column = player.player_column + direction_column;

        // Continue straight if the tile ahead is traversible.
        if (check_collision(dungeon, next_row, next_column)) {
            if (move_player(player, dungeon, next_row, next_column, display_dungeon)) {
                setTimeout(continue_automove, 25);
            }

            return;
        }

        let possible_moves = find_orthogonal_moves(
            dungeon,
            player.player_row,
            player.player_column,
            player.previous_row,
            player.previous_column
        );

        // Check the two tiles flanking the position before the corner.
        let flank_one_row = player.previous_row - direction_column;
        let flank_one_column = player.previous_column + direction_row;

        let flank_two_row = player.previous_row + direction_column;
        let flank_two_column = player.previous_column - direction_row;

        // Stop if either flanking tile is traversible.
        if (check_collision(dungeon, flank_one_row, flank_one_column) ||
            check_collision(dungeon, flank_two_row, flank_two_column)) {
            return;
        }

        if (possible_moves.length !== 1) {
            return;
        }

        next_row = possible_moves[0][0];
        next_column = possible_moves[0][1];

        if (traversible_forward_tiles > 0) {
            if (next_row !== player.player_row + direction_row ||
                next_column !== player.player_column + direction_column) {
                return;
            }
        }

        direction_row = next_row - player.player_row;
        direction_column = next_column - player.player_column;

        if (move_player(player, dungeon, next_row, next_column, display_dungeon)) {
            setTimeout(continue_automove, 25);
        }
    }

    setTimeout(continue_automove, 100);
}