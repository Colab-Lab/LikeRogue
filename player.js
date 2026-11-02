import { check_collision } from "./collision.js";

export function initialize_player(up_stair_pos) {
    let player_row = up_stair_pos[0];
    let player_column = up_stair_pos[1];
    return {
    player_row: player_row,
    player_column: player_column
    };
}

export function handle_player_input(player, dungeon, display_dungeon) {
    console.log("Input handler initialized");
    
    document.addEventListener("keydown", function(event) {
        switch (event.code) {
            case "Numpad8": {
                // Move up
                let proposed_row = player.player_row - 1;
                let proposed_column = player.player_column;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (valid_destination) {
                    player.player_row = proposed_row;
                    player.player_column = proposed_column;
                    display_dungeon();
                }
                break;
            }

            case "Numpad2": {
                // Move down
                let proposed_row = player.player_row + 1;
                let proposed_column = player.player_column;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (valid_destination) {
                    player.player_row = proposed_row;
                    player.player_column = proposed_column;
                    display_dungeon();
                }
                break;
            }

            case "Numpad4": {
                // Move left
                let proposed_row = player.player_row;
                let proposed_column = player.player_column - 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (valid_destination) {
                    player.player_row = proposed_row;
                    player.player_column = proposed_column;
                    display_dungeon();
                }
                break;
            }

            case "Numpad6": {
                // Move right
                let proposed_row = player.player_row;
                let proposed_column = player.player_column + 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (valid_destination) {
                    player.player_row = proposed_row;
                    player.player_column = proposed_column;
                    display_dungeon();
                }
                break;
            }

            case "Numpad7": {
                // Move up and left
                let proposed_row = player.player_row - 1;
                let proposed_column = player.player_column - 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (valid_destination) {
                    player.player_row = proposed_row;
                    player.player_column = proposed_column;
                    display_dungeon();
                }
                break;
            }

            case "Numpad9": {
                // Move up and right
                let proposed_row = player.player_row - 1;
                let proposed_column = player.player_column + 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (valid_destination) {
                    player.player_row = proposed_row;
                    player.player_column = proposed_column;
                    display_dungeon();
                }
                break;
            }

            case "Numpad1": {
                // Move down and left
                let proposed_row = player.player_row + 1;
                let proposed_column = player.player_column - 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (valid_destination) {
                    player.player_row = proposed_row;
                    player.player_column = proposed_column;
                    display_dungeon();
                }
                break;
            }

            case "Numpad3": {
                // Move down and right
                let proposed_row = player.player_row + 1;
                let proposed_column = player.player_column + 1;
                let valid_destination = check_collision(dungeon, proposed_row, proposed_column);

                if (valid_destination) {
                    player.player_row = proposed_row;
                    player.player_column = proposed_column;
                    display_dungeon();
                }
                break;
            }

            case "Numpad5":
                // Wait
                break;
        }
      
    });

}