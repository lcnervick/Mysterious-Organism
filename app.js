// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const getBestMatch = (pool, specimin) => {
  let bestMatch = null;
  let bestPercent = 0;
  for(j = 0; j < pool.length; j++) {
    if(pool[j].speciminNum === specimin.speciminNum) continue; // don't compare to self;
    let thisPercent = specimin.compareDNA(pool[j]);
    if(thisPercent > bestPercent) {
      bestMatch = pool[j];
      bestMatch.percent = bestPercent = thisPercent;
    } 
  }
  return bestMatch;
}

const pAequorFactory = (speciminNum, dna) => {
  return{
    speciminNum,
    dna,
    mutate() {
      let randIndex = Math.floor(Math.random()*15);
      let newBase = returnRandBase();
      if(newBase !== this.dna[randIndex]) this.dna[randIndex] = newBase;
    },
    compareDNA(otherSpecies) {
      let match = 0;
      for(let i = 0; i < otherSpecies.dna.length; i++) {
        if(otherSpecies.dna[i] === this.dna[i]) match++;
      }
      let result = Math.round((match/15)*100);
      return result
    },

    willLikelySurvive() {
      let matches = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'C' || this.dna[i] === 'G') matches++;
      }
      return matches/15 >= 0.6;
    },

    complimentStrand() {
      let newStrand = [];
      for(base of this.dna) {
        switch(base) {
          case 'A': newStrand.push('T'); break;
          case 'C': newStrand.push('G'); break;
          case 'G': newStrand.push('C'); break;
          case 'T': newStrand.push('A'); break;
          default: console.log('Unknown mutation detected!'); break;
        }
      }
      return newStrand;
    }
  };
}

let allSpecimins = [];
for(i = 0; i < 30; i++)
  allSpecimins.push(pAequorFactory(i+1, mockUpStrand()));

for(i = 0; i < allSpecimins.length; i++) {
  const thisOne = allSpecimins[i];
  console.log(`Species #${thisOne.speciminNum}:`);
  console.log(thisOne.dna);
  console.log(thisOne.willLikelySurvive() ? "Will likely survive!" : "Is probably toast :(");
  
  const bestMatch = getBestMatch(allSpecimins, thisOne);
  console.log(`Best Match: Specimin #${bestMatch.speciminNum} @ ${bestMatch.percent}%`);
  
  console.log('-----------------------------------');
}

