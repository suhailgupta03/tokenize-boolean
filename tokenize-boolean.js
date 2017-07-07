const Tokenizer = require("node-icu-tokenizer");

module.exports = class TokenizeBoolean {

    static get ALLOWED_BOOLEANS() {
        return ['OR', 'AND', 'NOT'];
    }

    /**
     * Tokenizes the string by using ICU boundary analysis
     * @see https://www.npmjs.com/package/node-icu-tokenizer
     * @see http://userguide.icu-project.org/boundaryanalysis
     * @return {Object}
     */
    tokenize(text) {
        if (text) {
            let tokens = new Tokenizer().tokenize(text);
            let tokenBoolStr = ""

            for (let t of tokens) {
                if (tokenBoolStr) {
                    if (tokenBoolStr == '#') // Apply the # rule
                        tokenBoolStr += `${t.token}`;
                    else if (tokenBoolStr == '@') // Apply the @ rule
                        tokenBoolStr += `${t.token}`;
                    else
                        tokenBoolStr += ` ${t.token}`;
                } else {
                    tokenBoolStr = `${t.token}`;
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
            if (stringToParse) {
                // Make an explicit wrap
                stringToParse = `(${stringToParse})`;
                // Add space between a token and bracket
                stringToParse = stringToParse
                    .split('(')
                    .join('( ')
                    .split(')')
                    .join(' )');
                // Init the left and right pointer
                let leftPointer = 0;
                let rightPointer = 0;
                let finalString = "";
                let connectingBoolean = "OR";
                let quoteEncounter = 0;
                for (let i = 0; i < stringToParse.length; i++) {
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
                    if (((quoteEncounter == 0) && (stringToParse[i].trim().length == 0)) || (quoteEncounter == 2)) {
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
                                .replace(/"/g, "")
                                .replace("(", "")
                                .replace(")", "")
                                .trim();
                            // Tokenize the string
                            let pieces = this.tokenize(stringToTokenize);
                            if (pieces && Array.isArray(pieces.tokens) && pieces.tokens.length > 0) {
                                if (pieces.tokens.length != 1 && stringToTokenize != pieces.tokenBoolStr) {
                                    /**
                                     * Further tokenization detected
                                     * Need to append to the boolean condition
                                     */
                                    let booleanStub = `("${stringToTokenize}" OR "${pieces.tokenBoolStr}")`;
                                    /**
                                     * Update the final string
                                     */
                                    finalString += ` ${booleanStub}`;
                                } else {
                                    /**
                                     * String to tokenize was already in the tokenized 
                                     * form
                                     */
                                    const triSTC = stringToTokenizeCopy
                                        .replace(/^'|"/, "")
                                        .replace(/'|"$/, "")
                                        .replace("(", "")
                                        .replace(")", "")
                                        .trim();

                                    finalString += `"${triSTC}"`;
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

               if(finalString == '()')
                    finalString = stringToParse;

                // Remove the extra wrap
                finalString = finalString
                    .replace(/^\(/, '')
                    .replace(/\)$/, '')
                    .split('( ')
                    .join('(')
                    .split(' )')
                    .join(')');

                return finalString;
            } else {
                throw new Error("Empty string passed");
            }
        } catch (e) {
            return e;
        }
    }
}

