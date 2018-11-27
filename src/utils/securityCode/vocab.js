const adjectives = [
  'busy',
  'lazy',
  'careless',
  'clumsy',
  'nimble',
  'brave',
  'mighty',
  'meek',
  'clever',
  'dull',
  'afraid',
  'scared',
  'cowardly',
  'bashful',
  'proud',
  'fair',
  'greedy',
  'wise',
  'foolish',
  'tricky',
  'truthful',
  'loyal',
  'happy',
  'cheerful',
  'joyful',
  'carefree',
  'friendly',
  'moody',
  'crabby',
  'cranky',
  'awful',
  'gloomy',
  'angry',
  'worried',
  'excited',
  'calm',
  'bored',
  'hardworking',
  'silly',
  'wild',
  'crazy',
  'fussy',
  'still',
  'odd',
  'starving',
  'stuffed',
  'alert',
  'sleepy',
  'surprised',
  'tense',
  'rude',
  'selfish',
  'strict',
  'tough',
  'polite',
  'amusing',
  'kind',
  'gentle',
  'quiet',
  'caring',
  'hopeful',
  'rich',
  'thrifty',
  'stingy',
  'spoiled',
  'generous',
  'quick',
  'speedy',
  'swift',
  'hasty',
  'rapid',
  'good',
  'fantastic',
  'splendid',
  'wonderful',
  'hard',
  'difficult',
  'challenging',
  'easy',
  'simple',
  'chilly',
  'freezing',
  'icy',
  'steaming',
  'sizzling',
  'muggy',
  'cozy',
  'huge',
  'great',
  'vast',
  'sturdy',
  'grand',
  'heavy',
  'plump',
  'deep',
  'puny',
  'small',
  'tiny',
  'petite',
  'long',
  'endless',
  'beautiful',
  'adorable',
  'shining',
  'sparkling',
  'glowing',
  'fluttering',
  'soaring',
  'crawling',
  'creeping',
  'sloppy',
  'messy',
  'slimy',
  'grimy',
  'crispy',
  'spiky',
  'rusty',
  'smelly',
  'foul',
  'stinky',
  'curly',
  'fuzzy',
  'plush',
  'lumpy',
  'wrinkly',
  'smooth',
  'glassy',
  'snug',
  'stiff',
  'ugly',
  'hideous',
  'horrid',
  'dreadful',
  'nasty',
  'cruel',
  'creepy',
  'loud',
  'shrill',
  'muffled',
  'creaky',
  'graceful',
  'clumsy',
  'awkward',
  'nimble',
  'clever',
  'dull',
  'obtuse',
  'meek',
  'anemic',
  'frightened',
  'timid',
  'vigilant',
  'cautious',
  'capable',
  'adequate',
  'absent-minded',
  'adventurous',
  'daring',
  'indifferent',
  'apologetic',
  'hideous',
  'horrid',
  'dreadful',
  'ghastly',
  'revolting',
  'nasty',
  'cruel',
  'cheeky',
  'obnoxious',
  'disrespectful',
  'contrary',
  'ornery',
  'subtle',
  'optimistic',
  'courageous',
  'cowardly',
  'gullible',
  'arrogant',
  'haughty',
  'naïve',
  'curious',
  'stubborn',
  'brazen',
  'modest',
  'humble',
  'proud',
  'dishonest',
  'righteous',
  'greedy',
  'wise',
  'tricky',
  'loyal',
  'relaxed',
  'tranquil',
  'lazy',
  'rambunctious',
  'erratic',
  'fidgety',
  'lively',
  'still',
  'famished',
  'surprised',
  'startled',
  'sullen',
  'terrified',
  'furious',
  'annoyed',
  'sullen',
  'groggy',
  'alert',
  'tense',
  'cranky',
  'gloomy',
  'irritable',
  'lonely',
  'exhausted',
  'ecstatic',
  'cheerful',
  'delighted',
  'blithe',
  'content',
  'carefree',
  'demanding',
  'challenging',
  'effortless',
  'simple',
  'fantastic',
  'marvelous',
  'splendid',
  'brilliant',
  'superb',
  'striking',
  'stunning',
  'gorgeous',
  'picturesque',
  'lovely',
  'charming',
  'enchanting',
  'delicate',
  'pleasant',
  'monstrous',
  'immense',
  'enormous',
  'massive',
  'brawny',
  'bulky',
  'towering',
  'rotund',
  'cavernous',
  'puny',
  'minute',
  'diminutive',
  'microscopic',
  'petite',
  'slight',
  'bitter',
  'frosty',
  'sweltering',
  'scorching',
  'blistering',
  'muggy',
  'stifling',
  'oppressive',
  'cozy',
  'eternal',
  'ceaseless',
  'perpetual',
  'endless',
  'temporary',
  'intimidating',
  'menacing',
  'miserable',
  'dangerous',
  'delinquent',
  'vile',
  'quarrelsome',
  'hostile',
  'malicious',
  'savage',
  'stern',
  'somber',
  'mysterious',
  'shocking',
  'infamous',
  'ingenious',
  'thrifty',
  'generous',
  'prudent',
  'stingy',
  'spoiled',
  'anxious',
  'nervous',
  'impatient',
  'worried',
  'excited',
  'courteous',
  'compassionate',
  'benevolent',
  'polite',
  'amusing',
  'entertaining',
  'creative',
  'precise',
  'eccentric',
  'decrepit',
  'ancient',
  'rotten',
  'whimsical',
  'dense',
  'desolate',
  'disgusting',
  'dismal',
  'opulent',
  'idyllic',
  'lavish',
  'edgy',
  'trendy',
  'peculiar',
  'rancid',
  'fetid',
  'foul',
  'filthy',
  'repulsive',
  'lousy',
  'fluttering',
  'soaring',
  'sparkling',
  'gilded',
  'verdant',
  'glowing',
  'askew',
  'dowdy',
  'gaunt',
  'sloppy',
  'serious',
  'grave',
  'intense',
  'severe',
  'heavy',
  'solemn',
  'absurd',
  'ridiculous',
  'sluggish',
  'dawdling',
  'meandering',
  'scarce',
  'copious',
  'muffled',
  'lulling',
  'creaky',
  'shrill',
  'piercing',
  'slimy',
  'grimy',
  'gauzy',
  'mangy',
  'swollen',
  'parched',
  'crispy',
  'spiky',
  'slick',
  'fuzzy',
  'lumpy',
  'plush',
  'wrinkly',
  'slick',
  'glassy',
  'snug',
  'stiff',
];

