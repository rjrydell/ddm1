define(['pipAPI', 'https://rjrydell.github.io/ddm1/jamp.js'], function(APIConstructor, ampExtension){

	var API = new APIConstructor();
	
	
	return ampExtension({

		trialsInBlock : [24], //Number of trials in each block 
		trialsInExample : 6, //Change to 0 if you don't want an example block
	
		sortingLabel1 : 'Trustworthy', //Response is coded as 0. 
		sortingLabel2 : 'Untrustworthy',  //Response is coded as 1.
		
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
				nameForLogging : 'BMA',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'BMA1.jpg'}, 
					{image : 'BMA2.jpg'},
					{image : 'BMA3.jpg'}, 
					{image : 'BMA4.jpg'},
					{image : 'BMA5.jpg'}, 
					{image : 'BMA6.jpg'}]				
			},
				{
				nameForLogging : 'BM',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'BM1.jpg'}, 
					{image : 'BM2.jpg'},
					{image : 'BM3.jpg'}, 
					{image : 'BM4.jpg'},
					{image : 'BM5.jpg'}, 
					{image : 'BM6.jpg'}]				
			},
			{
				nameForLogging : 'WMA',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'WMA1.jpg'}, 
					{image : 'WMA2.jpg'},
					{image : 'WMA3.jpg'}, 
					{image : 'WMA4.jpg'},
					{image : 'WMA5.jpg'}, 
					{image : 'WMA6.jpg'}]				
			},
			{
				nameForLogging : 'WM',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'WM1.jpg'}, 
					{image : 'WM2.jpg'},
					{image : 'WM3.jpg'}, 
					{image : 'WM4.jpg'},
					{image : 'WM5.jpg'}, 
					{image : 'WM6.jpg'}]				
			},
{
				nameForLogging : 'BMS',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'BMS1.jpg'}, 
					{image : 'BMS2.jpg'},
					{image : 'BMS3.jpg'}, 
					{image : 'BMS4.jpg'},
					{image : 'BMS5.jpg'}, 
					{image : 'BMS6.jpg'}]				
			},
{
				nameForLogging : 'WMS',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'WMS1.jpg'}, 
					{image : 'WMS2.jpg'},
					{image : 'WMS3.jpg'}, 
					{image : 'WMS4.jpg'},
					{image : 'WMS5.jpg'}, 
					{image : 'WMS6.jpg'}]				
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
		postPrimeDuration : 75, //Duration of blank screen between prime and target.
		targetDuration : 500, //Duration of target presentation.
		ITI : 750, //Duration between trials.

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
				{word : '+'},
				{word : '+'}
			]
		},

		exampleTargetStimulus : {
			nameForLogging : 'exampleTarget', //Will be used in the logging
			//An array of all media objects for this category.
			mediaArray : [
				{image : 'WM7.jpg'}, 
				{image : 'WMA7.jpg'},
				{image : 'BMA7.jpg'},
				{image : 'BM7.jpg'},
				{image : 'BMS7.jpg'}, 
				{image : 'WMS7.jpg'}]
		},

		//For the example block (often practice)  - MEASURED IN MILLISECONS.  1000MS = 1 SECOND
		exampleBlock_fixationDuration : -1, 
		exampleBlock_primeDuration : 200, 
		exampleBlock_postPrimeDuration : 75, 
		exampleBlock_targetDuration : 500,

		// ****** END EXAMPLE ROUND ********
		
	});
});
