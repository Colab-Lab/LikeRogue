export function check_collision(dungeon, proposed_row, proposed_column) {
    if ((proposed_row < 0 || proposed_row >= dungeon.length) || 
    (proposed_column < 0 || proposed_column >= dungeon[proposed_row].length)) {
    return false;
} else if (dungeon[proposed_row][proposed_column] === "." ||
        dungeon[proposed_row][proposed_column] === "<" ||
        dungeon[proposed_row][proposed_column] === ">") {
        return true; // can be occupied
    } else {
        return false; // cannot be occupied
    }
 
}