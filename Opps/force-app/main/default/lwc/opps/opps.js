import { LightningElement, wire } from 'lwc';
import getOppsList from "@salesforce/apex/OppsList.getOppsList";
import deleteOpp from "@salesforce/apex/OppsList.deleteOpp";
import updateOpp from "@salesforce/apex/OppsList.updateOpp";
import getAllOpps from "@salesforce/apex/OppsList.getAllOpps";

import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
// import OWNER_NAME from "@salesforce/schema/Opportunity.Owner";

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' }
];

const COLUMNS = [
    { label: 'Opportunity name', fieldName: 'Name', type: 'text',
     editable: true, sortable: true },
    { label: 'Account name', fieldName: "AccountId", type: 'text',
     editable: false },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', typeAttributes: { currencyCode: 'EUR' },
     editable: false, sortable: true },
    { label: 'Close date', fieldName: 'CloseDate', type: 'date',
     editable: true, sortable: true },
    { label: 'Satge', fieldName: 'StageName', type: 'picklist',
     editable: true, sortable: true },
    { label: 'Opp Owner', fieldName: 'OwnerId', type: 'text',
     editable: false },
    { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'auto' } }

];


export default class AllOpps extends LightningElement {
    columns = COLUMNS;
    // display record !?
    record = {};
    error;
    // selected rows with checkbox
    selectedRows;
    // bulk delete 
    clickedButtonLabel;
    // edit 
    draftValues = [];
    // pagination
    pageNumber = 0;
    pageSize = 10;
    // totalRecords = 0;
    // Rows to display
    rowsDisplayed = [];
    // All selected Id values
    allSelectedRows = new Set();
    // Current page data rows
    // pageData = [];
    // All existing rows
    allData;

    // sorting
    sortedBy;
    sortedDirection;

    @wire(getOppsList)
    opps;

    @wire(getAllOpps)
    oppsCount;

    // https://stackoverflow.com/questions/29043135/javascript-one-line-if-else-else-if-statement
    // var variable = (condition) ? (true block) : (else block),

    //  Credit to https://studio.webcomponents.dev/edit/88mc3Gx8E4OZNksS14kZ/src/app.html?p=stories
    get pageData() {
        console.log("Opps data  ===== ", this.opps.data)
        return this.opps.data.slice(this.pageNumber*10, this.pageNumber*10+10)
    }

    get currentPageNumber() {
        return this.totalCount === 0 ? 0 : this.pageNumber + 1;
    }

    get totalPages() {
        return Math.ceil(this.totalCount / this.pageSize);
    }

    get totalCount() {
        return this.oppsCount.data || 0;
    }

    // disable previous and first buttons if first page
    get isFirstPage() {
        return this.pageNumber === 0 ? true : false;
    }
    
    // disable next and last buttons if last page
    get isLastPage() {
        return this.pageNumber === this.totalPages-1 ? true : false;
    }


