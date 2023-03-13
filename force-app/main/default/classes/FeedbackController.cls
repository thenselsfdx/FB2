public with sharing class FeedbackController {
    @AuraEnabled
    public static String saveFeedback(Feedback__c feedback) {
        String returnMsg = 'ok';
        
        try {
                insert feedback;
            } catch (DmlException e) {
                System.debug('An exception has occurred: ' + e.getMessage());
                return e.getMessage();
            }
        
        return returnMsg;
    }

}