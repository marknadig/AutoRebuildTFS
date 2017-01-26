var poller;
var pollForBuild = function() {
   // Approved yet?
   if ($(".vc-pullrequest-merge-policy-status-item span:contains('approved')").length == 0) { 
      console.log("Poller: waiting for approval");
      return; 
   }
   
   // build succeeded?
   if ($(".vc-pullrequest-merge-policy-status-item a:contains('succeeded')").length) { 
      console.log("Poller: FTW!");
      clearTimeout(poller);
      return; 
   }

   // see if build sitting in expired
   if ($(".vc-pullrequest-merge-policy-status-item a:contains('expired')").length) { 
      console.log("Poller: Retrying build...");
      // make sure popup is up
      $(".vc-pullrequest-merge-policy-status-item a:contains('expired')").siblings(".action-icon").children("div").click();
      setTimeout(function() {
         // click the button
         $(".vc-pullrequest-merge-policy-status-item a:contains('expired')").siblings(".action-icon").children("ul.menu-popup").children("li").children("ul").children("li").click();
      }, 300);
   }
}

poller=setInterval(pollForBuild, 60000);
pollForBuild();
