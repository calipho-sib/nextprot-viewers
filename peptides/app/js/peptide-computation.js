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


    /**
     *
     * //Coverage list
     var exempleSequenceCoverage = [
     {start: 0, end: 25, color: "black", underscore: false},
     {start: 25, end: 47, color: "#ff0000", underscore: false},
     {start: 47, end: 54, color: "#ff0000", underscore: true},
     {start: 54, end: 55, color: "#ff0000", underscore: false},
     {start: 55, end: 56, color: "black", underscore: false},
     {start: 56, end: 89, color: "#69CC33", underscore: false},
     {start: 89, end: 90, color: "black", underscore: false},
     {start: 90, end: 110, color: "#ff0000", underscore: false}
     ];
     seq3.coverage(exempleSequenceCoverage);
     *
     *
     *
     * @param peptides
     * @param proteinLength
     * @returns {*}
     */
    function getHighlighting (peptides, proteinLength){

        var result = [];
        var aminoAcidsCoverage = [];
        for(var i=0; i<proteinLength; i++){
            aminoAcidsCoverage.push(0); // no cover
        }

        var aminoAcidsSyntheticCoverage = [];
        for(var i=0; i<proteinLength; i++){
            aminoAcidsSyntheticCoverage.push(0); // no cover
        }

        var syntheticlPeptides = peptides.filter(function (pep){return pep.properties.synthetic});
        for(var ni in syntheticlPeptides){
            var pep = syntheticlPeptides[ni];
            var first = pep.position.first;
            var last = pep.position.second;
            for (var i=first;i<=last;i++) {
                aminoAcidsSyntheticCoverage[i-1]=1;
            }
        }

        var naturalPeptides = peptides.filter(function (pep){return pep.properties.natural});

        var proteotypicPeptides = naturalPeptides.filter(function (pep){return pep.properties.proteotypic});
        var nonProteotypicPeptides = naturalPeptides.filter(function (pep){return !pep.properties.proteotypic});


        for(var ni in nonProteotypicPeptides){
            var pep = nonProteotypicPeptides[ni];
            var first = pep.position.first;
            var last = pep.position.second;
            for (var i=first;i<=last;i++) {
                aminoAcidsCoverage[i-1]=1;
            }
        }

        for(var ni in proteotypicPeptides){
            var pep = proteotypicPeptides[ni];
            var first = pep.position.first;
            var last = pep.position.second;
            for (var i=first;i<=last;i++) {
                if(aminoAcidsCoverage[i-1] === 1){
                    aminoAcidsCoverage[i-1]=10;
                }else {
                    aminoAcidsCoverage[i-1]=aminoAcidsCoverage[i-1] + 10;
                }
            }
        }

        // 0 not any peptide
        // 1 non-proteotypic peptide (can have one or more)
        // 10 single proteotypic
        // 20+ or more several protetypic

        var lastState = {cov: aminoAcidsCoverage[0], synth: aminoAcidsSyntheticCoverage[0]};
        var lastAminoAcidIndex = 0;

        for(var i=0; i<proteinLength; i++){
            var currentState = {cov: aminoAcidsCoverage[i], synth: aminoAcidsSyntheticCoverage[i]};
            if(currentState!=lastState) {
                result.push({start: lastAminoAcidIndex, end: i, color: getColorMap(lastState.cov), underscore: (lastState.synth === 1)});
                lastState = currentState;
                lastAminoAcidIndex = i;
            }
        }
        result.push({start: lastAminoAcidIndex, end: i, color: getColorMap(lastState.cov), underscore: (lastState.synth === 1)});

        return result;

    }

    function getColorMap(state){
        switch(state){
            case 0 : return 'grey';
            case 1 : return 'blue';
            case 10 : return 'green';
            default : return 'violet'; // 20 or
        }
    }


    function computePeptideCoverage (peptides, proteinLength){

        return computeCoverage(peptides, proteinLength, function (pep){return pep.properties.natural});

    }

    function computeProteotypicCoverage (peptides, proteinLength){

        return computeCoverage(peptides, proteinLength, function (pep){return (pep.properties.natural && pep.properties.proteotypic)});

    }


    return {

        computePeptideCoverage : computePeptideCoverage,
        computeProteotypicCoverage : computeProteotypicCoverage,
        getHighlighting : getHighlighting

    }

}


