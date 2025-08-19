// Method 1: Check if any vowel exists in the string
const hasVowel = ['a', 'e', 'i', 'o', 'u'].some(vowel =>
  'Tony'.toLowerCase().includes(vowel)
);

// Method 2: Check if any character is a vowel
const hasVowel2 = 'Tony'.toLowerCase().split('').some(char =>
  'aeiou'.includes(char)
);

// Method 3: Using regex (cleanest)
const hasVowel3 = /[aeiou]/i.test('Tony');