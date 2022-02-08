async function resolvePromise(response, type) {
  const json = await response.json();
  const items = json[type];
  return items;
}

export async function getRandomFood() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  return resolvePromise(response, 'meals');
}

export async function getRandomDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  return resolvePromise(response, 'drinks');
}
