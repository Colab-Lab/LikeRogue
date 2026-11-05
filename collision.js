// collision.js

export function check_collision(dungeon, proposed_row, proposed_column) {
    if ((proposed_row < 0 || proposed_row >= dungeon.length) || 
    (proposed_column < 0 || proposed_column >= dungeon[proposed_row].length)) {
    return false;
} else if (dungeon[proposed_row][proposed_column] === "." ||
        dungeon[proposed_row][proposed_column] === "<" ||
        dungeon[proposed_row][proposed_column] === ">" ||
        dungeon[proposed_row][proposed_column] === ",") {
        return true; // can be occupied
    } else {
        return false; // cannot be occupied
    }
}

export function check_adjacency(dungeon, check_row, check_column) {
    let adjacent_count = 0;
    for (let row_offset = -1; row_offset <= 1; row_offset++) {
        for (let column_offset = -1; column_offset <= 1; column_offset++) {
            if (row_offset === 0 && column_offset === 0) {
                continue;
            }
            let adjacent_row = check_row + row_offset;
            let adjacent_column = check_column + column_offset;

            if (check_collision(dungeon, adjacent_row, adjacent_column)) {
                adjacent_count++;
            }
        }
    }
    return adjacent_count;
}

export function find_possible_moves(dungeon, check_row, check_column, previous_row, previous_column) {
    let possible_moves = [];
    for (let row_offset = -1; row_offset <= 1; row_offset++) {
        for (let column_offset = -1; column_offset <= 1; column_offset++) {
            if (row_offset === 0 && column_offset === 0) {
                continue;
            }
            let adjacent_row = check_row + row_offset;
            let adjacent_column = check_column + column_offset;
            if (adjacent_row === previous_row && adjacent_column === previous_column) {
                continue;
            }
            if (check_collision(dungeon, adjacent_row, adjacent_column)) {
                possible_moves.push([adjacent_row, adjacent_column]);
            }
        }
    }
    return possible_moves;
}

export function find_orthogonal_moves(dungeon, check_row, check_column, previous_row, previous_column) {
    let possible_moves = [];
    for (let row_offset = -1; row_offset <= 1; row_offset++) {
        for (let column_offset = -1; column_offset <= 1; column_offset++) {
            if (row_offset === 0 && column_offset === 0) {
                continue;
            }

            // Ignore diagonal neighbors.
            if (row_offset !== 0 && column_offset !== 0) {
                continue;
            }

            let adjacent_row = check_row + row_offset;
            let adjacent_column = check_column + column_offset;

            if (adjacent_row === previous_row && adjacent_column === previous_column) {
                continue;
            }

            if (check_collision(dungeon, adjacent_row, adjacent_column)) {
                possible_moves.push([adjacent_row, adjacent_column]);
            }
        }
    }
    return possible_moves;
}

export function find_forward_tiles(check_row, check_column, direction_row, direction_column) {

    let forward_tiles = [];

    for (let row_offset = -1; row_offset <= 1; row_offset++) {
        for (let column_offset = -1; column_offset <= 1; column_offset++) {
            if (row_offset === 0 && column_offset === 0) {
                continue;
            }

            let forward_alignment = row_offset * direction_row + column_offset * direction_column;

            if (forward_alignment > 0) {
                let forward_row = check_row + row_offset;
                let forward_column = check_column + column_offset;

                forward_tiles.push([forward_row, forward_column]);
            }

        }
    }
    return forward_tiles;
}

export function check_automove_geometry(dungeon, check_row, check_column) {
    if (check_row < 0 || check_row >= dungeon.length ||
        check_column < 0 || check_column >= dungeon[check_row].length) {
        return false;
    }

    return check_collision(dungeon, check_row, check_column) ||
        dungeon[check_row][check_column] === "+";
}