// JavaScript Document

function drawImage(imageObj) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var x = 69;
        var y = 50;

        context.drawImage(imageObj, x, y);

        var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
        var data = imageData.data;
        
        console.log(data);

        var testSlice = sliceOnePixel(data, 0);
        var testPixelColor = parseBlackWhite(testSlice);
        var testIndexPosition = convertPixelPositionToIndexDataPosition(data, imageObj.height, imageObj.width, 4, 0);
        var testBrailleData = buildBrailleCharacterData(data, imageObj.height, testIndexPosition);


        function sliceOnePixel(targetData, targetDataSlice_i)
        {
          var dataSlice = [];
          dataSlice.push(targetData[targetDataSlice_i])
          dataSlice.push(targetData[targetDataSlice_i + 1])
          dataSlice.push(targetData[targetDataSlice_i + 2]);
          console.log(dataSlice);
          return dataSlice;
        }

        function parseBlackWhite(targetData) // should be one pixel's worth
        {
          var blackOrWhitePixel;
          var r, g, b, rgbTotal;
          r = targetData[0];
          g = targetData[1];
          b = targetData[2];
          rgbTotal = r + b + g; 

          if(rgbTotal > 380)
          {
            blackOrWhitePixel = "0"; // white: no color, means no pin
          }
          else
          {
            blackOrWhitePixel = "1"; // black, gets pin
          }

          console.log(blackOrWhitePixel);
          return blackOrWhitePixel;
        }

        function convertPixelPositionToIndexDataPosition(targetImageData, targetImgHeight, targetImgWidth, pixelShiftTop, pixelShiftLeft)
        {
          var pixelIndex = (pixelShiftLeft * targetImgHeight) + pixelShiftTop;
          var indexPosition = pixelIndex * 3;
          return indexPosition;
        }

        function buildBrailleCharacterData(targetImageData, targetImageHeight, indexPosition)
        {
          var brailleCharacterData = [];
          var pinPositions = indexPosition;

          var pin1, pin1Data, pin2, pin2Data, pin3, pin3Data, pin4, pin4Data, pin5, pin5Data, pin6, pin6Data, pin7, pin7Data, pin8, pin8Data;

          pin1Data = sliceOnePixel(targetImageData, indexPosition);
          pin1 = parseBlackWhite(pin1Data);

          pin2Data = sliceOnePixel(targetImageData, indexPosition + (1 * 3));
          pin2 = parseBlackWhite(pin2Data);

          pin3Data = sliceOnePixel(targetImageData, indexPosition + (2 * 3));
          pin3 = parseBlackWhite(pin3Data);

          pin4Data = sliceOnePixel(targetImageData, indexPosition + (3 * 3));
          pin4 = parseBlackWhite(pin4Data);

          pin5Data = sliceOnePixel(targetImageData, indexPosition           + (targetImageHeight * 3));
          pin5 = parseBlackWhite(pin5Data);

          pin6Data = sliceOnePixel(targetImageData, indexPosition + (1 * 3) + (targetImageHeight * 3));
          pin6 = parseBlackWhite(pin6Data);

          pin7Data = sliceOnePixel(targetImageData, indexPosition + (2 * 3) + (targetImageHeight * 3));
          pin7 = parseBlackWhite(pin7Data);

          pin8Data = sliceOnePixel(targetImageData, indexPosition + (3 * 3) + (targetImageHeight * 3));
          pin8 = parseBlackWhite(pin8Data);

          console.log(pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8);
          brailleCharacterData = [pin1,pin2,pin3,pin4,pin5,pin6,pin7,pin8];
          return brailleCharacterData;

        }

        var testArrayForConversion = ["1","0","0","1","0","0","1","0"];

        var testHexConvert = parseToBrailleCharacter(testArrayForConversion)


        function parseToBrailleCharacter(targetBrailleCharacterData)
        {
          // The unicode designations for Braille characters follows an odd pattern,
          // but converts from Binary into Hex format for the unicode designation

          var pin = targetBrailleCharacterData;
          var hexNumValue;

          translatePinsToHex();

          function translatePinsToHex()
          {
            var brailleDataString = pin[7] + pin[3] + pin[6] + pin[5] + pin[4] + pin[2] + pin[1] + pin[0];
            // Convert binary to hexadecimal
            hexNumValue = parseInt(brailleDataString, 2).toString(16);
          }
          return hexNumValue;
        }



        for(var i = 0; i < data.length; i += 4) {
          var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          // red
          data[i] = brightness;
          // green
          data[i + 1] = brightness;
          // blue
          data[i + 2] = brightness;
        }

        // overwrite original image
        context.putImageData(imageData, x, y);
      }
      
      var imageObj = new Image();
      imageObj.onload = function() {
        drawImage(this);
      };

      imageObj.src = 'images/sample-graphic.png';

}



      // imageObj.src = 'images/darth-vader.jpg';

// function translateImageToBraille(imageObj)
// {
// 	var brailleCanvas = document.getElementById('braille-canvas');
// 	var context = brailleCanvas.getContext('2d');
// 	var x = 12;
// 	var y = 16;
	
// 	context.drawImage(imageObj, x, y);
	
// 	var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
// 	var data = imageData.data;
	
// 	//
	
// }

// function dataSlice(imageDataSource)
// {
// 	// define total size of image
	
// }

// function convertToBrailleUnicode(sourceGraphic) // should be 8-pixel imageData : 2x4
// {
// 	var digitalData = sourceGraphic.data;
// 	var brailleUnicode;
// 	var pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8;
	
	
// 	pin1 = pixelToPinDefine(digitalData, 1);
// 	pin2 = pixelToPinDefine(digitalData, 2);
// 	pin3 = pixelToPinDefine(digitalData, 3);
// 	pin4 = pixelToPinDefine(digitalData, 4);
// 	pin5 = pixelToPinDefine(digitalData, 5);
// 	pin6 = pixelToPinDefine(digitalData, 6);
// 	pin7 = pixelToPinDefine(digitalData, 7);
// 	pin8 = pixelToPinDefine(digitalData, 8);
	
	
// 	function pixelToPinDefine(pixelData, pinNumber)
// 	{
// 		var thisPixelRed = pixelData[(pinNumber-1) * pinNumber];
// 		var thisPixelGreen = pixelData[(pinNumber) * pinNumber];
// 		var thisPixelBlue = pixelData[(pinNumber+1) * pinNumber];
// 		var thisPixelAlpha = pixelData[(pinNumber+2) * pinNumber];
// 	}
	
// 	for(var i = 0; i < digitalData.length; i += 4)
// 	{
// 		var singlePixelData;
// 	}
	
	
// }