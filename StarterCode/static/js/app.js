function initDashboard() {
    var dropdown = d3.select("#selDataset")

    d3.json("samples.json").then(data => {
        var names = data.names;
        names.forEach(UID => {
            dropdown.append("option").text(UID).property("value", UID)
        });

        buildCharts(names[0]);

    });

};






function buildCharts(UID) {
    // d3.select for bar guage and bubble div IDs
    d3.json("samples.json").then(data => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == UID);
        var result = resultArray[0];
        // var metadata = data.metadata[0];
        var metadata = data.metadata;
        
        metadata = metadata.filter(sampleObj => sampleObj.id == UID)[0];
        console.log(metadata)
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        var otul = otu_labels.slice(0, 10).reverse();
        var otui = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        // var filtered = data.samples.filter(eachElement => eachElement.id == UID);
        // var selected_UID = filtered[0];
        // var names = data.names[0];
        // var metadata = data.metadata[0];
        // var otui = selected_UID.otu_ids.slice(0, 10);
        // var otul = selected_UID.otu_labels.slice(0, 10);
        // var sample_values = selected_UID.sample_values.slice(0, 10);

        // var metadata = data.metadata.filter(eachElement => eachElement.id == UID);

        console.log(otul, otui)

        var trace_bar = [{
            type: 'bar',
            x: sample_values.slice(0, 10).reverse(),
            y: otui,
            text: otul,
            orientation: 'h'
        }];

        var bar_layout = {
            title: 'Top 10 Clusters Found',
            margin: { t: 30, l: 150 },
        };

        Plotly.newPlot("bar", trace_bar, bar_layout);

        // Build a Bubble Chart
        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        };
        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        function populateDemoInfo(incomingmetadata) {
            demo = d3.select("#sample-metadata");
            demo.html("");
            Object.entries(incomingmetadata).forEach(([key, value]) => {
                demo.append("h6").text(`${key.toUpperCase()}: ${value}`);
            });

            console.log(incomingmetadata)

        };
        populateDemoInfo(metadata);

    });



};





initDashboard();