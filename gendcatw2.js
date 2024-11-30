define(['pipAPI', 'https://rjrydell.github.io/ddm1/jamp.js'], function(APIConstructor, ampExtension){

	var API = new APIConstructor();
	
	
	return ampExtension({

		trialsInBlock : [60, 60, 60, 60], //Number of trials in each block 
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
				nameForLogging : 'WF',  //Will be used in the logging
				//An array of all media objects for this category. The default is pic1-pic200.jpg
				mediaArray : [
					{image : 'WF1.jpg'}, 
					{image : 'WF2.jpg'},
					{image : 'WF3.jpg'}, 
					{image : 'WF4.jpg'},
					{image : 'WF5.jpg'}, 
					{image : 'WF6.jpg'},
					{image : 'WF7.jpg'}, 
					{image : 'WF8.jpg'},
					{image : 'WF9.jpg'}, 
					{image : 'WF10.jpg'},
					{image : 'WF11.jpg'}, 
					{image : 'WF12.jpg'},
					{image : 'WF13.jpg'}, 
					{image : 'WF14.jpg'},
					{image : 'WF15.jpg'}, 
					{image : 'WF16.jpg'},
					{image : 'WF17.jpg'}, 
					{image : 'WF18.jpg'},
					{image : 'WF19.jpg'}, 
					{image : 'WF20.jpg'},
					{image : 'WF21.jpg'}, 
					{image : 'WF22.jpg'},
					{image : 'WF23.jpg'}, 
					{image : 'WF24.jpg'},
					{image : 'WF25.jpg'}, 
					{image : 'WF26.jpg'},
					{image : 'WF27.jpg'}, 
					{image : 'WF28.jpg'},
					{image : 'WF29.jpg'}, 
					{image : 'WF30.jpg'},
					{image : 'WF31.jpg'}, 
					{image : 'WF32.jpg'},
					{image : 'WF33.jpg'}, 
					{image : 'WF34.jpg'},
					{image : 'WF35.jpg'}, 
					{image : 'WF36.jpg'},
					{image : 'WF37.jpg'}, 
					{image : 'WF38.jpg'},
					{image : 'WF39.jpg'}, 
					{image : 'WF40.jpg'},
					{image : 'WF41.jpg'}, 
					{image : 'WF42.jpg'},
					{image : 'WF43.jpg'}, 
					{image : 'WF44.jpg'},
					{image : 'WF45.jpg'}, 
					{image : 'WF46.jpg'},
					{image : 'WF47.jpg'}, 
					{image : 'WF48.jpg'},
					{image : 'WF49.jpg'}, 
					{image : 'WF50.jpg'}]				
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
					{image : 'WM6.jpg'},
					{image : 'WM7.jpg'}, 
					{image : 'WM8.jpg'},
					{image : 'WM9.jpg'}, 
					{image : 'WM10.jpg'},
					{image : 'WM11.jpg'}, 
					{image : 'WM12.jpg'},
					{image : 'WM13.jpg'}, 
					{image : 'WM14.jpg'},
					{image : 'WM15.jpg'}, 
					{image : 'WM16.jpg'},
					{image : 'WM17.jpg'}, 
					{image : 'WM18.jpg'},
					{image : 'WM19.jpg'}, 
					{image : 'WM20.jpg'},
					{image : 'WM21.jpg'}, 
					{image : 'WM22.jpg'},
					{image : 'WM23.jpg'}, 
					{image : 'WM24.jpg'},
					{image : 'WM25.jpg'}, 
					{image : 'WM26.jpg'},
					{image : 'WM27.jpg'}, 
					{image : 'WM28.jpg'},
					{image : 'WM29.jpg'}, 
					{image : 'WM30.jpg'},
					{image : 'WM31.jpg'}, 
					{image : 'WM32.jpg'},
					{image : 'WM33.jpg'}, 
					{image : 'WM34.jpg'},
					{image : 'WM35.jpg'}, 
					{image : 'WM36.jpg'},
					{image : 'WM37.jpg'}, 
					{image : 'WM38.jpg'},
					{image : 'WM39.jpg'}, 
					{image : 'WM40.jpg'},
					{image : 'WM41.jpg'}, 
					{image : 'WM42.jpg'},
					{image : 'WM43.jpg'}, 
					{image : 'WM44.jpg'},
					{image : 'WM45.jpg'}, 
					{image : 'WM46.jpg'},
					{image : 'WM47.jpg'}, 
					{image : 'WM48.jpg'},
					{image : 'WM49.jpg'}, 
					{image : 'WM50.jpg'}]				
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
		ITI : 1500, //Duration between trials.

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
				{image : 'WM40.jpg'}, 
				{image : 'WF20.jpg'},
				{image : 'WF4.jpg'},
				{image: 'WM4.jpg'},
				{image: 'WM6.jpg'}
			]
		},

		//For the example block (often practice)  - MEASURED IN MILLISECONS.  1000MS = 1 SECOND
		exampleBlock_fixationDuration : -1, 
		exampleBlock_primeDuration : 200, 
		exampleBlock_postPrimeDuration : 75, 
		exampleBlock_targetDuration : 1500,

		// ****** END EXAMPLE ROUND ********
		
	});
});
