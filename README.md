# **salesforce-app**

![Mockup](assets/images/README-images/mockups/ami-responsive-website.png)

Link to the Opps app org : **[Opps](https://d06000001b8weeay-dev-ed.develop.lightning.force.com/lightning/n/opps)**.

## Table of Content

* [Project](#Project)
  * [Project Goals](#Project-Goals)
* [Setup](#Setup)
* [Components](#Components)
* [Bugs](#Bugs)
  - [Solved](#Solved)
* [Credit and Docs](#Credit-and-Docs)

## Project

Sign up for a Developer Edition org here: https://developer.salesforce.com/signup?d=70130000000td6N  
:warning: hotmails email addresses do not work, so please use a gmail address.

All the Salesforce Documentation is here: https://developer.salesforce.com/docs

Trainings and Trailheads are available to look into: https://trailhead.salesforce.com/trails

You will likely find the Apex Developer's Guide, Visualforce Developer Guide, Lightning Aura Components or Lightning Web Components (LWC) guide to be of most benefit.

The project has for aim to see your abilities to understand, review and implement codes within Salesforce features.

There should be some amount of visualforce and apex involved in this project.

Some candidates may approach this from the perspective of lightning aura components or lightning web components, which is fine also.

### Project Goals

* :white_check_mark: Create a page(visualforce)/application(aura,LWC) that lists standard or custom objects (you can choose what object to list)
* :white_check_mark: The list can have several column headers (name, created date, etc, of your choice)
* :white_check_mark: The list can be sortable by any of these column headers (e.g. sort by created date)  
:star: Bonus: Add visual indication (e.g. ▲ or ▼) on clicked column to display sorting direction
Clicking on the same column header repeatedly will reverse the order of sorting
* :white_check_mark: The list is paginated; users can cycle between X number of rows by using custom links or buttons. First, Last, Previous, and Next pagination actions are required, and their corresponding custom button/link should be enabled only if action can be performed.  
:star: Bonus: Display current page number and total pages.
* :white_check_mark: The list is interactive: the user can perform an action on each row of the list (click a button or select a checkbox on each row); a separate action button will perform some action on each of the selected rows.

:spiral_notepad: Note: To achieve this you should look into using a custom controller or extension controller.
The candidates are asked to explain in detail the processes, methods and justification for taking the approaches they’ve decided upon. As well as a number of followup questions.

## Setup

### Set Up Your Computer and Your Lightning Web Components Developer Tools

* Install Salesforce CLI :arrow_right: https://developer.salesforce.com/tools/salesforcecli
* Install VScode studio :arrow_right: https://code.visualstudio.com/
* Install the long-term support (Active LTS) version of Node.js on your computer :arrow_right: https://nodejs.org/en/download/. To confirm the successful installation run node --version
* Install "Salesforce extension pack" from the extension tab and click install.

### Create a Project, Connect VScode to your dev hub and create an org scratch

Everything is in the following Trailhead [Create a Lightning Web Component](https://trailhead.salesforce.com/content/learn/projects/set-up-your-lightning-web-components-developer-tools/create-a-lightning-web-component)

> A scratch org is a dedicated, configurable, and short-term Salesforce environment that you can quickly spin up when starting a new project, a new feature branch, or a feature test.
> A Developer Hub (Dev Hub) is the main Salesforce org that you and your team use to create and manage your scratch orgs.

#### Create a project

1. In VScode, open the Command Palette by pressing Ctrl+Shift+P (Windows) or Cmd+Shift+P (macOS/Linux).
2. Type SFDX.
3. Select ```SFDX: Create Project```.
4. Press Enter to accept the Standard option.
5. Enter Opps as the project name.
6. Select a folder on your device to store the project.

#### Authorize Your Dev Hub

The next step is to authenticate Dev Hub. If you're using a Trailhead Playground you can learn in [Get Your Trailhead Playground Username and Password](https://trailhead.salesforce.com/en/content/learn/modules/trailhead_playground_management/get-your-trailhead-playground-username-and-password) how to get the credentials for the next step.

This is a pre-requisite for creating a scratch org.

1. In VSCode, press Command + Shift + P on macOS or Ctrl + Shift + P on Windows or Linux.
2. Type sfdx.
3. Select SFDX: Authorize a Dev Hub.
4. Log in using your Dev Hub org credentials.
5. Click Allow when asked to allow access.

#### Create your org

1. Open the Command Palette and enter ```SFDX: Authorize an Org```.
2. Choose Production in the next screen and then provide an org alias (for example devOrg).
3. Your browser opens a Salesforce login page.
4. Enter your credentials for your Trailhead Playground org.
5. If prompted, click Allow, to allow Salesforce CLI to perform actions against your org, such as code deploy.

Your project is now connected to the Trailhead Playground, and you can use ```sf org open``` command to open the org.

## Create a Lightning Web Component

In VSCode, under the ```force-app/main/default```, right-click the ```lwc``` folder and select ```SFDX: Create Lightning Web Component```.
Name the Lightning web component, (I choose Opps), and select the ```main/default/lwc``` directory.

The same can be achieved from the terminal:

1. Open the command palette and select ```enter focus terminal```.
2. Paste the following ```sf lightning generate component -n myFirstWebComponent -d force-app/main/default/lwc --type lwc```
3. Press enter

This will create all needed files for the LWC

```-n``` — This defines the name of the Lightning web component folder and its files.  
```-d``` — This defines the target directory where the Lightning web component should be created. The target directory must be named lwc  
```--type``` — This specifies that you want to create a Lightning Web Component.

Save the files and right-click on the ```lwc``` folder and select ```SFDX: Deploy Source to Org```.

## Create an App and deploy your LWC

### Create a lightning App

1. In your org click Setup and then select Setup.
2. In the Quick Find box, type App Manager, then select App Manager.
3. Click New Lightning App on the top right of the page.
4. In the App Details & Branding window, choose the name of your app, the logo and colour theme.
5. On the App Options screen, select Standard navigation, then click Next.
6. On the Utility Items screen, click Next.
7. On the Navigation Items screen, select Home, Opportunities, Top Account and Opportunities from the Available Items list, and move them to the Selected Items list using the arrow. Then click Next.

### Create a Lightning Page

All the steps are found in the following Trailhead [Lightning app builder](https://trailhead.salesforce.com/content/learn/modules/lightning_app_builder)

1. In your org click Setup and then select Setup.
2. In the Quick Find box, type App Builder, then select Lightning App Builder.
3. Click on the ```New``` button in the Lightning Pages table.
4. Select App Page and click next.
5. Name your app and click next.
6. Choose your preferred layout (here I selected One Region) and click on done.
7. Drag and drop you LWC on the canvas and click Save.
8. Select Activate now.
9. Name your page, select where it should be available.

## Create and Deploy the Apex Class

In Visual Studio Code, under force-app/main/default, right-click on the classes sub-folder and select SFDX: Create Apex Class

Code Highlights
In this code, you create a class OppsList that has a method named getRecords. The method returns the list of opportunities records (as an Array) by querying the Opportunity object.

We've used SOQL to write our queries referencing the object and the fields on the object. The query compiles and thus is type-checked at compile time.


Save this file.
Right-click HouseService.cls and select SFDX: Deploy Source to Org.


Follow the steps below to create an anonymous script to test the apexlass.

Create a new file named oppseappTest.apex in the scripts/apex folder.
Replace the contents of the file with the following code: System.debug(OppsList.getRecords());
Open the Command Palette by pressing Ctrl+Shift+P (Windows) or Cmd+Shift+P (macOS/Linux) and type/select Execute Anonymous Apex.





### select LWC component

navigate to https://developer.salesforce.com/docs/component-library/overview/components
Search for list 

0000000 https://developer.salesforce.com/docs/component-library/bundle/lightning-layout/example

0000000 https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/example

Save the file.
Right click on the LWC folder and select SFDX: Deploy Source to Org.

## Bugs

### Solved



## Credit and Docs 

https://www.lightningdesignsystem.com/utilities/
==> style classes



******************************** EXTRA ********************************

1. Use lightning app builder to make:
- a lightning page (home page)
- a lightning record page
- Custom Record Page



## deploy metadata to your org



Enter this command to deploy the metadata to your org:
```sf project deploy start```

This will open the default scratch org in a browser.
```sf org open```

*****************************************************************************************************************************
*****************************************************************************************************************************
*****************************************************************************************************************************


