import { generate_whole_map } from "./dungeon_gen.js";

let map_data = generate_whole_map();

// Display
for (let row = 0; row < map_data.dungeon.length; row++) {
    //console.log(dungeon[row].join(""));
    document.getElementById("dungeon").textContent += map_data.dungeon[row].join("") + "\n";
}
console.log("Dungeon dimensions:", map_data.dungeon.length, map_data.dungeon[0].length);