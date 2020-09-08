import React from 'react';

export interface StatsInfo {
    hits: number;
    hitsLate: number;
    hitsTooLate: number;
    misses: number;
    skips: number;
    reveals: number;
    speed: number; // operations / minute
}

export function initStatsInfo(): StatsInfo {
    return {
        hits: 0,
        hitsLate: 0,
        hitsTooLate: 0,
        misses: 0,
        skips: 0,
        reveals: 0,
        speed: 0,
    };
}

interface StatsProps {
    stats: StatsInfo,
        type: string,
}

const StatsComponent = (props: StatsProps) => {
    const {stats, type} = props;
    const {
        hits, hitsLate, hitsTooLate, misses, skips, reveals, speed
    } = stats;
    return (
        <div className="stats">
            <div className="stats-type">
                {type}
            </div>
            <div>
              <span className="hits stats-item">
                  {hits}
              </span>
                {hitsLate > 0 &&
                <span className="hits-late stats-item">
                        {hitsLate}
                    </span>
                }
                {hitsTooLate > 0 &&
                <span className="hits-too-late stats-item">
                        {hitsTooLate}
                    </span>
                }
                {skips > 0 &&
                <span className="skips stats-item">
                        {skips}
                    </span>
                }
                {reveals > 0 &&
                <span className="reveals stats-item">
                        {reveals}
                    </span>
                }
                {misses > 0 &&
                <span className="misses stats-item">
                        {misses}
                    </span>
                }
                {speed > 0 &&
                <span className="speed stats-item">
                    <small>{speed.toFixed(0)}<small>/min.</small></small>
                    </span>
                }
            </div>
        </div>
    );
};

export const Stats = StatsComponent;
