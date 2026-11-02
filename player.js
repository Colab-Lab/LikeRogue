export function initialize_player(up_stair_pos) {
    let player_row = up_stair_pos[0];
    let player_column = up_stair_pos[1];
    return {
    player_row: player_row,
    player_column: player_column
    };
}

export function handle_player_input(player, display_dungeon) {
    console.log("Input handler initialized");
    
    document.addEventListener("keydown", function(event) {
        switch (event.code) {
            case "Numpad8":
                // Move up
                player.player_row--;
                display_dungeon();
                break;
            case "Numpad2":
                // Move down
                player.player_row++;
                  display_dungeon();
                break;
            case "Numpad4":
                // Move left
                player.player_column--;
                display_dungeon();
                break;
            case "Numpad6":
                // Move right
                player.player_column++;
                display_dungeon();
                break;
            case "Numpad7":
                // Move up and left
                player.player_row--;
                player.player_column--;
                display_dungeon();
                break;
            case "Numpad9":
                // Move up and right
                player.player_row--;
                player.player_column++;
                display_dungeon();
                break;
            case "Numpad1":
                // Move down and left
                player.player_row++;
                player.player_column--;
                display_dungeon();
                break;
            case "Numpad3":
                // Move down and right
                player.player_row++;
                player.player_column++;
                display_dungeon();
                break;
            case "Numpad5":
                // Wait
                break;
        }
      
    });

}