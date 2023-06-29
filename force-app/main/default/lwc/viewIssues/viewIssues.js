import {
    LightningElement
} from 'lwc';

import getIssues from "@salesforce/apex/Issue.getIssues"

export default class ViewIssues extends LightningElement {
    // Todo - Add label column
    columns = [{
            label: 'Title',
            fieldName: 'title',
            type: 'text'
        },
        {
            label: 'Description',
            fieldName: 'body',
            type: 'text'
        },
        {
            label: 'Link',
            fieldName: 'url',
            type: 'url'
        }
    ]
    data

    fetchedData = false
    connectedCallback() {
        if (this.fetchedData) return

        getIssues()
            .then(body => {
                const obj = JSON.parse(body)
                this.data = obj.map((issue) => {
                    return {
                        title: issue.title,
                        body: issue.body,
                        url: issue.html_url,
                        id: issue.id
                    }
                })
                this.fetchedData = true
            })
    }
}