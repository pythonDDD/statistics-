class Distributions {

    /* =====================================
       Utility
    ===================================== */

    static linspace(
        start,
        end,
        n = 200
    ){

        const arr = [];

        const step =
            (end - start)
            /
            (n - 1);

        for(
            let i=0;
            i<n;
            i++
        ){

            arr.push(
                start +
                i * step
            );
        }

        return arr;
    }

    /* =====================================
       Normal Distribution
    ===================================== */

    static normal(
        mean = 0,
        sd = 1
    ){

        const x =
            this.linspace(
                mean - 4*sd,
                mean + 4*sd,
                300
            );

        const y =
            x.map(v =>
                jStat.normal.pdf(
                    v,
                    mean,
                    sd
                )
            );

        return {
            x,
            y,
            name:
                "Normal Distribution"
        };
    }

    /* =====================================
       T Distribution
    ===================================== */

    static t(df = 10){

        const x =
            this.linspace(
                -5,
                5,
                300
            );

        const y =
            x.map(v =>
                jStat.studentt.pdf(
                    v,
                    df
                )
            );

        return {
            x,
            y,
            name:
                "T Distribution"
        };
    }

    /* =====================================
       Chi Square
    ===================================== */

    static chiSquare(df = 5){

        const x =
            this.linspace(
                0,
                30,
                300
            );

        const y =
            x.map(v =>
                jStat.chisquare.pdf(
                    v,
                    df
                )
            );

        return {
            x,
            y,
            name:
                "Chi Square"
        };
    }

    /* =====================================
       F Distribution
    ===================================== */

    static f(
        df1 = 5,
        df2 = 10
    ){

        const x =
            this.linspace(
                0,
                6,
                300
            );

        const y =
            x.map(v =>
                jStat.centralF.pdf(
                    v,
                    df1,
                    df2
                )
            );

        return {
            x,
            y,
            name:
                "F Distribution"
        };
    }

    /* =====================================
       Poisson
    ===================================== */

    static poisson(
        lambda = 3
    ){

        const x = [];
        const y = [];

        const maxX =
            Math.max(
                15,
                lambda * 4
            );

        for(
            let k=0;
            k<=maxX;
            k++
        ){

            x.push(k);

            y.push(
                jStat.poisson.pdf(
                    k,
                    lambda
                )
            );
        }

        return {
            x,
            y,
            name:
                "Poisson Distribution"
        };
    }

    /* =====================================
       Binomial
    ===================================== */

    static binomial(
        n = 20,
        p = 0.5
    ){

        const x = [];
        const y = [];

        for(
            let k=0;
            k<=n;
            k++
        ){

            x.push(k);

            y.push(
                jStat.binomial.pdf(
                    k,
                    n,
                    p
                )
            );
        }

        return {
            x,
            y,
            name:
                "Binomial Distribution"
        };
    }

    /* =====================================
       Random Normal Sample
    ===================================== */

    static randomNormal(
        mean = 0,
        sd = 1,
        n = 100
    ){

        const data = [];

        for(
            let i=0;
            i<n;
            i++
        ){

            data.push(
                jStat.normal.sample(
                    mean,
                    sd
                )
            );
        }

        return data;
    }

    /* =====================================
       Random Poisson Sample
    ===================================== */

    static randomPoisson(
        lambda = 3,
        n = 100
    ){

        const data = [];

        for(
            let i=0;
            i<n;
            i++
        ){

            data.push(
                jStat.poisson.sample(
                    lambda
                )
            );
        }

        return data;
    }

    /* =====================================
       CDF
    ===================================== */

    static normalCDF(
        x,
        mean = 0,
        sd = 1
    ){

        return jStat.normal.cdf(
            x,
            mean,
            sd
        );
    }

    static tCDF(
        x,
        df = 10
    ){

        return jStat.studentt.cdf(
            x,
            df
        );
    }

    static chiSquareCDF(
        x,
        df = 5
    ){

        return jStat.chisquare.cdf(
            x,
            df
        );
    }

    static poissonCDF(
        x,
        lambda = 3
    ){

        return jStat.poisson.cdf(
            x,
            lambda
        );
    }

}
