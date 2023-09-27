public with sharing class OppsList {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOppsList(){
        try {
            // Create a list of opportunities records from a SOQL query
            List<Opportunity> opportunityList = [
                SELECT
                id,
                Name,
                Account.Name,
                Amount,
                CloseDate,
                StageName,
                OwnerId
                FROM Opportunity
                WITH SECURITY_ENFORCED
                ORDER BY Name
            ];


            // Maybe create 2 custom field on the opportunity object and get the account name and cast it in the custom field
            // Likewise for the Username, but there is not parent/child relationship so might need to get the corresponding Users in a query
            // List<String> accountNameList;


            // for (Opportunity opp : opportunityList) {
            //     accountNameList.add(opp.Account.Name);
            // } 

            return opportunityList;
            
        } catch (Exception e) {
            // Exception handling
            throw new AuraHandledException(e.getMessage());
        }
    }

    // credit https://gist.github.com/sohalloran/5be1daf94a2d4e8fcd92df2cf6988e62
    @AuraEnabled(cacheable=true)
    public static Integer getAllOpps(){
        return [ SELECT COUNT() FROM Opportunity WITH SECURITY_ENFORCED ];
    }
    
    // change page
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> handlePageChange(Integer currentPageNumber){
        Integer offsetQty = currentPageNumber;
        return [
            SELECT
            id,
            Name,
            Account.Name,
            Amount,
            CloseDate,
            StageName,
            OwnerId
            FROM Opportunity
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 10
            OFFSET :offsetQty
        ];
    }

    // update opp
    @AuraEnabled
    public static void updateOpp(List<Opportunity> oppToUpdate) {
        // Make sure we can update the database before trying to update
        // if (!Schema.sObjectType.Contact.isUpdateable()) {
        //     throw new SecurityException(
        //         'Insufficient permissions to update contacts'
        //     );
        // }
        update oppToUpdate;
    }

    // delete opp 
    @AuraEnabled
    public static void deleteOpp(List<Opportunity> oppToDelete){
        delete oppToDelete;
    }
}