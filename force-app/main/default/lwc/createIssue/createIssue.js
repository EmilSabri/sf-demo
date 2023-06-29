import {
    LightningElement
} from 'lwc';
import createIssue from '@salesforce/apex/Issue.createIssue';

export default class CreateIssue extends LightningElement {
    title = '';
    body = '';
    label = ['Bug'];
    priority = '';

    // Todo - if more time. Grab labels from github api and save into SF DB
    labelOptions = [{
            label: 'Bug',
            value: 'Bug'
        },
        {
            label: 'Feature',
            value: 'Feature'
        },
        {
            label: 'Question',
            value: 'Question',
        },
    ]

    priorityOptions = [{
            value: 'Low',
            variant: 'brand-outline'
        },
        {
            value: 'Medium',
            variant: 'brand-outline'
        },
        {
            value: 'High',
            variant: 'brand-outline'
        },
        {
            value: 'Urgent',
            variant: 'brand-outline'
        }
    ]

    handleTitleChange(event) {
        this.title = event.detail.value;
    }

    handleBodyChange(event) {
        this.body = event.detail.value;
    }

    handleLabelChange(event) {
        this.label = event.detail.value;
    }

    handlePriorityClick(event) {
        this.priority = event.target.label;
        this.priorityOptions = this.priorityOptions.map(prio => {
            let variantStyle = prio.value === this.priority ? 'brand' : 'brand-outline';
            return {
                ...prio,
                variant: variantStyle
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        createIssue({
            title: this.title,
            body: this.body,
            labels: [...this.label, this.priority]
        });
    }
}