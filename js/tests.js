class Tests {

    /* =====================================
       One Sample T-Test
    ===================================== */

    static oneSampleT(data, mu = 0) {

        data = Stats.clean(data);

        const n = data.length;

        const mean =
            Stats.mean(data);

        const sd =
            Stats.stdDev(data);

        const t =
            (mean - mu)
            /
            (sd / Math.sqrt(n));

        const p =
            2 *
            (
                1 -
                jStat.studentt.cdf(
                    Math.abs(t),
                    n - 1
                )
            );

        return {

            test:
                "One Sample T-Test",

            n,

            mean,

            sd,

            t,

            df:
                n - 1,

            pValue:
                p,

            significant:
                p < 0.05
        };
    }

    /* =====================================
       Independent T-Test (Welch)
    ===================================== */

    static independentT(groupA, groupB) {

        groupA =
            Stats.clean(groupA);

        groupB =
            Stats.clean(groupB);

        const n1 =
            groupA.length;

        const n2 =
            groupB.length;

        const m1 =
            Stats.mean(groupA);

        const m2 =
            Stats.mean(groupB);

        const v1 =
            Stats.variance(groupA);

        const v2 =
            Stats.variance(groupB);

        const se =
            Math.sqrt(
                (v1 / n1)
                +
                (v2 / n2)
            );

        const t =
            (m1 - m2) / se;

        const df =
            Math.pow(
                (v1/n1 + v2/n2),
                2
            )
            /
            (
                (
                    Math.pow(v1/n1,2)
                    /
                    (n1-1)
                )
                +
                (
                    Math.pow(v2/n2,2)
                    /
                    (n2-1)
                )
            );

        const p =
            2 *
            (
                1 -
                jStat.studentt.cdf(
                    Math.abs(t),
                    df
                )
            );

        return {

            test:
                "Welch T-Test",

            meanA:
                m1,

            meanB:
                m2,

            t,

            df,

            pValue:
                p,

            significant:
                p < 0.05
        };
    }

    /* =====================================
       Paired T-Test
    ===================================== */

    static pairedT(before, after) {

        before =
            Stats.clean(before);

        after =
            Stats.clean(after);

        if(
            before.length
            !==
            after.length
        ){

            throw new Error(
                "Length mismatch"
            );
        }

        const diff = [];

        for(
            let i=0;
            i<before.length;
            i++
        ){

            diff.push(
                after[i]
                -
                before[i]
            );
        }

        return this.oneSampleT(
            diff,
            0
        );
    }

    /* =====================================
       Z-Test
    ===================================== */

    static zTest(
        data,
        mu,
        sigma
    ){

        data =
            Stats.clean(data);

        const n =
            data.length;

        const mean =
            Stats.mean(data);

        const z =
            (
                mean - mu
            )
            /
            (
                sigma
                /
                Math.sqrt(n)
            );

        const p =
            2 *
            (
                1 -
                jStat.normal.cdf(
                    Math.abs(z),
                    0,
                    1
                )
            );

        return {

            test:
                "Z-Test",

            z,

            pValue:
                p,

            significant:
                p < 0.05
        };
    }

    /* =====================================
       Chi Square Goodness Of Fit
    ===================================== */

    static chiSquareGOF(
        observed,
        expected
    ){

        observed =
            Stats.clean(observed);

        expected =
            Stats.clean(expected);

        if(
            observed.length
            !==
            expected.length
        ){

            throw new Error(
                "Length mismatch"
            );
        }

        let chi = 0;

        for(
            let i=0;
            i<observed.length;
            i++
        ){

            chi +=
                (
                    (
                        observed[i]
                        -
                        expected[i]
                    ) ** 2
                )
                /
                expected[i];
        }

        const df =
            observed.length - 1;

        const p =
            1 -
            jStat.chisquare.cdf(
                chi,
                df
            );

        return {

            test:
                "Chi Square GOF",

            chiSquare:
                chi,

            df,

            pValue:
                p,

            significant:
                p < 0.05
        };
    }

    /* =====================================
       One Way ANOVA
    ===================================== */

    static oneWayANOVA(
        groups
    ){

        const k =
            groups.length;

        const n =
            groups.reduce(
                (
                    acc,
                    g
                ) =>
                    acc
                    +
                    g.length,
                0
            );

        const grandMean =
            Stats.mean(
                groups.flat()
            );

        let ssBetween = 0;
        let ssWithin = 0;

        groups.forEach(group=>{

            const mean =
                Stats.mean(group);

            ssBetween +=
                group.length
                *
                (
                    mean
                    -
                    grandMean
                ) ** 2;

            group.forEach(x=>{

                ssWithin +=
                    (
                        x
                        -
                        mean
                    ) ** 2;
            });
        });

        const dfBetween =
            k - 1;

        const dfWithin =
            n - k;

        const msBetween =
            ssBetween
            /
            dfBetween;

        const msWithin =
            ssWithin
            /
            dfWithin;

        const F =
            msBetween
            /
            msWithin;

        const p =
            1 -
            jStat.centralF.cdf(
                F,
                dfBetween,
                dfWithin
            );

        return {

            test:
                "One Way ANOVA",

            F,

            pValue:
                p,

            dfBetween,

            dfWithin,

            significant:
                p < 0.05
        };
    }

    /* =====================================
       Effect Size
    ===================================== */

    static cohensD(
        groupA,
        groupB
    ){

        const m1 =
            Stats.mean(groupA);

        const m2 =
            Stats.mean(groupB);

        const sd1 =
            Stats.stdDev(groupA);

        const sd2 =
            Stats.stdDev(groupB);

        const pooled =
            Math.sqrt(
                (
                    sd1**2
                    +
                    sd2**2
                )
                / 2
            );

        return (
            m1 - m2
        ) / pooled;
    }

}