public with sharing class Issue {
    public Issue() {
        //
    }

    /*
        TODO - After shower
        1. Accept user input for title, body, and labels
        2. Build body using JSON
        3. req.setBody(thatJSON)
    */

    @AuraEnabled
    public static void createIssue(String title, String body, String[] labels) {
        try {
            Http http = new Http();
            HttpRequest req = new HttpRequest();
            req.setClientCertificateName('github');
            req.setEndpoint('callout:Github_Credential/issues');
            req.setMethod('POST');
            
            Map<String, Object> obj = new Map<String, Object>();
            obj.put('title', title);
            obj.put('body', body);
            obj.put('labels', labels);
            req.setBody(JSON.serialize(obj));

            HttpResponse res = http.send(req);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string getIssues() {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setClientCertificateName('github');
        req.setEndpoint('callout:Github_Credential/issues');
        req.setMethod('GET');

        HttpResponse res = http.send(req);
        return res.getBody();
    }
}