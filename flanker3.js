/*
 * ================================================================
 * FLANKER3
 * Safety / Threat Face-Word Task
 * Standalone MinnoJS task for Qualtrics
 * ================================================================
 *
 * DOES NOT REQUIRE jamp.js
 *
 * DESIGN
 * ------------------------------------------------
 * 2 experimental blocks
 * 240 trials per block
 * 480 experimental trials total
 *
 * One block = CONTINUOUS
 * One block = SEQUENTIAL
 * Block order is randomized between participants.
 *
 * EACH BLOCK:
 *
 * BS = 60 Black face + Safety word
 * BT = 60 Black face + Threat word
 * WS = 60 White face + Safety word
 * WT = 60 White face + Threat word
 *
 * EACH TRIAL:
 *
 * One face-only BMP is selected.
 * The EXACT SAME face is displayed four times:
 *
 *                     FACE
 *
 *              FACE   WORD   FACE
 *
 *                     FACE
 *
 * CONTINUOUS:
 * Faces and word appear simultaneously.
 *
 * SEQUENTIAL:
 * Faces appear for 200 ms.
 * Faces disappear.
 * Word appears.
 *
 * RT begins at WORD ONSET in both conditions.
 *
 * E = Threat
 * I = Safety
 *
 * IMAGE FILES:
 * black1.bmp ... black50.bmp
 * white1.bmp ... white49.bmp
 *
 * ================================================================
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

            image:
                'https://rjrydell.github.io/ddm1/images'

        },

        canvas: {

            maxWidth: 850,

            proportions: 0.7,

            background: '#FFFFFF',

            borderWidth: 5,

            canvasBackground: '#000000',

            borderColor: 'lightblue'

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
     * FACE POOLS
     * ============================================================ */


    function makePool(
        prefix,
        count
    ) {

        var pool = [];

        var i;


        for (
            i = 1;
            i <= count;
            i++
        ) {

            pool.push(

                prefix +
                i +
                '.bmp'

            );

        }


        return pool;

    }


    var BLACK_FACES =
        makePool(
            'black',
            50
        );


    var WHITE_FACES =
        makePool(
            'white',
            49
        );


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


    API.addSettings(

        'logger',

        {


            onRow: function(
                name,
                log,
                loggerSettings,
                ctx
            ) {

                if (!ctx.logs) {

                    ctx.logs = [];

                }


                ctx.logs.push(
                    log
                );

            },


            onEnd: function(
                name,
                loggerSettings,
                ctx
            ) {

                return (
                    ctx.logs ||
                    []
                );

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

                                    value ===
                                        undefined ||

                                    value ===
                                        null

                                        ? ''

                                        : String(
                                            value
                                        );


                                if (
                                    /[,"\n]/.test(
                                        value
                                    )
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

        }

    );


    /* ============================================================
     * RANDOMIZATION
     * ============================================================ */


    function shuffle(arr) {


        var a =
            arr.slice();


        var i;

        var j;

        var temp;


        for (

            i =
                a.length - 1;

            i > 0;

            i--

        ) {


            j =

                Math.floor(

                    Math.random() *
                    (i + 1)

                );


            temp =
                a[i];


            a[i] =
                a[j];


            a[j] =
                temp;

        }


        return a;

    }


    /* ============================================================
     * BALANCED FACE PICKER
     *
     * Goes through all faces before reshuffling.
     * ============================================================ */


    function makePicker(
        pool
    ) {


        var bag =
            shuffle(
                pool
            );


        var position =
            0;


        return function() {


            if (
                position >=
                bag.length
            ) {


                bag =
                    shuffle(
                        pool
                    );


                position =
                    0;

            }


            return bag[
                position++
            ];

        };

    }


    /* ============================================================
     * WORD BALANCING
     *
     * 120 Safety + 120 Threat per block.
     *
     * Across both blocks:
     * every individual word appears exactly 15 times.
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

        var repetitions;


        /* ----------------------------
         * SAFETY WORDS
         * ---------------------------- */


        for (

            i = 0;

            i <
            SAFETY_WORDS.length;

            i++

        ) {


            repetitions =

                i < 8

                    ? firstReps

                    : secondReps;


            for (

                r = 0;

                r <
                repetitions;

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


        /* ----------------------------
         * THREAT WORDS
         * ---------------------------- */


        for (

            i = 0;

            i <
            THREAT_WORDS.length;

            i++

        ) {


            repetitions =

                i < 8

                    ? firstReps

                    : secondReps;


            for (

                r = 0;

                r <
                repetitions;

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
     * CONDITION BALANCING
     *
     * 60 BS
     * 60 BT
     * 60 WS
     * 60 WT
     *
     * = 240 trials
     * ============================================================ */


    function makeConditionSlots() {


        var slots = [];


        var i;


        for (

            i = 0;

            i < 60;

            i++

        ) {


            /* BLACK + SAFETY */

            slots.push({

                condition:
                    'BS',

                faceColor:
                    'black',

                wordCategory:
                    'safety'

            });


            /* BLACK + THREAT */

            slots.push({

                condition:
                    'BT',

                faceColor:
                    'black',

                wordCategory:
                    'threat'

            });


            /* WHITE + SAFETY */

            slots.push({

                condition:
                    'WS',

                faceColor:
                    'white',

                wordCategory:
                    'safety'

            });


            /* WHITE + THREAT */

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
     * KEY LEGEND
     *
     * This remains visible during every experimental trial.
     * ============================================================ */


    function makeKeyLayout() {


        return [


            /* LEFT */

            {

                location: {

                    left:
                        3,

                    top:
                        3

                },

                media: {

                    word:
                        'E = THREAT'

                },

                css: {

                    color:
                        '#FFFFFF',

                    'font-size':
                        '1.3em',

                    'font-family':
                        'Arial, sans-serif',

                    'font-weight':
                        'bold'

                },

                nolog:
                    true

            },


            /* RIGHT */

            {

                location: {

                    right:
                        3,

                    top:
                        3

                },

                media: {

                    word:
                        'I = SAFETY'

                },

                css: {

                    color:
                        '#FFFFFF',

                    'font-size':
                        '1.3em',

                    'font-family':
                        'Arial, sans-serif',

                    'font-weight':
                        'bold'

                },

                nolog:
                    true

            }

        ];

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


                /* SHOW INSTRUCTIONS */

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


                /* SPACE */

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

                '<p>You will see four copies of the same face ' +

                'and a word.</p>';


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

                'and the word will appear ' +

                '<b>at the same time</b>.</p>';


        }

        else {


            content =

                '<p><b>Round ' +

                blockNum +

                ' of 2</b></p>' +

                '<p>The four copies of the same face ' +

                'will appear for <b>200 ms</b>.</p>' +

                '<p>The faces will disappear, ' +

                'and then the word will appear.</p>';

        }


        return (

            '<div style="' +

            'color:#FFFFFF;' +

            'font-family:Arial,sans-serif;' +

            'font-size:20px;' +

            'text-align:left;' +

            'margin:25px;">' +


            content +


            '<p>' +

            'Your task is to classify the ' +

            '<b>WORD</b>, not the face.' +

            '</p>' +


            '<p>' +

            'Press <b>E</b> for ' +

            '<b>THREAT</b>.' +

            '</p>' +


            '<p>' +

            'Press <b>I</b> for ' +

            '<b>SAFETY</b>.' +

            '</p>' +


            '<p>' +

            'Respond as quickly and accurately ' +

            'as possible.' +

            '</p>' +


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
     * CONTINUOUS TRIAL
     *
     * Faces + word appear in the SAME interaction.
     * ============================================================ */


    function continuousInteractions() {


        return [


            /* ====================================================
             * BEGIN -> FIXATION
             * ==================================================== */


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


            /* ====================================================
             * SHOW ALL FOUR FACES + WORD TOGETHER
             * ==================================================== */


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


                    /* FOUR FACES */


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


                    /* WORD */


                    {

                        type:
                            'showStim',

                        handle:
                            'word'

                    },


                    /*
                     * RT STARTS NOW.
                     *
                     * The word and four faces have all
                     * been requested in the same event.
                     */


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


            /* ====================================================
             * E / THREAT RESPONSE
             * ==================================================== */


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


            /* ====================================================
             * I / SAFETY RESPONSE
             * ==================================================== */


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
     * SEQUENTIAL TRIAL
     * ============================================================ */


    function sequentialInteractions() {


        return [


            /* ====================================================
             * FIXATION
             * ==================================================== */


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


            /* ====================================================
             * SHOW FOUR FACES
             * ==================================================== */


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


                    /* EXACTLY 200 MS */


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


            /* ====================================================
             * REMOVE FACES -> SHOW WORD
             * ==================================================== */


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


                    /* HIDE ALL FOUR */


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


                    /* SHOW WORD */


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


                    /* E */


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


                    /* I */


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


            /* ====================================================
             * THREAT RESPONSE
             * ==================================================== */


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


            /* ====================================================
             * SAFETY RESPONSE
             * ==================================================== */


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
     * MAKE ONE TRIAL
     * ============================================================ */


    function makeTrial(
        spec
    ) {


        return {


            /* ----------------------------------------------------
             * DATA
             * ---------------------------------------------------- */


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


            /* ----------------------------------------------------
             * KEY LEGEND
             * ---------------------------------------------------- */


            layout:
                makeKeyLayout(),


            input:
                [],


            /* ----------------------------------------------------
             * STIMULI
             * ---------------------------------------------------- */


            stimuli: [


                /* =================================================
                 * FIXATION
                 *
                 * Minno centers stimuli without a location.
                 * ================================================= */


                {

                    data: {

                        handle:
                            'fixation'

                    },

                    media: {

                        word:
                            '+'

                    },

                    location: {

                        left:
                            'center',

                        top:
                            'center'

                    },

                    css: {

                        color:
                            '#FFFFFF',

                        'font-size':
                            '3em',

                        'font-family':
                            'Arial, sans-serif'

                    },

                    nolog:
                        true

                },


                /* =================================================
                 * CENTER WORD
                 * ================================================= */


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
                            'center',

                        top:
                            'center'

                    },

                    css: {

                        color:
                            '#FFFFFF',

                        'font-size':
                            '2.3em',

                        'font-family':
                            'Arial, sans-serif',

                        'font-weight':
                            'bold',

                        'text-align':
                            'center',

                        /*
                         * Keep word above images if their
                         * bounding boxes overlap.
                         */

                        'z-index':
                            100

                    },

                    nolog:
                        true

                },


                /* =================================================
                 * TOP FACE
                 *
                 * SAME spec.faceImage used in all four positions.
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

                    size: {

                        width:
                            15,

                        height:
                            15

                    },

                    location: {

                        /*
                         * 15%-wide image:
                         * left 42.5 puts its CENTER at 50%.
                         */

                        left:
                            42.5,

                        /*
                         * Center approximately 25%.
                         */

                        top:
                            17.5

                    },

                    css: {

                        'object-fit':
                            'contain'

                    },

                    nolog:
                        true

                },


                /* =================================================
                 * BOTTOM FACE
                 * ================================================= */


                {

                    data: {

                        handle:
                            'faceBottom'

                    },

                    media: {

                        image:
                            spec.faceImage

                    },

                    size: {

                        width:
                            15,

                        height:
                            15

                    },

                    location: {

                        left:
                            42.5,

                        /*
                         * Center approximately 75%.
                         */

                        top:
                            67.5

                    },

                    css: {

                        'object-fit':
                            'contain'

                    },

                    nolog:
                        true

                },


                /* =================================================
                 * LEFT FACE
                 * ================================================= */


                {

                    data: {

                        handle:
                            'faceLeft'

                    },

                    media: {

                        image:
                            spec.faceImage

                    },

                    size: {

                        width:
                            15,

                        height:
                            15

                    },

                    location: {

                        /*
                         * Center approximately 25%.
                         */

                        left:
                            17.5,

                        /*
                         * Vertically centered.
                         */

                        top:
                            42.5

                    },

                    css: {

                        'object-fit':
                            'contain'

                    },

                    nolog:
                        true

                },


                /* =================================================
                 * RIGHT FACE
                 * ================================================= */


                {

                    data: {

                        handle:
                            'faceRight'

                    },

                    media: {

                        image:
                            spec.faceImage

                    },

                    size: {

                        width:
                            15,

                        height:
                            15

                    },

                    location: {

                        /*
                         * Center approximately 75%.
                         */

                        left:
                            67.5,

                        top:
                            42.5

                    },

                    css: {

                        'object-fit':
                            'contain'

                    },

                    nolog:
                        true

                },


                /* =================================================
                 * DUMMY
                 * ================================================= */


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


            /* ----------------------------------------------------
             * INTERACTIONS
             * ---------------------------------------------------- */


            interactions:

                spec.trialType ===
                    'continuous'

                    ? continuousInteractions()

                    : sequentialInteractions()

        };

    }


    /* ============================================================
     * BUILD ONE BLOCK
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


        var conditionSlots =
            makeConditionSlots();


        /*
         * Separate face pickers.
         */


        var blackPicker =
            makePicker(
                BLACK_FACES
            );


        var whitePicker =
            makePicker(
                WHITE_FACES
            );


        /* --------------------------------------------------------
         * SAFETY WORDS
         * -------------------------------------------------------- */


        var safetyItems =

            shuffle(

                wordPool.filter(

                    function(item) {

                        return (

                            item.category ===
                            'safety'

                        );

                    }

                )

            );


        /* --------------------------------------------------------
         * THREAT WORDS
         * -------------------------------------------------------- */


        var threatItems =

            shuffle(

                wordPool.filter(

                    function(item) {

                        return (

                            item.category ===
                            'threat'

                        );

                    }

                )

            );


        /* --------------------------------------------------------
         * SAFETY CONDITION SLOTS
         *
         * 60 BS + 60 WS
         * -------------------------------------------------------- */


        var safetySlots =

            shuffle(

                conditionSlots.filter(

                    function(slot) {

                        return (

                            slot.wordCategory ===
                            'safety'

                        );

                    }

                )

            );


        /* --------------------------------------------------------
         * THREAT CONDITION SLOTS
         *
         * 60 BT + 60 WT
         * -------------------------------------------------------- */


        var threatSlots =

            shuffle(

                conditionSlots.filter(

                    function(slot) {

                        return (

                            slot.wordCategory ===
                            'threat'

                        );

                    }

                )

            );


        var trials =
            [];


        var i;


        /* ========================================================
         * SAFETY TRIALS
         * ======================================================== */


        for (

            i = 0;

            i <
            safetyItems.length;

            i++

        ) {


            var safetySlot =
                safetySlots[i];


            var safetyFace;


            if (
                safetySlot.faceColor ===
                'black'
            ) {


                safetyFace =
                    blackPicker();


            }

            else {


                safetyFace =
                    whitePicker();

            }


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
                    isExperimental

            });

        }


        /* ========================================================
         * THREAT TRIALS
         * ======================================================== */


        for (

            i = 0;

            i <
            threatItems.length;

            i++

        ) {


            var threatSlot =
                threatSlots[i];


            var threatFace;


            if (
                threatSlot.faceColor ===
                'black'
            ) {


                threatFace =
                    blackPicker();


            }

            else {


                threatFace =
                    whitePicker();

            }


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
                    isExperimental

            });

        }


        /* --------------------------------------------------------
         * RANDOMIZE ALL 240 TRIALS
         * -------------------------------------------------------- */


        return shuffle(
            trials
        );

    }


    /* ============================================================
     * BUILD TASK SEQUENCE
     * ============================================================ */


    var sequence =
        [];


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


    var practiceBlackPicker =
        makePicker(
            BLACK_FACES
        );


    var practiceWhitePicker =
        makePicker(
            WHITE_FACES
        );


    var p;


    for (

        p = 0;

        p < 5;

        p++

    ) {


        var practiceSafety =

            p % 2 === 0;


        var practiceWordPool =

            practiceSafety

                ? SAFETY_WORDS

                : THREAT_WORDS;


        var practiceWord =

            practiceWordPool[

                p %
                practiceWordPool.length

            ];


        var practiceColor =

            p % 2 === 0

                ? 'black'

                : 'white';


        var practiceCondition;


        if (
            practiceSafety
        ) {


            practiceCondition =

                practiceColor ===
                'black'

                    ? 'BS'

                    : 'WS';


        }

        else {


            practiceCondition =

                practiceColor ===
                'black'

                    ? 'BT'

                    : 'WT';

        }


        var practiceFace;


        if (
            practiceColor ===
            'black'
        ) {


            practiceFace =
                practiceBlackPicker();


        }

        else {


            practiceFace =
                practiceWhitePicker();

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

                    practiceSafety

                        ? 'safety'

                        : 'threat',


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


    var firstBlockType;


    if (
        Math.random() <
        0.5
    ) {


        firstBlockType =
            'continuous';


    }

    else {


        firstBlockType =
            'sequential';

    }


    var secondBlockType =

        firstBlockType ===
        'continuous'

            ? 'sequential'

            : 'continuous';


    /* ============================================================
     * CREATE BLOCKS
     * ============================================================ */


    var block1Trials =

        buildBlock(

            1,

            firstBlockType,

            true

        );


    var block2Trials =

        buildBlock(

            2,

            secondBlockType,

            true

        );


    /* ============================================================
     * BLOCK 1 INSTRUCTIONS
     * ============================================================ */


    sequence.push(

        instructionTrial(

            makeInstructionHTML(

                1,

                firstBlockType,

                false

            )

        )

    );


    /* ============================================================
     * BLOCK 1
     * ============================================================ */


    block1Trials.forEach(

        function(spec) {


            sequence.push(

                makeTrial(
                    spec
                )

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

                secondBlockType,

                false

            )

        )

    );


    /* ============================================================
     * BLOCK 2
     * ============================================================ */


    block2Trials.forEach(

        function(spec) {


            sequence.push(

                makeTrial(
                    spec
                )

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


            '<p>' +

            'You have completed the task.' +

            '</p>' +


            '<p>' +

            'Press <b>SPACE</b> to continue.' +

            '</p>' +


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
     * RETURN TASK TO MINNOJS
     * ============================================================ */


    return API.script;

  
});