    // Row selection
    getSelectedName(event) {
        this.selectedRows = event.detail.selectedRows;
        //Display that fieldName of the selected rows
        // console.log("======  getselectedName EVENT ========", event)
        console.log("======   getselectedName selected row ========", this.selectedRows)
        for (let i = 0; i < this.selectedRows.length; i++) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Opportunity slected',
                    message: this.selectedRows[i].Name,
                    variant: 'success'
                })
            );
        //     alert('You selected: ' + selectedRows[i].Name);
        }
    }

    // bulk delete functionality with button
    async handleBtnClick(event){
        this.clickedButtonLabel = event.target.label;
        console.log(" --- button label   --- ", this.clickedButtonLabel)
        if (this.clickedButtonLabel === "Bulk Delete"){
            console.log("<<<<<<<  deleted all selected  >>>>>>>>");
            const selection = this.selectedRows
            console.log("<<<<<<<  display selection  >>>>>>>>", selection);

            try {
                // Pass edited fields to the updateContacts Apex controller
                await deleteOpp({ oppToDelete: selection });
    
                // Report success with a toast
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Opps deleted',
                        variant: 'success'
                    })
                );
    
                // Display fresh data in the datatable
                await refreshApex(this.opps);
            } catch (error) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error while updating or refreshing records',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            }


        }
    }

    // Save changes on the records
    async handleSave(event) {
        console.log("8888888888  in the save event handler    8888888888")
        console.log("8888888888  EVENT    8888888888", event)
        const updatedFields = event.detail.draftValues;
        console.log("updated field =====>>>>", updatedFields);

        // Clear all datatable draft values
        this.draftValues = [];

        try {
            // Pass edited fields to the updateContacts Apex controller
            await updateOpp({ oppToUpdate: updatedFields });

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Opps updated',
                    variant: 'success'
                })
            );

            // Display fresh data in the datatable
            await refreshApex(this.opps);
            await refreshApex(this.oppsCount);
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }

    // delete or show row
    handleRowAction(event) {
        let actionName = event.detail.action;
        let row = event.detail.row;
        console.log("======  handleRowAction Action name ========", actionName)
        console.log("======  handleRowAction Action name . NAME ========", actionName.name)
        console.log("======  handleRowAction EVENT ========", event)
        console.log("======   handleRowAction  ROW ========", row)
        switch (actionName.name) {
            case 'delete':
                // this.mergeObjectList = this.mergeObjectList.filter(row => row.id !== event.detail.row.id);

                this.deleteRow(row);
                break;
                
            case 'show_details':
                this.showRowDetails(row);
                break;
            default:
        }
    }

    // bulk delete row
    async deleteRow(row){
        try {
            // Pass row/opp object to the deleOpp Apex controller
            await deleteOpp({ oppToDelete: [row] });

            // Report success with a toast
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Opportunity deleted',
                    variant: 'success'
                })
            );

            // Display fresh data in the datatable
            refreshApex(this.opps);
            refreshApex(this.oppsCount);
        } catch (error) {
            // Display error
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error while updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }

    // Sort datatable
    // The method onsort event handler
    handleOnSort(event) {
        // assign the latest attribute with the sorted column fieldName and sorted direction
        console.log(" @@@@  on sort EVENT  @@@@ ", event)
        this.sortedBy = event.detail.fieldName;
        console.log(" @@@@  EVENT sorted by  @@@@ ", this.sortedBy)
        this.sortedDirection = event.detail.sortDirection;
        console.log(" @@@@  EVENT sorted direction   @@@@ ", this.sortedDirection)
        this.sortData(this.sortedBy, this.sortedDirection);
   }

    sortData(fieldname, direction) {
        console.log("@@@ page data @@@", this.pageData)
        // Get all the data (not only the page data)
        let parseData = JSON.parse(JSON.stringify(this.opps.data));
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        console.log("@@@ is reverse  @@@", isReverse)
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.opps.data = parseData;
    }    

    // reset/reload button
    handleReset() {
        this.pageNumber = 0;
        refreshApex(this.opps.data)
        refreshApex(this.oppsCount.data)
    }

    // show row details ====>>> Not done yet 
    showRowDetails(row) {
        this.record = row;
    }

    // previous page
    handlePrevious() {
        console.log("======    handlePrevious    ======")
        console.log(" this.currentPAgeNumber  before if statement PREVIOUS =>>> ", this.currentPageNumber)
        if (this.currentPageNumber > 1) {
            this.pageNumber--;
        }
    }
    
    // next page
    handleNext() {
        console.log("======    handleNext    ======")
        console.log(" this.currentPAgeNumber  before if statement =>>> ", this.currentPageNumber)
        console.log(" this.total apges  before if statement =>>> ", this.totalPages)
        if (this.currentPageNumber < this.totalPages) {
            console.log(" <<<<<< Inside the iffff >>>>>>> ")
            console.log(" this.currentPAgeNumber  =>>> ", this.currentPageNumber)
            console.log(" this.PAgeNumber  =>>> ", this.pageNumber)
            this.pageNumber++;
            console.log(" this.PAgeNumber after ++++ =>>> ", this.pageNumber)
        }
    }

    // navigate to first page
    handleFirst() {
        this.pageNumber = 0;
      }

    // navigate to last page
    handleLast() {
        console.log("total pages for handleLast ==>>>>>", this.totalPages)
        this.pageNumber = this.totalPages-1;
    }

}
