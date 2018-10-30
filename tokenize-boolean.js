const Tokenizer = require("node-icu-tokenizer");
const Moji = require('./emoticon-detector');

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

module.exports = class TokenizeBoolean {

    static get ALLOWED_BOOLEANS() {
        return ['OR', 'AND', 'NOT'];
    }

    static get SPECIAL_TOKENS() {
        return /[!$%^&*_\-\[\]:;{},.?\/+=~]/g;
    }

    /**
     * @see https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms
     */
    static get HALF_WIDTH_FULL_WIDTH() {
        return /[\u{ff01}\u{ff04}-\u{ff06}\u{ff0b}\u{ff0d}\u{ff0e}\u{ff1d}\u{ff1f}\u{ff1a}\u{ff1b}\u{ff3b}\u{ff3d}\u{ff3e}\u{ff5b}\u{ff5d}\u{ff5e}]/ug;
    }

    static get ALLOWED_BOOLEAN_CHARS() {
        return /^[-+~,]{1}/g;
    }

    static get HANDLE_BAR() {
        return /[\w]+[:]{1}[\w'\'\"]+/;
    }

    /**
     * Tokenizes the string by using ICU boundary analysis
     * @see https://www.npmjs.com/package/node-icu-tokenizer
     * @see http://userguide.icu-project.org/boundaryanalysis
     * @return {Object}
     */
    tokenize(text) {
        if (text) {
            let tokenBoolStr = "";
            let tokens = [];
            if (text.match(TokenizeBoolean.SPECIAL_TOKENS)
                || Moji.hasEmoji(text)
                || Moji.hasEmoticon(text)
                || text.match(/[$\']/)
                || text.match(TokenizeBoolean.HALF_WIDTH_FULL_WIDTH)) {
                tokenBoolStr = text;
                tokens = [text];
            } else {
                tokens = new Tokenizer().tokenize(text);
                /**
                 * Make sure that "hash" never hangs alone
                 * For example:
                 * #วงในพาแดก get tokenized as 
                 * ("#วงในพาแดก" OR "#วงใน พา แดก")
                 */
                if (tokens && tokens.length > 1 && tokens[0].token == '#') {
                    tokens = tokens.slice(1, tokens.length);
                    tokens[0].token = `#${tokens[0].token}`
                }
                for (let t of tokens) {
                    if (tokenBoolStr) {
                        tokenBoolStr += ` ${t.token}`;

                    } else {
                        tokenBoolStr = `${t.token}`;
                    }
                }
            }

            return {
                tokenBoolStr: tokenBoolStr,
                tokens: tokens
            };
        }

        else
            return null;
    }

    /**
     * Parses the string passed and return a boolean string
     * @param {String} stringToParse 
     */
    parse(stringToParse) {
        try {
            {
                // Sample string check: "Apples (Pineapples) Banana Mangoes (Papaya)"
                let doubleQuoteRbStr = stringToParse.match(/^\"/) && stringToParse.match(/\"$/) && stringToParse.match(/\([\w]+\)/g);
                if (doubleQuoteRbStr)
                    return stringToParse;
            }

            if (stringToParse) {
                // Happy empoticon
                stringToParse = stringToParse.replace(/(8|:|;|\*){1}[-c^;\*]?\)/g, ($o) => {
                    return $o.replace(/\)/g, "__CCB__");
                });

                // Sad emoticon
                stringToParse = stringToParse.replace(/[:>]{1}[-:']?\(/g, ($o) => {
                    return $o.replace(/\)/g, "__OCB__");
                });

                // Make an explicit wrap
                stringToParse = `(${stringToParse})`;
                // Add space between a token and bracket
                stringToParse = stringToParse
                    .split('(')
                    .join(' ( ')
                    .split(')')
                    .join(' )')
                    .split(',')
                    .join(' , ');

                // Init the left and right pointer
                let leftPointer = 0;
                let rightPointer = 0;
                let finalString = "";
                let connectingBoolean = "OR";
                let quoteEncounter = 0;
                let lastTokenized = "";
                for (let i = 0; i < stringToParse.length; i++) {
                    if (quoteEncounter == 1 && stringToParse[i].match(/^\(|\)/)) {
                        if (stringToParse[i] == ')') stringToParse = stringToParse.replaceAt(i, "｣");
                        else if (stringToParse[i] == '(') stringToParse = stringToParse.replaceAt(i, "｢");
                    }

                    if (stringToParse[i].match(/^\(|\)/)) {
                        rightPointer++;
                        leftPointer++;
                        finalString += `${stringToParse[i]}`;
                    } else if (stringToParse[i] == '"')
                        quoteEncounter++;

                    /**
                     * Move the pointers when:
                     *  - Space is encountered
                     *  - Last character in the string is encountered
                     */
                    if (((quoteEncounter == 0) && (stringToParse[i].trim().length == 0))
                        || (quoteEncounter == 2)) {
                        // Reset the quote encounter if required
                        quoteEncounter = 0;
                        // Encountered a whitespace character
                        rightPointer = i;
                        // Get the string to tokenize
                        let stringToTokenize = stringToParse.substring(leftPointer, rightPointer + 1);
                        // String to tokenize cannot be a valid boolean
                        // Proceed only if the string to tokenize is not a 
                        // defined boolean
                        if (!TokenizeBoolean.ALLOWED_BOOLEANS.includes(stringToTokenize.trim())) {

                            let stringToTokenizeCopy = stringToTokenize;
                            // Remove any double quotes before tokenization of the string
                            stringToTokenize = stringToTokenize
                                .trim()
                                .replace(/"/g, "")
                                .replace("(", "")
                                .replace(")", "");
                            // Tokenize the string
                            let pieces = this.tokenize(stringToTokenize);
                            if (pieces && Array.isArray(pieces.tokens) && pieces.tokens.length > 0) {
                                if (pieces.tokens.length != 1 && stringToTokenize != pieces.tokenBoolStr) {
                                    /**
                                     * Further tokenization detected
                                     * Need to append to the boolean condition
                                     */
                                    let booleanStub = `("${stringToTokenize}" OR "${pieces.tokenBoolStr}")`;
                                    lastTokenized = booleanStub;
                                    /**
                                     * Update the final string
                                     */
                                    finalString += ` ${booleanStub}`;
                                } else {
                                    /**
                                     * String to tokenize was already in the tokenized 
                                     * form
                                     */
                                    let triSTC = stringToTokenizeCopy.trim();
                                    if (!triSTC.match(TokenizeBoolean.HANDLE_BAR)) {
                                        if (!triSTC.match(TokenizeBoolean.ALLOWED_BOOLEAN_CHARS)) {
                                            triSTC = triSTC
                                                .replace(/^('|")/, "")
                                                .replace(/('|")$/, "")
                                                .replace("(", "")
                                                .replace(")", "");
                                        }
                                    }
                                    if (triSTC.match(TokenizeBoolean.ALLOWED_BOOLEAN_CHARS)) {
                                        if (triSTC.match(/^\~/)) {
                                            let tok = lastTokenized
                                                .replace('(', '')
                                                .replace(')', '')
                                                .split('OR');
                                            tok.map(t => {
                                                t = t.trim();
                                                if (finalString.indexOf(`"${t}"`) == -1)
                                                    finalString = finalString.replace(`${t}`, `${t}${triSTC}`);
                                                else
                                                    finalString = finalString.replace(new RegExp(`"${t}"$`), `"${t}"${triSTC}`);
                                            });
                                        } else {
                                            finalString += `${triSTC}`;
                                        }

                                    } else if (triSTC.match(TokenizeBoolean.HANDLE_BAR)) {
                                        finalString += `${triSTC}`;
                                    }
                                    else {
                                        finalString += ` "${triSTC}"`;
                                    }
                                    lastTokenized = triSTC;
                                }
                            }
                            /**
                             * Move the left pointer
                             */
                            leftPointer = rightPointer;
                        } else {
                            /**
                             * Skip the boolean operator and directly move the 
                             * left pointer
                             */
                            leftPointer = rightPointer;
                            // Update the connecting boolean
                            connectingBoolean = stringToTokenize.trim();
                            // Append the connecting boolean
                            finalString += ` ${connectingBoolean} `;
                        }
                    }
                }

                if (finalString == '()')
                    finalString = stringToParse;
                // Remove the extra wrap
                finalString = finalString
                    .replace(/^\(/, '')
                    .replace(/\)$/, '')
                    .split('( ')
                    .join('(')
                    .split(' )')
                    .join(')')
                    .replace(/__OCB__/g, '(')
                    .replace(/__CCB__/g, ')')
                    .replace(/｢/g, '(')
                    .replace(/｣/g, ')');

                return finalString;
            } else {
                throw new Error("Empty string passed");
            }
        } catch (e) {
            return e;
        }
    }
}

