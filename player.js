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

    if (!move_player(player, dungeon, proposed_row, proposed_column, display_dungeon)) {
        return;
    }

    function continue_automove() {
        let possible_moves = find_orthogonal_moves(
            dungeon,
            player.player_row,
            player.player_column,
            player.previous_row,
            player.previous_column
        );

        if (possible_moves.length !== 1) {
            return;
        }

        let next_row = possible_moves[0][0];
        let next_column = possible_moves[0][1];

        direction_row = next_row - player.player_row;
        direction_column = next_column - player.player_column;

        if (move_player(player, dungeon, next_row, next_column, display_dungeon)) {
            setTimeout(continue_automove, 25);
        }
    }

    setTimeout(continue_automove, 100);
}