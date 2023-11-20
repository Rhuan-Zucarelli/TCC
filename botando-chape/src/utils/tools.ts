
import { type Food, type Exercise } from "@prisma/client";

export function getWeek(date: Date = new Date()) {
    const today = date;
    const pastDate = new Date(today)
    pastDate.setDate(pastDate.getDate() - 7); // Subtrai 7 dias da data atual
    const todayStr = today.toLocaleString().split(',')[0];
    const pastDateStr = pastDate.toLocaleString().split(',')[0];
    return {
        today: todayStr ?? '',
        sevenDaysAgo: pastDateStr ?? ''
    };
}


export async function CalculateCaloriesWeek(
    snackOne: Food[] | [],
    snackTwo: Food[] | [],
    snackThree: Food[] | []
): Promise<number[]> {
    let totalCaloriesPerDay = 0;
    const sumCalories = (snack: Food[]) => {
        if (!snack || snack.length === 0) return;
        snack.forEach(food => {
            totalCaloriesPerDay += food.calories;
        });
    };

    sumCalories(snackOne);
    sumCalories(snackTwo);
    sumCalories(snackThree);

    const applyRandomVariation = (calories: number) => {
        // Gera um fator de variação entre 0.9 (90%) e 1.1 (110%)
        const variationFactor = 0.9 + Math.random() * 0.2;
        return Math.round(calories * variationFactor);
    };

    // Aplica variação aleatória para cada dia da semana
    let caloriesPerWeek = [];
    for (let i = 0; i < 7; i++) {
        caloriesPerWeek.push(applyRandomVariation(totalCaloriesPerDay));
    }
    return caloriesPerWeek;
}

export async function calculateCalorieBurnWeek(segData: Exercise[], terData: Exercise[], quaData: Exercise[], quiData: Exercise[], sexData: Exercise[], sabData: Exercise[], domData: Exercise[]) {
    const calculateCalorieBurn = (dayData: Exercise[]) => {
        if (!dayData || dayData.length === 0) return 0;
        return +dayData.reduce((total, exercise) => total + exercise.burnCalories, 0);
    }
    return [
        calculateCalorieBurn(segData),
        calculateCalorieBurn(terData),
        calculateCalorieBurn(quaData),
        calculateCalorieBurn(quiData),
        calculateCalorieBurn(sexData),
        calculateCalorieBurn(sabData),
        calculateCalorieBurn(domData)
    ];
}


export function calcFoods(
    snackOne: Food[] | [],
    snackTwo: Food[] | [],
    snackThree: Food[] | []
) {
    
    const sumtotal = (snack: Food[]) => {
        let totalCaloriesPerDay = 0;
        let totalCarbsPerDay    = 0;
        let totalProteinPerDay  = 0;
        let totalFatPerDay      = 0;
        if (!snack || snack.length === 0) return;

        snack.forEach(food => {
            totalCaloriesPerDay += food.calories;
            totalCarbsPerDay    += food.carbs;
            totalProteinPerDay  += food.protein;
            totalFatPerDay      += food.fat;
        });
        
        return {
            totalCaloriesPerDay,
            totalCarbsPerDay,
            totalProteinPerDay,
            totalFatPerDay
        };
    };

    let s1 = sumtotal(snackOne);
    let s2 = sumtotal(snackTwo);
    let s3 = sumtotal(snackThree);

    let totalCaloriesPerDay = (s1?.totalCaloriesPerDay ?? 0) + (s2?.totalCaloriesPerDay ?? 0) + (s3?.totalCaloriesPerDay ?? 0);
    let totalCarbsPerDay    = (s1?.totalCarbsPerDay    ?? 0) + (s2?.totalCarbsPerDay    ?? 0) + (s3?.totalCarbsPerDay    ?? 0);
    let totalProteinPerDay  = (s1?.totalProteinPerDay  ?? 0) + (s2?.totalProteinPerDay  ?? 0) + (s3?.totalProteinPerDay  ?? 0);
    let totalFatPerDay      = (s1?.totalFatPerDay      ?? 0) + (s2?.totalFatPerDay      ?? 0) + (s3?.totalFatPerDay      ?? 0);

    return {
        totalCaloriesPerDay,
        totalCarbsPerDay,
        totalProteinPerDay,
        totalFatPerDay
    };
}
