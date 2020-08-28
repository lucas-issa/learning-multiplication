import React from 'react';
import './Multiplication.scss';
import {WithTranslation, withTranslation} from 'react-i18next';

interface Stats {
    hits: number;
    hitsLate: number;
    hitsTooLate: number;
    misses: number;
    skips: number;
    reveals: number;
}

interface StatsProps {
    stats: Stats,
    type: string,
}

const Stats = (props: StatsProps) => {
    const {stats, type} = props;
    const {
        hits, hitsLate, hitsTooLate, misses, skips, reveals,
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
            </div>
        </div>
    );
};

function initStats(): Stats {
    return {
        hits: 0,
        hitsLate: 0,
        hitsTooLate: 0,
        misses: 0,
        skips: 0,
        reveals: 0,
    };
}

interface ToComeBackType {
    factor1: number;
    factor2: number;
    result: number;
    count: number;
}

class MultiplicationComp extends React.Component<WithTranslation> {

    state: {
        message: string,
        messageClassName: string,

        factor1: number,
        factor2: number,
        result: number,
        resultTry: string | number,

        stats: {
            temp: Stats,
            global: Stats,
        },

        seconds: number,
    } = {
        message: '',
        messageClassName: '',

        factor1: null,
        factor2: null,
        result: null,
        resultTry: '',

        stats: {
            temp: initStats(),
            global: initStats(),
        },

        seconds: 0,
    };

    timer;

    secondsLate = 10;
    secondsTooLate = 18;

    toComeBack: Map<string, ToComeBackType> = new Map();

    comeBackControl = {
        count: 0,
    };

    input: HTMLElement;

