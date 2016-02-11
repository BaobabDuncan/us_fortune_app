/*var mydb=false;

//alert('tt'); 

// initialise the database

initDB = function() {
	

	try
	{
		if(!window.openDatabase){
			alert('not supported');
		}
		else { 

          var shortName = 'phonegap'; 
          var version = '1.0'; 
          var displayName = 'PhoneGap Test Database'; 
          var maxSize = 65536; // in bytes 

          mydb = openDatabase(shortName, version, displayName, maxSize); 
        }
	}
	catch (e)
	{
		if (e == INVALID_STATE_ERR) { 
          // Version number mismatch. 
          alert("Invalid database version."); 
        }
		else { 
          alert("Unknown error "+e+"."); 
        } 
		return; 
	}
}


// db error handler - prevents the rest of the transaction going ahead on failure
errorHandler = function (transaction, error) { 
      // returns true to rollback the transaction
      return true;  
} 

// null db data handler
nullDataHandler = function (transaction, results) { } 

 
// create tables for the database
createUserTable = function() 
{
      try { 
        mydb.transaction(
          function(transaction) {
            transaction.executeSql('CREATE TABLE user(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL DEFAULT "", birthyear INTEGER NOT NULL);', [], nullDataHandler, errorHandler); 
            //transaction.executeSql('insert into celebs (id,name) VALUES (1,"Kylie Minogue");', [], nullDataHandler, errorHandler); 
            //transaction.executeSql('insert into celebs (id,name) VALUES (2,"Keira Knightley");', [], nullDataHandler, errorHandler); 
          });
      } catch(e) {
        /// alert(e.message);
        return;
      }
}

// create tables for the database
UpdateUserData = function(sName,iBirthyear) 
{
      try { 
        mydb.transaction(
          function(transaction) {
            transaction.executeSql('insert into user(id,name,birthyear) VALUES (1,"' + sName + '",' + iBirthyear + ');', [], nullDataHandler, errorHandler); 
            transaction.executeSql('update user set name="' + sName + ',birthyear=' + iBirthyear + ' where name="' + sName + '";', [], nullDataHandler, errorHandler); 
          });
      } catch(e) {
        /// alert(e.message);
        return;
      }
}


// callback function to retrieve the data from the prefs table
UserDataHandler=function(transaction, results) 
{
      var sRet = '';
      
      // Handle the results 
      for (var i=0; i<results.rows.length; i++) { 
        var row = results.rows.item(i); 
        sRet = row['name'] + ',' + row['birthyear'];
      } 

      return sRet;
}


// load the currently selected icons
loadUserData = function(sName) 
{
      try {
        mydb.transaction(
            function(transaction) {
               transaction.executeSql('SELECT * FROM user where name="'+sName+'",[], UserDataHandler, errorHandler');
            });
      } catch(e) {
        alert(e.message);
      }
}
*/