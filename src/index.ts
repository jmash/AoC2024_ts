import Day3 from "./day3/day3";

class AoC_2024 {

    main() {
        console.log("main called");
    }

    day3() {
        console.log("day3 called");

        let day3 = new Day3();
        // day3.day3_1();
        day3.day3_2();

    }
}

let AoC2_2024 = new AoC_2024();

console.log(AoC2_2024.main());
console.log(AoC2_2024.day3());