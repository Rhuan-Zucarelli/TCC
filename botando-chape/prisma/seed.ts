// seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  ["Risoto de Cogumelos", 305, 38, 7, 15, "clm75g2mj0000up74flhl1pj4"],
  ["Molho de Espaguete", 32, 7, 1, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Coxas de Frango Grelhadas", 160, 0, 30, 3, "clm75g2mj0000up74flhl1pj4"],
  ["Carpaccio", 88, 0, 10, 5, "clm75g2mj0000up74flhl1pj4"],
  ["Frango à Califórnia", 330, 0, 35, 18, "clm75g2mj0000up74flhl1pj4"],
  ["Peito de Frango Recheado", 165, 0, 31, 3, "clm75g2mj0000up74flhl1pj4"],
  ["Costelinha de Porco Barbecue", 500, 0, 28, 41, "clm75g2mj0000up74flhl1pj4"],
  ["Sushi de Salmão", 200, 30, 10, 3, "clm75g2mj0000up74flhl1pj4"],
  ["Sashimi de Atum", 132, 0, 31, 1, "clm75g2mj0000up74flhl1pj4"],
  ["Makisushi de Pepino", 60, 14, 1, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Tempurá", 226, 24, 2, 14, "clm75g2mj0000up74flhl1pj4"],
  [
    "Sobremesa Mousse de Chocolate",
    368,
    35,
    5,
    22,
    "clm75g2mj0000up74flhl1pj4",
  ],
  ["Banana Split", 350, 60, 5, 10, "clm75g2mj0000up74flhl1pj4"],
  ["Tiramisu", 370, 31, 5, 25, "clm75g2mj0000up74flhl1pj4"],
  ["Creme Brulee", 341, 19, 4, 27, "clm75g2mj0000up74flhl1pj4"],
  ["Pavê", 228, 26, 3, 12, "clm75g2mj0000up74flhl1pj4"],
  ["Churros", 260, 33, 2, 13, "clm75g2mj0000up74flhl1pj4"],
  ["Pudim de Leite Condensado", 332, 51, 5, 12, "clm75g2mj0000up74flhl1pj4"],
  ["Brownie", 365, 45, 5, 19, "clm75g2mj0000up74flhl1pj4"],
  ["Torta de Limão", 306, 41, 3, 14, "clm75g2mj0000up74flhl1pj4"],
  ["Sorvete de Chocolate", 143, 16, 2, 8, "clm75g2mj0000up74flhl1pj4"],
  ["Cheesecake de Framboesa", 350, 45, 4, 17, "clm75g2mj0000up74flhl1pj4"],
  ["Torta de Maçã", 237, 47, 2, 4, "clm75g2mj0000up74flhl1pj4"],
  ["Torta de Frutas", 234, 47, 2, 4, "clm75g2mj0000up74flhl1pj4"],
  ["Torta de Creme de Banana", 332, 57, 4, 11, "clm75g2mj0000up74flhl1pj4"],
  ["Sorvete de Morango", 150, 17, 1, 9, "clm75g2mj0000up74flhl1pj4"],
  ["Milkshake de Baunilha", 192, 33, 5, 6, "clm75g2mj0000up74flhl1pj4"],
  ["Milkshake de Chocolate", 198, 33, 5, 7, "clm75g2mj0000up74flhl1pj4"],
  ["Milkshake de Morango", 190, 31, 5, 7, "clm75g2mj0000up74flhl1pj4"],
  ["Suco de Laranja", 120, 26, 1, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Suco de Maçã", 113, 28, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Suco de Uva", 154, 38, 1, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Suco de Pêssego", 69, 17, 1, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Coca-Cola", 140, 39, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Pepsi", 150, 41, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Sprite", 140, 38, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Fanta", 160, 44, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Guaraná Antarctica", 130, 32, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Vinho Tinto", 83, 2, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Vinho Branco", 82, 2, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Vinho Rosé", 83, 2, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Cerveja", 153, 12, 2, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Whisky", 250, 0, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Tequila", 96, 0, 0, 0, "clm75g2mj0000up74flhl1pj4"],
  ["Vodka", 96, 0, 0, 0, "clm75g2mj0000up74flhl1pj4"],
];

const jsonArray = data.map((item) => {
  return {
    name: item[0] as string,
    calories: item[1] as number,
    carbs: item[2] as number,
    protein: item[3] as number,
    fat: item[4] as number,
    createdBy: item[5] as string,
  };
});

console.log(JSON.stringify(jsonArray, null, 2));

async function main() {
  const foods = jsonArray.map((food) => {
    return prisma.food.create({
      data: {
        name: food.name,
        calories: food.calories,
        carbs: food.carbs,
        protein: food.protein,
        fat: food.fat,
        createdBy: { connect: { id: food.createdBy } },
      },
    });
  });

  Promise.all(foods);

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
