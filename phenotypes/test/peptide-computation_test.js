/**
 * Created by fnikitin on 18/09/15.
 */
'use strict';

describe("Testing peptide computations", function() {

    it("compute peptide coverage with an expectation", function() {

        var peptides = [{"name":"NX_PEPT01832282","identifier":"FVNQHLCGSHLVEAL","position":{"first":25,"second":39},"length":15,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"FVNQHLCGSHLVEAL","prePeptide":"A","postPeptide":"L","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342557"},"peptideAtlasID":"PAp04342557"},{"name":"NX_PEPT01716994","identifier":"FVNQHLCGSHLVEALYLVCGER","position":{"first":25,"second":46},"length":22,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human breast","PeptideAtlas human others","PeptideAtlas human plasma"],"sequence":"FVNQHLCGSHLVEALYLVCGER","prePeptide":"A","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00062040"},"peptideAtlasID":"PAp00062040"},{"name":"NX_PEPT01997465","identifier":"FVNQHLCGSH","position":{"first":25,"second":34},"length":10,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"FVNQHLCGSH","prePeptide":"A","postPeptide":"V","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp03400131"},"peptideAtlasID":"PAp03400131"},{"name":"NX_PEPT01630793","identifier":"FVNQHLCGSHLVEALY","position":{"first":25,"second":40},"length":16,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"FVNQHLCGSHLVEALY","prePeptide":"A","postPeptide":"V","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342609"},"peptideAtlasID":"PAp04342609"},{"name":"NX_PEPT01944872","identifier":"FVNQHLCGSHLVEA","position":{"first":25,"second":38},"length":14,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"FVNQHLCGSHLVEA","prePeptide":"A","postPeptide":"Y","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342598"},"peptideAtlasID":"PAp04342598"},{"name":"NX_PEPT01291369","identifier":"QHLCGSHLVEALYLVCGER","position":{"first":28,"second":46},"length":19,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human plasma"],"sequence":"QHLCGSHLVEALYLVCGER","prePeptide":"N","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00143019"},"peptideAtlasID":"PAp00143019"},{"name":"NX_PEPT01501293","identifier":"HLCGSHLVEALYLVCGER","position":{"first":29,"second":46},"length":18,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human plasma"],"sequence":"HLCGSHLVEALYLVCGER","prePeptide":"Q","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00361534"},"peptideAtlasID":"PAp00361534"},{"name":"NX_PEPT01718556","identifier":"LCGSHLVEALYLVCGER","position":{"first":30,"second":46},"length":17,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"LCGSHLVEALYLVCGER","prePeptide":"H","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00361545"},"peptideAtlasID":"PAp00361545"},{"name":"NX_PEPT01980085","identifier":"GSHLVEALYLVCGER","position":{"first":32,"second":46},"length":15,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human plasma"],"sequence":"GSHLVEALYLVCGER","prePeptide":"C","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00062084"},"peptideAtlasID":"PAp00062084"},{"name":"NX_PEPT01975441","identifier":"SHLVEALYLVCGER","position":{"first":33,"second":46},"length":14,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others","PeptideAtlas human plasma"],"sequence":"SHLVEALYLVCGER","prePeptide":"G","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00062433"},"peptideAtlasID":"PAp00062433"},{"name":"NX_PEPT01296199","identifier":"HLVEALYLVCGER","position":{"first":34,"second":46},"length":13,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"HLVEALYLVCGER","prePeptide":"S","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp01555736"},"peptideAtlasID":"PAp01555736"},{"name":"NX_PEPT01868266","identifier":"LVEALYLVCGER","position":{"first":35,"second":46},"length":12,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human breast"],"sequence":"LVEALYLVCGER","prePeptide":"H","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04681315"},"peptideAtlasID":"PAp04681315"},{"name":"NX_PEPT00131365","identifier":"GFFYTPK","position":{"first":47,"second":53},"length":7,"properties":{"natural":true,"synthetic":true,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["MDATA_0023_2012","PeptideAtlas human others","PeptideAtlas human pancreas"],"sequence":"GFFYTPK","prePeptide":"R","postPeptide":"R","include":[],"includedIn":[],"sources":{"neXtProtSubmission":"MDATA_0023_2012","PeptideAtlas":"PAp00968082"},"peptideAtlasID":"PAp00968082"},{"name":"NX_PEPT01488253","identifier":"REAEDLQVGQ..PLALEGSLQK","position":{"first":56,"second":88},"length":33,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["MDATA_0023_2012","PeptideAtlas human others","PeptideAtlas human pancreas"],"sequence":"REAEDLQVGQVELGGGPGAGSLQPLALEGSLQK","prePeptide":"R","postPeptide":"G","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp02036896","neXtProtSubmission":"MDATA_0023_2012"},"peptideAtlasID":"PAp02036896"},{"name":"NX_PEPT01896516","identifier":"EAEDLQVGQV..QPLALEGSLQ","position":{"first":57,"second":87},"length":31,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human urine"],"sequence":"EAEDLQVGQVELGGGPGAGSLQPLALEGSLQ","prePeptide":"R","postPeptide":"R","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00804187"},"peptideAtlasID":"PAp00804187"},{"name":"NX_PEPT02068217","identifier":"EAEDLQVGQV..PLALEGSLQK","position":{"first":57,"second":88},"length":32,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["MDATA_0023_2012"],"sequence":"EAEDLQVGQVELGGGPGAGSLQPLALEGSLQK","prePeptide":"R","postPeptide":"G","include":[],"includedIn":[],"sources":{"neXtProtSubmission":"MDATA_0023_2012"},"peptideAtlasID":""},{"name":"NX_PEPT01559654","identifier":"EAEDLQVGQV..LALEGSLQKR","position":{"first":57,"second":89},"length":33,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human pancreas"],"sequence":"EAEDLQVGQVELGGGPGAGSLQPLALEGSLQKR","prePeptide":"R","postPeptide":"I","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04726304"},"peptideAtlasID":"PAp04726304"},{"name":"NX_PEPT01518808","identifier":"LGGGPGAGSLQPLALEGSLQK","position":{"first":68,"second":88},"length":21,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human others"],"sequence":"LGGGPGAGSLQPLALEGSLQK","prePeptide":"E","postPeptide":"G","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342495"},"peptideAtlasID":"PAp04342495"},{"name":"NX_PEPT01291735","identifier":"GGGPGAGSLQPLALEGSLQK","position":{"first":69,"second":88},"length":20,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human others"],"sequence":"GGGPGAGSLQPLALEGSLQK","prePeptide":"L","postPeptide":"G","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342607"},"peptideAtlasID":"PAp04342607"},{"name":"NX_PEPT02017336","identifier":"GGGPGAGSLQPLALEGSLQ","position":{"first":69,"second":87},"length":19,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human others"],"sequence":"GGGPGAGSLQPLALEGSLQ","prePeptide":"L","postPeptide":"R","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04341689"},"peptideAtlasID":"PAp04341689"},{"name":"NX_PEPT02072696","identifier":"GIVEQCCTSICSLYQLENYCN","position":{"first":90,"second":110},"length":21,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["MDATA_0023_2012"],"sequence":"GIVEQCCTSICSLYQLENYCN","prePeptide":"R","include":[],"includedIn":[],"sources":{"neXtProtSubmission":"MDATA_0023_2012"},"peptideAtlasID":""}];

        var pepComputation = new PeptideComputation();

        var percentCov = pepComputation.computePeptideCoverage(peptides, 110);

        expect(percentCov).toBe("76.36");
    });

    it("compute proteotypic peptide coverage with an expectation", function() {

        var peptides = [{"name":"NX_PEPT01832282","identifier":"FVNQHLCGSHLVEAL","position":{"first":25,"second":39},"length":15,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"FVNQHLCGSHLVEAL","prePeptide":"A","postPeptide":"L","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342557"},"peptideAtlasID":"PAp04342557"},{"name":"NX_PEPT01716994","identifier":"FVNQHLCGSHLVEALYLVCGER","position":{"first":25,"second":46},"length":22,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human breast","PeptideAtlas human others","PeptideAtlas human plasma"],"sequence":"FVNQHLCGSHLVEALYLVCGER","prePeptide":"A","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00062040"},"peptideAtlasID":"PAp00062040"},{"name":"NX_PEPT01997465","identifier":"FVNQHLCGSH","position":{"first":25,"second":34},"length":10,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"FVNQHLCGSH","prePeptide":"A","postPeptide":"V","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp03400131"},"peptideAtlasID":"PAp03400131"},{"name":"NX_PEPT01630793","identifier":"FVNQHLCGSHLVEALY","position":{"first":25,"second":40},"length":16,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"FVNQHLCGSHLVEALY","prePeptide":"A","postPeptide":"V","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342609"},"peptideAtlasID":"PAp04342609"},{"name":"NX_PEPT01944872","identifier":"FVNQHLCGSHLVEA","position":{"first":25,"second":38},"length":14,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"FVNQHLCGSHLVEA","prePeptide":"A","postPeptide":"Y","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342598"},"peptideAtlasID":"PAp04342598"},{"name":"NX_PEPT01291369","identifier":"QHLCGSHLVEALYLVCGER","position":{"first":28,"second":46},"length":19,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human plasma"],"sequence":"QHLCGSHLVEALYLVCGER","prePeptide":"N","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00143019"},"peptideAtlasID":"PAp00143019"},{"name":"NX_PEPT01501293","identifier":"HLCGSHLVEALYLVCGER","position":{"first":29,"second":46},"length":18,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human plasma"],"sequence":"HLCGSHLVEALYLVCGER","prePeptide":"Q","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00361534"},"peptideAtlasID":"PAp00361534"},{"name":"NX_PEPT01718556","identifier":"LCGSHLVEALYLVCGER","position":{"first":30,"second":46},"length":17,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"LCGSHLVEALYLVCGER","prePeptide":"H","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00361545"},"peptideAtlasID":"PAp00361545"},{"name":"NX_PEPT01980085","identifier":"GSHLVEALYLVCGER","position":{"first":32,"second":46},"length":15,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human plasma"],"sequence":"GSHLVEALYLVCGER","prePeptide":"C","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00062084"},"peptideAtlasID":"PAp00062084"},{"name":"NX_PEPT01975441","identifier":"SHLVEALYLVCGER","position":{"first":33,"second":46},"length":14,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others","PeptideAtlas human plasma"],"sequence":"SHLVEALYLVCGER","prePeptide":"G","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00062433"},"peptideAtlasID":"PAp00062433"},{"name":"NX_PEPT01296199","identifier":"HLVEALYLVCGER","position":{"first":34,"second":46},"length":13,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human others"],"sequence":"HLVEALYLVCGER","prePeptide":"S","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp01555736"},"peptideAtlasID":"PAp01555736"},{"name":"NX_PEPT01868266","identifier":"LVEALYLVCGER","position":{"first":35,"second":46},"length":12,"properties":{"natural":true,"synthetic":false,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["PeptideAtlas human breast"],"sequence":"LVEALYLVCGER","prePeptide":"H","postPeptide":"F","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04681315"},"peptideAtlasID":"PAp04681315"},{"name":"NX_PEPT00131365","identifier":"GFFYTPK","position":{"first":47,"second":53},"length":7,"properties":{"natural":true,"synthetic":true,"proteotypic":false},"isoformProteotypicity":"No","tissueSpecificity":["MDATA_0023_2012","PeptideAtlas human others","PeptideAtlas human pancreas"],"sequence":"GFFYTPK","prePeptide":"R","postPeptide":"R","include":[],"includedIn":[],"sources":{"neXtProtSubmission":"MDATA_0023_2012","PeptideAtlas":"PAp00968082"},"peptideAtlasID":"PAp00968082"},{"name":"NX_PEPT01488253","identifier":"REAEDLQVGQ..PLALEGSLQK","position":{"first":56,"second":88},"length":33,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["MDATA_0023_2012","PeptideAtlas human others","PeptideAtlas human pancreas"],"sequence":"REAEDLQVGQVELGGGPGAGSLQPLALEGSLQK","prePeptide":"R","postPeptide":"G","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp02036896","neXtProtSubmission":"MDATA_0023_2012"},"peptideAtlasID":"PAp02036896"},{"name":"NX_PEPT01896516","identifier":"EAEDLQVGQV..QPLALEGSLQ","position":{"first":57,"second":87},"length":31,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human urine"],"sequence":"EAEDLQVGQVELGGGPGAGSLQPLALEGSLQ","prePeptide":"R","postPeptide":"R","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp00804187"},"peptideAtlasID":"PAp00804187"},{"name":"NX_PEPT02068217","identifier":"EAEDLQVGQV..PLALEGSLQK","position":{"first":57,"second":88},"length":32,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["MDATA_0023_2012"],"sequence":"EAEDLQVGQVELGGGPGAGSLQPLALEGSLQK","prePeptide":"R","postPeptide":"G","include":[],"includedIn":[],"sources":{"neXtProtSubmission":"MDATA_0023_2012"},"peptideAtlasID":""},{"name":"NX_PEPT01559654","identifier":"EAEDLQVGQV..LALEGSLQKR","position":{"first":57,"second":89},"length":33,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human pancreas"],"sequence":"EAEDLQVGQVELGGGPGAGSLQPLALEGSLQKR","prePeptide":"R","postPeptide":"I","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04726304"},"peptideAtlasID":"PAp04726304"},{"name":"NX_PEPT01518808","identifier":"LGGGPGAGSLQPLALEGSLQK","position":{"first":68,"second":88},"length":21,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human others"],"sequence":"LGGGPGAGSLQPLALEGSLQK","prePeptide":"E","postPeptide":"G","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342495"},"peptideAtlasID":"PAp04342495"},{"name":"NX_PEPT01291735","identifier":"GGGPGAGSLQPLALEGSLQK","position":{"first":69,"second":88},"length":20,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human others"],"sequence":"GGGPGAGSLQPLALEGSLQK","prePeptide":"L","postPeptide":"G","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04342607"},"peptideAtlasID":"PAp04342607"},{"name":"NX_PEPT02017336","identifier":"GGGPGAGSLQPLALEGSLQ","position":{"first":69,"second":87},"length":19,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["PeptideAtlas human others"],"sequence":"GGGPGAGSLQPLALEGSLQ","prePeptide":"L","postPeptide":"R","include":[],"includedIn":[],"sources":{"PeptideAtlas":"PAp04341689"},"peptideAtlasID":"PAp04341689"},{"name":"NX_PEPT02072696","identifier":"GIVEQCCTSICSLYQLENYCN","position":{"first":90,"second":110},"length":21,"properties":{"natural":true,"synthetic":false,"proteotypic":true},"isoformProteotypicity":"Yes","tissueSpecificity":["MDATA_0023_2012"],"sequence":"GIVEQCCTSICSLYQLENYCN","prePeptide":"R","include":[],"includedIn":[],"sources":{"neXtProtSubmission":"MDATA_0023_2012"},"peptideAtlasID":""}];
        var pepComputation = new PeptideComputation();

        var percentCov = pepComputation.computeProteotypicCoverage(peptides, 110);

        expect(percentCov).toBe("50.00");
    });

    it("same peptide do share nature", function() {

        var peptide = {"name":"PEP_A", "position": {"first":25,"second":39}, "properties":{"natural":true,"synthetic":false}, "include":[],"includedIn":[]};

        var pepComputation = new PeptideComputation();

        var doShareNature = pepComputation.doShareNature(peptide, peptide);

        expect(doShareNature).toBe(true);
    });

    it("peptides do share natural nature", function() {

        var peptides = [
            {"name":"PEP_A", "properties":{"natural":true,"synthetic":true}},
            {"name":"PEP_B", "properties":{"natural":true,"synthetic":false}}
        ];
        var pepComputation = new PeptideComputation();

        var doShareNature = pepComputation.doShareNature(peptides[0], peptides[1]);

        expect(doShareNature).toBe(true);
    });

    it("peptides do share synthetic nature", function() {

        var peptides = [
            {"name":"PEP_A", "properties":{"natural":false,"synthetic":true}},
            {"name":"PEP_B", "properties":{"natural":true,"synthetic":true}}
        ];
        var pepComputation = new PeptideComputation();

        var doShareNature = pepComputation.doShareNature(peptides[0], peptides[1]);

        expect(doShareNature).toBe(true);
    });

    it("peptides do not share nature", function() {

        var peptides = [
            {"name":"PEP_A", "properties":{"natural":false,"synthetic":true}},
            {"name":"PEP_B", "properties":{"natural":true,"synthetic":false}}
        ];
        var pepComputation = new PeptideComputation();

        var doShareNature = pepComputation.doShareNature(peptides[0], peptides[1]);

        expect(doShareNature).toBe(false);
    });

    it("one peptide position does not include its own position", function() {

        var peptide = {"name":"PEP_A", "position": {"first":25,"second":39}, "properties":{"natural":true,"synthetic":false}};

        var pepComputation = new PeptideComputation();

        var isIncluded = pepComputation.isPositionStrictyIncludedIn(peptide, peptide);

        expect(isIncluded).toBe(false);
    });

    it("one peptide position is strictly included in other position", function() {

        var peptides = [
            {"name":"PEP_A", "position": {"first":25,"second":39}, "properties":{"natural":true,"synthetic":false}},
            {"name":"PEP_B", "position": {"first":15,"second":40}, "properties":{"natural":true,"synthetic":false}}
        ];
        var pepComputation = new PeptideComputation();

        var isIncluded = pepComputation.isPositionStrictyIncludedIn(peptides[0], peptides[1]);

        expect(isIncluded).toBe(true);
    });

    it("one natural peptide is strictly included in other mixed nature peptide", function() {

        var peptides = [
            {"name":"PEP_A", "position": {"first":25,"second":39}, "properties":{"natural":true,"synthetic":false}},
            {"name":"PEP_B", "position": {"first":15,"second":40}, "properties":{"natural":true,"synthetic":true}}
        ];
        var pepComputation = new PeptideComputation();

        var isIncluded = pepComputation.isPositionStrictyIncludedIn(peptides[0], peptides[1]);

        expect(isIncluded).toBe(true);
    });

    it("one synthetic peptide is strictly included in other mixed nature peptide", function() {

        var peptides = [
            {"name":"PEP_A", "position": {"first":25,"second":39}, "properties":{"natural":false,"synthetic":true}},
            {"name":"PEP_B", "position": {"first":15,"second":40}, "properties":{"natural":true,"synthetic":true}}
        ];
        var pepComputation = new PeptideComputation();

        var isIncluded = pepComputation.isPositionStrictyIncludedIn(peptides[0], peptides[1]);

        expect(isIncluded).toBe(true);
    });

    it("one peptide is not included in other if different nature", function() {

        var peptides = [
            {"name":"PEP_A", "position": {"first":25,"second":39}, "properties":{"natural":false,"synthetic":true}},
            {"name":"PEP_B", "position": {"first":15,"second":40}, "properties":{"natural":true,"synthetic":false}}
        ];
        var pepComputation = new PeptideComputation();

        var isIncluded = pepComputation.isPositionStrictyIncludedIn(peptides[0], peptides[1]);

        expect(isIncluded).toBe(false);
    });

    it("one peptide is not included in other", function() {

        var peptides = [
            {"name":"PEP_A", "position": {"first":1,"second":39}, "properties":{"natural":true,"synthetic":false}},
            {"name":"PEP_B", "position": {"first":40,"second":50}, "properties":{"natural":true,"synthetic":false}}
        ];
        var pepComputation = new PeptideComputation();

        var isIncluded = pepComputation.isPositionStrictyIncludedIn(peptides[0], peptides[1]);

        expect(isIncluded).toBe(false);
    });

    it("one included peptide is not included in other", function() {

        var peptides = [
            {"name":"PEP_A", "position": {"first":1,"second":39}, "properties":{"natural":true,"synthetic":false}},
            {"name":"PEP_B", "position": {"first":3,"second":20}, "properties":{"natural":true,"synthetic":false}}
        ];
        var pepComputation = new PeptideComputation();

        var isIncluded = pepComputation.isPositionStrictyIncludedIn(peptides[0], peptides[1]);

        expect(isIncluded).toBe(false);
    });

    it("one included peptide is included in other (same starting point)", function() {

        var peptides = [
            {"name":"PEP_A", "position": {"first":1,"second":20}, "properties":{"natural":true,"synthetic":false}},
            {"name":"PEP_B", "position": {"first":1,"second":30}, "properties":{"natural":true,"synthetic":false}}
        ];
        var pepComputation = new PeptideComputation();

        var isIncluded = pepComputation.isPositionStrictyIncludedIn(peptides[0], peptides[1]);

        expect(isIncluded).toBe(true);
    });

    it("one included peptide is included in other (same ending point)", function() {

        var peptides = [
            {"name":"PEP_A", "position": {"first":10,"second":20}, "properties":{"natural":true,"synthetic":false}},
            {"name":"PEP_B", "position": {"first":1,"second":20}, "properties":{"natural":true,"synthetic":false}}
        ];
        var pepComputation = new PeptideComputation();

        var isIncluded = pepComputation.isPositionStrictyIncludedIn(peptides[0], peptides[1]);

        expect(isIncluded).toBe(true);
    });
});