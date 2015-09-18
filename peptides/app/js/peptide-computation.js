var PeptideComputation = (function () {

    var PeptideComputation = function () {
    }

    function sortPositions(listPositions) {

        return listPositions.sort(function (posA, posB) {
            var score = (posA.first - posB.first);
            if (score === 0) {
                score = (posA.last - posB.last);
            }
            return score;
        })
    }

    function computeCoveragePercentage(listPositions, length) {

        var currentPosition = 0;
        var coveredLength = 0;

        var sortedPositions = sortPositions(listPositions);

        for (var pi in sortedPositions) {
            var pos = sortedPositions[pi];
            var first = Math.max(pos.first, currentPosition);
            var last = pos.last;
            var posLength = last - first + 1;

            coveredLength += posLength;
            currentPosition = last + 1;
        }


        return (coveredLength / length * 100).toFixed(2);
        ;

    }

    function computeCoverage(peptides, proteinLength, condition) {

        var positions = peptides.filter(condition) // filter on condition
            .map(function (pep) {
                return {first: pep.position.first, last: pep.position.second}
            })

        return computeCoveragePercentage(positions, proteinLength);
    }

    // Return true if pepA is striclty included in pepB and both of the same nature.
    // PepA     --  --     -- ----- ---   -----
    // PepB    ---- ---- ---- -----  ----   --
    // Returns true true true false false false
    function isIncludedIn(pepA, pepB) {

        var ret = false;

        if (pepA.properties.natural && pepB.properties.natural || pepA.properties.synthetic && pepB.properties.synthetic) {
            if (pepA.position.first == pepB.position.first && pepA.position.second == pepB.position.second)
                ret = false;
            else
                ret = pepA.position.first >= pepB.position.first && pepA.position.second <= pepB.position.second;
        }

        //console.log("is ", pepA.sequence, pepA.position.first, ":", pepA.position.second, ", natu?", pepA.properties.natural, " synth?", pepA.properties.synthetic,
        //    " included in ", pepB.sequence, pepB.position.first, ":", pepB.position.second, ", natu?", pepB.properties.natural, " synth?", pepB.properties.synthetic,"? ANSWER=", ret);

        return ret;
    }

    function findIndexByKeyValue(array, key, value) {

        for (var i = 0; i < array.length; i++) {

            if (array[i][key] == value) {
                return i;
            }
        }
        return -1;
    }

    function updateInclusionLists(pepA, pepB) {

        var index = findIndexByKeyValue(pepA.includedIn, "name", pepB.name)

        if (index === -1) {

            pepA.includedIn.push(pepB);
            pepB.include.push(pepA);
        }
    }

    PeptideComputation.prototype.computeInterPeptideInclusions = function(peptides) {

        //var stringifiedPeptides = JSON.stringify(peptides); console.log(stringifiedPeptides);

        for (var i = 0; i < peptides.length; i++) {
            var pepA = peptides[i];

            for (var j = i + 1; j < peptides.length; j++) {
                var pepB = peptides[j];

                if (isIncludedIn(pepA, pepB)) updateInclusionLists(pepA, pepB);
                else if (isIncludedIn(pepB, pepA)) updateInclusionLists(pepB, pepA);
            }
        }
    };

    PeptideComputation.prototype.getAminoAcidColors = function (peptides, proteinLength, colorMapFunction) {

        var result = [];
        var aminoAcidsCoverage = [];
        for (var i = 0; i < proteinLength; i++) {
            aminoAcidsCoverage.push(0); // no cover
        }

        var aminoAcidsSyntheticCoverage = [];
        for (var i = 0; i < proteinLength; i++) {
            aminoAcidsSyntheticCoverage.push(0); // no cover
        }

        var syntheticlPeptides = peptides.filter(function (pep) {
            return pep.properties.synthetic
        });
        for (var ni in syntheticlPeptides) {
            var pep = syntheticlPeptides[ni];
            var first = pep.position.first;
            var last = pep.position.second;
            for (var i = first; i <= last; i++) {
                aminoAcidsSyntheticCoverage[i - 1] = 1;
            }
        }

        var naturalPeptides = peptides.filter(function (pep) {
            return pep.properties.natural
        });

        var proteotypicPeptides = naturalPeptides.filter(function (pep) {
            return pep.properties.proteotypic
        });
        var nonProteotypicPeptides = naturalPeptides.filter(function (pep) {
            return !pep.properties.proteotypic
        });


        for (var ni in nonProteotypicPeptides) {
            var pep = nonProteotypicPeptides[ni];
            var first = pep.position.first;
            var last = pep.position.second;
            for (var i = first; i <= last; i++) {
                aminoAcidsCoverage[i - 1] = 1;
            }
        }

        for (var ni in proteotypicPeptides) {
            var pep = proteotypicPeptides[ni];
            var first = pep.position.first;
            var last = pep.position.second;
            for (var i = first; i <= last; i++) {
                if (aminoAcidsCoverage[i - 1] === 1) {
                    aminoAcidsCoverage[i - 1] = 10;
                } else {
                    aminoAcidsCoverage[i - 1] = aminoAcidsCoverage[i - 1] + 10;
                }
            }
        }

        // 0 not any peptide
        // 1 non-proteotypic peptide (can have one or more)
        // 10 single proteotypic
        // 20+ or more several protetypic

        var lastState = {cov: aminoAcidsCoverage[0], synth: aminoAcidsSyntheticCoverage[0]};
        var lastAminoAcidIndex = 0;

        for (var i = 0; i < proteinLength; i++) {
            var currentState = {cov: aminoAcidsCoverage[i], synth: aminoAcidsSyntheticCoverage[i]};
            if (currentState != lastState) {
                result.push({
                    start: lastAminoAcidIndex,
                    end: i,
                    color: colorMapFunction(lastState.cov),
                    underscore: (lastState.synth === 1)
                });
                lastState = currentState;
                lastAminoAcidIndex = i;
            }
        }
        result.push({
            start: lastAminoAcidIndex,
            end: i,
            color: colorMapFunction(lastState.cov),
            underscore: (lastState.synth === 1)
        });

        return result;

    };

    PeptideComputation.prototype.computePeptideCoverage = function (peptides, proteinLength) {

        return computeCoverage(peptides, proteinLength, function (pep) {
            return pep.properties.natural
        });

    };

    PeptideComputation.prototype.computeProteotypicCoverage = function (peptides, proteinLength) {

        return computeCoverage(peptides, proteinLength, function (pep) {
            return (pep.properties.natural && pep.properties.proteotypic)
        });

    };

    return PeptideComputation;
}());
