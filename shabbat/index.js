// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const functions = require('firebase-functions');
var ext_request = require('request');

exports.yourAction = functions.https.onRequest((request, response) => {
  const app = new DialogflowApp({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // Fulfill action business logic
  function responseHandler (app) {
    // Complete your fulfillment logic and send a response
    // DONE: Figure out how to grab the zipcode from dialogflow's post
    // app.tell(JSON.stringify(request.body.result.parameters.zip-code));
    app.tell()
    // TODO: Create a function that takes that and gets the shabbat time and responds accordingly

  }

  function getShabbatTime (zip) {
   var a = ext_request('http://www.hebcal.com/shabbat/?cfg=json&zip=11803', function (error, response, data) { body = JSON.parse(data); ;} );
   return a.location
  }

  const actionMap = new Map();
  actionMap.set('shabbat', responseHandler);

  app.handleRequest(actionMap);
});
