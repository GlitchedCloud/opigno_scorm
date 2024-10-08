/**
 * @file
 * JS UI logic for SCORM player.
 *
 * @see js/lib/player.js
 * @see js/lib/api.js
 */

;(function($, Drupal, window, undefined) {

  Drupal.behaviors.opignoScormPlayer = {

    attach: function(context, settings) {
      if (context == document && !context.scormPlayerLoaded) {
        // Initiate the API. (only if it's being attached to the document, and hasn't been loaded yet)
        if (settings.scormVersion === '1.2') {
          var scormAPIobject = window.API;
          if (scormAPIobject === undefined) {
            scormAPIobject = new OpignoScorm12API(settings.scorm_data || {});
          }
        }
        else {
          var scormAPIobject = window.API_1484_11;
          if (window.API_1484_11 === undefined) {
            window.API_1484_11 = new OpignoScorm2004API(settings.scorm_data || {});
            scormAPIobject = window.API_1484_11;
          }

          // Register scos suspend data.
          if (settings.opignoScormUIPlayer && settings.opignoScormUIPlayer.cmiSuspendItems) {
            window.API_1484_11.registerSuspendItems(settings.opignoScormUIPlayer.cmiSuspendItems);
          }
        }

        // Register CMI paths.
        if (settings.opignoScormUIPlayer && settings.opignoScormUIPlayer.cmiPaths) {
          scormAPIobject.registerCMIPaths(settings.opignoScormUIPlayer.cmiPaths);
        }

        // Register default CMI data.
        if (settings.opignoScormUIPlayer && settings.opignoScormUIPlayer.cmiData) {
          for (var item in settings.opignoScormUIPlayer.cmiData) {
            scormAPIobject.registerCMIData(item, settings.opignoScormUIPlayer.cmiData[item]);
          }
        }

        // Get all SCORM players in our context.
        var $players = $('.scorm-ui-player', context);

        // If any players were found...
        if ($players.length) {
          // Register each player.
          // NOTE: SCORM only allows on SCORM package on the page at any given time.
          // Skip after the first one.
          var first = true;
          $players.each(function() {
            if (!first) {
              return false;
            }

            var element = this,
                $element = $(element),
                // Create a new OpignoScormUIPlayer().
                player = new OpignoScormUIPlayer(element),
                alertDataStored = false;

            player.init();
            var eventName = 'commit';
            if (settings.scormVersion === '1.2') {
              eventName = 'commit12';
            }
            // Listen on commit event, and send the data to the server.
            scormAPIobject.bind(eventName, function(value, data, scoId) {
              var baseUrl = drupalSettings.path.baseUrl ? drupalSettings.path.baseUrl : '/';

              if (navigator.sendBeacon) {
                let url = baseUrl + 'opigno-scorm/scorm/' + $element.data('scorm-id') + '/' + scoId + '/commit';
                // TODO: I don't think this is a safe way to get the node id....
                let json = JSON.stringify({data, nodeId: $element.children().children().data('node-id')});
                navigator.sendBeacon(url, json);
              }
              else {
                $.ajax({
                  url: baseUrl + 'opigno-scorm/scorm/' + $element.data('scorm-id') + '/' + scoId + '/commit',
                  // TODO: I'm not sure if this implementation is even correct...
                  data: json.stringify({data, nodeId: $element.children().children().data('node-id')}),
                  async:   false,
                  dataType: 'json',
                  type: 'post',
                  success: function(json) {
                    if (alertDataStored) {
                      console.log(Drupal.t('We successfully stored your results. You can now proceed further.'));
                    }
                  }
                });
              }
            });

            $("#edit-submit").bind("click", function () {
                var $el = $(document),
                $iframe = $el.find('.scorm-ui-player-iframe-wrapper iframe'),
                iframe = $iframe[0];
                var scoId = iframe.src.split('opigno-scorm/player/sco/').pop();
                var baseUrl = drupalSettings.path.baseUrl ? drupalSettings.path.baseUrl : '/';
                $.ajax({
                    url: baseUrl + 'opigno-scorm/scorm/' + $element.data('scorm-id') + '/' + scoId + '/commit',
                    // TODO: I'm not sure if this implementation is even correct...
                    data: json.stringify({ data: scormAPIobject.data, nodeId: $element.children().children().data('node-id') }),
                    async: false,
                    dataType: 'json',
                    type: 'post',
                    success: function (json) {
                        if (alertDataStored) {
                            console.log(Drupal.t('We successfully stored your results. You can now proceed further.'));
                        }
                    }
              });
            });

            // Listen to the unload event. Some users click "Next" or go to a different page, expecting
            // their data to be saved. We try to commit the data for them, hoping ot will get stored.
            $(window).bind('beforeunload', function() {
              if (settings.scormVersion === '1.2') {
                if (!scormAPIobject.isFinished) {
                  scormAPIobject.LMSFinish('');
                  alertDataStored = true;
                }
              }
              else {
                if (!scormAPIobject.isTerminated) {
                  scormAPIobject.Commit('');
                  alertDataStored = true;
                  //return Drupal.t('It seems you did not finish the SCORM course, or maybe the SCORM course did not save your results. Should we try to store it for you ?');
                }
              }
            });

            // Add a class to the player, so the CSS can style it differently if needed.
            $element.addClass('js-processed');
            first = false;
          });
        }
        // add an attribute to context to indicate that the SCORM player is loaded
        context.scormPlayerLoaded = true;
      }
    }
  };

})(jQuery, Drupal, window);
