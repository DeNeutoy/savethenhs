getPieChart("pieChart", "2012/13", 220, 25);
getPieChart("pieChart", "2013/14", 181, 64);
getPieChart("pieChart", "2014/15", 125, 115);
getPieChart("pieChart", "2015/16", 83, 157);
function getPieChart(div, title, surplus, deficit) {

    return pie = new d3pie(div, {
        "header": {
            "title": {
                "text": title,
                "fontSize": 24
            },
            "subtitle": {
                "color": "#999999",
                "fontSize": 5
            },
            "location": "pie-center",
            "titleSubtitlePadding": 10
        },
        "footer": {
            "color": "#999999",
            "fontSize": 10,
            "font": "open sans",
            "location": "bottom-center"
        },
        "size": {
            "canvasWidth": 450,
            "canvasHeight": 450,
            "pieInnerRadius": "69%",
            "pieOuterRadius": "40%"
        },
        "data": {
            "sortOrder": "label-desc",
            "content": [
                {
                    "label": "Deficit",
                    "value": deficit,
                    "color": "#e41a1c"
                },
                {
                    "label": "Surplus",
                    "value": surplus,
                    "color": "#4daf4a"
                }
            ]
        },
        "labels": {
            "outer": {
                "format": "label-percentage1",
                "pieDistance": 5
            },
            "inner": {
                "format": "value"
            },
            "mainLabel": {
                "fontSize": 11
            },
            "percentage": {
                "color": "#999999",
                "fontSize": 11,
                "decimalPlaces": 0
            },
            "value": {
                "color": "#fbfbfb",
                "fontSize": 11
            },
            "lines": {
                "enabled": false,
                "style": "straight",
                "color": "#777777"
            },
            "truncation": {
                "enabled": true
            }
        },
        "effects": {
            "load": {
                "speed": 2500
            },
            "pullOutSegmentOnClick": {
                "effect": "linear",
                "speed": 400,
                "size": 8
            }
        },
        "misc": {
            "colors": {
                "segmentStroke": "#000000"
            },
            "gradient": {
                "enabled": true,
                "percentage": 45
            },
            "pieCenterOffset": {
                "x": -50,
                "y": -80
            }
        }
    });
}