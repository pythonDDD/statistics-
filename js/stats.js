class Stats {

    /* =========================
       Utility
    ========================= */

    static clean(data){

        return data
            .map(Number)
            .filter(x => !isNaN(x));
    }

    static sum(data){

        return data.reduce(
            (a,b)=>a+b,
            0
        );
    }

    static count(data){

        return data.length;
    }

    /* =========================
       Central Tendency
    ========================= */

    static mean(data){

        data = this.clean(data);

        return this.sum(data) / data.length;
    }

    static median(data){

        data = this.clean(data)
            .sort((a,b)=>a-b);

        const n = data.length;

        if(n % 2 === 0){

            return (
                data[n/2 -1] +
                data[n/2]
            ) / 2;
        }

        return data[
            Math.floor(n/2)
        ];
    }

    static mode(data){

        data = this.clean(data);

        const freq = {};

        let maxFreq = 0;
        let mode = null;

        data.forEach(v=>{

            freq[v] =
                (freq[v] || 0) + 1;

            if(freq[v] > maxFreq){

                maxFreq = freq[v];
                mode = v;
            }
        });

        return mode;
    }

    /* =========================
       Dispersion
    ========================= */

    static variance(data){

        data = this.clean(data);

        const mean =
            this.mean(data);

        const sq = data.map(
            x => (x - mean) ** 2
        );

        return this.sum(sq) /
            (data.length - 1);
    }

    static populationVariance(data){

        data = this.clean(data);

        const mean =
            this.mean(data);

        const sq = data.map(
            x => (x - mean) ** 2
        );

        return this.sum(sq) /
            data.length;
    }

    static stdDev(data){

        return Math.sqrt(
            this.variance(data)
        );
    }

    static populationStdDev(data){

        return Math.sqrt(
            this.populationVariance(data)
        );
    }

    static range(data){

        data = this.clean(data);

        return Math.max(...data)
            -
            Math.min(...data);
    }

    /* =========================
       Quantiles
    ========================= */

    static percentile(data,p){

        data = this.clean(data)
            .sort((a,b)=>a-b);

        const index =
            (p/100)*(data.length-1);

        const lower =
            Math.floor(index);

        const upper =
            Math.ceil(index);

        if(lower === upper){

            return data[lower];
        }

        return data[lower]
            +
            (index-lower)
            *
            (
                data[upper]
                -
                data[lower]
            );
    }

    static quartiles(data){

        return {

            q1:
                this.percentile(data,25),

            q2:
                this.percentile(data,50),

            q3:
                this.percentile(data,75)
        };
    }

    static iqr(data){

        const q =
            this.quartiles(data);

        return q.q3 - q.q1;
    }

    /* =========================
       Shape
    ========================= */

    static skewness(data){

        data = this.clean(data);

        const n =
            data.length;

        const mean =
            this.mean(data);

        const sd =
            this.stdDev(data);

        let sum = 0;

        data.forEach(x=>{

            sum +=
                (
                    (x-mean)
                    / sd
                ) ** 3;
        });

        return (
            n /
            (
                (n-1)
                *
                (n-2)
            )
        ) * sum;
    }

    static kurtosis(data){

        data = this.clean(data);

        const n =
            data.length;

        const mean =
            this.mean(data);

        const sd =
            this.stdDev(data);

        let sum = 0;

        data.forEach(x=>{

            sum +=
                (
                    (x-mean)
                    / sd
                ) ** 4;
        });

        return sum/n - 3;
    }

    /* =========================
       Correlation
    ========================= */

    static correlation(x,y){

        x = this.clean(x);
        y = this.clean(y);

        if(
            x.length !== y.length
        ){

            throw new Error(
                "Length mismatch"
            );
        }

        const mx =
            this.mean(x);

        const my =
            this.mean(y);

        let numerator = 0;
        let dx = 0;
        let dy = 0;

        for(
            let i=0;
            i<x.length;
            i++
        ){

            numerator +=
                (
                    x[i]-mx
                )
                *
                (
                    y[i]-my
                );

            dx +=
                (
                    x[i]-mx
                ) ** 2;

            dy +=
                (
                    y[i]-my
                ) ** 2;
        }

        return numerator
            /
            Math.sqrt(dx*dy);
    }

    /* =========================
       Confidence Interval
    ========================= */

    static confidenceInterval(
        data,
        confidence=0.95
    ){

        data = this.clean(data);

        const mean =
            this.mean(data);

        const sd =
            this.stdDev(data);

        const n =
            data.length;

        const alpha =
            1-confidence;

        const t =
            jStat.studentt.inv(
                1-alpha/2,
                n-1
            );

        const margin =
            t *
            (
                sd /
                Math.sqrt(n)
            );

        return {

            mean,

            lower:
                mean-margin,

            upper:
                mean+margin
        };
    }

    /* =========================
       Covariance
    ========================= */

    static covariance(x,y){

        const mx =
            this.mean(x);

        const my =
            this.mean(y);

        let sum = 0;

        for(
            let i=0;
            i<x.length;
            i++
        ){

            sum +=
                (
                    x[i]-mx
                )
                *
                (
                    y[i]-my
                );
        }

        return sum /
            (x.length-1);
    }

}
