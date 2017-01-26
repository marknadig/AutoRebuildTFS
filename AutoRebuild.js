var poller;
var pollForBuild = function() {
   // Approved yet? (bowtie-check == checkmark - all good)
   if ($(".vc-pullrequest-merge-policy-status-item i.bowtie-check").siblings("span:contains('approved')").length == 0) { 
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
      $("div.popup-menu-trigger").click();
      setTimeout(function() {
         // click the button
         $("li[title='Rebuild']").click();
      }, 300);
   }
}

poller=setInterval(pollForBuild, 60000);
pollForBuild();
