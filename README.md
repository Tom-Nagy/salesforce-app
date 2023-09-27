# **salesforce-app**

![Mockup](assets/images/README-images/mockups/ami-responsive-website.png)
#### link to the Opps app org : **[Opps](https://d06000001b8weeay-dev-ed.develop.lightning.force.com/lightning/n/opps)**.



## Table of Content

* [Project](#Project)
* [Project Goals](#Project-Goals)
* [Developer and Business Goals](#Developer-and-Business-Goals)
* [User Goals](#User-Goals)

## Project

Sign up for a Developer Edition org here: https://developer.salesforce.com/signup?d=70130000000td6N
:spiral_notepad: hotmails email address do not work, so please use a gmail address.

All the Salesforce Documentation is here: https://developer.salesforce.com/docs

Trainings and Trailheads are available to look into: https://trailhead.salesforce.com/trails

You will likely find the Apex Developer's Guide, Visualforce Developer Guide, Lightning Aura Components or Lightning Web Components guide to be of most benefit.

The project has for aim to see your abilities to understand, review and implement codes within Salesforce features.

There should be some amount of visualforce and apex involved in this project.

Some candidates may approach this from the perspective of lightning aura components or lightning web components, which is fine also.

## Project Goals

1. :white_check_mark: Create a page(visualforce)/application(aura,LWC) that lists standard or custom objects (you can choose what object to list)
2. :white_check_mark: The list can have several column headers (name, created date, etc, of your choice)
3. :white_check_mark: The list can be sortable by any of these column headers (e.g. sort by created date)
Bonus: Add visual indication (e.g. ▲ or ▼) on clicked column to display sorting direction
Clicking on the same column header repeatedly will reverse the order of sorting
4. :white_check_mark: The list is paginated; users can cycle between X number of rows by using custom links or buttons. First, Last, Previous, and Next pagination actions are required, and their corresponding custom button/link should be enabled only if action can be performed.
Bonus: Display current page number and total pages.
5. :white_check_mark: The list is interactive: the user can perform an action on each row of the list (click a button or select a checkbox on each row); a separate action button will perform some action on each of the selected rows.

:spiral_notepad: Note: To achieve this you should look into using a custom controller or extension controller.
The candidates are asked to explain in detail the processes, methods and justification for taking the approaches they’ve decided upon. As well as a number of followup questions.


************************************************************************************************************************


Use lightning app builder to make:
- a lightning page (home page)
- a lightning record page
- Custom Record Page

source: https://trailhead.salesforce.com/content/learn/modules/lightning_app_builder
Create a customized object record page for Lightning Experience and the Salesforce mobile app.
Add visibility rules to a record page component.
Activate the custom record page for your users.

Lightning App builder > record type

You have four options for activation.
Make the page the org default for the object.
Make the page the default object record page for specific Lightning apps.
Assign the page to a combination of Lightning apps, record types, and profiles.
Assign the page to a form factor, such as a desktop or phone.



## Set Up Your Lightning Web Components Developer Tools

install salesforce CLI => https://developer.salesforce.com/tools/salesforcecli
instal vs code studio => https://code.visualstudio.com/
install "salesforce extention pack" from the extension tab and click install

A scratch org is a dedicated, configurable, and short-term Salesforce environment that you can quickly spin up when starting a new project, a new feature branch, or a feature test.

A Developer Hub (Dev Hub) is the main Salesforce org that you and your team use to create and manage your scratch orgs.


## Connect VScode to your dev hub and create an org scratch

https://trailhead.salesforce.com/content/learn/projects/set-up-your-lightning-web-components-developer-tools/create-a-lightning-web-component


## create a LWC
command + shif + P => enter focus terminal
paste sf lightning generate component -n myFirstWebComponent -d force-app/main/default/lwc --type lwc 
press enter
=> creates needed files for the LWC

```-n``` — This defines the name of the Lightning web component folder and its files.
```-d``` — This defines the target directory where the Lightning web component should be created. The target directory must be named lwc
```--type``` — This specifies that you want to create a Lightning Web Component.

## deploy metadata to your org

Enter this command to deploy the metadata to your org:
```sf project deploy start```
note: comments in the code can through validation error upon deploying

This will open the default scratch org in a browser.
```sf org open```

*****************************************************************************************************************************
*****************************************************************************************************************************
*****************************************************************************************************************************

## get ready to develop

install the long-term support (Active LTS) version of Node.js https://nodejs.org/en/download

Install => Salesforce Extension Pack (Expanded)






# Project Opps

## Setup

Open the Command Palette by pressing Ctrl+Shift+P (Windows) or Cmd+Shift+P (macOS/Linux).
Type SFDX.
Select SFDX: Create Project.
Press Enter to accept the Standard option.
Enter Opps as the project name.
Select a folder on your device to store the project.


Open the Command Palette again and enter SFDX: Authorize an Org. Choose Production in the next screen and then provide the org alias as devOrg.
Your browser opens a Salesforce login page. Enter your credentials for your Trailhead Playground org. If prompted, click Allow to allow Salesforce CLI to perform actions against your org, such as code deploy.
Install the long-term support (Active LTS) version of Node.js on your computer. To install the LTS version, go to https://nodejs.org/en/download/. To confirm the successful installation run node --version
Your project is now connected to the Trailhead Playground, and you can use sf org open command to open the org.

Install the long-term support (Active LTS) version of Node.js on your computer. To install the LTS version, go to https://nodejs.org/en/download/. To confirm the successful installation run node --version
Your project is now connected to the Trailhead Playground, and you can use sf org open command to open the org.

## Create a lightning app

In your org click Setup and then select Setup.
In the Quick Find box, type App Manager, then select App Manager.
Click New Lightning App
In the App Details & Branding window, enter these details
On the App Options screen, select Standard navigation, then click Next.
On the Utility Items screen, click Next.
On the Navigation Items screen, select Home, Opportunities, Top Account and Opportunities from the Available Items list, and move them to the Selected Items list using the arrow. Then click Next.

## Retrieve Metadata from Salesforce to the Local Project

Any configuration done in the admin UI can be retrieved as XML formatted data (also known as metadata) and checked into version control.
Locate the Custom Objects folder and expand it. Then select the Opportunity folder.
Click Retrieve source from org. to retrieve the org metadata for the Opportunity object. Notice that the XML files are under the force-app/main/default/objects folder.

## Create and Deploy the Apex Class

In Visual Studio Code, under force-app/main/default, right-click classes and select SFDX: Create Apex Class

Code Highlights
In this code, you create a class OppsList that has a method named getRecords. The method returns the list of house records (as an Array) by querying the Opportunity object.

We've used SOQL to write our queries referencing the object and the fields on the object. The query compiles and thus is type-checked at compile time.


Save this file.
Right-click HouseService.cls and select SFDX: Deploy Source to Org.


Follow the steps below to create an anonymous script to test the apexlass.

Create a new file named oppseappTest.apex in the scripts/apex folder.
Replace the contents of the file with the following code: System.debug(OppsList.getRecords());
Open the Command Palette by pressing Ctrl+Shift+P (Windows) or Cmd+Shift+P (macOS/Linux) and type/select Execute Anonymous Apex.


## Create and Deploy a Lightning Web Component

Under the force-app/main/default, right-click the lwc folder and select SFDX: Create Lightning Web Component.
Name the Lightning web component allOpps and select the main/default/lwc directory.

### select LWC component

navigate to https://developer.salesforce.com/docs/component-library/overview/components
Search for list 

0000000 https://developer.salesforce.com/docs/component-library/bundle/lightning-layout/example

0000000 https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/example

Save the file.
Right click on the LWC folder and select SFDX: Deploy Source to Org.



## Add LWC to the home page

ClickApp Launcher, search for and select Opps.
Click Setup, then select Edit Page.
Drag the opps Lightning web component from the custom area of the Lightning Components list to the top of the Page Canvas.




## Credit / library 

https://www.lightningdesignsystem.com/utilities/
==> style classes



