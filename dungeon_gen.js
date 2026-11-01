 export function generate_whole_map(){

                // starting dimensions
                let map_height = 60;
                let map_width = 100;

                // initialize map
                let dungeon = [];
                //outer loop
                for (let h_index = 0; h_index < map_height; h_index++) {
                    let row = [];
                    //inner loop
                    for (let w_index = 0; w_index < map_width; w_index++) {
                        row.push("#");
                    }
                    dungeon.push(row);
                }  

                function generate_room() {
                    let minimum_room_height = 3;
                    let maximum_room_height = 9;

                    let minimum_room_width = 3;
                    let maximum_room_width = 15;

                    let random_height = Math.floor(Math.random() * 4);
                    let room_height = (random_height * 2) + 3;
                    
                    let random_width = Math.floor(Math.random() * 7);
                    let room_width = (random_width * 2) + 3;

                    let frame = 5; // map gen padding
                    let minimum_room_row = frame + Math.floor(room_height / 2);
                    let maximum_room_row = map_height - 1 - frame - Math.floor(room_height / 2);

                    let minimum_room_column = frame + Math.floor(room_width / 2);
                    let maximum_room_column = map_width - 1 - frame - Math.floor(room_width / 2);
                    
                    let range_y = maximum_room_row - minimum_room_row + 1;
                    let range_x = maximum_room_column - minimum_room_column + 1;

                    let center_room_row = Math.floor(Math.random() * range_y) + minimum_room_row;
                    let center_room_column = Math.floor(Math.random() * range_x) + minimum_room_column;

                    console.log("Center room row:", center_room_row);
                    console.log("Center room column:", center_room_column);

                    let top_room_row = center_room_row - Math.floor(room_height / 2);
                    let bottom_room_row = center_room_row + Math.floor(room_height / 2);
                    let left_room_column = center_room_column - Math.floor(room_width / 2);
                    let right_room_column = center_room_column + Math.floor(room_width / 2);

                    // Excavation
                    //outer loop
                    for (let row = top_room_row; row <= bottom_room_row; row++) {
                        //inner loop
                        for (let column = left_room_column; column <= right_room_column; column++) {
                            dungeon[row][column] = ".";
                        }
                    }  
                    return [center_room_row, center_room_column];
                }
                
                function generate_corridor(previous_room_center, current_room_center) {
                    let lesser_column = Math.min(previous_room_center[1], current_room_center[1]);
                    let greater_column = Math.max(previous_room_center[1], current_room_center[1]);
                    
                    for (let column = lesser_column; column <= greater_column;column++) {
                        dungeon[previous_room_center[0]][column] = ".";
                    }
                    
                    let lesser_row = Math.min(previous_room_center[0], current_room_center[0]);
                    let greater_row = Math.max(previous_room_center[0], current_room_center[0]);

                    for (let row = lesser_row; row <= greater_row; row++) {
                        dungeon[row][current_room_center[1]] = ".";
                    }
                }
                // Construct map
                let minimum_room_count = 15;
                let maximum_room_count = 20;

                let room_count = Math.floor(Math.random() * (maximum_room_count - minimum_room_count + 1)) + minimum_room_count;
                // Call generate_room() repeatedly
                // prime the pump
                let compare_room_centers = [];
                compare_room_centers.push(generate_room());
                for (let index = 1; index < room_count; index++) {
                    compare_room_centers.push(generate_room());
                    generate_corridor(compare_room_centers[index - 1],
                    compare_room_centers[index]);
                }
              
                return dungeon;

            }