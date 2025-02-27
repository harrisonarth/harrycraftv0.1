ServerEvents.recipes(event => {
  console.log('Hello! The recipe change event fired!');

  // Adds Farmland Recipes
  const hoeDamageRecipes = [
    { output: 'minecraft:farmland', input: ['#minecraft:dirt', '#minecraft:hoes'] },
    { output: 'farmersdelight:rich_soil_farmland', input: ['farmersdelight:rich_soil', '#minecraft:hoes'] }
  ];
  hoeDamageRecipes.forEach(recipe => {
    event.recipes.kubejs
      .shapeless(recipe.output, recipe.input)
      .damageIngredient("#minecraft:hoes");
  });

  // Adds Rotten Flesh to Leather Recipe
  event.recipes.minecraft.campfire_cooking({
    ingredient: [{ item: 'minecraft:rotten_flesh' }],
    result: 'minecraft:leather',
    experience: 0.35,
    cookingtime: 600
  })

  // Removes unwanted MoreVanillaTools, AIOTs, and SimplyTools tools
  const materials = [
    'bone', 'coal', 'copper', 'emerald', 'ender', 'enderite', 'fiery', 'glowstone', 'lapis',
    'nether', 'obsidian', 'obsidian_infused_enderite', 'paper', 'prismarine', 'quartz', 'redstone',
    'slime',
  ];
  // List of tool types by mod
  const toolsByMod = {
    'vanillaaiots': ['aiot'],
    'simplytools': ['hammer', 'excavator', 'hammer_head', 'excavator_head',],
    'morevanillatools': ['sword', 'shovel', 'axe', 'pickaxe', 'hoe',],
  };
  // Generate and hide tools dynamically
  Object.entries(toolsByMod).forEach(([mod, tools]) => {
    materials.forEach(material => {
      tools.forEach(tool => {
        const itemID = `${mod}:${material}_${tool}`;
        event.remove({ output: itemID });
      });
    });
  });
  // Removes weird Functional Storage recipes
  event.remove({ id: /^functionalstorage:oak_drawer_alternate_x.*/ })
  // Removes compressed paper recipe
  event.remove({ id: 'simplytools:paper_compress' })
  // Removes short doors from Dramatic Doors
  event.remove({ id: /^dramaticdoors:short_.*/ })
  // Removes Supplementaries slime recipes
  event.remove({ id: 'supplementaries:slime_ball' })

  event.remove({ id: 'prettypipes:pipe' })
  event.shaped(
      Item.of('prettypipes:pipe', 4),
      [
          ' R ',
          'IGI',
          ' M '
      ],
      {
          R: 'minecraft:redstone',
          G: '#forge:glass/silica',
          M: 'create_dd:kinetic_mechanism',
          I: 'minecraft:iron_bars'
      })
});