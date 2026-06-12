/* =====================================
   Utility
===================================== */

function parseNumbers(text){

    return text
        .split(/[\s,\n\r\t]+/)
        .map(Number)
        .filter(
            x => !isNaN(x)
        );
}

/* =====================================
   Navigation
===================================== */

document
.querySelectorAll(".menu-btn")
.forEach(btn=>{

    btn.addEventListener(
        "click",
        ()=>{

            document
            .querySelectorAll(".menu-btn")
            .forEach(
                b=>b.classList.remove("active")
            );

            btn.classList.add(
                "active"
            );

            const target =
                btn.dataset.target;

            document
            .querySelectorAll(".panel")
            .forEach(
                p=>p.classList.remove("active")
            );

            document
            .getElementById(target)
            .classList.add("active");
        }
    );
});

/* =====================================
   Basic Statistics
===================================== */

document
.getElementById("basicCalcBtn")
.addEventListener(
    "click",
    ()=>{

        const data =
            parseNumbers(
                document
                .getElementById(
                    "basicData"
                )
                .value
            );

        if(
            data.length === 0
        ){

            alert(
                "Input data required"
            );

            return;
        }

        const ci =
            Stats.confidenceInterval(
                data
            );

        document
        .getElementById(
            "basicResult"
        )
        .innerHTML =

        `
        <div class="result-box">

        <div class="result-row">
        <span>Count</span>
        <span>${data.length}</span>
        </div>

        <div class="result-row">
        <span>Mean</span>
        <span>${Stats.mean(data).toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>Median</span>
        <span>${Stats.median(data).toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>Mode</span>
        <span>${Stats.mode(data)}</span>
        </div>

        <div class="result-row">
        <span>Variance</span>
        <span>${Stats.variance(data).toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>Std Dev</span>
        <span>${Stats.stdDev(data).toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>Skewness</span>
        <span>${Stats.skewness(data).toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>Kurtosis</span>
        <span>${Stats.kurtosis(data).toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>95% CI</span>
        <span>
        (${ci.lower.toFixed(4)},
        ${ci.upper.toFixed(4)})
        </span>
        </div>

        </div>
        `;

        Charts.histogram(
            "distChart",
            data,
            "Histogram"
        );
    }
);

/* =====================================
   T Test
===================================== */

document
.getElementById("ttestBtn")
.addEventListener(
    "click",
    ()=>{

        const groupA =
            parseNumbers(
                document
                .getElementById(
                    "groupA"
                )
                .value
            );

        const groupB =
            parseNumbers(
                document
                .getElementById(
                    "groupB"
                )
                .value
            );

        const result =
            Tests.independentT(
                groupA,
                groupB
            );

        document
        .getElementById(
            "ttestResult"
        )
        .innerHTML =

        `
        <div class="result-box">

        <div class="result-row">
        <span>T</span>
        <span>${result.t.toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>df</span>
        <span>${result.df.toFixed(2)}</span>
        </div>

        <div class="result-row">
        <span>p-value</span>
        <span>${result.pValue.toFixed(6)}</span>
        </div>

        <div class="result-row">
        <span>Significant</span>
        <span>${result.significant}</span>
        </div>

        </div>
        `;
    }
);

/* =====================================
   ANOVA
===================================== */

document
.getElementById("anovaBtn")
.addEventListener(
    "click",
    ()=>{

        const text =
            document
            .getElementById(
                "anovaData"
            )
            .value;

        const groups =
            text
            .trim()
            .split("\n")
            .map(
                line =>
                    parseNumbers(line)
            );

        const result =
            Tests.oneWayANOVA(
                groups
            );

        document
        .getElementById(
            "anovaResult"
        )
        .innerHTML =

        `
        <div class="result-box">

        <div class="result-row">
        <span>F</span>
        <span>${result.F.toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>p-value</span>
        <span>${result.pValue.toFixed(6)}</span>
        </div>

        <div class="result-row">
        <span>Significant</span>
        <span>${result.significant}</span>
        </div>

        </div>
        `;
    }
);

/* =====================================
   Regression
===================================== */

document
.getElementById("regressionBtn")
.addEventListener(
    "click",
    ()=>{

        const x =
            parseNumbers(
                document
                .getElementById(
                    "xValues"
                )
                .value
            );

        const y =
            parseNumbers(
                document
                .getElementById(
                    "yValues"
                )
                .value
            );

        const model =
            Regression.linear(
                x,
                y
            );

        document
        .getElementById(
            "regressionResult"
        )
        .innerHTML =

        `
        <div class="result-box">

        <div class="result-row">
        <span>Equation</span>
        <span>${model.equation}</span>
        </div>

        <div class="result-row">
        <span>r</span>
        <span>${model.correlation.toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>R²</span>
        <span>${model.rSquared.toFixed(4)}</span>
        </div>

        <div class="result-row">
        <span>RMSE</span>
        <span>${model.rmse.toFixed(4)}</span>
        </div>

        </div>
        `;

        Charts.regressionPlot(
            "regressionChart",
            x,
            y,
            model
        );
    }
);

/* =====================================
   Distribution
===================================== */

document
.getElementById("plotDistBtn")
.addEventListener(
    "click",
    ()=>{

        const type =
            document
            .getElementById(
                "distType"
            )
            .value;

        const p1 =
            Number(
                document
                .getElementById(
                    "param1"
                )
                .value
            );

        const p2 =
            Number(
                document
                .getElementById(
                    "param2"
                )
                .value
            );

        let dist;

        switch(type){

            case "normal":

                dist =
                Distributions.normal(
                    p1 || 0,
                    p2 || 1
                );

                break;

            case "t":

                dist =
                Distributions.t(
                    p1 || 10
                );

                break;

            case "chisquare":

                dist =
                Distributions.chiSquare(
                    p1 || 5
                );

                break;

            case "f":

                dist =
                Distributions.f(
                    p1 || 5,
                    p2 || 10
                );

                break;

            case "poisson":

                dist =
                Distributions.poisson(
                    p1 || 3
                );

                break;

            case "binomial":

                dist =
                Distributions.binomial(
                    p1 || 20,
                    p2 || 0.5
                );

                break;
        }

        Charts.distribution(
            "distChart",
            dist
        );
    }
);

/* =====================================
   CSV Upload
===================================== */

document
.getElementById("csvFile")
.addEventListener(
    "change",
    e=>{

        const file =
            e.target.files[0];

        if(!file)
            return;

        Papa.parse(
            file,
            {

                dynamicTyping:true,

                complete:
                function(results){

                    const rows =
                        results.data;

                    const col =
                        rows
                        .flat()
                        .filter(
                            x =>
                            typeof x
                            ===
                            "number"
                        );

                    document
                    .getElementById(
                        "csvResult"
                    )
                    .innerHTML =

                    `
                    <div class="result-box">

                    <div class="result-row">
                    <span>N</span>
                    <span>${col.length}</span>
                    </div>

                    <div class="result-row">
                    <span>Mean</span>
                    <span>${Stats.mean(col).toFixed(4)}</span>
                    </div>

                    <div class="result-row">
                    <span>Std Dev</span>
                    <span>${Stats.stdDev(col).toFixed(4)}</span>
                    </div>

                    </div>
                    `;

                    Charts.histogram(
                        "csvChart",
                        col,
                        "CSV Histogram"
                    );
                }
            }
        );
    }
);

console.log(
    "StatLab Loaded"
);