const nouns = [
  'apes',
  'baboons',
  'badgers',
  'bats',
  'bears',
  'birds',
  'bobcats',
  'bulldogs',
  'bullfrogs',
  'cat',
  'catfishes',
  'cheetahs',
  'chickens',
  'chipmunks',
  'cobras',
  'cougars',
  'cows',
  'crabs',
  'deer',
  'dingos',
  'dodos',
  'dogs',
  'dolphins',
  'donkeys',
  'dragons',
  'dragonflies',
  'ducks',
  'eagles',
  'earwigs',
  'eels',
  'elephants',
  'emus',
  'falcons',
  'fireants',
  'firefoxes',
  'fishes',
  'flies',
  'foxes',
  'frogs',
  'geckoes',
  'goats',
  'geese',
  'grasshoppers',
  'horses',
  'hounds',
  'huskies',
  'impalas',
  'insects',
  'jellyfishes',
  'kangaroos',
  'ladybugs',
  'ligers',
  'lions',
  'lionfishes',
  'lizards',
  'mayflies',
  'moles',
  'monkeys',
  'moose',
  'moths',
  'mice',
  'mules',
  'newts',
  'octopuses',
  'otters',
  'owls',
  'pandas',
  'panthers',
  'parrots',
  'penguins',
  'pigs',
  'pumas',
  'pugs',
  'quail',
  'rabbits',
  'rats',
  'rattlesnakes',
  'robins',
  'seahorses',
  'sheep',
  'shrimp',
  'skunks',
  'sloths',
  'snails',
  'snakes',
  'squids',
  'starfishes',
  'stingrays',
  'swans',
  'termites',
  'tigers',
  'treefrogs',
  'turkeys',
  'turtles',
  'vampirebats',
  'walruses',
  'warthogs',
  'wasps',
  'wolverines',
  'wombats',
  'yaks',
  'zebras',
];

module.exports = { nouns, adjectives };