class Regression {

    /* =====================================
       Linear Regression
    ===================================== */

    static linear(x, y) {

        x = Stats.clean(x);
        y = Stats.clean(y);

        if (x.length !== y.length) {
            throw new Error(
                "X and Y length mismatch"
            );
        }

        const n = x.length;

        const meanX =
            Stats.mean(x);

        const meanY =
            Stats.mean(y);

        let numerator = 0;
        let denominator = 0;

        for (
            let i = 0;
            i < n;
            i++
        ) {

            numerator +=
                (x[i] - meanX)
                *
                (y[i] - meanY);

            denominator +=
                (x[i] - meanX) ** 2;
        }

        const slope =
            numerator / denominator;

        const intercept =
            meanY -
            slope * meanX;

        const predicted =
            x.map(v =>
                intercept +
                slope * v
            );

        const residuals =
            y.map(
                (obs, i) =>
                    obs -
                    predicted[i]
            );

        const r =
            Stats.correlation(
                x,
                y
            );

        const r2 =
            r * r;

        const rmse =
            Math.sqrt(
                residuals.reduce(
                    (
                        sum,
                        r
                    ) =>
                        sum +
                        r ** 2,
                    0
                ) / n
            );

        return {

            method:
                "Linear Regression",

            slope,

            intercept,

            equation:
                `y = ${intercept.toFixed(4)} + ${slope.toFixed(4)}x`,

            correlation:
                r,

            rSquared:
                r2,

            rmse,

            predicted,

            residuals
        };
    }

    /* =====================================
       Predict
    ===================================== */

    static predict(
        model,
        x
    ){

        return (
            model.intercept
            +
            model.slope
            *
            x
        );
    }

    /* =====================================
       Residual Summary
    ===================================== */

    static residualSummary(
        residuals
    ){

        return {

            mean:
                Stats.mean(
                    residuals
                ),

            sd:
                Stats.stdDev(
                    residuals
                ),

            min:
                Math.min(
                    ...residuals
                ),

            max:
                Math.max(
                    ...residuals
                )
        };
    }

    /* =====================================
       Regression ANOVA
    ===================================== */

    static regressionANOVA(
        x,
        y
    ){

        const model =
            this.linear(
                x,
                y
            );

        const meanY =
            Stats.mean(y);

        let SSR = 0;
        let SSE = 0;

        for(
            let i=0;
            i<y.length;
            i++
        ){

            SSR +=
                (
                    model.predicted[i]
                    -
                    meanY
                ) ** 2;

            SSE +=
                (
                    y[i]
                    -
                    model.predicted[i]
                ) ** 2;
        }

        const SST =
            SSR + SSE;

        const dfRegression = 1;

        const dfError =
            y.length - 2;

        const MSR =
            SSR /
            dfRegression;

        const MSE =
            SSE /
            dfError;

        const F =
            MSR / MSE;

        const p =
            1 -
            jStat.centralF.cdf(
                F,
                dfRegression,
                dfError
            );

        return {

            SSR,
            SSE,
            SST,

            F,

            pValue:
                p,

            significant:
                p < 0.05
        };
    }

    /* =====================================
       Confidence Interval
       For Slope
    ===================================== */

    static slopeCI(
        x,
        y,
        confidence=0.95
    ){

        const model =
            this.linear(
                x,
                y
            );

        const n =
            x.length;

        const meanX =
            Stats.mean(x);

        const residuals =
            model.residuals;

        const SSE =
            residuals.reduce(
                (
                    sum,
                    r
                ) =>
                    sum +
                    r*r,
                0
            );

        const s2 =
            SSE /
            (n - 2);

        let sx = 0;

        x.forEach(v=>{

            sx +=
                (
                    v -
                    meanX
                ) ** 2;
        });

        const seSlope =
            Math.sqrt(
                s2 / sx
            );

        const alpha =
            1 -
            confidence;

        const t =
            jStat.studentt.inv(
                1 - alpha/2,
                n - 2
            );

        const lower =
            model.slope
            -
            t *
            seSlope;

        const upper =
            model.slope
            +
            t *
            seSlope;

        return {

            lower,

            upper
        };
    }

}
