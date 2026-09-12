/*
 * ================================================================
 * FLANKER3
 * Safety / Threat Face-Word Task
 * Standalone MinnoJS task for Qualtrics
 * ================================================================
 *
 * NO PRACTICE TRIALS
 *
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
 * RESPONSE KEYS:
 *
 * E = SAFETY
 * I = THREAT
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

        /* CHANGED RESPONSE MAPPING */

        leftKey: 'e',

        rightKey: 'i',

        leftLabel: 'SAFETY',

        rightLabel: 'THREAT',

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
     * Across both blocks every individual word appears
     * exactly 15 times.
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


        /* SAFETY */

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


        /* THREAT */

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
     * KEY LABELS SHOWN DURING EVERY TRIAL
     *
     * CHANGED:
     * E = SAFETY
     * I = THREAT
     * ============================================================ */

    function makeKeyLayout() {

        return [

            /* E = SAFETY */

            {

                location: {

                    left:
                        3,

                    top:
                        3

                },

                media: {

                    word:
                        'E = SAFETY'

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


            /* I = THREAT */

            {

                location: {

                    right:
                        3,

                    top:
                        3

                },

                media: {

                    word:
                        'I = THREAT'

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
     * BLOCK INSTRUCTION SCREEN
     *
     * CHANGED:
     * E = SAFETY
     * I = THREAT
     * ============================================================ */

    function makeBlockInstructionHTML(
        blockNum,
        blockType
    ) {

        var timingText;


        if (
            blockType ===
            'continuous'
        ) {

            timingText =

                'The four faces and the word will appear ' +
                '<b>at the same time</b>.';

        }

        else {

            timingText =

                'The four faces will appear briefly and then ' +
                'disappear. The word will then appear.';

        }


        return (

            '<div style="' +

            'width:90%;' +

            'margin:0 auto;' +

            'color:#FFFFFF;' +

            'font-family:Arial,sans-serif;' +

            'text-align:center;">' +


            /* RESPONSE OPTIONS */

            '<div style="' +

            'width:100%;' +

            'display:flex;' +

            'justify-content:space-between;' +

            'font-size:24px;' +

            'font-weight:bold;' +

            'margin-top:15px;' +

            'margin-bottom:70px;">' +

            '<span>E = SAFETY</span>' +

            '<span>I = THREAT</span>' +

            '</div>' +


            /* ROUND */

            '<p style="' +

            'font-size:24px;' +

            'font-weight:bold;">' +

            'Round ' +

            blockNum +

            ' of 2' +

            '</p>' +


            /* MAIN INSTRUCTION */

            '<p style="' +

            'font-size:22px;' +

            'line-height:1.5;' +

            'margin-top:35px;">' +

            'Indicate whether the words presented are either ' +

            'related to <b>Safety</b> or <b>Threat</b> by ' +

            'pressing the appropriate button listed above.' +

            '</p>' +


            /* TIMING */

            '<p style="' +

            'font-size:20px;' +

            'line-height:1.5;' +

            'margin-top:35px;">' +

            timingText +

            '</p>' +


            /* SPEED / ACCURACY */

            '<p style="' +

            'font-size:18px;' +

            'margin-top:45px;">' +

            'Respond as quickly and accurately as possible.' +

            '</p>' +


            /* SPACE */

            '<p style="' +

            'font-size:18px;' +

            'margin-top:45px;">' +

            'Press the <b>SPACE BAR</b> to begin.' +

            '</p>' +


            '</div>'

        );

    }


    /* ============================================================
     * CREATE BLOCK INSTRUCTION TRIAL
     * ============================================================ */

    function makeBlockInstructionTrial(
        blockNum,
        blockType
    ) {

        return {

            data: {

                block:
                    blockNum,

                blockType:
                    blockType,

                condition:
                    'instructions',

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

                            makeBlockInstructionHTML(
                                blockNum,
                                blockType
                            )

                    },

                    nolog:
                        true

                }

            ],


            interactions: [

                /* SHOW SCREEN */

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


                /* SPACE STARTS BLOCK */

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
                                'setInput',

                            input: {

                                handle:
                                    'endInstruction',

                                on:
                                    'timeout',

                                duration:
                                    250

                            }

                        }

                    ]

                },


                /* END INSTRUCTION */

                {

                    conditions: [

                        {

                            type:
                                'inputEquals',

                            value:
                                'endInstruction'

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

        };

    }


    /* ============================================================
     * CONTINUOUS TRIAL
     *
     * Faces and word appear at the same time.
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


            /* SHOW FACES + WORD */

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


                    /* RT STARTS AT WORD ONSET */

                    {

                        type:
                            'resetTimer'

                    },


                    /* E = SAFETY */

                    {

                        type:
                            'setInput',

                        input: {

                            handle:
                                'Safety',

                            on:
                                'keypressed',

                            key:
                                SETTINGS.leftKey

                        }

                    },


                    /* I = THREAT */

                    {

                        type:
                            'setInput',

                        input: {

                            handle:
                                'Threat',

                            on:
                                'keypressed',

                            key:
                                SETTINGS.rightKey

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


            /* END TRIAL */

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
     *
     * Faces -> 200 ms -> word
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


            /* SHOW FOUR FACES */

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


            /* REMOVE FACES AND SHOW WORD */

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


                    /* RT STARTS WHEN WORD APPEARS */

                    {

                        type:
                            'resetTimer'

                    },


                    /* E = SAFETY */

                    {

                        type:
                            'setInput',

                        input: {

                            handle:
                                'Safety',

                            on:
                                'keypressed',

                            key:
                                SETTINGS.leftKey

                        }

                    },


                    /* I = THREAT */

                    {

                        type:
                            'setInput',

                        input: {

                            handle:
                                'Threat',

                            on:
                                'keypressed',

                            key:
                                SETTINGS.rightKey

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


            /* END TRIAL */

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

    function makeTrial(
        spec
    ) {

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


            /* KEY LABELS AT TOP */

            layout:
                makeKeyLayout(),


            input:
                [],


            stimuli: [

                /* =================================================
                 * FIXATION
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

                        'z-index':
                            100

                    },

                    nolog:
                        true

                },


                /* =================================================
                 * TOP FACE
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

                        left:
                            42.5,

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

                        left:
                            17.5,

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
        blockType
    ) {

        var wordPool =
            makeWordPool(
                blockNum
            );


        var conditionSlots =
            makeConditionSlots();


        var blackPicker =
            makePicker(
                BLACK_FACES
            );


        var whitePicker =
            makePicker(
                WHITE_FACES
            );


        /* SAFETY WORDS */

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


        /* THREAT WORDS */

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


        /* BS + WS */

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


        /* BT + WT */

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
         * 120 SAFETY TRIALS
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
                    true

            });

        }


        /* ========================================================
         * 120 THREAT TRIALS
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
                    true

            });

        }


        /* RANDOMIZE ALL 240 */

        return shuffle(
            trials
        );

    }


    /* ============================================================
     * BUILD COMPLETE TASK
     *
     * NO PRACTICE TRIALS
     * ============================================================ */

    var sequence =
        [];


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
     * BUILD BLOCKS
     * ============================================================ */

    var block1Trials =

        buildBlock(

            1,

            firstBlockType

        );


    var block2Trials =

        buildBlock(

            2,

            secondBlockType

        );


    /* ============================================================
     * BLOCK 1 INSTRUCTIONS
     * ============================================================ */

    sequence.push(

        makeBlockInstructionTrial(

            1,

            firstBlockType

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

        makeBlockInstructionTrial(

            2,

            secondBlockType

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

    sequence.push({

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

                        'width:90%;' +

                        'margin:0 auto;' +

                        'color:#FFFFFF;' +

                        'font-family:Arial,sans-serif;' +

                        'font-size:22px;' +

                        'text-align:center;">' +

                        '<p style="' +

                        'margin-top:150px;">' +

                        'You have completed the task.' +

                        '</p>' +

                        '<p style="' +

                        'margin-top:40px;">' +

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

    });


    /* ============================================================
     * ADD COMPLETE SEQUENCE
     * ============================================================ */

    API.addSequence(
        sequence
    );


    /* ============================================================
     * RETURN TASK TO MINNOJS
     * ============================================================ */

    return API.script;


});
