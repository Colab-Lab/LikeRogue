import { generate_whole_map } from "./dungeon_gen.js";

let dungeon = generate_whole_map();

// Display
for (let row = 0; row < dungeon.length; row++) {
    //console.log(dungeon[row].join(""));
    document.getElementById("dungeon").textContent += dungeon[row].join("") + "\n";
}
console.log("Dungeon dimensions:", dungeon.length, dungeon[0].length);