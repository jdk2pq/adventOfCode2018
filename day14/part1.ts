import {input} from "./input";

let recipes = [3, 7, 1, 0, 1, 0, 1, 2, 4, 5, 1, 5, 8, 9, 1, 6, 7, 7, 9, 2];
let elf1Pos = 8;
let elf2Pos = 4;

const createRecipeAndMove = (numberRecipes: number, part2: boolean, testVal?: string) => {
    while (recipes.length < numberRecipes + 10) {
        if (recipes.length % 10000 === 0) {
            console.log(`# of recipes: ${recipes.length}`);
        }
        const recipe = recipes[elf1Pos] + recipes[elf2Pos];
        recipes.push(...recipe.toString().split('').map((str) => +str));
        elf1Pos = (elf1Pos + recipes[elf1Pos] + 1) % recipes.length;
        // console.log(elf1Pos);
        elf2Pos = (elf2Pos + recipes[elf2Pos] + 1) % recipes.length;
        // console.log(elf2Pos);
    }
    // console.log(recipes);
    if (part2) {
        console.log(`index: ${recipes.join('').indexOf(input.toString())}`);
    } else {
        const slice = recipes.slice(numberRecipes, numberRecipes + 10).join('');
        if (testVal) {
            console.log(slice === testVal);
        } else {
            console.log(slice);
        }
    }
};

// createRecipeAndMove(9, false, '5158916779');
// createRecipeAndMove(5, false, '0124515891');
// createRecipeAndMove(18, false, '9251071085');
// createRecipeAndMove(2018, false, '5941429882');
// createRecipeAndMove(input, false);
createRecipeAndMove(30000000, true);