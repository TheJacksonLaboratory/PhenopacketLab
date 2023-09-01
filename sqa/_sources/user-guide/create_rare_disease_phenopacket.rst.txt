Create Rare Disease Phenopacket
===============================


Click the Create button on the home page. By default the Phenopacket Creator form will open with the Rare Disease
steps visible.

**Individual Step**

.. figure:: ../_static/05IDs.PNG

Enter the subject information and vital status. Phenopacket ID and Individual ID are mandatory information.
Click the Generate ID button to auto create a phenopacket ID or type the ID of your choice.
The Individual ID is normally different from the phenopacket ID and can be helpful to the user for keeping
track of their work. Do not use a medical record number, date of birth, initials, location, email, name,
address, or any other personally identifying information as part of the ID fields.

**Data entry field formats**

Some fields have a dropdown to use for selection. For example, Age at last clinical encounter
has the choices Age, Gestational age, or Timestamp. The user can enter data in all fields
or only as needed in optional fields.

.. figure:: ../_static/06AgeDropDown.PNG

Once a selection has been made, other choices may be presented. For example, if the Age option
is selected, the user can enter years, months, and days.

.. figure:: ../_static/07AgeInYearsMonthsDays.PNG

Some fields, such as Timestamp, will suggest a format.

.. figure:: ../_static/08Timestamp.PNG

**Ontologies**

Many fields use ontologies for the choices. These fields will provide a search option.
For example, If the Vital status field is set to Deceased, there will be a Cause of Death ontology field.

.. figure:: ../_static/09CauseOfDeath.PNG

The search fields will state “Search for…”. For example: the cause of death field uses the
MONDO and OMIM ontologies. Search the ontology by entering a term. Up to 10 ontology choices are displayed.

.. figure:: ../_static/10CancerSearch.PNG

If the exact cause is not listed, enter a more specific term.

.. figure:: ../_static/11BreastCancer.PNG

After entering information in Step 1, go to the next step by clicking the Next button or click
on the stepper for Phenotypic Feature(s).

**Phenotypic Feature(s) Step**

Each step will have an Add button used to create a new feature, diagnosis, interpretation, etc.
These will open a new modal screen for that step.

.. figure:: ../_static/12PhenotypeFeature.PNG

Phenotypic feature is unique in that it has a choice of adding a term using the normal ontology
search or by using a text mining search.

.. figure:: ../_static/13SearchOrTextMine.PNG

For Term Search, enter a phenotype term or related word and the search will show results from the HPO ontology.

.. figure:: ../_static/13TermSearch.PNG

For the Text mining search, select the Text mining search tab and copy/paste or type in the text. Click Submit.

.. figure:: ../_static/14BreastCancerText.PNG

Several terms will be presented. The user may ignore any duplicate terms that show up,
these will only be saved once. Terms that are not wanted may be removed later.

.. figure:: ../_static/15BreastTerms.PNG

Note that the previously created age at clinical encounter has been presented as an option for the age of onset.
If desired, change or remove this age, and click the Apply onset to all approved features button.

Then click on the Approve all button.

Now click on the Add approved terms button.
A list will be presented of phenotypic features to be added to the case.

.. figure:: ../_static/16ListofApprovedTerms.PNG

At this point, if all the features are ready to add, then click the Add feature(s) to phenopacket button.
However, if one of these features is not desired, use the trash can icon to delete it.
The user may also want to add more information to one or more of these features.
To do that, click on the edit (pencil) icon. The Edit phenotypic feature screen will open.

.. figure:: ../_static/17UpdatePhenoFeature.PNG

This screen allows changes and additions for more information. Uncheck the observed check box
if the user wishes to set a feature to excluded. The onset may be changed. A resolution may be added.
Select Edit more details to add a severity, modifiers, and/or evidence.

.. figure:: ../_static/18PhenotypicModifiers.PNG

.. figure:: ../_static/19Evidence.jpg

When all the phenotypic features are ready, click on the Add Features to Phenopacket button.
The features are listed and the user can now continue to add more features, edit an existing one,
or go on to the next step.

.. figure:: ../_static/20FeaturesList.jpg

**Disease Diagnoses Step**

Click the Add disease button. Begin by searching for a disease name.

.. figure:: ../_static/21AddDisease.jpg

The disease can be added, removed, or edited to add an onset and/or resolution information.

.. figure:: ../_static/22BreastCancerDisease.jpg

**Interpretation(s) Step**

Interpretations are added for specific diagnoses, these can have multiple genomic interpretations.
The interpretation ID, progress status, and disease name are required fields.
Once those have been entered click on the Add genomic interpretation button.

.. figure:: ../_static/23AddInterpretation.PNG

Check out the Variant description examples to learn the accepted formats for your variant.
Then click on the Validate variant button.

.. figure:: ../_static/24VariantDescriptions.PNG

The interface will return the information it found. Click OK to add more details.
Or, if none are found, click Try again.

.. figure:: ../_static/25VariantInfo.PNG

More information can now be added in the Genomic Interpretation screen. Interpretation Status,
Acmg pathogenicity classification, and Therapeutic actionability are required fields.

.. figure:: ../_static/26VariantInterpretation.PNG

Click OK at the bottom of this screen. Now the information the user entered will be shown as
a list of genomic interpretations. To add more genomic interpretations to this disease,
click the Add genomic interpretation button. Once all have been entered, the user must click
the Add interpretation button to save the list for this disease.

.. figure:: ../_static/27VariantList.PNG

From here, the user may add several more interpretations for various diseases,
edit an existing one, or delete an existing one.

.. figure:: ../_static/28AddMoreInterpretations.PNG

**Validate Step**

The Validate step is required to finish creating a phenopacket. The confirmation checkbox must be clicked.
If there is any personal identifying information, return to that step and edit it to remove this information.
Phenopackets should contain only de-identified human information. The validation screen lists the
ontologies used within this phenopacket and the ORCiD number of the creator. Click the Complete button.

.. figure:: ../_static/29ValidateStep.PNG

Validation results

This is the normal result when there are no errors. Click the Ok button.

.. figure:: ../_static/30ValidationResults.PNG

The phenopacket is now finished and the stepper interface will disappear to be replaced by a list
of your phenotypes. Briefly, a confirmation message will be displayed.
The home page will display the phenopacket that was created in above steps.

If errors were found, the screen will remain on the validation page.
Return to previous pages to correct the errors and repeat the validation process.

