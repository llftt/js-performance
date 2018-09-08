const prefix = fix => input => `${fix}${input}`;
const prefixStart = prefix('start');
const prefixEnd = prefix('end');

module.exports =  {prefix, prefixStart, prefixEnd};