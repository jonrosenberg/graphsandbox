var Charts = function () { var e = "#94BA65 #2B4E72 #2790B0 #777 #555 #999 #bbb #ccc #eee".split(" "); return { vertical: function (b, c) { var d = { colors: e, grid: { hoverable: !0, borderWidth: 2 }, bars: { horizontal: !1, show: !0, align: "center", lineWidth: 0, fillColor: { colors: [{ opacity: 1 }, { opacity: 0.5}]} }, legend: { show: !0 }, tooltip: !0, tooltipOpts: { content: "%s: %y"} }, a = $(b); a.length && $.plot(a, c, d) }, horizontal: function (b, c) { var d = { colors: e, grid: { hoverable: !0, borderWidth: 2 }, bars: { horizontal: !0, show: !0, align: "center", barWidth: 0.2, lineWidth: 0, fillColor: { colors: [{ opacity: 1 }, { opacity: 1}]} }, legend: { show: !0 }, tooltip: !0, tooltipOpts: { content: "%s: %y"} }, a = $(b); a.length && $.plot(a, c, d) }, pie: function (b, c) { var d = { colors: e, series: { pie: { show: !0, innerRadius: 0, stroke: { width: 4}} }, legend: { position: "ne" }, tooltip: !0, tooltipOpts: { content: "%s: %y" }, grid: { hoverable: !0} }, a = $(b); a.length && $.plot(a, c, d) }, donut: function (b, c) { var d = { colors: e, series: { pie: { show: !0, innerRadius: 0.5, stroke: { width: 4}} }, legend: { position: "ne" }, tooltip: !0, tooltipOpts: { content: "%s: %y" }, grid: { hoverable: !0} }, a = $(b); a.length && $.plot(a, c, d) }, line: function (b, c) { var d = { colors: e, series: { lines: { show: !0, fill: !0, lineWidth: 4, steps: !1, fillColor: { colors: [{ opacity: 0.4 }, { opacity: 0}]} }, points: { show: !0, radius: 4, fill: !0} }, legend: { position: "ne" }, tooltip: !0, tooltipOpts: { content: "%s: %y" }, xaxis: { mode: "time" }, grid: { borderWidth: 2, hoverable: !0} }, a = $(b); a.length && $.plot(a, c, d) } } } ();