var PeptideComputation = function () {

    function sortPositions(listPositions){

        return listPositions.sort(function (posA, posB) {
            var score = (posA.first - posB.first);
            if(score === 0){
                score = (posA.last - posB.last);
            }
            return score;
        })
    }


    function computeCoveragePercentage (listPositions, length){

        var currentPosition = 0;
        var coveredLength = 0;

        var sortedPositions = sortPositions(listPositions);

        for(var pi in sortedPositions){
            var pos = sortedPositions[pi];
            var first = Math.max(pos.first, currentPosition);
            var last = pos.last;
            var posLength = last - first + 1;

            coveredLength += posLength;
            currentPosition = last + 1;
        }


        return (coveredLength / length * 100).toFixed(2);;

    }

    function computeCoverage (peptides, proteinLength, condition){

        var positions = peptides.filter(condition) // filter on condition
            .map(function (pep) {return {first: pep.position.first, last: pep.position.second}})

        return computeCoveragePercentage(positions, proteinLength);


    }

    function computePeptideCoverage (peptides, proteinLength){

        return computeCoverage(peptides, proteinLength, function (pep){return pep.properties.natural});

    }

    function computeProteotypicCoverage (peptides, proteinLength){

        return computeCoverage(peptides, proteinLength, function (pep){return (pep.properties.natural && pep.properties.proteotypic)});

    }

    return {

        computePeptideCoverage : computePeptideCoverage,
        computeProteotypicCoverage : computeProteotypicCoverage

    }

}