    componentDidMount() {
        this.load();

        this.randomFactors();

        this.timer = setInterval(() => {
            this.setState({ seconds: this.state.seconds + 1 });
        }, 1000);

        setTimeout(() => {
            this.input.focus();
        }, 250);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    generateToComeBack = (factor1: number, factor2: number) => {
        return `${factor1}x${factor2}`;
    }

    incrementToComeBack = () => {
        const {factor1, factor2, result} = this.state;
        const key = this.generateToComeBack(factor1, factor2);
        let item = this.toComeBack.get(key);
        if (!item) {
            item = {
                factor1,
                factor2,
                result,
                count: 0,
            };
            this.toComeBack.set(key, item);
        }
        item.count++;
    };

    decrementToComeBack = (factor1: number, factor2: number) => {
        const key = this.generateToComeBack(factor1, factor2);
        const item = this.toComeBack.get(key);
        if (item) {
            item.count--;
            if (item.count <= 0) {
                this.toComeBack.delete(key);
            }
        }
    };

    getTimeToShowMessage(message: string | number) {
        if (typeof message === 'number') {
           const time = 3000;
            console.log('number', time);
            return time;
        } else {
            const wordsCount = message.split(' ').length;
            const charactersCount = message.length;
            const time = 400 + (charactersCount * 50) + (wordsCount * 200);
            // console.log(wordsCount, charactersCount, time);
            return time;
        }
    }

    mesgTimeout;
    emitMessage(message: string, className = '') {
        if (this.mesgTimeout) {
            clearTimeout(this.mesgTimeout);
            this.mesgTimeout = null;
        }
        this.setState({ message, messageClassName: className });
        this.mesgTimeout = setTimeout(() => {
            this.setState({ message: '', messageClassName: '' });
        }, this.getTimeToShowMessage(message));
    }

    randomFactor = () => {
        return Math.round(Math.random() * 10);
    }

    decideComeBack = () => {
        if (this.toComeBack.size === 0) {
            return false;
        }

        let maxCount;
        if (this.toComeBack.size >= 12) {
            maxCount = 2;
        } else if (this.toComeBack.size >= 6) {
            maxCount = 4;
        } else {
            maxCount = 6;
        }
        return this.comeBackControl.count >= maxCount;
    }

    randomFactors = () => {
        this.comeBackControl.count++;

        let useComeBack = false;
        if (this.decideComeBack()) {
            console.log(`useComeBack, count: ${this.comeBackControl.count}, size: ${this.toComeBack.size}`);
            this.comeBackControl.count = 0;
            useComeBack = true;
        }

        let factor1;
        let factor2;
        let result;
        const resultTry = '';
        const seconds = 0;

        if (useComeBack) {
            // @ts-ignore
            const toComeBackList = [...this.toComeBack.values()];
            const i = Math.round(Math.random() * (toComeBackList.length - 1));
            // console.log('useComeBack', i, toComeBackList);
            console.log(`useComeBack, i: ${i}`);
            const comeBackItem = toComeBackList[i];
            factor1 = comeBackItem.factor1;
            factor2 = comeBackItem.factor2;
            result = comeBackItem.result;
            console.log('useComeBack', this.generateToComeBack(factor1, factor2));
        } else {
            factor1 = this.randomFactor();
            factor2 = this.randomFactor();
            result = factor1 * factor2;
        }

        this.setState({
            factor1,
            factor2,
            result,
            resultTry,
            seconds,
        });
        this.focus();
    }

    onChange = (e) => {
        const valueTxt = e.target.value;
        const value = valueTxt === '' ? '' : Number(valueTxt);
        this.setState({
            resultTry: value,
        });
    }

    go = () => {
        const {t} = this.props;
        const {result, resultTry, seconds} = this.state;
        if (result === resultTry) {
            if (seconds >= this.secondsTooLate) {
                this.emitMessage(t('Right but slow'), 'success-too-late');
                this.incrementToComeBack();
                this.incrementStat('hitsTooLate');
            } else if (seconds >= this.secondsLate) {
                this.emitMessage(t('Congratulations! You can be faster!'), 'success-late');
                this.incrementToComeBack();
                this.incrementStat('hitsLate');
            } else {
                this.emitMessage(t('Congratulations!!!'), 'success');
                const {factor1, factor2} = this.state;
                this.decrementToComeBack(factor1, factor2);
                this.incrementStat('hits');
            }
            this.randomFactors();
        } else {
            if (resultTry === '' || resultTry === Number.NaN) {
                this.emitMessage(`${t('Type a number')}...`, 'failure');
            } else if (resultTry > 100) {
                this.emitMessage('Type a number smaller than 100...', 'failure');
            } else if (resultTry < 0) {
                this.emitMessage('Type a positive number...', 'failure');
            } else if (Math.round(resultTry as number) !== resultTry) {
                this.emitMessage('Type a rounded number...', 'failure');
            } else {
                this.emitMessage(`${t('Try again')}...`, 'failure');
                this.incrementToComeBack();
                this.incrementStat('misses');
            }
            this.focus();
        }
    }

    incrementStat(type: string) {
        const temp = {...this.state.stats.temp};
        const global = {...this.state.stats.global};
        temp[type] = temp[type] + 1;
        global[type] = global[type] + 1;
        this.setState({
            stats: {
                temp: temp,
                global: global,
            },
        }, this.save);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.go();
    }

    reset = () => {
        this.randomFactors();
        this.setState({
            stats: {
                temp: initStats(),
                global: this.state.stats.global,
            },
        }, this.save)
    }

    reveal = () => {
        this.emitMessage(this.state.result.toString(10));
        this.incrementToComeBack();
        this.incrementStat('reveals');
        this.focus();
    }

    skip = () => {
        this.incrementToComeBack();
        this.randomFactors();
        this.incrementStat('skips');
    }

    load = () => {
        // localStorage.setItem('stats', null);
        // localStorage.setItem('toComeBack', null);
        const stats = JSON.parse(localStorage.getItem('stats'));
        if (stats && stats.global) {
            this.setState({stats});
        }
        const toComeBackObj = JSON.parse(localStorage.getItem('toComeBack'));
        if (toComeBackObj && toComeBackObj.toComeBack) {
            Object.keys(toComeBackObj.toComeBack).forEach(key => {
                this.toComeBack.set(key, toComeBackObj.toComeBack[key]);
            });
        }
        // console.log(this.toComeBack);
    };

    focus() {
        // É necessário fazer o blur antes para no celular sempre exibir o teclado.
        this.input.blur();
        this.input.focus();
    }

    save = () => {
        localStorage.setItem('stats', JSON.stringify(this.state.stats));

        const toComeBackToSave = {};
        // @ts-ignore
        for (let entry of this.toComeBack.entries()) {
            toComeBackToSave[entry[0]] = entry[1];
        }
        localStorage.setItem('toComeBack', JSON.stringify({toComeBack: toComeBackToSave}));
    }

    getTimerClass = (seconds: number) => {
        if (seconds >= this.secondsTooLate) {
            return 'timer-critical';
        } else if (seconds >= this.secondsLate) {
            return 'timer-warn';
        } else {
            return 'timer-ok';
        }
    }

    getPracticeList: () => {
        key: string,
        result: number,
        count: number,
    }[] = () => {
        // @ts-ignore
        return [...this.toComeBack.entries()]
            .map(entry => ({
                key: entry[0],
                ...entry[1],
            }))
            .sort((a, b) => {
                let comp = b.count - a.count;
                if (comp === 0) {
                    comp = a.key.localeCompare(b.key);
                }
                return comp;
            });
    }


    showPracticeResults = false;
    showPracticeResultsTimer;

    revealAll = () => {
        if (this.showPracticeResultsTimer) {
            clearTimeout(this.showPracticeResultsTimer);
            this.showPracticeResultsTimer = null;
        }
        this.showPracticeResults = true;
        setTimeout(() => {
            this.showPracticeResults = false;
        }, 2500 * this.toComeBack.size);
    }

    render() {
        const {t} = this.props;
        const {
            message, messageClassName,
            factor1, factor2, resultTry,
            stats,
            seconds,
        } = this.state;

        const practiceList = this.getPracticeList();
        const totalRamainingNoFastHit = practiceList
            .map(i => i.count)
            .reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0,
            );

        return (
            <div className="factors">
                <div className="message">
                    <span className={messageClassName}>
                    {message}
                    </span>
                </div>
                <div className="operation">
                    <form onSubmit={this.onSubmit}>
                        <div>
                            {factor1} x {factor2} = <input
                                type="number"
                                maxLength={2}
                                max={100}
                                min={0}
                                value={resultTry}
                                onChange={this.onChange}
                                ref={(input) => { this.input = input; }}
                            />
                            <button type="submit" className="hits">Go</button>
                        </div>
                        <div className={`timer ${this.getTimerClass(seconds)}`}>
                            {seconds}s
                        </div>
                    </form>
                </div>
                <div>
                    <button className="reset" onClick={this.reset}>{t('Reset')}</button>
                    <button className="skips" onClick={this.skip}>{t('Next')}</button>
                    <button className="reveals" onClick={this.reveal}>{t('Reveal')}</button>
                </div>
                <Stats stats={stats.temp} type={t('Until reset')} />
                <Stats stats={stats.global} type={t('Global')} />
                { practiceList.length > 0 &&
                <div className="practice">
                    <div className="practice-title">
                        {t('To study')} ({this.toComeBack.size} {t('items')})
                    </div>
                    <div className="practice-title no-fast-hit">
                        {t('Total negative points')}: {totalRamainingNoFastHit}
                    </div>
                    <div className="practice-list">
                        {practiceList.map(i => (
                            <div key={i.key}>
                                {i.key} {
                                    this.showPracticeResults &&
                                    <span>= <span className="reveals">{i.result}</span></span>
                                } <span className="no-fast-hit">({t('negative points')}: {i.count})</span>
                            </div>
                        ))}
                    </div>
                    <div className="operation">
                        <button className="reveals" onClick={this.revealAll}>{t('Reveal all')}</button>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export const Multiplication = withTranslation()(MultiplicationComp);