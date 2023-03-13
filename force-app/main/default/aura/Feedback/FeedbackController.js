({
	doInit : function(component, event, helper) {
        console.log("FB:doInit");
        
        var objectName = component.get("v.sObjectName");
        console.log("FB:doInit:ObjectName:", objectName);
	},
    handleShow : function(component, event, helper) {
        console.log("FB:handleShow");
        component.set("v.ShowInput", true);
	},
    handleSubmit : function(component, event, helper) {
        console.log("FB:handleSubmit");
        var action = component.get("c.saveFeedback");
        var feedbackText = component.find("FeedbackText").get("v.value");
        var objectName = component.get("v.sObjectName");
        console.log("FB:handleSubmit:Text:", feedbackText);
        var feedback = {};
        feedback.FeedbackText__c = feedbackText;
        
        if (objectName != undefined && objectName != null) {
            feedback.Context__c = objectName;
        }
        
        action.setParams({ feedback: feedback
                          });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("FB:handleSubmit:Success");

                var returnRecord = response.getReturnValue();
                 component.set("v.ShowInput", false);
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        console.log("FB:handleSubmit");
        $A.enqueueAction(action);

       
	},

})