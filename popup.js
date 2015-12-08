// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function hnApi(tabUrl) {
  var url = "http://hn.algolia.com/api/v1/search?restrictSearchableAttributes=url&query=" + tabUrl;
  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  console.log(url);
  request.onreadystatechange = function (e) {
    console.log(request, e);
    if (request.readyState == 4) {
      if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        console.log(json);
        var hits = json.hits;
        if (hits.length == 0) {
            var urlDiv = document.getElementById("url");
            urlDiv.innerHTML = "<h1>No HN comments found!</h1>";
        } else {
            var urlDiv = document.getElementById("url");
            var id = hits[0].objectID
            urlDiv.innerHTML = "<a href=\"https://news.ycombinator.com/item?id=" + id + "\" target=\"_blank\">Hacker News</a>";
        }
      } else {
        console.log('Unable to resolve address into HN');
      }
    }
  };
  request.send(null);
}


function getUrl() {
  var tabUrl = chrome.extension.getBackgroundPage().tabUrl;
  console.log(tabUrl);
  if (tabUrl)
      hnApi(tabUrl);
}

window.onload = getUrl;
