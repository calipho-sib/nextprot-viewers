var AdditionalInfos = (function () {

    var AdditionalInfos = function () {
    };
    
    function getKeywordByview(kwFilter, list) {
        var data = {};
        var dataArray = [];
        list.forEach(function (k) {
            if (kwFilter.type.indexOf(k.cvTermType) >= 0 && kwFilter.exceptions.indexOf(k.cvTermAccessionCode) < 0) {
                if (data[k.cvTermType]) data[k.cvTermType].push(k);
                else data[k.cvTermType] = [k];
            }
        });
        var dataArray = Object.keys(data).map(function(key){ var temp={}; temp[key]=data[key]; return temp });

        dataArray.sort(function (a, b) {
                var textA = Object.keys(a)[0].toUpperCase();
                var textB = Object.keys(b)[0].toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    return dataArray;
    }
    
    AdditionalInfos.prototype.compileKeyword = function (entry,nx, keywords, div){
            nx.getAnnotationsByCategory(entry, "keyword")
                .then(function (data) {
                    var keywordList = getKeywordByview(keywords, data.annot);
                    var source = $("#entry-template").html();
                    var template = HBtemplates['templates/keywords.tmpl'];
                    var html = template(keywordList);
                    $(div).html(html);

                }).catch(function (err) {
                    // catch any error that happened so far
                    console.log("Argh, broken: " + err.message);
                    console.log("Error at line : " + err.stack);
                });
    };
    return AdditionalInfos;
}());