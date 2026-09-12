/*
 * FLANKER3 - Safety / Threat face-word task for Qualtrics MinnoJS
 *
 * Standalone task. Does NOT require jamp.js.
 *
 * 480 experimental trials:
 *   Block 1 = 240 trials
 *   Block 2 = 240 trials
 *
 * One block is CONTINUOUS and the other is SEQUENTIAL.
 * Block order is randomized for each participant.
 *
 * Per block:
 *   BS = 60 black-face + Safety-word trials
 *   BT = 60 black-face + Threat-word trials
 *   WS = 60 white-face + Safety-word trials
 *   WT = 60 white-face + Threat-word trials
 *
 * Each trial selects ONE face-only BMP and shows that SAME image
 * in all four locations.
 *
 * Continuous:
 *   four faces + word appear together; RT starts at word onset.
 *
 * Sequential:
 *   four faces appear for 200 ms, disappear, then the word appears;
 *   RT starts at word onset.
 *
 * E = Threat
 * I = Safety
 */

define(['pipAPI'], function(APIConstructor) {

    'use strict';

    var API = new APIConstructor();


    /* ============================================================
     * SETTINGS
     * ============================================================ */

    var SETTINGS = {

        fixationDuration: 1000,

        sequentialImageDuration: 200,

        ITI: 750,

        leftKey: 'e',

        rightKey: 'i',

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

    var SAFETY_WORDS = [

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


    var THREAT_WORDS = [

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
     * FACE IMAGE POOLS
     *
     * black1.bmp ... black50.bmp
     * white1.bmp ... white49.bmp
     * ============================================================ */

    function makePool(prefix, count) {

        var out = [];
        var i;

        for (i = 1; i <= count; i++) {

            out.push(
                prefix + i + '.bmp'
            );

        }

        return out;
    }


    var BLACK_FACES =
        makePool('black', 50);


    var WHITE_FACES =
        makePool('white', 49);


    /* ============================================================
     * MINNO SETTINGS
     * ============================================================ */

    API.addSettings(
        'canvas',
        SETTINGS.canvas
    );


    API.addSettings(
        'base_url',
        SETTINGS.base_url
    );


    /* ============================================================
     * LOGGER
     * ============================================================ */

    API.addSettings('logger', {

        onRow: function(
            name,
            log,
            settings,
            ctx
        ) {

            if (!ctx.logs) {

                ctx.logs = [];

            }

            ctx.logs.push(log);

        },


        onEnd: function(
            name,
            settings,
            ctx
        ) {

            return ctx.logs || [];

        },


        serialize: function(
            name,
            logs
        ) {

            var rows = [[

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

            ]];


            logs.forEach(
                function(log) {

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

                }
            );


            return rows.map(
                function(row) {

                    return row.map(
                        function(value) {

                            value =
                                value === undefined ||
                                value === null
                                    ? ''
                                    : String(value);


                            if (
                                /[,"\n]/.test(value)
                            ) {

                                return (
                                    '"' +
                                    value.replace(
                                        /"/g,
                                        '""'
                                    ) +
                                    '"'
                                );

                            }


                            return value;

                        }

                    ).join(',');

                }

            ).join('\n');

        },


        send: function(
            name,
            serialized
        ) {

            if (
                window.minnoJS &&
                typeof window.minnoJS.logger ===
                    'function'
            ) {

                window.minnoJS.logger(
                    serialized
                );

            }

        }

    });


    /* ============================================================
     * END TASK HOOK FOR QUALTRICS
     * ============================================================ */

    API.addSettings('hooks', {

        endTask: function() {

            if (
                window.minnoJS &&
                typeof window.minnoJS.onEnd ===
                    'function'
            ) {

                window.minnoJS.onEnd();

            }

        }

    });


    /* ============================================================
     * RANDOMIZATION
     * ============================================================ */

    function shuffle(arr) {

        var a = arr.slice();

        var i;
        var j;
        var t;


        for (
            i = a.length - 1;
            i > 0;
            i--
        ) {

            j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );


            t = a[i];

            a[i] = a[j];

            a[j] = t;

        }


        return a;

    }


    /* ============================================================
     * BALANCED FACE PICKER
     *
     * Uses every face once before reshuffling.
     * ============================================================ */

    function makePicker(pool) {

        var bag =
            shuffle(pool);

        var pos = 0;


        return function() {

            if (
                pos >= bag.length
            ) {

                bag =
                    shuffle(pool);

                pos = 0;

            }


            return bag[
                pos++
            ];

        };

    }


    /* ============================================================
     * WORD POOL
     *
     * 120 Safety + 120 Threat per block.
     *
     * Across BOTH blocks each individual word appears exactly
     * 15 times.
     * ============================================================ */

    function makeWordPool(
        blockNum
    ) {

        var firstReps =
            blockNum === 1
                ? 8
                : 7;


        var secondReps =
            blockNum === 1
                ? 7
                : 8;


        var pool = [];

        var i;
        var r;
        var reps;


        /* SAFETY */

        for (
            i = 0;
            i < SAFETY_WORDS.length;
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

                    word:
                        SAFETY_WORDS[i],

                    category:
                        'safety'

                });

            }

        }


        /* THREAT */

        for (
            i = 0;
            i < THREAT_WORDS.length;
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

                    word:
                        THREAT_WORDS[i],

                    category:
                        'threat'

                });

            }

        }


        return shuffle(
            pool
        );

    }


    /* ============================================================
     * FOUR CONDITIONS
     *
     * 60 BS
     * 60 BT
     * 60 WS
     * 60 WT
     *
     * = 240 trials per block
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

                condition:
                    'BS',

                faceColor:
                    'black',

                wordCategory:
                    'safety'

            });


            slots.push({

                condition:
                    'BT',

                faceColor:
                    'black',

                wordCategory:
                    'threat'

            });


            slots.push({

                condition:
                    'WS',

                faceColor:
                    'white',

                wordCategory:
                    'safety'

            });


            slots.push({

                condition:
                    'WT',

                faceColor:
                    'white',

                wordCategory:
                    'threat'

            });

        }


        return shuffle(
            slots
        );

    }


    /* ============================================================
     * INSTRUCTION TRIAL
     * ============================================================ */

    function instructionTrial(
        html
    ) {

        return {

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
                            html
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

        };

    }


    /* ============================================================
     * INSTRUCTION TEXT
     * ============================================================ */

    function makeInstructionHTML(
        blockNum,
        blockType,
        practice
    ) {

        var content;


        if (practice) {

            content =

                '<p><b>Practice</b></p>' +

                '<p>Four copies of the same face ' +
                'will appear with a word in the middle.</p>';

        }

        else if (
            blockType ===
            'continuous'
        ) {

            content =

                '<p><b>Round ' +
                blockNum +
                ' of 2</b></p>' +

                '<p>The four copies of the same face ' +
                'and the word will appear at the same time.</p>';

        }

        else {

            content =

                '<p><b>Round ' +
                blockNum +
                ' of 2</b></p>' +

                '<p>The four copies of the same face ' +
                'will appear for <b>200 ms</b>. ' +

                'They will disappear, and then ' +
                'the word will appear.</p>';

        }


        return (

            '<div style="' +

            'color:#FFFFFF;' +

            'font-family:Arial,sans-serif;' +

            'font-size:20px;' +

            'text-align:left;' +

            'margin:25px;">' +


            content +


            '<p>Classify the <b>word</b>, ' +
            'not the face.</p>' +


            '<p>Press <b>E</b> for Threat ' +
            'and <b>I</b> for Safety.</p>' +


            '<p>Respond as quickly and ' +
            'accurately as possible.</p>' +


            '<p style="' +

            'text-align:center;' +

            'font-size:16px;' +

            'margin-top:40px;">' +


            'Press the <b>SPACE BAR</b> ' +
            'to begin.' +


            '</p>' +

            '</div>'

        );

    }


    /* ============================================================
     * CONTINUOUS TRIAL INTERACTIONS
     * ============================================================ */

    function continuousInteractions() {

        return [

            /* FIXATION */

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


            /* SHOW FACES + WORD TOGETHER */

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
                    },

                    {
                        type:
                            'showStim',

                        handle:
                            'word'
                    },


                    /* RT START */

                    {
                        type:
                            'resetTimer'
                    },


                    /* E = THREAT */

                    {
                        type:
                            'setInput',

                        input: {

                            handle:
                                'Threat',

                            on:
                                'keypressed',

                            key:
                                SETTINGS.leftKey

                        }

                    },


                    /* I = SAFETY */

                    {
                        type:
                            'setInput',

                        input: {

                            handle:
                                'Safety',

                            on:
                                'keypressed',

                            key:
                                SETTINGS.rightKey

                        }

                    }

                ]

            },


            /* THREAT RESPONSE */

            {

                conditions: [

                    {
                        type:
                            'inputEquals',

                        value:
                            'Threat'
                    }

                ],

                actions: [

                    {
                        type:
                            'setTrialAttr',

                        setter:
                            function(td) {

                                td.response =
                                    'Threat';

                                td.correct =
                                    td.wordCategory ===
                                    'threat'
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

            },


            /* SAFETY RESPONSE */

            {

                conditions: [

                    {
                        type:
                            'inputEquals',

                        value:
                            'Safety'
                    }

                ],

                actions: [

                    {
                        type:
                            'setTrialAttr',

                        setter:
                            function(td) {

                                td.response =
                                    'Safety';

                                td.correct =
                                    td.wordCategory ===
                                    'safety'
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

            },


            /* END */

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

        ];

    }


    /* ============================================================
     * SEQUENTIAL TRIAL INTERACTIONS
     * ============================================================ */

    function sequentialInteractions() {

        return [

            /* FIXATION */

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


            /* SHOW FOUR IDENTICAL FACES */

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
                    },

                    {
                        type:
                            'trigger',

                        handle:
                            'imagesOut',

                        duration:
                            '<%=trialData.imageDuration%>'
                    }

                ]

            },


            /* AFTER 200 MS:
             * REMOVE FACES AND SHOW WORD
             */

            {

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


                    /* RT STARTS AT WORD ONSET */

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
                                SETTINGS.leftKey

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
                                SETTINGS.rightKey

                        }

                    }

                ]

            },


            /* THREAT RESPONSE */

            {

                conditions: [

                    {
                        type:
                            'inputEquals',

                        value:
                            'Threat'
                    }

                ],

                actions: [

                    {
                        type:
                            'setTrialAttr',

                        setter:
                            function(td) {

                                td.response =
                                    'Threat';

                                td.correct =
                                    td.wordCategory ===
                                    'threat'
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

            },


            /* SAFETY RESPONSE */

            {

                conditions: [

                    {
                        type:
                            'inputEquals',

                        value:
                            'Safety'
                    }

                ],

                actions: [

                    {
                        type:
                            'setTrialAttr',

                        setter:
                            function(td) {

                                td.response =
                                    'Safety';

                                td.correct =
                                    td.wordCategory ===
                                    'safety'
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

            },


            /* END */

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

        ];

    }


    /* ============================================================
     * CREATE ONE TRIAL
     * ============================================================ */

    function makeTrial(spec) {

        return {

            data: {

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

                fixationDuration:
                    SETTINGS.fixationDuration,

                imageDuration:
                    SETTINGS.sequentialImageDuration,

                ITI:
                    SETTINGS.ITI,

                response:
                    '',

                correct:
                    '',

                isExperimental:
                    spec.isExperimental

            },


            input: [],


            stimuli: [

                /* FIXATION */

                {

                    data: {
                        handle:
                            'fixation'
                    },

                    media: {
                        word:
                            '+'
                    },

                    css: {
                        color:
                            '#FFFFFF',

                        'font-size':
                            '3em'
                    },

                    nolog:
                        true

                },


                /* CENTER WORD */

                {

                    data: {
                        handle:
                            'word'
                    },

                    media: {
                        word:
                            spec.word
                    },

                    location: {
                        left:
                            50,

                        top:
                            50
                    },

                    css:
                        SETTINGS.wordCSS,

                    nolog:
                        true

                },


                /* =================================================
                 * SAME FACE - TOP
                 * ================================================= */

                {

                    data: {
                        handle:
                            'faceTop'
                    },

                    media: {
                        image:
                            spec.faceImage
                    },

                    location: {
                        left:
                            50,

                        top:
                            25
                    },

                    css:
                        SETTINGS.faceCSS,

                    nolog:
                        true

                },


                /* SAME FACE - BOTTOM */

                {

                    data: {
                        handle:
                            'faceBottom'
                    },

                    media: {
                        image:
                            spec.faceImage
                    },

                    location: {
                        left:
                            50,

                        top:
                            75
                    },

                    css:
                        SETTINGS.faceCSS,

                    nolog:
                        true

                },


                /* SAME FACE - LEFT */

                {

                    data: {
                        handle:
                            'faceLeft'
                    },

                    media: {
                        image:
                            spec.faceImage
                    },

                    location: {
                        left:
                            25,

                        top:
                            50
                    },

                    css:
                        SETTINGS.faceCSS,

                    nolog:
                        true

                },


                /* SAME FACE - RIGHT */

                {

                    data: {
                        handle:
                            'faceRight'
                    },

                    media: {
                        image:
                            spec.faceImage
                    },

                    location: {
                        left:
                            75,

                        top:
                            50
                    },

                    css:
                        SETTINGS.faceCSS,

                    nolog:
                        true

                },


                /* DUMMY */

                {

                    data: {
                        handle:
                            'dummyForLog'
                    },

                    media: {
                        word:
                            ' '
                    },

                    location: {
                        left:
                            99,

                        top:
                            99
                    },

                    nolog:
                        true

                }

            ],


            interactions:

                spec.trialType ===
                'continuous'

                    ? continuousInteractions()

                    : sequentialInteractions()

        };

    }


    /* ============================================================
     * BUILD ONE 240-TRIAL BLOCK
     * ============================================================ */

    function buildBlock(
        blockNum,
        blockType,
        isExperimental
    ) {

        var wordPool =
            makeWordPool(
                blockNum
            );


        var slots =
            makeConditionSlots();


        var blackPicker =
            makePicker(
                BLACK_FACES
            );


        var whitePicker =
            makePicker(
                WHITE_FACES
            );


        var safetyWords =
            shuffle(

                wordPool.filter(
                    function(x) {

                        return (
                            x.category ===
                            'safety'
                        );

                    }
                )

            );


        var threatWords =
            shuffle(

                wordPool.filter(
                    function(x) {

                        return (
                            x.category ===
                            'threat'
                        );

                    }
                )

            );


        var safetySlots =
            shuffle(

                slots.filter(
                    function(x) {

                        return (
                            x.wordCategory ===
                            'safety'
                        );

                    }
                )

            );


        var threatSlots =
            shuffle(

                slots.filter(
                    function(x) {

                        return (
                            x.wordCategory ===
                            'threat'
                        );

                    }
                )

            );


        var trials = [];

        var i;


        /* ========================================================
         * 120 SAFETY TRIALS
         * ======================================================== */

        for (
            i = 0;
            i < safetyWords.length;
            i++
        ) {

            var ss =
                safetySlots[i];


            trials.push({

                block:
                    blockNum,

                blockType:
                    blockType,

                trialType:
                    blockType,

                condition:
                    ss.condition,

                faceColor:
                    ss.faceColor,

                faceImage:

                    ss.faceColor ===
                    'black'

                        ? blackPicker()

                        : whitePicker(),

                wordCategory:
                    'safety',

                word:
                    safetyWords[i].word,

                isExperimental:
                    isExperimental

            });

        }


        /* ========================================================
         * 120 THREAT TRIALS
         * ======================================================== */

        for (
            i = 0;
            i < threatWords.length;
            i++
        ) {

            var ts =
                threatSlots[i];


            trials.push({

                block:
                    blockNum,

                blockType:
                    blockType,

                trialType:
                    blockType,

                condition:
                    ts.condition,

                faceColor:
                    ts.faceColor,

                faceImage:

                    ts.faceColor ===
                    'black'

                        ? blackPicker()

                        : whitePicker(),

                wordCategory:
                    'threat',

                word:
                    threatWords[i].word,

                isExperimental:
                    isExperimental

            });

        }


        /*
         * RANDOMIZE ALL 240 TRIALS
         */

        return shuffle(
            trials
        );

    }


    /* ============================================================
     * BUILD SEQUENCE
     * ============================================================ */

    var sequence = [];


    /* ============================================================
     * PRACTICE INSTRUCTIONS
     * ============================================================ */

    sequence.push(

        instructionTrial(

            makeInstructionHTML(
                0,
                'continuous',
                true
            )

        )

    );


    /* ============================================================
     * FIVE PRACTICE TRIALS
     * ============================================================ */

    var practiceBlack =
        makePicker(
            BLACK_FACES
        );


    var practiceWhite =
        makePicker(
            WHITE_FACES
        );


    var p;


    for (
        p = 0;
        p < 5;
        p++
    ) {

        var pSafety =
            p % 2 === 0;


        var pWordPool =
            pSafety
                ? SAFETY_WORDS
                : THREAT_WORDS;


        var pWord =
            pWordPool[
                p %
                pWordPool.length
            ];


        var pColor =
            p % 2 === 0
                ? 'black'
                : 'white';


        var pCondition;

        var pFace;


        if (pSafety) {

            pCondition =
                pColor === 'black'
                    ? 'BS'
                    : 'WS';

        }

        else {

            pCondition =
                pColor === 'black'
                    ? 'BT'
                    : 'WT';

        }


        pFace =
            pColor === 'black'

                ? practiceBlack()

                : practiceWhite();


        sequence.push(

            makeTrial({

                block:
                    0,

                blockType:
                    'practice',

                trialType:
                    'continuous',

                condition:
                    pCondition,

                faceColor:
                    pColor,

                faceImage:
                    pFace,

                wordCategory:
                    pSafety
                        ? 'safety'
                        : 'threat',

                word:
                    pWord,

                isExperimental:
                    false

            })

        );

    }


    /* ============================================================
     * RANDOMIZE BLOCK ORDER
     * ============================================================ */

    var firstType =

        Math.random() < 0.5

            ? 'continuous'

            : 'sequential';


    var secondType =

        firstType ===
        'continuous'

            ? 'sequential'

            : 'continuous';


    /* ============================================================
     * CREATE THE TWO 240-TRIAL BLOCKS
     * ============================================================ */

    var firstTrials =
        buildBlock(
            1,
            firstType,
            true
        );


    var secondTrials =
        buildBlock(
            2,
            secondType,
            true
        );


    /* ============================================================
     * BLOCK 1 INSTRUCTIONS
     * ============================================================ */

    sequence.push(

        instructionTrial(

            makeInstructionHTML(
                1,
                firstType,
                false
            )

        )

    );


    /* BLOCK 1 */

    firstTrials.forEach(

        function(spec) {

            sequence.push(
                makeTrial(spec)
            );

        }

    );


    /* ============================================================
     * BLOCK 2 INSTRUCTIONS
     * ============================================================ */

    sequence.push(

        instructionTrial(

            makeInstructionHTML(
                2,
                secondType,
                false
            )

        )

    );


    /* BLOCK 2 */

    secondTrials.forEach(

        function(spec) {

            sequence.push(
                makeTrial(spec)
            );

        }

    );


    /* ============================================================
     * END SCREEN
     * ============================================================ */

    sequence.push(

        instructionTrial(

            '<div style="' +

            'color:#FFFFFF;' +

            'font-family:Arial,sans-serif;' +

            'font-size:20px;' +

            'text-align:center;' +

            'margin:40px;">' +


            '<p>You have completed the task.</p>' +


            '<p>Press <b>SPACE</b> to continue.</p>' +


            '</div>'

        )

    );


    /* ============================================================
     * ADD SEQUENCE
     * ============================================================ */

    API.addSequence(
        sequence
    );


    /* ============================================================
     * IMPORTANT:
     * RETURN MINNO SCRIPT
     * ============================================================ */

    return API.script;

});
