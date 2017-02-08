function activateFilters(heatmapData, heatMapTable) {
    $(".filters .subtypes a:not(.collapse-title)").click(function () {
        $(this).toggleClass("active");
        $("i", this).toggleClass("fa-circle-thin fa-check");
        if ($(this).find(".phenAnnot").attr('type') == "Microarray" ||
            $(this).find(".phenAnnot").attr('type') == "IHC" ||
            $(this).find(".phenAnnot").attr('type') == "EST" ) {
            resetFilterStatus(heatmapData, heatMapTable);
        }
        clickEvent(heatmapData, heatMapTable);
    });
}

function clickEvent(heatmapData, heatMapTable) {
    var filters = getFilters();
    // autoCheckAll($(this));

    var filteredData = filterByEvidences(heatmapData, filters)
    heatMapTable.showLoadingStatus();
    heatMapTable.loadJSONData(filteredData);
    heatMapTable.show();
    heatMapTable.hideLoadingStatus();
}

function enableValueFilter(filterElem, heatmapData, heatMapTable) {
    $(filterElem).css("cursor", "pointer");
    if ($(filterElem).hasClass("unclickable")) {
        $(filterElem).toggleClass("clickable unclickable");
    }
    if ($("i", filterElem).hasClass("fa-circle-thin")) {
        $("i", filterElem).toggleClass("fa-circle-thin fa-check");
    }
    if (!$(filterElem).hasClass("active")) {
        $(filterElem).addClass("active");
    }
    $(filterElem).unbind("click");
    $(filterElem).click(function() {
        $(filterElem).toggleClass("active");
        $("i", filterElem).toggleClass("fa-circle-thin fa-check");
        clickEvent(heatmapData, heatMapTable);
    });
}

function disableValueFilter(filterElem) {
    $(filterElem).unbind("click");
    $(filterElem).css("cursor", "default");
    if ($("i", filterElem).hasClass("fa-check")) {
        $("i", filterElem).toggleClass("fa-circle-thin fa-check");
    }
    if ($(filterElem).hasClass("clickable")) {
        $(filterElem).toggleClass("clickable unclickable");
    }
    if ($(filterElem).hasClass("active")) {
        $(filterElem).removeClass("active");
    }
}

function resetFilterStatus(heatmapData, heatMapTable) {
    var isfilters = {};
    isfilters['Microarray'] = false;
    isfilters['IHC'] = false;
    isfilters['EST'] = false;
    $(".filters .methodology a").each(function () {
        if ($(this).hasClass("active")) {
            var type = $(this).find(".phenAnnot").attr('type');
            isfilters[type] = true;
        }
    });
    // unable
    $(".filters .subtypes-values a").each(function() {
        disableValueFilter(this);
    });
    //enable
    var filters = {};
    //config
    filters['Microarray'] = ["NotDetected", "Positive"];
    filters['EST'] = ["Positive"];
    filters['IHC'] = ["Positive", "High", "Medium", "Low"];
    for (var methodology in filters) {
        if (isfilters[methodology]) {
            $(".filters .subtypes-values a").each(function() {
                var value = $(this).find(".phenAnnot").attr('value');
                for (var i = 0; i < filters[methodology].length; i++) {
                    if (value === filters[methodology][i]) {
                        enableValueFilter(this, heatmapData, heatMapTable);
                        break;
                    }
                }
            });
        }
    }
}

function addSelectAll() {

    $(".select-all").click(function () {
        $("i", this).toggleClass("fa-circle-thin fa-check");
        var matchingList = $(this).attr("referTo");
        if ($("i", this).hasClass("fa-check")) {
            $(matchingList + " a").each(function () {
                if (!$(this).hasClass("active") && $(this).hasClass("clickable")) {
                    $(this).addClass("active");
                    $("i", this).toggleClass("fa-circle-thin fa-check");
                }
            })
        } else {
            $(matchingList + " a").each(function () {
                if ($(this).hasClass("active") && $(this).hasClass("clickable")) {
                    $(this).removeClass("active");
                    $("i", this).toggleClass("fa-circle-thin fa-check");
                }
            })
        }
    })
}

function getFilters() {
    var filters = {};
    filters['Microarray'] = []
    filters['IHC'] = []
    filters['EST'] = []
    $(".filters .methodology a").each(function () {
        if ($(this).hasClass("active")) {
            var type = $(this).find(".phenAnnot").attr('type');
            // filters[type] = [];
            filters[type].push(true);
        }
    });
    $(".filters .subtypes-values a").each(function () {
        if ($(this).hasClass("active")) {
            var value = $(this).find(".phenAnnot").attr('value');
            for (var type in filters) {
                filters[type].push(value);
            }
        }
    });
    console.log(filters);
    return filters;
}

function autoCheckAll(elem) {
    var panel = $(elem).closest(".panel-group");
    var all = panel.find(".select-all i");
    var activeFilters = panel.find(".subtypes a.active");
    if (!activeFilters.length && all.hasClass("fa-check")) {
        all.toggleClass("fa-circle-thin fa-check");
    } else if (activeFilters.length === panel.find(".subtypes a").length) {
        if (all.hasClass("fa-circle-thin")) {
            all.toggleClass("fa-circle-thin fa-check");
        }
    }
}

function filterByEvidences(data, filters) {
    var newDataList = [];

    for (var i = 0; i < data.length; i++) {
        var curNewData = {};
        for (var key in data[i]) {
            curNewData[key] = data[i][key];
        }

        curNewData.detailData = [];
        curNewData.childrenHTML = null;
        curNewData.html = null;

        for (var j = 0; j < data[i].detailData.length; j++) {
            var evidencesCodeName = data[i].detailData[j].evidenceCodeName;
            var value = data[i].detailData[j].value;
            var isFilterThisType = false;
            for (var k = 0; k < filters[evidencesCodeName].length; k++) {
                if (filters[evidencesCodeName][k] === true) isFilterThisType = true
            }
            if (isFilterThisType) {
                for (var k = 0; k < filters[evidencesCodeName].length; k++) {
                    if (filters[evidencesCodeName][k] === value ||
                            (
                                filters[evidencesCodeName][k] === "Positive" && 
                                (value === "High" || value === "Medium" || value === "Low")
                            )
                        ) {
                        curNewData.detailData.push(data[i].detailData[j]);
                        break
                    }
                }
            }
        }

        if (data[i].children && data[i].children.length !== 0) {
            var newChildren = filterByEvidences(data[i].children, filters);
            if (newChildren.length !== 0) {
                curNewData.children = newChildren;
            } else {
                curNewData.children = [];
            }
        }

        if (curNewData.children && curNewData.children.length !== 0) {
            newDataList.push(curNewData);
        } else if (curNewData.detailData.length !== 0) {
            newDataList.push(curNewData);
        }
    }
    return newDataList;
}

