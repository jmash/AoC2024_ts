import * as fs from 'fs';

class Match {
    index: number;
    val1: number;
    val2: number;
    match_str: string;

    constructor(index: number, val1: number, val2: number, match_str: string) {
        this.index = index;
        this.val1 = val1;
        this.val2 = val2;
        this.match_str = match_str;
    }
}

export default class Day3 {
    day3_1() {
        const puzzle_input = fs.readFileSync('./inputs/day3/day3_test.txt', 'utf8');
        // const puzzle_input = fs.readFileSync('./inputs/day3/day3.txt', 'utf8');

        const mul_regex = /mul\((\d{1,3}),(\d{1,3})\)/ig;

        let vals:number[] = [];

        let mul_regex_results = puzzle_input.matchAll(mul_regex);

        for (const match of mul_regex_results) {
            vals.push(parseInt(match[1]) * parseInt(match[2]));
        }

        let total = vals.reduce((acc, val) => acc + val, 0);

        console.log(total);
    }

    day3_2() {
        // const puzzle_input = fs.readFileSync('./inputs/day3/day3_test_2.txt', 'utf8');
        const puzzle_input = fs.readFileSync('./inputs/day3/day3.txt', 'utf8');

        const mul_regex = /mul\((\d{1,3}),(\d{1,3})\)/ig;
        const do_regex = /do\(\)/ig;
        const dont_regex = /don\'t\(\)/ig;

        let mul_regex_results = puzzle_input.matchAll(mul_regex);
        let dos_regex_results = puzzle_input.matchAll(do_regex);
        let donts_regex_results = puzzle_input.matchAll(dont_regex);

        let mul_regex_results_array:RegExpExecArray[] = [];
        let dos_regex_results_array:RegExpExecArray[] = [];
        let donts_regex_results_array:RegExpExecArray[] = [];

        for (const match of mul_regex_results) {
            mul_regex_results_array.push(match);
        }

        for (const match of dos_regex_results) {
            dos_regex_results_array.push(match);
        }

        for (const match of donts_regex_results) {
            donts_regex_results_array.push(match);
        }

        let all_regex_results_array =
            mul_regex_results_array
            .concat(dos_regex_results_array)
            .concat(donts_regex_results_array);

        let matches_array:Match[] = [];

        all_regex_results_array.map((result) => {
           let val1 = parseInt(result[1]);
           let val2 = parseInt(result[2]);
           let index = result.index;
           let match_str = result[0];
           matches_array.push(new Match(index, val1, val2, match_str));
        });

        matches_array.sort((a, b) => a.index - b.index);

        console.log(matches_array);

        let do_flag = true;
        let valid_multiplications:number[] = [];

        for (const match of matches_array) {
            if (do_flag) {
                if (!isNaN(match.val1) && !isNaN(match.val2)) {
                    valid_multiplications.push(match.val1 * match.val2);
                }
            }

            if (match.match_str === "don\'t()") {
                do_flag = false;
            }

            if (match.match_str === "do()") {
                do_flag = true;
            }
        }

        let total = valid_multiplications.reduce((acc, val) => acc + val, 0);

        console.log(total);
    }
}