var get = require('get-timezone-offset')

module.exports = timezone

// Timezone offsets
var CCT = 6.5 * -60
var CXT = 7 * -60
var AWST = 8 * -60
var ACWST = 8.75 * -60
var ACST = 9.5 * -60
var AEST = 10 * -60
var LHST = 10.5 * -60
var NFT = 11 * -60

var ACDT = 10.5 * -60
var AEDT = 11 * -60
var LHDT = 11 * -60

var lookup = {
  0: { name: 'Australia/Darwin' },
  2: { name: 'Australia/Sydney' },
  3: { name: 'Australia/Melbourne' },
  4: { name: 'Australia/Brisbane' },
  5: { name: 'Australia/Adelaide' },
  6: { name: 'Australia/Perth' },
  7: { name: 'Australia/Hobart' },
  2880: { name: 'Australia/Broken_Hill' },
  2898: { name: 'Australia/Lord_Howe' },
  2899: { name: 'Pacific/Norfolk' },
  6443: { name: 'Australia/Eucla' },
  6798: { name: 'Indian/Christmas' },
  6799: { name: 'Indian/Cocos' }
}

// Assign offset abbreviations
lookup[0][ACST] = 'ACST' // NT
lookup[2][AEST] = 'AEST' // NSW/ACT
lookup[2][AEDT] = 'AEDT'
lookup[3][AEST] = 'AEST' // VIC
lookup[3][AEDT] = 'AEDT'
lookup[4][AEST] = 'AEST' // QLD
lookup[5][ACST] = 'ACST' // SA
lookup[5][ACDT] = 'ACDT'
lookup[6][AWST] = 'AWST' // WA
lookup[7][AEST] = 'AEST' // TAS
lookup[7][AEDT] = 'AEDT'
lookup[2880][ACST] = 'ACST' // Broken Hill
lookup[2880][ACDT] = 'ACDT'
lookup[2898][LHST] = 'LHST' // Lord Howe Island
lookup[2898][LHDT] = 'LHDT'
lookup[2899][NFT] = 'NFT' // Norfolk Island
lookup[6443][ACWST] = 'ACWST' // Eucla
lookup[6798][CXT] = 'CXT' // Christmas Island
lookup[6799][CCT] = 'CCT' // Cocos (Keeling) Islands

function timezone (postcode, time) {
  postcode = padded(postcode)

  var zone = lookup[postcode] || lookup[postcode[0]]
  var offset = zone && get(zone.name, time)

  return offset && {
    offset: offset,
    abbr: zone[offset],
    name: zone.name
  }
}

function padded (postcode) {
  return ('000' + postcode).substr(-4)
}
