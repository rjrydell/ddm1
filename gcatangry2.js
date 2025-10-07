define(['pipAPI', 'https://rjrydell.github.io/ddm1/jamp.js'], function(APIConstructor, ampExtension){

	var API = new APIConstructor();
	
	
	return ampExtension({

		trialsInBlock : [60, 60, 60, 60, 60, 60, 60], //Number of trials in each block 
		trialsInExample : 5, //Change to 0 if you don't want an example block
	
		sortingLabel1 : 'Untrustworthy', //Response is coded as 0. 
		sortingLabel2 : 'Trustworthy',  //Response is coded as 1.
		
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
					{image : 'BMA6.jpg'},
					{image : 'BMA7.jpg'}, 
					{image : 'BMA8.jpg'},
					{image : 'BMA9.jpg'}, 
					{image : 'BMA10.jpg'},
					{image : 'BMA11.jpg'}, 
					{image : 'BMA12.jpg'},
					{image : 'BMA13.jpg'}, 
					{image : 'BMA14.jpg'},
					{image : 'BMA15.jpg'}, 
					{image : 'BMA16.jpg'},
					{image : 'BMA17.jpg'}, 
					{image : 'BMA18.jpg'},
					{image : 'BMA19.jpg'}, 
					{image : 'BMA20.jpg'},
					{image : 'BMA21.jpg'}, 
          	        {image : 'BMA22.jpg'},
					{image : 'BMA23.jpg'}, 
					{image : 'BMA24.jpg'},
					{image : 'BMA25.jpg'}, 
					{image : 'BMA26.jpg'},
					{image : 'BMA27.jpg'}, 
					{image : 'BMA28.jpg'},
					{image : 'BMA29.jpg'}, 
					{image : 'BMA30.jpg'}]				
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
					{image : 'BM6.jpg'},
					{image : 'BM7.jpg'}, 
					{image : 'BM8.jpg'},
					{image : 'BM9.jpg'}, 
					{image : 'BM10.jpg'},
					{image : 'BM11.jpg'}, 
					{image : 'BM12.jpg'},
					{image : 'BM13.jpg'}, 
					{image : 'BM14.jpg'},
					{image : 'BM15.jpg'}, 
					{image : 'BM16.jpg'},
					{image : 'BM17.jpg'}, 
					{image : 'BM18.jpg'},
					{image : 'BM19.jpg'}, 
					{image : 'BM20.jpg'},
					{image : 'BM21.jpg'}, 
					{image : 'BM22.jpg'},
					{image : 'BM23.jpg'}, 
					{image : 'BM24.jpg'},
					{image : 'BM25.jpg'}, 
					{image : 'BM26.jpg'},
					{image : 'BM27.jpg'}, 
					{image : 'BM28.jpg'},
					{image : 'BM29.jpg'}, 
					{image : 'BM30.jpg'}]				
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
					{image : 'WMA6.jpg'},
					{image : 'WMA7.jpg'}, 
					{image : 'WMA8.jpg'},
					{image : 'WMA9.jpg'}, 
					{image : 'WMA10.jpg'},
					{image : 'WMA11.jpg'}, 
					{image : 'WMA12.jpg'},
					{image : 'WMA13.jpg'}, 
					{image : 'WMA14.jpg'},
					{image : 'WMA15.jpg'}, 
					{image : 'WMA16.jpg'},
					{image : 'WMA17.jpg'}, 
					{image : 'WMA18.jpg'},
					{image : 'WMA19.jpg'}, 
					{image : 'WMA20.jpg'},
					{image : 'WMA21.jpg'}, 
					{image : 'WMA22.jpg'},
					{image : 'WMA23.jpg'}, 
					{image : 'WMA24.jpg'},
					{image : 'WMA25.jpg'}, 
					{image : 'WMA26.jpg'},
					{image : 'WMA27.jpg'}, 
					{image : 'WMA28.jpg'},
					{image : 'WMA29.jpg'}, 
					{image : 'WMA30.jpg'}]				
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
					{image : 'WM30.jpg'}]				
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
			'Concentrate on each picture and indicate whether the person is leftAttribute with the <b>leftKey</b> key,  ' + 
			'or indicate whether the person is rightAttribute with the <b>rightKey</b> key.<br/><br/>' + 
			'Examine each picture and make a response quickly, while trying to minimize errors. ' + 
			'<p style="font-size:16px; text-align:center; font-family:arial; color:#FFFFFF"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial; color:#FFFFFF">' + 
			'[Round 2 of nBlocks]</p></div>',
		
		middleBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial; color:#FFFFFF"><br/>' + 
			'Continue to another round of this task. ' + 
			'The rules are exactly the same:<br/><br/>' + 
			'Concentrate on each picture and indicate whether the person is leftAttribute with the <b>leftKey</b> key,  ' + 
			'or indicate whether the person is rightAttribute with the <b>rightKey</b> key.<br/><br/>' + 
			'Examine each picture and make a response quickly, while trying to minimize errors. ' + 
			'<p style="font-size:16px; text-align:center; font-family:arial; color:#FFFFFF"><br/><br/>' + 
			'Ready? Hit the <b>space bar</b>.</p>' + 
			'<p style="font-size:12px; text-align:center; font-family:arial; color:#FFFFFF">' + 
			'[Round blockNum of nBlocks]</p></div>',
	
		lastBlockInst : '<div><p style="font-size:20px; text-align:left; margin-left:10px; font-family:arial; color:#FFFFFF"><br/>' + 
			'Ready for the FINAL round? ' + 
			'The rules are exactly the same:<br/><br/>' + 
			'Concentrate on each picture and indicate whether the person is leftAttribute with the <b>leftKey</b> key,  ' + 
			'or indicate whether the person is rightAttribute with the <b>rightKey</b> key.<br/><br/>' + 
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
			'Press the <b>leftKey</b> key if the person is leftAttribute. Hit the <B>rightKey</B> key if the person is rightAttribute.<br/><br/>' + 
			'The items appear and disappear quickly in the real task, but we will present them until you make a response for the first few trials.  ' + 
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
				{image : 'WM4.jpg'}, 
				{image : 'WM9.jpg'},
				{image : 'BM4.jpg'},
				{image: 'BMA5.jpg'},
				{image: 'WMA5.jpg'}
			]
		},

		//For the example block (often practice)  - MEASURED IN MILLISECONS.  1000MS = 1 SECOND
		exampleBlock_fixationDuration : -1, 
		exampleBlock_primeDuration : 200, 
		exampleBlock_postPrimeDuration : 75, 
		exampleBlock_targetDuration : 500,

		// ****** END EXAMPLE ROUND ********
			
	});
});
		
