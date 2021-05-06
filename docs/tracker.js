(function () {

    const cookieName = 'interClickRef';
    const cookieMaxAgeSeconds = 60 * 60 * 24 * 7;

    const clickRefQueryParamName = 'interClickRef';
    const interEndPointAddr = 'https://teste/orders';

    class InterService {
        _addr = interEndPointAddr;
        _headers;

        constructor(affiliateId, domain) {
            this._headers = {
                'Content-Type': 'application/json',
                'x-affiliate-id': affiliateId,
                'x-affiliate-domain': domain,
            };
        }

        sendOrder(clickRef, order) {
            this._sendOrder(clickRef, order, 10);
        }

        _sendOrder(clickRef, order, totalTries, tryNumber) {
            if (tryNumber === undefined) {
                tryNumber = totalTries;
            }
            fetch(this._addr, {
                method: 'POST',
                mode: 'cors',
                headers: this._headers,
                body: JSON.stringify({ clickRef, order }),
            }).catch(() => {
                if (tryNumber > 0) {
                    setTimeout(() => {
                        this._sendOrder(clickRef, order, totalTries, tryNumber - 1);
                    }, ((totalTries - tryNumber) + 1) * 200);
                }
            });
        }

        // sendError(clickRef, error) {
        //     fetch(this._addr, {
        //         method: 'POST',
        //         mode: 'cors',
        //         headers: this._headers,
        //         body: JSON.stringify({ clickRef, error }),
        //     });
        // }
    }

    class Cookie {
        _configForLocalhostDev;

        set(key, value, domain, maxAge) {
            let cookieString =
                key + '=' + value +
                ';path=/' +
                ';domain=' + domain +
                ';max-age=' + maxAge;

            if (!this._configForLocalhostDev) {
                cookieString +=
                    ';secure';
            }
            cookieString +=
                ';samesite=strict';

            document.cookie = cookieString;
        }

        configForLocalhostDev() {
            this._configForLocalhostDev = true;
        }
    }

    class Storage {
        _maxAgeSeconds = cookieMaxAgeSeconds;
        _maxAgeMilis = 1000 * cookieMaxAgeSeconds;
        _storageKey = 'interClickRefInfo';
        _cookie = new Cookie();
        _cookieDomain;

        constructor(cookieDomain) {
            this._cookieDomain = cookieDomain;
        }

        configForLocalhostDev() {
            this._cookie.configForLocalhostDev();
        }

        set(clickRef) {
            localStorage.setItem(this._storageKey, JSON.stringify({
                clickRef,
                timestamp: Date.now() + this._maxAgeMilis,
            }));
            this._cookie.set(cookieName, clickRef, this._cookieDomain, this._maxAgeSeconds);
        }

        get() {
            let localStorageValueStr = localStorage.getItem(this._storageKey);
            if (localStorageValueStr) {
                let localStorageValue = JSON.parse(localStorageValueStr);
                if (localStorageValue && localStorageValue.timestamp) {
                    if (localStorageValue.timestamp >= Date.now()) {
                        return localStorageValue.clickRef;
                    }
                }
            }
            return undefined;
        }
    }

    class QueryStringParser {
        _params = {};
        constructor(queryString) {
            if (queryString) {
                let paramsString = queryString.substr(1);
                let params = paramsString.split("&");
                for (let paramString of params) {
                    let keyValue = paramString.split("=");
                    if (keyValue.length > 1) {
                        const key = keyValue[0];
                        const value = keyValue[1];
                        this._params[key] = value;
                    }
                }
            }
        }
        getParam(key) {
            return this._params[key];
        }
    }

    class Tracker {

        _interService = new InterService();
        _refNumber;
        _storage;
        _configForLocalhostDev;

        init(affiliateId, cookieDomain) {
            if (!cookieDomain) {
                cookieDomain = document.location.hostname;
            }
            this._storage = new Storage(cookieDomain);
            this._storage.configForLocalhostDev();
            this._interService = new InterService(affiliateId, cookieDomain);

            let queryStringParser = new QueryStringParser(document.location.search);
            let clickRef = queryStringParser.getParam(clickRefQueryParamName);
            if (clickRef) {
                this._refNumber = clickRef;
                this._storage.set(clickRef);
            } else {
                clickRef = this._storage.get();
                if (clickRef) {
                    this._refNumber = clickRef;
                }
            }
        }

        configForLocalhostDev() {
            this._configForLocalhostDev = true;
        }

        getRef() {
            if (!this._refNumber) {
                this._refNumber = this._storage.get();
            }
            return this._refNumber;
        }

        registerOpenOrder(order) {
            const clickRef = this.getRef();
            if (clickRef) {
                this._interService.sendOrder(clickRef, order);
            }
        }

        // sendOrderTryError(error) {
        //     this._interService.sendError(error);
        // }

    }

    window.interShoppingTracker = new Tracker();

})();
