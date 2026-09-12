/*
 * FLANKER2 - Safety / Threat face-word task
 *
 * STANDALONE MinnoJS task.
 * Does NOT require jamp.js.
 *
 * 480 experimental trials total:
 *   Block 1 = 240
 *   Block 2 = 240
 *
 * One block is CONTINUOUS.
 * One block is SEQUENTIAL.
 * Block order is randomized for each participant.
 *
 * Each 240-trial block:
 *   60 BS = Black face + Safety word
 *   60 BT = Black face + Threat word
 *   60 WS = White face + Safety word
 *   60 WT = White face + Threat word
 *
 * IMPORTANT:
 * Each trial selects ONE face image.
 * That SAME face image is shown in all four positions.
 *
 *                  FACE
 *
 *            FACE  WORD  FACE
 *
 *                  FACE
 *
 * CONTINUOUS:
 *   Four faces + word appear together.
 *
 * SEQUENTIAL:
 *   Four faces appear for 200 ms.
 *   They disappear.
 *   Word appears.
 *   RT begins at word onset.
 *
 * Response:
 *   E = Threat
 *   I = Safety
 *
 * Face files:
 *   black1.bmp ... black50.bmp
 *   white1.bmp ... white49.bmp
 */

define(['pipAPI', 'underscore'], function(APIConstructor, _) {

    'use strict';

    var API = new APIConstructor();


    /* ============================================================
     * SETTINGS
     * ============================================================ */

    var settings = {

        trialsPerBlock: 240,

        practiceTrials: 5,

        fixationDuration: 1000,

        sequentialImageDuration: 200,

        ITI: 750,

        leftKey: 'e',
        rightKey: 'i',

        leftLabel: 'Safety',
        rightLabel: 'Threat',

        base_url: {
            image: 'https://rjrydell.github.io/ddm1/images'
        },

        canvas: {
            maxWidth: 850,
            proportions: 0.7,
            background: '#FFFFFF',
            borderWidth: 5,
            canvasBackground: '#000000',
            borderColor: 'lightblue'
        },

        wordCSS: {
            color: '#FFFFFF',
            'font-size': '2.3em',
            'font-family': 'Arial, sans-serif',
            'font-weight': 'normal',
            'text-align': 'center'
        },

        faceCSS: {
            width: '145px',
            height: '145px',
            'object-fit': 'contain'
        }
    };


    /* ============================================================
     * WORDS
     * ============================================================ */

    var safetyWords = [
        'calm',
        'comfortable',
        'friendship',
        'happiness',
        'haven',
        'heal',
        'help',
        'hopeful',
        'kindness',
        'loving',
        'peace',
        'rebuild',
        'recover',
        'restful',
        'soft',
        'warmth'
    ];

    var threatWords = [
        'anger',
        'attack',
        'danger',
        'deadly',
        'frightening',
        'harm',
        'kill',
        'lethal',
        'murder',
        'riot',
        'risk',
        'shooting',
        'struggle',
        'trouble',
        'unstable',
        'violence'
    ];


    /* ============================================================
     * FACE FILES
     * ============================================================ */

    function makeFacePool(prefix, count) {

        var pool = [];
        var i;

        for (i = 1; i <= count; i++) {
            pool.push(prefix + i + '.bmp');
        }

        return pool;
    }

    var blackFaces = makeFacePool('black', 50);
    var whiteFaces = makeFacePool('white', 49);


    /* ============================================================
     * MINNO SETTINGS
     * ============================================================ */

    API.addSettings(
        'canvas',
        settings.canvas
    );

    API.addSettings(
        'base_url',
        settings.base_url
    );

    API.addSettings(
        'onEnd',
        window.minnoJS.onEnd
    );


    /* ============================================================
     * LOGGER
     * ============================================================ */

    API.addSettings('logger', {

        onRow: function(logName, log, loggerSettings, ctx) {

            if (!ctx.logs) {
                ctx.logs = [];
            }

            ctx.logs.push(log);
        },

        onEnd: function(name, loggerSettings, ctx) {

            return ctx.logs || [];
        },

        serialize: function(name, logs) {

            var headers = [
                'block',
                'block_type',
                'trial',
                'trial_type',
                'condition',
                'face_color',
                'face_image',
                'word_category',
                'word',
                'response',
                'correct',
                'rt'
            ];

            var rows = [headers];

            logs.forEach(function(log) {

                if (
                    !log ||
                    !log.data ||
                    !log.data.isExperimental
                ) {
                    return;
                }

                rows.push([
                    log.data.block,
                    log.data.blockType,
                    log.trial_id,
                    log.data.trialType,
                    log.data.condition,
                    log.data.faceColor,
                    log.data.faceImage,
                    log.data.wordCategory,
                    log.data.word,
                    log.data.response,
                    log.data.correct,
                    log.latency
                ]);
            });

            return rows.map(function(row) {

                return row.map(function(value) {

                    value =
                        (value === undefined ||
                         value === null)
                            ? ''
                            : String(value);

                    if (/[,\"\n]/.test(value)) {

                        return '"' +
                            value.replace(/"/g, '""') +
                            '"';
                    }

                    return value;

                }).join(',');

            }).join('\n');
        },

        send: function(name, serialized) {

            window.minnoJS.logger(serialized);
        }
    });


    /* ============================================================
     * RANDOMIZATION
     * ============================================================ */

    function shuffle(list) {

        var copy = list.slice();

        var i;
        var j;
        var temp;

        for (
            i = copy.length - 1;
            i > 0;
            i--
        ) {

            j = Math.floor(
                Math.random() * (i + 1)
            );

            temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
        }

        return copy;
    }


    /*
     * Returns a shuffled face from a balanced rotating bag.
     *
     * This avoids repeatedly selecting the same face by chance.
     */

    function makeFacePicker(pool) {

        var bag = [];
        var index = 0;

        function refill() {

            bag = shuffle(pool);
            index = 0;
        }

        refill();

        return function() {

            if (index >= bag.length) {
                refill();
            }

            return bag[index++];
        };
    }


    /* ============================================================
     * WORD BALANCING
     *
     * Block 1:
     *   first 8 words  = 8 times
     *   last 8 words   = 7 times
     *
     * Block 2:
     *   first 8 words  = 7 times
     *   last 8 words   = 8 times
     *
     * Therefore:
     *   every word appears exactly 15 times across both blocks.
     *
     * 16 Safety words x 15 = 240
     * 16 Threat words x 15 = 240
     * ============================================================ */

    function makeWordPool(blockNum) {

        var pool = [];

        var firstReps =
            blockNum === 1 ? 8 : 7;

        var secondReps =
            blockNum === 1 ? 7 : 8;

        function addWords(words, category) {

            var i;
            var r;
            var reps;

            for (
                i = 0;
                i < words.length;
                i++
            ) {

                reps =
                    i < 8
                        ? firstReps
                        : secondReps;

                for (
                    r = 0;
                    r < reps;
                    r++
                ) {

                    pool.push({
                        word: words[i],
                        category: category
                    });
                }
            }
        }

        addWords(
            safetyWords,
            'safety'
        );

        addWords(
            threatWords,
            'threat'
        );

        return shuffle(pool);
    }


    /* ============================================================
     * CONDITION BALANCING
     *
     * 60 BS
     * 60 BT
     * 60 WS
     * 60 WT
     *
     * = 240 per block
     * ============================================================ */

    function makeConditionSlots() {

        var slots = [];
        var i;

        for (
            i = 0;
            i < 60;
            i++
        ) {

            slots.push({
                condition: 'BS',
                faceColor: 'black',
                wordCategory: 'safety'
            });

            slots.push({
                condition: 'BT',
                faceColor: 'black',
                wordCategory: 'threat'
            });

            slots.push({
                condition: 'WS',
                faceColor: 'white',
                wordCategory: 'safety'
            });

            slots.push({
                condition: 'WT',
                faceColor: 'white',
                wordCategory: 'threat'
            });
        }

        return shuffle(slots);
    }


    /* ============================================================
     * INSTRUCTIONS
     * ============================================================ */

    function instructionHTML(
        blockNum,
        blockType,
        practice
    ) {

        var text;

        if (practice) {

            text =
                '<p><b>Practice</b></p>' +
                '<p>You will see four copies of the same face and a word.</p>' +
                '<p>Decide whether the <b>word</b> is related to <b>Safety</b> or <b>Threat</b>.</p>';

        }

        else if (
            blockType === 'continuous'
        ) {

            text =
                '<p><b>Round ' +
                blockNum +
                ' of 2</b></p>' +

                '<p>The four copies of the same face ' +
                'and the word will appear at the same time.</p>';

        }

        else {

            text =
                '<p><b>Round ' +
                blockNum +
                ' of 2</b></p>' +

                '<p>The four copies of the same face ' +
                'will appear for <b>200 ms</b>. ' +
                'They will then disappear and the word will appear.</p>';
        }

        return (

            '<div style="' +
            'color:#FFFFFF;' +
            'font-family:Arial,sans-serif;' +
            'font-size:20px;' +
            'text-align:left;' +
            'margin:25px;">' +

            text +

            '<p>Classify the <b>word</b>, not the face.</p>' +

            '<p>Press <b>E</b> for Threat and ' +
            '<b>I</b> for Safety.</p>' +

            '<p>Respond as quickly and accurately as possible.</p>' +

            '<p style="' +
            'text-align:center;' +
            'font-size:16px;' +
            'margin-top:40px;">' +

            'Press the <b>SPACE BAR</b> to begin.' +

            '</p>' +

            '</div>'
        );
    }


    function addInstructionSet(
        name,
        blockNum,
        blockType,
        practice
    ) {

        API.addTrialSets(

            name,

            {

                data: {

                    block:
                        blockNum || 0,

                    condition:
                        'instructions',

                    isExperimental:
                        false
                },

                input: [

                    {
                        handle: 'space',
                        on: 'space'
                    }

                ],

                stimuli: [

                    {
                        media: {
                            html:
                                instructionHTML(
                                    blockNum,
                                    blockType,
                                    practice
                                )
                        },

                        nolog: true
                    }

                ],

                interactions: [

                    {
                        conditions: [
                            {
                                type: 'begin'
                            }
                        ],

                        actions: [
                            {
                                type: 'showStim',
                                handle: 'All'
                            }
                        ]
                    },

                    {
                        conditions: [
                            {
                                type: 'inputEquals',
                                value: 'space'
                            }
                        ],

                        actions: [

                            {
                                type: 'hideStim',
                                handle: 'All'
                            },

                            {
                                type: 'setInput',

                                input: {

                                    handle:
                                        'endTrial',

                                    on:
                                        'timeout',

                                    duration:
                                        500
                                }
                            }
                        ]
                    },

                    {
                        conditions: [
                            {
                                type:
                                    'inputEquals',

                                value:
                                    'endTrial'
                            }
                        ],

                        actions: [
                            {
                                type:
                                    'endTrial'
                            }
                        ]
                    }
                ]
            }
        );
    }


    /* ============================================================
     * STIMULI
     * ============================================================ */

    API.addStimulusSets({

        fixation: [

            {
                data: {
                    handle: 'fixation'
                },

                media: {
                    word: '+'
                },

                css: {
                    color: '#FFFFFF',
                    'font-size': '3em'
                },

                nolog: true
            }
        ],

        word: [

            {
                data: {
                    handle: 'word'
                },

                media: {
                    word: ' '
                },

                location: {
                    left: 50,
                    top: 50
                },

                css:
                    settings.wordCSS,

                nolog: true
            }
        ],

        faceTop: [

            {
                data: {
                    handle: 'faceTop'
                },

                media: {
                    image: ' '
                },

                location: {
                    left: 50,
                    top: 25
                },

                css:
                    settings.faceCSS,

                nolog: true
            }
        ],

        faceBottom: [

            {
                data: {
                    handle: 'faceBottom'
                },

                media: {
                    image: ' '
                },

                location: {
                    left: 50,
                    top: 75
                },

                css:
                    settings.faceCSS,

                nolog: true
            }
        ],

        faceLeft: [

            {
                data: {
                    handle: 'faceLeft'
                },

                media: {
                    image: ' '
                },

                location: {
                    left: 25,
                    top: 50
                },

                css:
                    settings.faceCSS,

                nolog: true
            }
        ],

        faceRight: [

            {
                data: {
                    handle: 'faceRight'
                },

                media: {
                    image: ' '
                },

                location: {
                    left: 75,
                    top: 50
                },

                css:
                    settings.faceCSS,

                nolog: true
            }
        ],

        dummyForLog: [

            {
                data: {
                    handle: 'dummyForLog'
                },

                media: {
                    word: ' '
                },

                location: {
                    left: 99,
                    top: 99
                },

                nolog: true
            }
        ]
    });


    /* ============================================================
     * TRIAL FACTORY
     * ============================================================ */

    var trialCounter = 1;


    function makeTrial(spec) {

        var trialSetName =
            'trial_' +
            (trialCounter++);


        var interactions = [

            /* ----------------------------------------------------
             * BEGIN -> FIXATION
             * ---------------------------------------------------- */

            {

                conditions: [
                    {
                        type:
                            'begin'
                    }
                ],

                actions: [

                    {
                        type:
                            'showStim',

                        handle:
                            'fixation'
                    },

                    {
                        type:
                            'trigger',

                        handle:
                            'fixationOut',

                        duration:
                            '<%=trialData.fixationDuration%>'
                    }
                ]
            },


            /* ----------------------------------------------------
             * SHOW FOUR COPIES OF SAME FACE
             * ---------------------------------------------------- */

            {

                conditions: [
                    {
                        type:
                            'inputEquals',

                        value:
                            'fixationOut'
                    }
                ],

                actions: [

                    {
                        type:
                            'hideStim',

                        handle:
                            'fixation'
                    },

                    {
                        type:
                            'showStim',

                        handle:
                            'faceTop'
                    },

                    {
                        type:
                            'showStim',

                        handle:
                            'faceBottom'
                    },

                    {
                        type:
                            'showStim',

                        handle:
                            'faceLeft'
                    },

                    {
                        type:
                            'showStim',

                        handle:
                            'faceRight'
                    }
                ]
            }
        ];


        /* ========================================================
         * CONTINUOUS
         * ======================================================== */

        if (
            spec.trialType ===
            'continuous'
        ) {

            interactions.push({

                conditions: [

                    {
                        type:
                            'inputEquals',

                        value:
                            'fixationOut'
                    }
                ],

                actions: [

                    {
                        type:
                            'showStim',

                        handle:
                            'word'
                    },

                    /*
                     * RT timer starts when the word appears.
                     */
                    {
                        type:
                            'resetTimer'
                    },

                    {
                        type:
                            'setInput',

                        input: {

                            handle:
                                'Threat',

                            on:
                                'keypressed',

                            key:
                                settings.leftKey
                        }
                    },

                    {
                        type:
                            'setInput',

                        input: {

                            handle:
                                'Safety',

                            on:
                                'keypressed',

                            key:
                                settings.rightKey
                        }
                    }
                ]
            });
        }


        /* ========================================================
         * SEQUENTIAL
         * ======================================================== */

        else {

            interactions.push({

                conditions: [

                    {
                        type:
                            'inputEquals',

                        value:
                            'fixationOut'
                    }
                ],

                actions: [

                    {
                        type:
                            'trigger',

                        handle:
                            'imagesOut',

                        duration:
                            '<%=trialData.imageDuration%>'
                    }
                ]
            });


            interactions.push({

                conditions: [

                    {
                        type:
                            'inputEquals',

                        value:
                            'imagesOut'
                    }
                ],

                actions: [

                    {
                        type:
                            'hideStim',

                        handle:
                            'faceTop'
                    },

                    {
                        type:
                            'hideStim',

                        handle:
                            'faceBottom'
                    },

                    {
                        type:
                            'hideStim',

                        handle:
                            'faceLeft'
                    },

                    {
                        type:
                            'hideStim',

                        handle:
                            'faceRight'
                    },

                    {
                        type:
                            'showStim',

                        handle:
                            'word'
                    },

                    /*
                     * RT starts at word onset.
                     */
                    {
                        type:
                            'resetTimer'
                    },

                    {
                        type:
                            'setInput',

                        input: {

                            handle:
                                'Threat',

                            on:
                                'keypressed',

                            key:
                                settings.leftKey
                        }
                    },

                    {
                        type:
                            'setInput',

                        input: {

                            handle:
                                'Safety',

                            on:
                                'keypressed',

                            key:
                                settings.rightKey
                        }
                    }
                ]
            });
        }


        /* ========================================================
         * RESPONSE HANDLERS
         * ======================================================== */

        function addResponseHandler(
            response,
            isCorrect
        ) {

            interactions.push({

                conditions: [

                    {
                        type:
                            'inputEquals',

                        value:
                            response
                    }
                ],

                actions: [

                    {
                        type:
                            'setTrialAttr',

                        setter:
                            function(trialData) {

                                trialData.response =
                                    response;

                                trialData.correct =
                                    isCorrect
                                        ? 1
                                        : 0;
                            }
                    },

                    {
                        type:
                            'hideStim',

                        handle:
                            'All'
                    },

                    {
                        type:
                            'removeInput',

                        handle:
                            'All'
                    },

                    {
                        type:
                            'log'
                    },

                    {
                        type:
                            'setInput',

                        input: {

                            handle:
                                'endTrial',

                            on:
                                'timeout',

                            duration:
                                '<%=trialData.ITI%>'
                        }
                    }
                ]
            });
        }


        addResponseHandler(
            'Threat',
            spec.wordCategory ===
                'threat'
        );

        addResponseHandler(
            'Safety',
            spec.wordCategory ===
                'safety'
        );


        /* --------------------------------------------------------
         * END TRIAL
         * -------------------------------------------------------- */

        interactions.push({

            conditions: [

                {
                    type:
                        'inputEquals',

                    value:
                        'endTrial'
                }
            ],

            actions: [

                {
                    type:
                        'endTrial'
                }
            ]
        });


        /* ========================================================
         * DEFINE TRIAL SET
         * ======================================================== */

        API.addTrialSets(

            trialSetName,

            {

                deepTemplate: [
                    'interactions'
                ],

                data: {

                    fixationDuration:
                        settings.fixationDuration,

                    imageDuration:
                        settings.sequentialImageDuration,

                    ITI:
                        settings.ITI,

                    block:
                        spec.block,

                    blockType:
                        spec.blockType,

                    trialType:
                        spec.trialType,

                    condition:
                        spec.condition,

                    faceColor:
                        spec.faceColor,

                    faceImage:
                        spec.faceImage,

                    wordCategory:
                        spec.wordCategory,

                    word:
                        spec.word,

                    response:
                        '',

                    correct:
                        '',

                    isExperimental:
                        !!spec.isExperimental
                },


                stimuli: [

                    {
                        inherit:
                            'fixation'
                    },

                    {
                        inherit:
                            'word',

                        media: {
                            word:
                                spec.word
                        }
                    },


                    /*
                     * THE SAME IMAGE IS USED FOUR TIMES
                     */

                    {
                        inherit:
                            'faceTop',

                        media: {
                            image:
                                spec.faceImage
                        }
                    },

                    {
                        inherit:
                            'faceBottom',

                        media: {
                            image:
                                spec.faceImage
                        }
                    },

                    {
                        inherit:
                            'faceLeft',

                        media: {
                            image:
                                spec.faceImage
                        }
                    },

                    {
                        inherit:
                            'faceRight',

                        media: {
                            image:
                                spec.faceImage
                        }
                    },

                    {
                        inherit:
                            'dummyForLog'
                    }
                ],

                interactions:
                    interactions
            }
        });


        return {
            inherit:
                trialSetName
        };
    }


    /* ============================================================
     * PRACTICE
     * ============================================================ */

    addInstructionSet(
        'practiceInstructions',
        0,
        'continuous',
        true
    );


    var sequence = [

        {
            inherit:
                'practiceInstructions'
        }
    ];


    var practiceBlack =
        makeFacePicker(
            blackFaces
        );

    var practiceWhite =
        makeFacePicker(
            whiteFaces
        );


    var p;

    for (
        p = 0;
        p < settings.practiceTrials;
        p++
    ) {

        var practiceWordCategory =
            p % 2 === 0
                ? 'safety'
                : 'threat';

        var practiceWordList =
            practiceWordCategory === 'safety'
                ? safetyWords
                : threatWords;

        var practiceWord =
            practiceWordList[
                p % practiceWordList.length
            ];

        var practiceCondition;
        var practiceColor;
        var practiceFace;


        if (
            p % 2 === 0
        ) {

            practiceCondition =
                'BS';

            practiceColor =
                'black';

            practiceFace =
                practiceBlack();

        }

        else {

            practiceCondition =
                'WT';

            practiceColor =
                'white';

            practiceFace =
                practiceWhite();
        }


        sequence.push(

            makeTrial({

                block:
                    0,

                blockType:
                    'practice',

                trialType:
                    'continuous',

                condition:
                    practiceCondition,

                faceColor:
                    practiceColor,

                faceImage:
                    practiceFace,

                wordCategory:
                    practiceWordCategory,

                word:
                    practiceWord,

                isExperimental:
                    false
            })
        );
    }


    /* ============================================================
     * RANDOMIZE BLOCK ORDER
     * ============================================================ */

    var firstBlockType =
        Math.random() < 0.5
            ? 'continuous'
            : 'sequential';

    var secondBlockType =
        firstBlockType ===
            'continuous'
            ? 'sequential'
            : 'continuous';


    /* ============================================================
     * BUILD EXPERIMENTAL BLOCK
     * ============================================================ */

    function buildExperimentalBlock(
        blockNum,
        blockType
    ) {

        var blockSequence = [];

        var wordPool =
            makeWordPool(blockNum);

        var conditionSlots =
            makeConditionSlots();


        /*
         * Face pickers.
         *
         * Black has 50 files.
         * White has 49 files.
         */

        var blackPicker =
            makeFacePicker(
                blackFaces
            );

        var whitePicker =
            makeFacePicker(
                whiteFaces
            );


        /*
         * Match Safety words only to:
         *   BS or WS
         */

        var safetyItems =
            wordPool.filter(
                function(item) {

                    return (
                        item.category ===
                        'safety'
                    );
                }
            );


        var threatItems =
            wordPool.filter(
                function(item) {

                    return (
                        item.category ===
                        'threat'
                    );
                }
            );


        var safetySlots =
            conditionSlots.filter(
                function(slot) {

                    return (
                        slot.wordCategory ===
                        'safety'
                    );
                }
            );


        var threatSlots =
            conditionSlots.filter(
                function(slot) {

                    return (
                        slot.wordCategory ===
                        'threat'
                    );
                }
            );


        safetyItems =
            shuffle(
                safetyItems
            );

        threatItems =
            shuffle(
                threatItems
            );

        safetySlots =
            shuffle(
                safetySlots
            );

        threatSlots =
            shuffle(
                threatSlots
            );


        var trials = [];

        var i;


        /* --------------------------------------------------------
         * SAFETY TRIALS
         * -------------------------------------------------------- */

        for (
            i = 0;
            i < safetyItems.length;
            i++
        ) {

            var safetySlot =
                safetySlots[i];

            var safetyFace =
                safetySlot.faceColor ===
                    'black'

                    ? blackPicker()

                    : whitePicker();


            trials.push({

                block:
                    blockNum,

                blockType:
                    blockType,

                trialType:
                    blockType,

                condition:
                    safetySlot.condition,

                faceColor:
                    safetySlot.faceColor,

                faceImage:
                    safetyFace,

                wordCategory:
                    'safety',

                word:
                    safetyItems[i].word,

                isExperimental:
                    true
            });
        }


        /* --------------------------------------------------------
         * THREAT TRIALS
         * -------------------------------------------------------- */

        for (
            i = 0;
            i < threatItems.length;
            i++
        ) {

            var threatSlot =
                threatSlots[i];

            var threatFace =
                threatSlot.faceColor ===
                    'black'

                    ? blackPicker()

                    : whitePicker();


            trials.push({

                block:
                    blockNum,

                blockType:
                    blockType,

                trialType:
                    blockType,

                condition:
                    threatSlot.condition,

                faceColor:
                    threatSlot.faceColor,

                faceImage:
                    threatFace,

                wordCategory:
                    'threat',

                word:
                    threatItems[i].word,

                isExperimental:
                    true
            });
        }


        /*
         * Randomize the order of all 240 trials.
         */

        trials =
            shuffle(
                trials
            );


        /*
         * Block instructions
         */

        var instructionSet =
            'block' +
            blockNum +
            'Instructions';


        addInstructionSet(
            instructionSet,
            blockNum,
            blockType,
            false
        );


        blockSequence.push({

            inherit:
                instructionSet

        });


        /*
         * Experimental trials
         */

        trials.forEach(
            function(spec) {

                blockSequence.push(
                    makeTrial(spec)
                );
            }
        );


        return blockSequence;
    }


    /* ============================================================
     * BLOCK 1 / BLOCK 2
     * ============================================================ */

    var block1 =
        buildExperimentalBlock(
            1,
            firstBlockType
        );

    var block2 =
        buildExperimentalBlock(
            2,
            secondBlockType
        );


    block1.forEach(
        function(trial) {

            sequence.push(
                trial
            );
        }
    );


    block2.forEach(
        function(trial) {

            sequence.push(
                trial
            );
        }
    );


    /* ============================================================
     * END SCREEN
     * ============================================================ */

    API.addTrialSets(

        'endInstructions',

        {

            data: {

                block:
                    3,

                condition:
                    'end',

                isExperimental:
                    false
            },

            input: [

                {
                    handle:
                        'space',

                    on:
                        'space'
                }
            ],

            stimuli: [

                {

                    media: {

                        html:
                            '<div style="' +
                            'color:#FFFFFF;' +
                            'font-family:Arial,sans-serif;' +
                            'font-size:20px;' +
                            'text-align:center;' +
                            'margin:40px;">' +

                            '<p>' +
                            'You have completed the task.' +
                            '</p>' +

                            '<p>' +
                            'Press <b>SPACE</b> to continue.' +
                            '</p>' +

                            '</div>'
                    },

                    nolog:
                        true
                }
            ],

            interactions: [

                {

                    conditions: [

                        {
                            type:
                                'begin'
                        }
                    ],

                    actions: [

                        {
                            type:
                                'showStim',

                            handle:
                                'All'
                        }
                    ]
                },

                {

                    conditions: [

                        {
                            type:
                                'inputEquals',

                            value:
                                'space'
                        }
                    ],

                    actions: [

                        {
                            type:
                                'hideStim',

                            handle:
                                'All'
                        },

                        {
                            type:
                                'endTrial'
                        }
                    ]
                }
            ]
        }
    );


    sequence.push({

        inherit:
            'endInstructions'

    });


    /* ============================================================
     * RUN TASK
     * ============================================================ */

    API.addSequence(
        sequence
    );

});
