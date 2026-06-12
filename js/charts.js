class Charts {

    /* =====================================
       Common Layout
    ===================================== */

    static defaultLayout(
        title = ""
    ){

        return {

            title,

            paper_bgcolor:
                "#1e293b",

            plot_bgcolor:
                "#1e293b",

            font: {

                color:
                    "#f8fafc"
            },

            margin: {

                t:50,
                l:50,
                r:20,
                b:50
            }
        };
    }

    /* =====================================
       Histogram
    ===================================== */

    static histogram(
        divId,
        data,
        title="Histogram"
    ){

        const trace = {

            x:data,

            type:"histogram",

            opacity:0.8
        };

        Plotly.newPlot(
            divId,
            [trace],
            this.defaultLayout(
                title
            ),
            {
                responsive:true
            }
        );
    }

    /* =====================================
       Box Plot
    ===================================== */

    static boxPlot(
        divId,
        data,
        title="Box Plot"
    ){

        const trace = {

            y:data,

            type:"box",

            boxpoints:"outliers",

            name:"Data"
        };

        Plotly.newPlot(
            divId,
            [trace],
            this.defaultLayout(
                title
            ),
            {
                responsive:true
            }
        );
    }

    /* =====================================
       Scatter
    ===================================== */

    static scatter(
        divId,
        x,
        y,
        title="Scatter Plot"
    ){

        const trace = {

            x,

            y,

            mode:"markers",

            type:"scatter",

            name:"Data"
        };

        Plotly.newPlot(
            divId,
            [trace],
            this.defaultLayout(
                title
            ),
            {
                responsive:true
            }
        );
    }

    /* =====================================
       Scatter + Regression
    ===================================== */

    static regressionPlot(
        divId,
        x,
        y,
        model
    ){

        const scatter = {

            x,

            y,

            mode:"markers",

            type:"scatter",

            name:"Observed"
        };

        const line = {

            x,

            y:model.predicted,

            mode:"lines",

            type:"scatter",

            name:"Regression"
        };

        Plotly.newPlot(

            divId,

            [
                scatter,
                line
            ],

            this.defaultLayout(
                "Regression Analysis"
            ),

            {
                responsive:true
            }
        );
    }

    /* =====================================
       Distribution Curve
    ===================================== */

    static distribution(
        divId,
        dist
    ){

        const trace = {

            x:dist.x,

            y:dist.y,

            mode:"lines",

            type:"scatter",

            name:dist.name
        };

        Plotly.newPlot(

            divId,

            [trace],

            this.defaultLayout(
                dist.name
            ),

            {
                responsive:true
            }
        );
    }

    /* =====================================
       Multiple Series
    ===================================== */

    static multiLine(
        divId,
        series,
        title="Chart"
    ){

        Plotly.newPlot(

            divId,

            series,

            this.defaultLayout(
                title
            ),

            {
                responsive:true
            }
        );
    }

    /* =====================================
       Correlation Heatmap
       (v2 feature)
    ===================================== */

    static heatmap(
        divId,
        matrix,
        labels
    ){

        const trace = {

            z:matrix,

            x:labels,

            y:labels,

            type:"heatmap"
        };

        Plotly.newPlot(

            divId,

            [trace],

            this.defaultLayout(
                "Correlation Matrix"
            ),

            {
                responsive:true
            }
        );
    }

    /* =====================================
       QQ Plot
       (v2 feature)
    ===================================== */

    static qqPlot(
        divId,
        data
    ){

        data =
            [...data]
            .sort(
                (a,b)=>a-b
            );

        const n =
            data.length;

        const theoretical =
            [];

        for(
            let i=0;
            i<n;
            i++
        ){

            theoretical.push(

                jStat.normal.inv(

                    (
                        i + 0.5
                    ) / n,

                    0,
                    1
                )
            );
        }

        const trace = {

            x:theoretical,

            y:data,

            mode:"markers",

            type:"scatter"
        };

        Plotly.newPlot(

            divId,

            [trace],

            this.defaultLayout(
                "QQ Plot"
            ),

            {
                responsive:true
            }
        );
    }

}
