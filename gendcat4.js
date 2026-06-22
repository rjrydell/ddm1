define(['pipAPI', 'https://rjrydell.github.io/ddm1/jamp.js'], function(APIConstructor, ampExtension){

	var API = new APIConstructor();
	
	
	return ampExtension({

		trialsInBlock : [50, 50, 50, 50, 50], //Number of trials in each block 
		trialsInExample : 5, //Change to 0 if you don't want an example block
	
		sortingLabel1 : 'Male', //Response is coded as 0. 
		sortingLabel2 : 'Female',  //Response is coded as 1.
		
		rightKey : 'i', 
		leftKey : 'e',
		
		base_url : {//Where are your images at?
				image : 'https://rjrydell.github.io/ddm1/images'
			}, 
		
		targetCat : 'SECOND word', //The name of the targets (used in the instructions)

		//The default font color of text in the task (e.g., for key labels).
		fontColor : '#FFFFFF', 

		//Set the canvas of the task
		canvas : {
			maxWidth: 850,
			proportions : 0.7,
			background: '#FFFFFF',
			borderWidth: 5,
			canvasBackground: '#000000',//this is black background 000000
			borderColor: 'lightblue'
		}, 
		
		
		//  ***** REAL TRIAL ************//
		//The CSS for all the prime stimuli.
		primeStimulusCSS : {color:'#FFFF00','font-size':'2.3em'},
		//The prime categories.
		primeCats :  [
			{
				nameForFeedback : 'fix1',  //Will be used in the user feedback 
				nameForLogging : 'fix1', //Will be used in the logging
				//An array of all media objects for this category.
				mediaArray : [
					{word : '+'}, 
					{word : '+'},
					{word : '+'},
					{word : '+'},
					{word : '+'}, 
					{word : '+'},
					{word : '+'},
					{word : '+'},
					{word : '+'},
					{word : '+'}]

			}, 
			{
				nameForFeedback : 'fix2',  //Will be used in the user feedback 
				nameForLogging : 'fix2', //Will be used in the logging
				//An array of all media objects for this category.
				mediaArray : [
				    	{word : '+'}, 
					{word : '+'},
					{word : '+'},
					{word : '+'},
					{word : '+'}, 
					{word : '+'},
					{word : '+'},
					{word : '+'},
					{word : '+'},
					{word : '+'}]
			}
		],

		targetCats :  [
				{
				nameForLogging : 'all',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 's_7639bf.png'},
{image : 's_5464bf.png'},
{image : 's_8826bf.png'},
{image : 's_7685bf.png'},
{image : 's_5286bf.png'},
{image : 's_6973bf.png'},
{image : 's_827bf.png'},
{image : 's_5891bf.png'},
{image : 's_3057bf.png'},
{image : 's_259bf.png'},
{image : 's_2920bf.png'},
{image : 's_1442bf.png'},
{image : 's_21242.png'},
{image : 's_6881bf.png'},
{image : 's_9983.png'},
{image : 's_15619.png'},
{image : 's_20205.png'},
{image : 's_17946.png'},
{image : 's_25001.png'},
{image : 's_4148.png'},
{image : 's_5138.png'},
{image : 's_22328.png'},
{image : 's_20776.png'},
{image : 's_5835.png'},
{image : 's_5625.png'},
{image : 's_9952.png'},
{image : 's_23727.png'},
{image : 's_6089.png'},
{image : 's_23108.png'},
{image : 's_1999.png'},
{image : 's_7866bf.png'},
{image : 's_8205bf.png'},
{image : 's_537bf.png'},
{image : 's_2047bf.png'},
{image : 's_6725bf.png'},
{image : 's_5258bf.png'},
{image : 's_538bf.png'},
{image : 's_5694bf.png'},
{image : 's_163bf.png'},
{image : 's_8979bf.png'},
{image : 's_7890bf.png'},
{image : 's_589bf.png'},
{image : 's_1439bf.png'},
{image : 's_20730.png'},
{image : 's_250.png'},
{image : 's_13555.png'},
{image : 's_333bf.png'},
{image : 's_21296.png'},
{image : 's_16038.png'},
{image : 's_4725.png'},
{image : 's_2539.png'},
{image : 's_24713.png'},
{image : 's_14827.png'},
{image : 's_6854.png'},
{image : 's_14534.png'},
{image : 's_19183.png'},
{image : 's_9465.png'},
{image : 's_17754.png'},
{image : 's_19097.png'},
{image : 's_5334.png'},
{image : 's_24072.png'},
{image : 's_19739.png'},
{image : 's_25246.png'},
{image : 's_23274.png'},
{image : 's_2349.png'},
{image : 's_6016.png'},
{image : 's_3279.png'},
{image : 's_1635bf.png'},
{image : 's_5176bf.png'},
{image : 's_5482bf.png'},
{image : 's_7918bf.png'},
{image : 's_1613bf.png'},
{image : 's_6480bf.png'},
{image : 's_7778bf.png'},
{image : 's_2419bf.png'},
{image : 's_8765bf.png'},
{image : 's_5957bf.png'},
{image : 's_3906bf.png'},
{image : 's_2645bf.png'},
{image : 's_1069bf.png'},
{image : 's_4209bf.png'},
{image : 's_18870.png'},
{image : 's_27135.png'},
{image : 's_27706.png'},
{image : 's_24305.png'},
{image : 's_23569.png'},
{image : 's_1425.png'},
{image : 's_14467.png'},
{image : 's_19449.png'},
{image : 's_12911.png'},
{image : 's_21322.png'},
{image : 's_22458.png'},
{image : 's_31.png'},
{image : 's_14965.png'},
{image : 's_1689.png'},
{image : 's_22175.png'},
{image : 's_14181.png'},
{image : 's_26739.png'},
{image : 's_15592.png'},
{image : 's_13356.png'},
{image : 's_19019.png'},
{image : 's_10466.png'},
{image : 's_23811.png'},
{image : 's_1645.png'},
{image : 's_23135.png'},
{image : 's_2907bf.png'},
{image : 's_925bf.png'},
{image : 's_6448bf.png'},
{image : 's_3815bf.png'},
{image : 's_7297bf.png'},
{image : 's_119bf.png'},
{image : 's_1238bf.png'},
{image : 's_6751bf.png'},
{image : 's_6583bf.png'},
{image : 's_1751bf.png'},
{image : 's_7274bf.png'},
{image : 's_167bf.png'},
{image : 's_4698bf.png'},
{image : 's_7610bf.png'},
{image : 's_6812bf.png'},
{image : 's_23929.png'},
{image : 's_17990.png'},
{image : 's_20821.png'},
{image : 's_23543.png'},
{image : 's_27360.png'},
{image : 's_25231.png'},
{image : 's_6600.png'},
{image : 's_21565.png'},
{image : 's_14808.png'},
{image : 's_1368.png'},
{image : 's_26346.png'},
{image : 's_9871.png'},
{image : 's_8690.png'},
{image : 's_19660.png'},
{image : 's_23721.png'},
{image : 's_20342.png'},
{image : 's_15789.png'},
{image : 's_20268.png'},
{image : 's_10492.png'},
{image : 's_6347.png'},
{image : 's_24994.png'},
{image : 's_15854.png'},
{image : 's_21066.png'},
{image : 's_25252.png'},
{image : 's_7767bf.png'},
{image : 's_2566bf.png'},
{image : 's_334bf.png'},
{image : 's_2115bf.png'},
{image : 's_3870bf.png'},
{image : 's_6554bf.png'},
{image : 's_830bf.png'},
{image : 's_4187bf.png'},
{image : 's_4637bf.png'},
{image : 's_1292bf.png'},
{image : 's_7041bf.png'},
{image : 's_8550bf.png'},
{image : 's_3338bf.png'},
{image : 's_23760.png'},
{image : 's_23968.png'},
{image : 's_6473.png'},
{image : 's_11265.png'},
{image : 's_25555.png'},
{image : 's_17635.png'},
{image : 's_2383.png'},
{image : 's_27866.png'},
{image : 's_12347.png'},
{image : 's_24718.png'},
{image : 's_16112.png'},
{image : 's_24177.png'},
{image : 's_597.png'},
{image : 's_13529.png'},
{image : 's_3505.png'},
{image : 's_24371.png'},
{image : 's_5234.png'},
{image : 's_9120.png'},
{image : 's_4404.png'},
{image : 's_2541.png'},
{image : 's_21908.png'},
{image : 's_17412.png'},
{image : 's_10475.png'},
{image : 's_7684.png'},
{image : 's_2306bf.png'},
{image : 's_1701bf.png'},
{image : 's_3696bf.png'},
{image : 's_4227bf.png'},
{image : 's_3324bf.png'},
{image : 's_3107bf.png'},
{image : 's_1907bf.png'},
{image : 's_7348bf.png'},
{image : 's_5746bf.png'},
{image : 's_1830bf.png'},
{image : 's_3699bf.png'},
{image : 's_1939bf.png'},
{image : 's_6393bf.png'},
{image : 's_935bf.png'},
{image : 's_7565bf.png'},
{image : 's_16129.png'},
{image : 's_6658bf.png'},
{image : 's_21182.png'},
{image : 's_1528.png'},
{image : 's_24729.png'},
{image : 's_717.png'},
{image : 's_2551.png'},
{image : 's_22748.png'},
{image : 's_1810.png'},
{image : 's_26148.png'},
{image : 's_28262.png'},
{image : 's_18033.png'},
{image : 's_19659.png'},
{image : 's_7755.png'},
{image : 's_25283.png'},
{image : 's_13629.png'},
{image : 's_15528.png'},
{image : 's_1132.png'},
{image : 's_26538.png'},
{image : 's_12468.png'},
{image : 's_6127.png'},
{image : 's_17181.png'},
{image : 's_27391.png'},
{image : 's_19355.png'},
{image : 's_11576.png'},
{image : 's_4314.png'},
{image : 's_942.png'},
{image : 's_3523.png'},
{image : 's_7181.png'},
{image : 's_14525.png'},
{image : 's_6022.png'},
{image : 's_16396.png'},
{image : 's_6680.png'},
{image : 's_15389.png'},
{image : 's_27100.png'},
{image : 's_21754.png'},
{image : 's_22454.png'},
{image : 's_2750.png'},
{image : 's_23688.png'},
{image : 's_14206.png'},
{image : 's_12131.png'},
{image : 's_4077.png'},
{image : 's_3343.png'},
{image : 's_21482.png'},
{image : 's_15594.png'},
{image : 's_23751.png'},
{image : 's_23857.png'},
{image : 's_21187.png'},
{image : 's_7483.png'},
{image : 's_6291.png'},
{image : 's_18284.png'},
{image : 's_15871.png'},
{image : 's_5571.png'},
{image : 's_13021.png'},
{image : 's_24631.png'},
{image : 's_8418.png'},
{image : 's_11839.png'},
{image : 's_5709.png'},
{image : 's_12771.png'},
{image : 's_9649.png'},
{image : 's_8998.png'},
{image : 's_20645.png'},
{image : 's_28657.png'},
{image : 's_4906.png'},
{image : 's_27233.png'},
{image : 's_13261.png'},
{image : 's_24926.png'},
{image : 's_7591.png'},
{image : 's_9768.png'},
{image : 's_18180.png'},
{image : 's_8563.png'},
{image : 's_5218.png'},
{image : 's_27975.png'},
{image : 's_27365.png'},
{image : 's_27734.png'},
{image : 's_11893.png'},
{image : 's_5441.png'},
{image : 's_24271.png'},
{image : 's_14466.png'},
{image : 's_28653.png'},
{image : 's_26055.png'},
{image : 's_167.png'},
{image : 's_14820.png'},
{image : 's_5171.png'},
{image : 's_27401.png'},
{image : 's_6771.png'},
{image : 's_8269.png'},
{image : 's_10710.png'},
{image : 's_2049.png'},
{image : 's_647.png'},
{image : 's_21422.png'},
{image : 's_28046.png'},
{image : 's_3280.png'},
{image : 's_7854.png'},
{image : 's_19428.png'},
{image : 's_20187.png'},
{image : 's_3883.png'},
{image : 's_14317.png'},
{image : 's_13419.png'},
{image : 's_26439.png'},
{image : 's_21619.png'},
{image : 's_7300.png'},
{image : 's_16683.png'},
{image : 's_19208.png'},
{image : 's_1447.png'},
{image : 's_9483.png'},
{image : 's_3644.png'},
{image : 's_15680.png'},
{image : 's_18065.png'},
{image : 's_1839.png'},
{image : 's_6807.png'},
{image : 's_22602.png'},
{image : 's_8382.png'},
{image : 's_18352.png'},
{image : 's_8468.png'},
{image : 's_10968.png'},
{image : 's_27912.png'},
{image : 's_27043.png'},
{image : 's_8076.png'},
{image : 's_8608.png'},
{image : 's_8470.png'},
{image : 's_2741.png'},
{image : 's_28557.png'},
{image : 's_17634.png'},
{image : 's_22035.png'},
{image : 's_20593.png'},
{image : 's_18956.png'},
{image : 's_25710.png'},
{image : 's_26180.png'},
{image : 's_23669.png'},
{image : 's_5302.png'},
{image : 's_13276.png'},
{image : 's_11133.png'},
{image : 's_3804.png'},
{image : 's_11371.png'},
{image : 's_21509.png'},
{image : 's_11871.png'},
{image : 's_13948.png'},
{image : 's_4974.png'},
{image : 's_19088.png'},
{image : 's_28462.png'},
{image : 's_14889.png'},
{image : 's_16548.png'},
{image : 's_8565.png'},
{image : 's_10491.png'},
{image : 's_22829.png'},
{image : 's_1945.png'},
{image : 's_16439.png'},
{image : 's_10122.png'},
{image : 's_1142.png'},
{image : 's_10321.png'},
{image : 's_1478.png'},
{image : 's_2731.png'},
{image : 's_22628.png'},
{image : 's_18529.png'},
{image : 's_19029.png'},
{image : 's_23922.png'},
{image : 's_14863.png'},
{image : 's_20316.png'},
{image : 's_27460.png'},
{image : 's_6981.png'},
{image : 's_7050.png'},
{image : 's_20609.png'},
{image : 's_6330.png'},
{image : 's_7971.png'},
{image : 's_3617.png'},
{image : 's_2151.png'},
{image : 's_2141.png'},
{image : 's_3082.png'},
{image : 's_19610.png'},
{image : 's_22688.png'},
{image : 's_27304.png'},
{image : 's_7642.png'},
{image : 's_14804.png'},
{image : 's_23969.png'},
{image : 's_3129.png'},
{image : 's_18088.png'},
{image : 's_6716.png'},
{image : 's_12234.png'},
{image : 's_27805.png'},
{image : 's_9584.png'},
{image : 's_23246.png'},
{image : 's_7248.png'},
{image : 's_3552.png'},
{image : 's_25089.png'},
{image : 's_11437.png'},
{image : 's_18871.png'},
{image : 's_24334.png'},
{image : 's_749.png'},
{image : 's_7872.png'},
{image : 's_9371.png'},
{image : 's_13157.png'},
{image : 's_127.png'},
{image : 's_20940.png'},
{image : 's_18146.png'},
{image : 's_23542.png'},
{image : 's_6051.png'},
{image : 's_9089.png'},
{image : 's_28225.png'},
{image : 's_17028.png'},
{image : 's_10005.png'},
{image : 's_12859.png'},
{image : 's_11157.png'},
{image : 's_25964.png'}]				
			},
			],

		targetStimulusCSS : {color:'#0000FF','font-size':'2.3em'},
		
		
		//The fixation stimulus 
		fixationStimulus : {
			css : {color:'#FFFFFF', 'font-size':'3em'}, 
			media : {word:'+'}
		}, 


		firstBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial; color:#FFFFFF"><br/>' + 
			"See how fast it is? Don't worry if you miss some. " + 
			'Go with your gut feelings.<br/><br/>' + 
			'Concentrate on each picture and indicate whether it is a leftAttribute with the <b>leftKey</b> key,  ' + 
			'or indicate whether it is a rightAttribute with the <b>rightKey</b> key.<br/><br/>' + 
			'Examine each picture and make a response quickly, while trying to minimize errors. ' + 
			'<p style="font-size:16px; text-align:center; font-family:arial; color:#FFFFFF"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial; color:#FFFFFF">' + 
			'[Round 2 of nBlocks]</p></div>',
		
		middleBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial; color:#FFFFFF"><br/>' + 
			'Continue to another round of this task. ' + 
			'The rules are exactly the same:<br/><br/>' + 
			'Concentrate on each picture and indicate whether it is a leftAttribute with the <b>leftKey</b> key,  ' + 
			'or indicate whether it is a rightAttribute with the <b>rightKey</b> key.<br/><br/>' + 
			'Examine each picture and make a response quickly, while trying to minimize errors. ' + 
			'<p style="font-size:16px; text-align:center; font-family:arial; color:#FFFFFF"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial; color:#FFFFFF">' + 
			'[Round blockNum of nBlocks]</p></div>',
	
		lastBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial; color:#FFFFFF"><br/>' + 
			'Ready for the FINAL round? ' + 
			'The rules are exactly the same:<br/><br/>' + 
			'Concentrate on each picture and indicate whether it is a leftAttribute with the <b>leftKey</b> key,  ' + 
			'or indicate whether it is a rightAttribute with the <b>rightKey</b> key.<br/><br/>' + 
			'Examine each picture and make a response quickly, while trying to minimize errors. ' + 
			'<p style="font-size:16px; text-align:center; font-family:arial; color:#FFFFFF"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial; color:#FFFFFF">' + 
			'[Round blockNum of nBlocks]</p></div>',
		
		endText: '<div><p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial; color:#FFFFFF">'+
			'You have completed the task<br/><br/>Press "space" to continue to next task.</p></div>', 
			

		
		//Duration parameters.
		fixationDuration : -1, //It means that by default we do not use fixation.
		primeDuration : 200, 
		postPrimeDuration : 50, //Duration of blank screen between prime and target.
		targetDuration : 1000, //Duration of target presentation.
		ITI : 700, //Duration between trials.

		//  ********* END REAL TRIALS **********//


		// *********  EXAMPLE ROUND  *****************
		
			//Instructions text for the 2-responses version.
		exampleBlockInst: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial; color:#FFFFFF"><br/>' + 
			'Press the <b>leftKey</b> key if it is a leftAttribute. Hit the <B>rightKey</B> key if the picture is a rightAttribute.<br/><br/>' + 
			'The items appear and disappear quickly.  ' + 
			'<p style="font-size:16px; text-align:center; font-family:arial; color:#FFFFFF"><br/><br/>' + 
			'When you are ready to try a few practice responses, hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial; color:#FFFFFF">' + 
			'[Round 1 of nBlocks]</p></div>',

		
		//The fixation stimulus in the example block
		exampleFixationStimulus : {
			css : {color:'#FFFFFF', 'font-size':'3em'}, 
			media : {word:'+'}
		}, 
		
		examplePrimeStimulus : {
			nameForLogging : 'examplePrime', //Will be used in the logging
			//An array of all media objects for this category.
			mediaArray : [
				{word : '+'}, 
				{word : '+'}, 
				{word : '+'},
				{word: '+'},
				{word: '+'}
			]
		},

		exampleTargetStimulus : {
			nameForLogging : 'exampleTarget', //Will be used in the logging
			//An array of all media objects for this category.
			mediaArray : [
				{image : 's_27401.png'},
				{image : 's_28225.png'},
				{image : 's_2306bf.png'},
				{image : 's_24729.png'},
				{image : 's_21908.png'}
			]
		},

		//For the example block (often practice)  - MEASURED IN MILLISECONS.  1000MS = 1 SECOND
		exampleBlock_fixationDuration : -1, 
		exampleBlock_primeDuration : 200, 
		exampleBlock_postPrimeDuration : 50, 
		exampleBlock_targetDuration : 1000,

		// ****** END EXAMPLE ROUND ********
		
	});
});
