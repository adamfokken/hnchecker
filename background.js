// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var lastTabId = 0; 
var tabUrl = '';


chrome.tabs.onActivated.addListener(function(activeInfo) {
  lastTabId = activeInfo.tabId;
  chrome.pageAction.show(lastTabId);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    lastTabId = tabs[0].id;
    chrome.pageAction.show(lastTabId);
    checkHNComments(tabs[0]);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("updated");
    if (changeInfo.status == "complete") {
        checkHNComments(tab);
        chrome.pageAction.show(lastTabId);
    }
});
  
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  lastTabId = tabs[0].id;
  chrome.pageAction.show(lastTabId);
  checkHNComments(tabs[0]);
});

function checkHNComments(tab) {
  chrome.pageAction.setTitle({tabId:tab.id, title:"Clicked"});
  tabUrl = tab.url;
}

