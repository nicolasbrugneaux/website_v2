/*global angular: true, document: true, setInterval: true,
clearInterval: true, setTimeout: true */
/*
ngProgress v0.0.3 - slim, site-wide progressbar for AngularJS
(C) 2013 - Victor Bjelkholm
License: MIT (see LICENSE)
Source: https://github.com/victorbjelkholm/ngprogress
*/

var module = angular.module('ngProgress', []);

module.provider('progressbar', function () {

    'use strict';
    //Default values for provider
    this.count = 0;
    this.height = '3px';
    this.color = '#18bc9c';

    this.$get = ['$document', '$window', function ($document, $window) {
        var count = this.count,
            height = this.height,
            color = this.color,
            $body = $document.find('body'),
        // Create elements that is needed
            progressbarContainer = angular.element('<div id ="ngprogress" class="progressbar-container"></div>'),
            progressbar = angular.element('<div class="progressbar"></div>'),
            progressSpinner = angular.element('<div class="spinner" role="spinner"></div>'),
            progressSpinnerIcon = angular.element('<div class="spinner-icon"></div>'),

        //Add CSS3 styles for transition smoothing
            css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = "";
        document.body.appendChild(css);

        progressbar.css('height', height);
        progressbar.css('box-shadow', '0px 0px 10px 0px ' + color);
        progressbar.css('width', count + '%');
        progressbar.css('background-color', color);

        progressSpinnerIcon.css('border-top-color', color);
        progressSpinnerIcon.css('border-left-color', color);
        progressSpinnerIcon.css('color', color);

        //Add progressbar to progressbar-container and progressbar-container
        // to body
        progressbarContainer.append(progressbar);
        progressSpinner.append(progressSpinnerIcon);
        progressbarContainer.append(progressSpinner);
        $body.append(progressbarContainer);


        return {
            // Starts the animation and adds between 0 - 5 percent to loading
            // each 400 milliseconds. Should always be finished with progressbar.complete()
            // to hide it
            start: function () {
                progressbar.css('width', count + '%');
                progressbar.css('opacity', '1');
                progressSpinner.css('opacity', '1');
                $window.interval = setInterval(function () {
                    if (count + 1 >= 95) {
                        clearInterval($window.interval);
                    } else {
                        var random = Math.floor(Math.random() * 5);
                        count = count + random;
                        progressbar.css('width', count + '%');
                    }
                }, 400);
            },
            // Sets the height of the progressbar. Use any valid CSS value
            // Eg '10px', '1em' or '1%'
            height: function (new_height) {
                progressbar.css('height', new_height);
            },
            // Sets the color of the progressbar and it's shadow. Use any valid HTML
            // color
            color: function (color) {
                progressbar.css('box-shadow', '0px 0px 10px 0px ' + color);
                progressbar.css('background-color', color);
            },
            // Returns on how many percent the progressbar is at. Should'nt be needed
            status: function () {
                return this.count;
            },
            // Stops the progressbar at it's current location
            stop: function () {
                clearInterval($window.interval);
            },
            // Set's the progressbar percentage. Use a number between 0 - 100. 
            // If 100 is provided, complete will be called.
            set: function (new_count) {
                clearInterval($window.interval);
                if (new_count >= 100) {
                    this.complete();
                }
                count = new_count;
                progressbar.css('width', count + '%');
                progressbar.css('opacity', '1');
                return count;
            },
            // Resets the progressbar to percetage 0 and therefore will be hided after
            // it's rollbacked
            reset: function () {
                clearInterval($window.interval);
                count = 0;
                progressbar.css('width', count + '%');
                progressbar.css('opacity', '1');
                return 0;
            },
            // Jumps to 100% progress and fades away progressbar.
            complete: function () {
                clearInterval($window.interval);
                count = 100;
                progressbar.css('width', count + '%');
                setTimeout(function () {
                    progressbar.css('opacity', '0');
                    progressSpinner.css('opacity', '0');
                }, 500);
                setTimeout(function () {
                    count = 0;
                    progressbar.css('width', count + '%');
                }, 1000);
                return count;
            }
        };
    }];

    this.setColor = function (color) {
        this.color = color;
    };

    this.setHeight = function (height) {
        this.height = height;
    };

});
