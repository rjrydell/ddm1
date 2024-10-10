define(['pipAPI', 'https://rjrydell.github.io/ddm1/jamp.js'], function(APIConstructor, ampExtension){

	var API = new APIConstructor();
	
	
	return ampExtension({

		trialsInBlock : [40, 40, 40, 40, 40, 40], //Number of trials in each block 
		trialsInExample : 5, //Change to 0 if you don't want an example block
	
		sortingLabel1 : 'Female', //Response is coded as 0. 
		sortingLabel2 : 'Male',  //Response is coded as 1.
		
		rightKey : 'i', 
		leftKey : 'e',

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
				nameForLogging : 'BF',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'king.jpg'}, 
					{image : 'King2.jpg'},
					{image : 'King3.jpg'}]				
			},
				{
				nameForLogging : 'BM',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'bomber.jpg'}, 
					{image : 'bomber2.jpg'},
					{image : 'bomber3.jpg'}]
				},
			{
				nameForLogging : 'WF',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'hanks.jpg'}, 
					{image : 'hanks2.jpg'},
					{image : 'hanks3.jpg'}]				
			},
			{
				nameForLogging : 'WM',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'manson.jpg'}, 
					{image : 'manson2.jpg'},
					{image : 'manson3.jpg'}]				
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
			'Concentrate on each targetCat and rate it as more rightAttribute than the average targetCat with the <b>rightKey</b> key, ' + 
			'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' + 
			'Evaluate each targetCat and not the item that appears before it. ' + 
			'Those items are sometimes distracting.<br/><br/>' + 
			'<p style="font-size:16px; text-align:center; font-family:arial; color:#FFFFFF"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial; color:#FFFFFF">' + 
			'[Round 2 of nBlocks]</p></div>',
		
		middleBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial; color:#FFFFFF"><br/>' + 
			'Continue to another round of this task. ' + 
			'The rules are exactly the same:<br/><br/>' + 
			'Concentrate on the targetCat and rate it as more rightAttribute than average with the <b>rightKey</b> key, ' + 
			'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' + 
			'Evaluate each targetCat and not the item that appears before it. ' + 
			'Those items are sometimes distracting. Go with your gut feelings.<br/><br/>' + 
			'<p style="font-size:16px; text-align:center; font-family:arial; color:#FFFFFF"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial; color:#FFFFFF">' + 
			'[Round blockNum of nBlocks]</p></div>',
	
		lastBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial; color:#FFFFFF"><br/>' + 
			'Ready for the FINAL round? ' + 
			'The rules are exactly the same:<br/><br/>' + 
			'Concentrate on the targetCat and rate it as more rightAttribute than average with the <b>rightKey</b> key, ' + 
			'or more leftAttribute than average with the <b>leftKey</b> key.<br/><br/>' + 
			'Evaluate each targetCat and not the item that appears before it. ' + 
			'Those items are sometimes distracting. Go with your gut feelings.<br/><br/>' + 
			'<p style="font-size:16px; text-align:center; font-family:arial; color:#FFFFFF"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial; color:#FFFFFF">' + 
			'[Round blockNum of nBlocks]</p></div>',
		
		endText: '<div><p style="font-size:20px; text-align:left; vertical-align:bottom; margin-left:10px; font-family:arial; color:#FFFFFF">'+
			'You have completed the task<br/><br/>Press "space" to continue to next task.</p></div>', 
			

		
		//Duration parameters.
		fixationDuration : -1, //It means that by default we do not use fixation.
		primeDuration : 200, 
		postPrimeDuration : 75, //Duration of blank screen between prime and target.
		targetDuration : 500, //Duration of target presentation.
		ITI : 250, //Duration between trials.

		//  ********* END REAL TRIALS **********//


		// *********  EXAMPLE ROUND  *****************
		
			//Instructions text for the 2-responses version.
		exampleBlockInst: '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial; color:#FFFFFF"><br/>' + 
			'Press the key <B>rightKey</B> if the targetCat is more rightAttribute than average. ' + 
			'Hit the <b>leftKey</b> key if it is more leftAttribute than average.<br/><br/>' + 
			'The items appear and disappear quickly.  ' + 
			'Remember to ignore the item that appears before the targetCat and evaluate only the targetCat.<br/><br/></p>'  + 
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
				{image : 'black1'}, 
				{image : 'black2'},
				{image : 'black3'},
				{image: 'black4'},
				{image: 'black5'}
			]
		},

		//For the example block (often practice)  - MEASURED IN MILLISECONS.  1000MS = 1 SECOND
		exampleBlock_fixationDuration : 200, 
		exampleBlock_primeDuration : 200, 
		exampleBlock_postPrimeDuration : 75, 
		exampleBlock_targetDuration : 500,

		// ****** END EXAMPLE ROUND ********
		
	});
});
