export function initialize_player(up_stair_pos) {
    let player_row = up_stair_pos[0];
    let player_column = up_stair_pos[1];
    return {
    player_row: player_row,
    player_column: player_column
    };
}