      function drawImage(imageObj, targetCanvasId) {
        var canvas = document.getElementById(targetCanvasId);
        // canvas.setAttribute('width', imageObj.width);
        // canvas.setAttribute('height', imageObj.height);
        var context = canvas.getContext('2d');

        var jcanvas = $("#" + targetCanvasId);
        jcanvas
          .attr('width', imageObj.width)
          .attr('height', imageObj.height);


        // erase pre-existing images
        context.fillStyle = "rgb(255,255,255)";
        context.fillRect(0, 0, jcanvas.attr('width'), jcanvas.attr('height'));

        var x = 1;
        var y = 1;

        context.drawImage(imageObj, x, y);

        var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
        var data = imageData.data;
        
        console.log(data);

        // var testSlice = sliceOnePixel(data, 0);
        // var testPixelColor = parseBlackWhite(testSlice);
        // var testIndexPosition = convertPixelPositionToIndexDataPosition(data, imageObj.height, imageObj.width, 7, 0);
        // var testBrailleData = buildBrailleCharacterData(data, imageObj.height, testIndexPosition);
        // var testConvertBrailleData = parseToBrailleCharacter(testBrailleData);
        // var testPrintBrailleData = printBrailleCode(testConvertBrailleData);


        fullTest();

        function fullTest()
        {
          for(var x=0;x<imageObj.width;x=x+2)//for(var x=0;x<=imageObj.height;x=x+2)
          {
            for(var y=0;y<=imageObj.height;y=y+4)
            {
              var testIndexPosition = convertPixelPositionToIndexDataPosition(data, imageObj.height, imageObj.width, y, x);
              var testBrailleData = buildBrailleCharacterData(data, imageObj.width, testIndexPosition);
              var testConvertBrailleData = parseToBrailleCharacter(testBrailleData);
              var brailleIdSelector = y + "-" + x;
              // var brailleIdSelector = "" + x;
              // var containerIdSelector = "" + y;
              // var testPrintBrailleData = printBrailleCode(brailleIdSelector, testConvertBrailleData);
              var testPrintBrailleData = printBrailleCode(y, x, testConvertBrailleData, "new-output");
            }
          } 
        }





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
          var pixelIndex = (pixelShiftTop * targetImgWidth) + pixelShiftLeft;
          var indexPosition = pixelIndex * 4;
          return indexPosition;
        }

        function buildBrailleCharacterData(targetImageData, targetImgWidth, indexPosition)
        {
          var brailleCharacterData = [];
          var pinPositions = indexPosition;

          var pin1, pin1Data, pin2, pin2Data, pin3, pin3Data, pin4, pin4Data, pin5, pin5Data, pin6, pin6Data, pin7, pin7Data, pin8, pin8Data;

          pin1Data = sliceOnePixel(targetImageData, indexPosition);
          pin1 = parseBlackWhite(pin1Data);

          pin2Data = sliceOnePixel(targetImageData, indexPosition           + (1 * targetImgWidth * 4));
          pin2 = parseBlackWhite(pin2Data);

          pin3Data = sliceOnePixel(targetImageData, indexPosition           + (2 * targetImgWidth * 4));
          pin3 = parseBlackWhite(pin3Data);

          pin4Data = sliceOnePixel(targetImageData, indexPosition           + (3 * targetImgWidth * 4));
          pin4 = parseBlackWhite(pin4Data);

          pin5Data = sliceOnePixel(targetImageData, indexPosition + (1 * 4));
          pin5 = parseBlackWhite(pin5Data);
 
          pin6Data = sliceOnePixel(targetImageData, indexPosition + (1 * 4) + (1 * targetImgWidth * 4));
          pin6 = parseBlackWhite(pin6Data);
 
          pin7Data = sliceOnePixel(targetImageData, indexPosition + (1 * 4) + (2 * targetImgWidth * 4));
          pin7 = parseBlackWhite(pin7Data);
 
          pin8Data = sliceOnePixel(targetImageData, indexPosition + (1 * 4) + (3 * targetImgWidth * 4));
          pin8 = parseBlackWhite(pin8Data);

          console.log(pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8);
          brailleCharacterData = [pin1,pin2,pin3,pin4,pin5,pin6,pin7,pin8];
          return brailleCharacterData;

        }


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
            hexNumValue = String(hexNumValue);
          }

          var testLength = hexNumValue.length;

          if(testLength == 1)
          {
            hexNumValue = "0" + hexNumValue;
          }
          return hexNumValue;
        }

        function printBrailleCode(ySelector, xSelector, brailleUnicodeText, targetContainerId)
        // function printBrailleCode(selector, brailleUnicodeText, targetContainerId)
        {
          var output = "&#x28" + brailleUnicodeText.toString();
          // sendToExistingSpan();
          buildContainer();

          function sendToExistingSpan()
          {
            var targetElement = document.getElementById(selector);
            if(targetElement.length != 0)
            {
              document.getElementById(selector).innerHTML = output;
            }
          }
          

          function buildContainer()
          {
            // set create x in span
            // if no y div (inside targetContainerId), create y div - otherwise append to existing y
            // if new y div, append y div to targetContainerId
            // end
            var targetContainer = $('#' + targetContainerId);
            if(targetContainer.length == 0)
            {
              targetContainer = $('<div></div>')
                                  .attr('id', targetContainerId);
              $('canvas:first').after(targetContainer);
            }


            var newBrailleText = targetContainer.children('#' + xSelector + '-of-' + ySelector); // test to see if it's pre-existing
            if(newBrailleText.length == 0)
            {
              newBrailleText = $('<span></span>')
                                .attr('id', xSelector + '-of-' + ySelector);
            }
            newBrailleText.html(output);


            var yContainerDiv = targetContainer.children(' #' + ySelector);
            if($('#' + ySelector).length == 0)
            {
              var yContainerDiv = $('<div></div>')
                                    .attr('id', ySelector)
                                    .append(newBrailleText);
              targetContainer.append(yContainerDiv);
            }
            else
            {
              yContainerDiv.append(newBrailleText);
            }


            // if(selector.length != 0 && selector != null)
            // {
            //   var newBrailleText = $('<span></span>')
            //                         .attr('id', selector)
            //                         .html(output);
            //   if(targetContainerId.length != 0)
            //   {
            //     var targetContainer = $('id', targetContainerId);
            //     if(targetContainer.length == 0) // container not found in DOM
            //     {
            //       targetContainer = $('<div></div>')
            //                           .attr('id', targetContainerId)
            //                           .append(newBrailleText);
            //     }
            //     else // append to end of existing container
            //     {

            //     }
            //   }
            // }  
          }
        }

        // overwrite original image
        context.putImageData(imageData, x, y);
      }
      
      var imageObj = new Image();
      imageObj.onload = function() {
        drawImage(this, 'mycanvas');
      };

      imageObj.src = 'images/zen.png';
      // imageObj.src = 'images/vader.png';
      // imageObj.src = 'images/gandalf.png';

      var imageToggleButton = $('.toggle-button');
      imageToggleButton
        .click(function()
        {
          var imgName = $(this).text();
          var urlSource = 'images/' + imgName + '.png';
          toggleImage(urlSource);
        })
        .keydown(function(event)
        {
          if(event.keyCode == 13)
          {
            var imgName = $(this).text();
            var urlSource = 'images/' + imgName + '.png';
            toggleImage(urlSource);
          }

        });


      function toggleImage(sourceURL)
      {
        $('#new-output').remove();

          // place new image
          var imageObj = new Image();
          imageObj.src = sourceURL;
          drawImage(imageObj, 'mycanvas');

      }




