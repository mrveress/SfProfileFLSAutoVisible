# SfProfileFLSAutoVisible
Salesforce... Sometimes it is painful to switch fields in all objects to visible. So I wrote a simple code on JS. Simple, just like my english. Code is not universal, but useful to someone.

###How this works
- Code insert jQuery from ajax.googleapis.com to page
- Code find all link with href which begins at "/setup/layout/flsdetail.jsp"
- Code create popup tabs for all this hrefs and do some magic stuff automaticly
- Code close processed tabs and open next href from list
- ??????
- PROFIT!

###Why this code so... Bad?
Don't judge, I was in a hurry

###How to use
- Insert the code in the developer console when tab on desired profile page. Or create a bookmark and enter this code in URL value.
- If you want to stop the script during the execution - set variable stopThisMadness = true on the main tab  (this is quest :) ). Or just close main tab.
- If the script hangs on popup tab - just click "Save" in it. This bug has been seen several times and I didn't have time to deal with it.

######Tested only with Chrome